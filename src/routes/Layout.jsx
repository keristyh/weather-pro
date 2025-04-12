import { Outlet, Link } from "react-router-dom";
import { useState } from "react";
import "./Layout.css";


const Layout = () => {
    const [units, setUnits] = useState("I");

    return (
        <div className="app-container">
            <aside className="sidebar">
                <h2>Weather App</h2>
                <div className="sidebar-control">
                    <Link to="/"><button>Dashboard</button></Link>
                    <button onClick={() => setUnits(u => u === "I" ? "M" : "I")}>
                        Switch to {units === "I" ? "Celsius °C" : "Fahrenheit °F"}
                    </button>
                </div>
            </aside>

            <main className="main-content">
                <Outlet context={{ units, setUnits }} />
            </main>
        </div>
    );
};

export default Layout;