import React from 'react';
import {HashRouter, Route, Routes, BrowserRouter} from "react-router-dom";
import LeftNavigation from "./components/UIComponents/LeftNavigation";
import HomePage from "./pages/Home";

function App() {
    return (
        <BrowserRouter>
            <main className="app">
                <LeftNavigation/>
                <section style={{gridColumn: "4/-1"}}>
                    <Routes>
                        <Route path="/" element={<HomePage/>}/>
                    </Routes>
                </section>
            </main>
        </BrowserRouter>
    );
}

export default App;
