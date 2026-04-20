import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
    const [nameStore, setNameStore] = useState(''); //Armazena o nome
    const [email, setEmail] = useState(''); //Armazena o email
    const [passsword, setPassword] = useState(''); // Sua senha original
    const [confirmPassword, setConfirmPassword] = useState(''); // O novo estado
    const navigate = useNavigate();


    //Após criar o usuário envia para o banco de dados
    const handleRegister = async (e: FormEvent) => {
        e.preventDefault(); //Evita que a página reinicie após o submit

        //cria um novo usuário
        const newUser = {
            nameStore: nameStore,
            email: email,
            key: passsword,
            accountPro: true
        }

        try {
            //Envia o método post
            const response = await fetch("http://localhost:8000/users", {
                method:"POST", //Avisa que é um método post
                headers: {
                    "Content-Type": "application/json" // Etiqueta: "Estou enviando JSON"
                },
                body: JSON.stringify(newUser) //Converte para o formato JSON
            });

            if(response.ok){
                //Se o usuário foi cadastrado com sucesso
                alert("Usuário Cadastrado com sucesso!");
                navigate("/login");
            } else {
                //Se houve um erro nos dados
                alert("Erro no cadastro. Confira os seus dados.")
            }

        } catch (err) {
            alert("Erro no Servidor.");
            console.log(err);
        }
    } 

    

    return (<>
        <h1>Cadastro</h1>
        <form className='formRegister' onSubmit={handleRegister}>
            <label className='label-regiter'>Digite o nome da sua empresa:</label>
            <input 
            type='text'
            id="name" 
            name="name" 
            placeholder="Digite o nome da sua loja" 
            value={nameStore}
            onChange={(e) => setNameStore(e.target.value)}
            required
            />
            <br />
            <label className="label-register">Digite o email da sua empresa:</label>
            <input 
            type="email"
            id="email"
            name="email"
            placeholder="Digite o email da sua loja:"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            />
            <br />
            <label className="label-register">Crie uma senha:</label>
            <input
            type="password"
            value={passsword}
            onChange={(e) => setPassword(e.target.value)}
            required
            />

            <br />

            <label className="label-register">Digite novamente a senha:</label>
            <input
            type="password"
            placeholder="Confirme sua senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)} // Apenas atualiza o estado
            required
            />

            {/* MENSAGEM DE ERRO CONDICIONAL */}
            {confirmPassword.length > 0 && confirmPassword !== passsword && (
                <p style={{ color: 'red', fontSize: '12px' }}>
                As senhas não coincidem.
                </p>
            )}
            <button 
            type="submit" 
            disabled={passsword !== confirmPassword || passsword === ''}
            className="buttonLogin"
            >
            Cadastrar
            </button>
        </form>
    </>)
}

export default Register;