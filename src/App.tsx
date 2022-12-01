import React from 'react';
import {Route, Routes, BrowserRouter} from "react-router-dom";
import LeftNavigation from "./components/UIComponents/LeftNavigation";
import HomePage from "./pages/Home";
import Favourites from "./pages/Favourites";
import Trash from "./pages/Trash";

function App() {
    return (
        <BrowserRouter>
            <main className="app">
                <LeftNavigation/>
                <section style={{gridColumn: "4/-1"}}>
                    <Routes>
                        <Route path="/" element={<HomePage/>}/>
                        <Route path="/favourites" element={<Favourites/>}/>
                        <Route path="/trash" element={<Trash/>}/>
                    </Routes>
                </section>
            </main>
        </BrowserRouter>
    );
}

export default App;
