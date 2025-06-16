import  { useEffect, useState } from 'react';
import { db } from '../config/firebaseConfig';
import { collection, addDoc, query, onSnapshot, orderBy, doc, getDoc, updateDoc, Timestamp } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext'; 
import { Button } from '@/components/ui/button';
import { Box, CircularProgress } from '@mui/material';

const Polls = () => {
  const [polls, setPolls] = useState([]);
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState([{ text: '', votes: 0 }, { text: '', votes: 0 }]); // Initialize with two empty options
  const { user } = useAuth(); // Access the user from your Auth context
  const [loading, setLoading] = useState(true);


  // Fetch polls from Firestore
  useEffect(() => {
    const q = query(collection(db, 'polls'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const pollsArray = [];
      querySnapshot.forEach((doc) => {
        pollsArray.push({ id: doc.id, ...doc.data() });
      });
      setPolls(pollsArray);
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  // Handle adding a new poll
  const handleAddPoll = async (e) => {
    e.preventDefault();
    if (!user) return; // If not authenticated, do not allow creating a poll

    try {
      await addDoc(collection(db, 'polls'), {
        question,
        options,
        createdAt: Timestamp.fromDate(new Date()),
        createdBy: user.username, 
        votedUsers: [] // Initialize an empty array to track users who have voted
      });
      // Reset form fields
      setQuestion('');
      setOptions([{ text: '', votes: 0 }, { text: '', votes: 0 }]); // Reset options to two empty options
    } catch (error) {
      console.error('Error adding poll: ', error);
    }
  };

  // Handle voting
  const handleVote = async (pollId, optionIndex) => {
    if (!user) return; // If not authenticated, do not allow voting
  
    try {
      const pollDoc = doc(db, 'polls', pollId);
      const pollSnapshot = await getDoc(pollDoc);
  
      if (pollSnapshot.exists()) {
        const pollData = pollSnapshot.data();
  
        // Check if `votedUsers` exists, if not default to an empty array
        const votedUsers = pollData.votedUsers || [];
  
        // Check if the user has already voted in this poll
        if (votedUsers.includes(user.uid)) {
          alert("You have already voted in this poll.");
          return;
        }
  
        // Increment the vote count for the selected option
        const updatedOptions = [...pollData.options];
        updatedOptions[optionIndex].votes += 1;
  
        // Add user ID to `votedUsers` array to prevent further voting
        await updateDoc(pollDoc, {
          options: updatedOptions,
          votedUsers: [...votedUsers, user.uid] 
        });
      } else {
        console.error("Poll does not exist");
      }
    } catch (error) {
      console.error('Error voting: ', error);
    }
  };
  

  // Handle option change
  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index].text = value;
    setOptions(updatedOptions);
  };

  // Add new option field
  const addOption = () => {
    setOptions([...options, { text: '', votes: 0 }]);
  };

  // Remove option field
  const removeOption = (index) => {
    if (options.length > 2) { 
      const updatedOptions = options.filter((_, i) => i !== index);
      setOptions(updatedOptions);
    }
  };
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="500px">
        <CircularProgress size={80} />
      </Box>
    );
  }
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-4xl font-bold mb-6 text-yellow-600">Explore and Cast Your Vote!</h2>
      {user && (
        <form onSubmit={handleAddPoll} className="mb-6 bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Create a New Poll</h2>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Poll Question"
            required
            className="border border-gray-300 p-2 w-full mb-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          {options.map((option, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="text"
                value={option.text}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                placeholder={`Option ${index + 1}`}
                required
                className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              {options.length > 2 && (
                <button
                  type="button"
                  onClick={() => removeOption(index)}
                  className="text-red-500 ml-2 hover:text-red-700"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
          <Button type="button" onClick={addOption} className="mr-4" variant="secondary">
            Add Option
          </Button>
          <Button type="submit">
            Add Poll
          </Button>
        </form>
      )}

      <h2 className="text-xl font-bold mb-2">All Polls</h2>
      <ul>
        {polls.map((poll) => (
          <li key={poll.id} className="border border-gray-300 bg-white p-4 mb-4 rounded-lg shadow-sm">
            <h3 className="font-semibold text-lg">{poll.question}</h3>
            <p className="text-sm text-gray-500 mb-2">
              Created by {poll.createdBy} on {poll.createdAt.toDate().toLocaleString()}
            </p>
            {poll.options.map((option, index) => (
              <div key={index} className="flex items-center justify-between mb-2">
                <span>{option.text}</span>
                <span className="text-gray-600">{option.votes} votes</span>
                {user && (
                  <button
                    onClick={() => handleVote(poll.id, index)}
                    className="bg-green-500 text-white px-2 py-1 ml-2 rounded hover:bg-green-400 transition"
                  >
                    Vote
                  </button>
                )}
              </div>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Polls;
