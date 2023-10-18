import { Route, Routes, useLocation } from 'react-router-dom';
import { Detail, Form, Landing, Home } from './views';
import NavBar from './components/NavBar/NavBar';
import styles from './App.css';

function App() {

  const location = useLocation().pathname;
  
  return (
    <div>
      {location !== '/' && <NavBar />}
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/home' element={<Home />} />
        <Route path='/form' element={<Form />} />
        <Route path='/detail/:id' element={<Detail />} />
      </Routes>
      
    </div>
  )
}

export default App
