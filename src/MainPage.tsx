import { useLocation } from "react-router-dom";

function MainPage() {
    //Pega os dados da página de login.
    const location = useLocation();

    //Grava o nome do da loja que usa o sistema
    const user = location.state?.user;
    //Grava o email da loja que usa o sistema;
    const email = location.state?.email;

    return <>
        <h2 className="textWelcome">Bem vindo  {user}</h2>
    </>
}

export default MainPage;