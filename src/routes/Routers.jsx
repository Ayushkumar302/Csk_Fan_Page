import FanZone from '../pages/FanZone';
import Home from '../pages/Home';
import LiveUpdates from '../pages/LiveUpdates';
import MatchSchedule from '../pages/MatchSchedule';
import News from '../pages/News';
import Login from '../pages/Login'; 
import Signup from '../pages/Signup';
import { Route, Routes } from 'react-router-dom';
import Polls from '@/pages/Polls';

function Routers() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/schedule" element={<MatchSchedule />} />
      <Route path="/fanzone" element={<FanZone />} />
      <Route path="/polls" element={<Polls />} />
      <Route path="/news" element={<News />} />
      <Route path="/liveupdates" element={<LiveUpdates />} />
      <Route path="/login" element={<Login />} /> 
      <Route path="/signup" element={<Signup />} /> 
    </Routes>
  );
}

export default Routers;

