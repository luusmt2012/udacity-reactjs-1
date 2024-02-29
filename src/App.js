import "./App.css";
import { Routes, Route } from 'react-router-dom';

import MyReads from "./pages/MyReads";
import Search from "./pages/Search";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<MyReads/>} />
      <Route exact path="/search" element={<Search/>} />
    </Routes>
  );
}

export default App;
