'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import WalletConnect from '../components/WalletConnect';

interface Storm {
  id: string;
  name: string;
  position: {
    lat: number;
    lng: number;
  };
  windSpeed: number;
  pressure: number;
  category: number;
}

interface Prediction {
  id: string;
  stormId: string;
  city: string;
  willHit: number;
  willMiss: number;
}

export default function PredictPage() {
  const [activeStorms, setActiveStorms] = useState<Storm[]>([]);
  const [selectedStorm, setSelectedStorm] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [loading, setLoading] = useState(true);
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  // Cities at risk (this could be dynamic based on storm location)
  const citiesAtRisk = ['Miami', 'Tampa', 'Jacksonville', 'Charleston', 'Houston'];

  useEffect(() => {
    fetchActiveStorms();
  }, []);

  const fetchActiveStorms = async () => {
    try {
      // Replace with actual API endpoint
      // const response = await axios.get('https://api.weather.gov/hurricanes/active');
      // For demo, using mock data
      const mockStorms = [
        {
          id: '1',
          name: 'Hurricane Ian',
          position: { lat: 25.7617, lng: -80.1918 },
          windSpeed: 125,
          pressure: 950,
          category: 3
        },
        // Add more mock storms as needed
      ];
      setActiveStorms(mockStorms);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching storms:', error);
      setLoading(false);
    }
  };

  const handleVote = async (stormId: string, city: string, vote: 'hit' | 'miss') => {
    if (!isWalletConnected) {
      alert('Please connect your wallet first to make a prediction');
      return;
    }

    // In a real app, this would be an API call to your backend
    setPredictions(prev => {
      const existingPrediction = prev.find(p => p.stormId === stormId && p.city === city);
      
      if (existingPrediction) {
        return prev.map(p => {
          if (p.stormId === stormId && p.city === city) {
            return {
              ...p,
              willHit: vote === 'hit' ? p.willHit + 1 : p.willHit,
              willMiss: vote === 'miss' ? p.willMiss + 1 : p.willMiss
            };
          }
          return p;
        });
      }

      return [...prev, {
        id: Date.now().toString(),
        stormId,
        city,
        willHit: vote === 'hit' ? 1 : 0,
        willMiss: vote === 'miss' ? 1 : 0
      }];
    });

    // Here you would trigger your smart contract interaction
    try {
      // Example smart contract interaction
      // const contract = new ethers.Contract(contractAddress, abi, signer);
      // await contract.submitPrediction(stormId, city, vote === 'hit');
    } catch (error) {
      console.error('Error submitting prediction to blockchain:', error);
    }
  };

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Natural Disaster Prediction System</h1>
        <WalletConnect />
      </div>
      
      {/* Storm Selection */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Active Storms</h2>
        <div className="flex gap-2">
          {activeStorms.map(storm => (
            <button
              key={storm.id}
              onClick={() => setSelectedStorm(storm.id)}
              className={`px-4 py-2 rounded ${
                selectedStorm === storm.id 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              {storm.name} (Cat {storm.category})
            </button>
          ))}
        </div>
      </div>

      {/* City Selection and Voting */}
      {selectedStorm && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Make Your Prediction</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {citiesAtRisk.map(city => (
              <div key={city} className="border p-4 rounded shadow-sm bg-white">
                <h3 className="font-semibold mb-2 text-gray-800">{city}</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleVote(selectedStorm, city, 'hit')}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Will Hit
                  </button>
                  <button
                    onClick={() => handleVote(selectedStorm, city, 'miss')}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Will Miss
                  </button>
                </div>
                
                {/* Display current votes */}
                {predictions.find(p => p.stormId === selectedStorm && p.city === city) && (
                  <div className="mt-2 text-gray-700">
                    Hit: {predictions.find(p => p.stormId === selectedStorm && p.city === city)?.willHit || 0}
                    <br />
                    Miss: {predictions.find(p => p.stormId === selectedStorm && p.city === city)?.willMiss || 0}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Weather Data Display */}
      {selectedStorm && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Storm Details</h2>
          {activeStorms.map(storm => {
            if (storm.id === selectedStorm) {
              return (
                <div key={storm.id} className="border p-4 rounded bg-white">
                  <p className="text-gray-700">Wind Speed: {storm.windSpeed} mph</p>
                  <p className="text-gray-700">Pressure: {storm.pressure} mb</p>
                  <p className="text-gray-700">Category: {storm.category}</p>
                  <p className="text-gray-700">Position: {storm.position.lat}°N, {storm.position.lng}°W</p>
                </div>
              );
            }
            return null;
          })}
        </div>
      )}
    </div>
  );
}