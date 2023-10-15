import './App.css'
import { Route, Routes, useLocation } from 'react-router-dom';
import { Detail, Form, Landing, Home } from './views';
import NavBar from './components/NavBar/NavBar';

function App() {

  const location = useLocation().pathname;
  
  return (
    <>
      {location !== '/' && <NavBar />}
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/home' element={<Home />} />
        <Route path='/form' element={<Form />} />
        <Route path='/detail' element={<Detail />} />
      </Routes>
      
    </>
  )
}

export default App
