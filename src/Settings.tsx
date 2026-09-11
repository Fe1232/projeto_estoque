import { useLocation, Link } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { getApiErrorMessage, requestJson } from "./api";

export default function Settings () {
    const [isMenuOpen, setMenuOpen] = useState(false);

    //Logout accont
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("user");
        localStorage.removeItem("email");

        // Return to login page
        window.location.replace("login");
    }
    return <>
    <header className="mainPageHeader">
                <div className="headerLeft">
                    <button
                        className="menuButton"
                        onClick={() => setMenuOpen(!isMenuOpen)}
                    >
                        ☰
                    </button>
                    <h1>Nexus Estoques</h1>
                </div>
                <aside className={`sideMenu ${isMenuOpen ? "open" : ""}`}>
                    <nav>
                        <Link
                            to="/main_page"
                            className="buttonMenu"
                        >Início</Link>
                        <Link
                            to="/myaccount"
                            className="buttonMenu"
                        >Minha conta</Link>
                    </nav>
                    <button
                    className="buttonMenu buttonLogout"
                    onClick={handleLogout}
                    >
                        Sair
                    </button>
                </aside>
            </header>
    </>
}