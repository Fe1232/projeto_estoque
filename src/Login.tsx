import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login(){
    const [email, setEmail] = useState(''); //Armazena o email
    const [key, setKey] = useState(''); //Armazena a senha
    const navigate = useNavigate(); //Usado para navegar

    //Função que chama a api e busca no banco de dados, algum usuario 
    const checkUser = async (e: React.FormEvent) => {
        e.preventDefault(); //Evita que a página recarregue após apertar o submuit sem ter conferido

        try {
            const response = await fetch("http://localhost:8000/users"); //Chama o método get
            const users = await response.json(); //Converte do json para js

            const user = users.find((u: any) => u.email === email && u.key === key); //Verifica se o úsuario e senha estão certos

            if (user) {
                //Se o usuário estiver certo vai para a página principal
                navigate("/main_page", {state: {user: user.nameStore, email: user.email}})
            } else {
                //Se o usuário estiver errado avisa
                alert("Usuário ou senha incorretos");
            }
        } catch (err) {
            //Erro ralacionado a api ou ao servidor
            alert(`Erro ao conectar ao servidor.`);
            console.log(err);
        }
    }

    return <>
        <h2>NEXUS ESTOQUES</h2>
        <form className="formulario-login" onSubmit={checkUser}>
            <label className="labelLogin">Digite o email da sua empresa:</label>
            <input 
            type="email" 
            id="email" 
            name="email" 
            placeholder="Digite o email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            />
            <br />
            <label className="labelLogin">Digite a sua senha</label>
            <input 
            type="password" 
            id="password" 
            name="password" 
            placeholder="Digite a sua senha"
            onChange={(e) => setKey(e.target.value)}
            required
            />
            <button type="submit" className="buttonLogin">Login</button>
        </form>
        <br />
        <h3>Ainda não é Cadastro? Cadastre-se para poder aproveitar todos os recursos de nossa plataforma.</h3>
        <nav>
            <Link to="/register">Cadastre-se</Link>
        </nav>
    </>
}


export default Login;