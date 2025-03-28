import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout/layout'
import HomePage from './pages/Home';
import HomeContainer from './containers/homeContainer';


function App() {
  return (
    <BrowserRouter>
    <Routes>
     
        <Route index element={<HomeContainer />} />
  
    </Routes>
  </BrowserRouter>
 
  );
}

export default App
