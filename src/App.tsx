import Home from "./pages/Home";
import Favourites from "./pages/Favourites";
import SpellInfo from "./pages/SpellInfo";
import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";

function App() {
    return (
        <Router basename={process.env.PUBLIC_URL}>
            <NavBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/favourites" element={<Favourites />} />
                <Route path="/spell/:index" element={<SpellInfo />} />
            </Routes>
        </Router>
    );
}

export default App;
