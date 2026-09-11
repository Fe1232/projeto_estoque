import { useLocation, Link } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { getApiErrorMessage, requestJson } from "./api";

export default function MyAccount() {
    const [isMenuOpen, setMenuOpen] = useState(false);

    const token = localStorage.getItem('token');
    //const getUser = useCallback(async() => {

    //})
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
                        to="/settings"
                        className="buttonMenu"
                    >Configurações</Link>
                </nav>
                <button
                    className="buttonMenu buttonLogout"
                    onClick={handleLogout}
                >
                    Sair
                </button>
            </aside>
        </header>
        <div>
            <h1 className="tittleMyAccount">Minha Conta</h1>
            <p>Nome de Usuário</p>
        </div>
    </>
}