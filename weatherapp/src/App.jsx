import Dashboard from './componets/Dashboard'
import { Route, Routes } from 'react-router-dom';
import Favorites from './componets/Favorites';
import Search from './componets/Search';

function App() {
  
  return (
    <>
    <Search/>
    <Routes>
      <Route path="/" element={<Dashboard/>} />
      <Route path="/favorites" element={<Favorites/>}/>
    </Routes>
    {/* <Dashboard/> */}
    </>
  )
}

export default App
