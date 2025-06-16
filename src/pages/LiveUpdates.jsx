import  { useState, useEffect } from 'react';
import axios from 'axios';
import { CircularProgress ,Box } from '@mui/material';

const LiveUpdates = () => {
  const [liveMatches, setLiveMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLiveUpdates = async () => {
      const options = {
        method: 'GET',
        url: 'https://cricbuzz-cricket.p.rapidapi.com/matches/v1/recent',
        headers: {
          'x-rapidapi-key': '9f86b8b476msh32aa9ef050336dbp1a1d75jsn6e20c2b73140',
          'x-rapidapi-host': 'cricbuzz-cricket.p.rapidapi.com'
        }
      };
      try {
        const response = await axios.request(options);
        setLiveMatches(response.data.typeMatches[0]?.seriesMatches || []); 
        setLoading(false);
      } catch (error) {
        console.error('Error fetching live updates:', error);
        setLoading(false);
      }
    };

    fetchLiveUpdates();
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
          <h2 className="text-5xl font-extrabold text-center text-yellow-500 mb-12">Live Cricket Score</h2>

      <div className="space-y-6">
        {liveMatches.length > 0 ? (
          liveMatches.map((series, seriesIdx) => (
            series.seriesAdWrapper && (
              <div key={seriesIdx} className="space-y-4">
                <h3 className="text-xl font-semibold mb-4">
                  {series.seriesAdWrapper.seriesName || 'Unknown Series'}
                </h3>
                {series.seriesAdWrapper.matches.map((match, matchIdx) => (
                  <div
                    key={matchIdx}
                    className="bg-white border border-gray-300 rounded-lg p-6 shadow-lg space-y-4"
                  >
                    <h4 className="text-lg font-medium text-gray-800">
                      {match.matchInfo.matchDesc} - {match.matchInfo.matchFormat}
                    </h4>
                    <p className="text-gray-600">
                      {new Date(parseInt(match.matchInfo.startDate)).toLocaleString()} - {match.matchInfo.venueInfo?.ground || 'Unknown Venue'}
                    </p>
                    <p className="text-gray-800 font-semibold">{match.matchInfo.status}</p>

                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">{match.matchInfo.team1?.teamName || 'Team 1'}:</span>
                        <span>
                          {match.matchScore?.team1Score?.inngs1?.runs || 0}/{match.matchScore?.team1Score?.inngs1?.wickets || 0} in{' '}
                          {match.matchScore?.team1Score?.inngs1?.overs || 0} overs
                        </span>
                      </div>
                      {match.matchScore?.team1Score?.inngs2 && (
                        <div className="flex justify-between">
                          <span className="font-medium">Innings 2:</span>
                          <span>
                            {match.matchScore?.team1Score?.inngs2?.runs || 0}/{match.matchScore?.team1Score?.inngs2?.wickets || 0} in{' '}
                            {match.matchScore?.team1Score?.inngs2?.overs || 0} overs
                          </span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="font-medium">{match.matchInfo.team2?.teamName || 'Team 2'}:</span>
                        <span>
                          {match.matchScore?.team2Score?.inngs1?.runs || 0}/{match.matchScore?.team2Score?.inngs1?.wickets || 0} in{' '}
                          {match.matchScore?.team2Score?.inngs1?.overs || 0} overs
                        </span>
                      </div>
                      {match.matchScore?.team2Score?.inngs2 && (
                        <div className="flex justify-between">
                          <span className="font-medium">Innings 2:</span>
                          <span>
                            {match.matchScore?.team2Score?.inngs2?.runs || 0}/{match.matchScore?.team2Score?.inngs2?.wickets || 0} in{' '}
                            {match.matchScore?.team2Score?.inngs2?.overs || 0} overs
                          </span>
                        </div>
                      )}
                    </div>

                    <p className="font-semibold text-green-600">{match.matchInfo.stateTitle || 'Ongoing'}</p>
                  </div>
                ))}
              </div>
            )
          ))
        ) : (
          <p>No live updates available at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default LiveUpdates;
