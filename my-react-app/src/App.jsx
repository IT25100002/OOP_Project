import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import TutorsPage from './Components/TutorsPage';
import RegisterTutor from './Components/Tutor/RegisterTutor';
import LoginPage from './Components/LoginPage';
import Tutor from './Components/Tutor/Tutor';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/"               element={<Home />} />
        <Route path="/tutors"         element={<TutorsPage />} />
        <Route path="/register-tutor" element={<RegisterTutor />} />
        <Route path="/login"          element={<LoginPage />} />
        <Route path="/Tutor"          element={<Tutor />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
