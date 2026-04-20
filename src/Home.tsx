import { Link } from "react-router-dom"

function Home(){

    return <>
        <h1>NEXUS ESTOQUE</h1>
        <h2>O estoque na palma da sua mão!</h2>
        <br></br>
        <p>Entre no sistema para começar a melhorar o gerenciamento da sua empresa.</p>
        <nav>
            <Link to="/login">Entrar</Link>
        </nav>
    </>; 
};

export default Home;