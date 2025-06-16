import { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, CircularProgress } from '@mui/material';

const MATCH_SCHEDULE_API = 'https://api.cricapi.com/v1/currentMatches?apikey=5d301ad6-caaa-4e03-a6a5-d5d86956ed2a&offset=0';

const MatchSchedule = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await axios.get(MATCH_SCHEDULE_API);
        setMatches(response.data.data || []); 
        setLoading(false);
      } catch (error) {
        console.error('Error fetching match schedule:', error);
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="500px">
       <CircularProgress size={80} />
      </Box>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-5xl font-extrabold text-center text-yellow-500 mb-12">Latest Schedules</h2>
      <div className="space-y-6">
        {matches.map((match) => (
          <div
            key={match.id}
            className="bg-white border border-gray-300 rounded-lg p-6 shadow-lg flex flex-col space-y-4"
          >
            <h3 className="text-2xl font-semibold text-gray-800">{match.name}</h3>

            <div className="flex justify-between items-center">
              {/* Team 1 */}
              <div className="flex items-center space-x-2">
                {match.teamInfo?.[0]?.img && (
                  <img
                    src={match.teamInfo[0].img}
                    alt={match.teamInfo[0].name || 'Team 1'}
                    className="h-10 w-10"
                  />
                )}
                <span className="font-medium text-lg">{match.teamInfo?.[0]?.name || 'TBA'}</span>
              </div>

              <span className="text-xl font-semibold">vs</span>

              {/* Team 2 */}
              <div className="flex items-center space-x-2">
                {match.teamInfo?.[1]?.img && (
                  <img
                    src={match.teamInfo[1].img}
                    alt={match.teamInfo[1].name || 'Team 2'}
                    className="h-10 w-10"
                  />
                )}
                <span className="font-medium text-lg">{match.teamInfo?.[1]?.name || 'TBA'}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 text-gray-600">
              <div>
                <p className="font-medium">Venue:</p>
                <p>{match.venue || 'TBA'}</p>
              </div>
              <div>
                <p className="font-medium">Date:</p>
                <p>{match.dateTimeGMT ? new Date(match.dateTimeGMT).toLocaleDateString() : 'TBA'}</p>
              </div>
              <div>
                <p className="font-medium">Status:</p>
                <p>{match.status || 'TBA'}</p>
              </div>
            </div>

            {/* Score Section */}
            <div className="bg-gray-100 rounded-lg p-4 mt-4">
              {match.score?.length > 0 ? (
                match.score.map((inning, idx) => (
                  <div key={idx} className="flex justify-between">
                    <span className="font-semibold">{inning.inning}:</span>
                    <span className="font-semibold">{inning.r}/{inning.w} in {inning.o} overs</span>
                  </div>
                ))
              ) : (
                <p>No score data available</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MatchSchedule;
