import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Registration from './components/Registration';
import Update from './components/Update';
import Header from './components/Header';


function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Header/>
          <Routes>
              <Route path='/' element={<Home/>}></Route>
              <Route path='/register' element={<Registration/>}></Route>
              <Route path='/update/:id' element={<Update/>}></Route>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
