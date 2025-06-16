import './App.css';
import Layout from './components/layout/Layout';
import { AuthProvider } from './context/AuthContext';
import { NewsProvider } from './context/NewsContext'; 

function App() {
  return (
    <AuthProvider>
      <NewsProvider> 
      <div>
        <Layout />
      </div>
    </NewsProvider>
    </AuthProvider>
  );
}

export default App;
