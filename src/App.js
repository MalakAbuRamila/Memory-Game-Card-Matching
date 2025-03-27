import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MemoryGame from "./Components/MemoryGame";
import Home from "./Components/Home";
import NotFound from "./Components/NotFound";


function App() {

    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/game" element={<MemoryGame />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </header>
            </div>
        </Router>
    );
}

export default App;
