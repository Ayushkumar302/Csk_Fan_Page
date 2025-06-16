import React, { useState } from 'react';
import axios from 'axios';
import {
  Card,
  CardBody,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";

const PlayerProfile= () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    setLoading(true);
    setError('');
    setPlayers([]);

    const options = {
      method: 'GET',
      url: 'https://cricbuzz-cricket.p.rapidapi.com/stats/v1/player/search',
      params: { plrN: searchTerm },
      headers: {
        'x-rapidapi-key': '9f86b8b476msh32aa9ef050336dbp1a1d75jsn6e20c2b73140',
        'x-rapidapi-host': 'cricbuzz-cricket.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      setPlayers(response.data.player);
    } catch (error) {
      console.error(error);
      setError('Error fetching player data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-12">
      <h2 className="text-4xl font-bold text-center mb-8 text-primaryColor">Search Player Profile</h2>
      <div className="flex justify-center mb-8">
        <Input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter player name"
          className="mr-2"
        />
        <Button onClick={handleSearch} className="bg-primaryColor text-white">Search</Button>
      </div>

      {loading && <div className="text-center py-10">Loading...</div>}
      {error && <div className="text-red-500 text-center">{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {players.map((player) => (
          <Card key={player.id} className="max-w-sm mx-auto">
            <CardBody>
              <img
                src={`https://i.cricketcb.com/stats/img/faceImages/${player.faceImageId}.jpg`}
                alt={player.name}
                className="w-full h-32 object-cover rounded-t-lg"
              />
              <Typography variant="h5" className="mt-2">{player.name}</Typography>
              <Typography className="text-gray-600">{player.teamName}</Typography>
              <Typography className="text-gray-500">DOB: {player.dob || 'N/A'}</Typography>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PlayerProfile;
