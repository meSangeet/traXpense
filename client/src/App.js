import {Routes, Route} from 'react-router-dom'
import HomePage from './pages/homePage';
import Register from './pages/Register';
import Login from './pages/login';
function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<HomePage />}></Route>
      <Route path="/register" element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
    </Routes>
    </>
  );
}

export default App;
