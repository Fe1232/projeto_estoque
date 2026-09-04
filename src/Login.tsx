import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getApiErrorMessage, requestJson } from "./api";

function Login() {
    const [email, setEmail] = useState(''); //Armazena o email
    const [key, setKey] = useState(''); //Armazena a senha
    const navigate = useNavigate(); //Usado para navegar

    //Função que chama a api e busca no banco de dados, algum usuario 
    const checkUser = async (e: React.FormEvent) => {
        e.preventDefault(); //Evita que a página recarregue após apertar o submuit sem ter conferido

        try {
            //Fazemos um post enviando os apenas as credenciais atuais
            const userData = await requestJson<{
                user: { id: string; nameStore: string; email: string };
                token: string;
            }>("/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, key }) //Enviamos o que foi digitado
            });

            localStorage.setItem('userId', userData.user.id);
            localStorage.setItem('user', userData.user.nameStore);
            localStorage.setItem('email', userData.user.email);
            localStorage.setItem('token', userData.token);

            navigate("/main_page", {
                state: {
                    userId: userData.user.id,
                    user: userData.user.nameStore,
                    email: userData.user.email,
                    token: userData.token
                }
            });
        } catch (error) {
            alert(getApiErrorMessage(error, 'Não foi possível entrar na conta agora.'));
        }
    }

    return <>
        <div className="page-layout"> {/* 1. Abre o container principal que espalha tudo */}

            <section className="info-section"> {/* 2. Coluna da Esquerda (Texto) */}
                <h1>NEXUS</h1>
                <h2>Controle de Estoque Profissional</h2>
                <p>Gerencie seus produtos com calma e eficiência, mesmo ao final de um longo dia.</p>
            </section>

            <div className="card-form"> {/* 3. Coluna da Direita (Cartão Branco) */}
                <section>
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
                </section>
                <section>
                    <br />
                    <h3>Ainda não é Cadastro? Cadastre-se para poder aproveitar todos os recursos de nossa plataforma.</h3>
                    <nav>
                        <Link to="/register">Cadastre-se</Link>
                    </nav>
                </section>
            </div>
        </div>
    </>
}


export default Login;