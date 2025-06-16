import  { useEffect, useState } from 'react';
import { db } from '../config/firebaseConfig'; 
import { collection, addDoc, query, orderBy, onSnapshot, Timestamp, doc } from 'firebase/firestore'; 
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Box, CircularProgress } from '@mui/material';

const FanZone = () => {
  const [forums, setForums] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [commentContents, setCommentContents] = useState({}); 
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const q = query(collection(db, 'forums'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const forumsArray = [];
      querySnapshot.forEach((doc) => {
        forumsArray.push({ id: doc.id, ...doc.data() });
      });
      setForums(forumsArray);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleAddForum = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      await addDoc(collection(db, 'forums'), {
        title,
        content,
        userId: user.uid,
        username: user.username,
        createdAt: Timestamp.fromDate(new Date()),
      });
      setTitle('');
      setContent('');
    } catch (error) {
      console.error('Error adding forum: ', error);
    }
  };

  const handleAddComment = async (forumId) => {
    if (!user) {
      navigate('/login');
      return;
    }

    const commentContent = commentContents[forumId];

    if (!commentContent.trim()) {
      return;
    }

    const comment = {
      content: commentContent,
      userId: user.uid,
      username: user.username,
      createdAt: Timestamp.fromDate(new Date()),
    };

    try {
      const forumRef = doc(db, 'forums', forumId); 
      await addDoc(collection(forumRef, 'comments'), comment); 
      setCommentContents((prev) => ({ ...prev, [forumId]: '' })); 
    } catch (error) {
      console.error('Error adding comment: ', error);
    }
  };

  const handleCommentChange = (forumId, value) => {
    setCommentContents((prev) => ({ ...prev, [forumId]: value })); 
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
      <h1 className="text-3xl font-bold text-center text-yellow-600 mb-4">Join the Fans!</h1>
      <form onSubmit={handleAddForum} className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-semibold mb-4">Create a New Forum</h2>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Forum Title"
          required
          className="border border-gray-300 rounded-md p-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Forum Content"
          className="border border-gray-300 rounded-md p-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          rows="4"
        />
        <button type="submit" className="bg-yellow-500 text-white px-4 py-2 rounded-md shadow hover:bg-yellow-600 transition duration-200">
          Add Forum
        </button>
      </form>

      <h2 className="text-2xl font-semibold mb-2">All Forums</h2>
      <ul>
        {forums.map((forum) => (
          <li key={forum.id} className="border border-gray-200 bg-white rounded-lg p-4 mb-4 shadow">
            <h3 className="font-semibold text-lg">{forum.title}</h3>
            <p className="text-gray-700">{forum.content}</p>
            <p className="text-sm text-gray-500 mt-2">
              Added by <span className="font-medium">{forum.username}</span> on {forum.createdAt.toDate().toLocaleString()}
            </p>
            <div className="mt-4">
              <h4 className="font-semibold mb-2">Comments</h4>
              <div className="flex flex-wrap mb-2 ">
                <input
                  type="text"
                  value={commentContents[forum.id] || ''}
                  onChange={(e) => handleCommentChange(forum.id, e.target.value)}
                  placeholder="Add a comment..."
                  className="border border-gray-300 rounded-md p-2 flex-grow mr-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 "
                />
                <Button onClick={() => handleAddComment(forum.id)} className="mt-2 sm:mt-0">
                  Comment
                </Button>
              </div>
              <ul>
                <Comments forumId={forum.id} />
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Comments = ({ forumId }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'forums', forumId, 'comments'), (querySnapshot) => {
      const commentsArray = [];
      querySnapshot.forEach((doc) => {
        commentsArray.push({ id: doc.id, ...doc.data() });
      });
      setComments(commentsArray);
    });

    return () => unsubscribe();
  }, [forumId]);

  return (
    <>
      {comments.map((comment) => (
        <li key={comment.id} className="border-b border-gray-200 pb-2 mb-2">
          <p className="font-medium">{comment.username}</p>
          <p className="text-gray-600">{comment.content}</p>
          <p className="text-sm text-gray-500">on {comment.createdAt.toDate().toLocaleString()}</p>
        </li>
      ))}
    </>
  );
};

export default FanZone;
