import { useState, type FormEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function RegisterToProduct() {
    const location = useLocation();
    const navigate = useNavigate();

    //Armazena os dados do produto novo
    const [nameProduct, setNameProduct] = useState("");
    const [category, setCategory] = useState("");
    const [costPrice, setCostPrice] = useState("");
    const [priceToSell, setPriceToSell] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [warningPoint, setWarningPoint] = useState(0);

    //Pega o userId do state
    const userId = location.state?.userId;
    //Pega o nome do usuário
    const user = location.state?.user;
    //Pega o email do usuário
    const email = location.state?.email;

    const handleNewProduct = async (e: FormEvent) => {
        e.preventDefault();

        //Instância um produto
        const newProduct = {
            nameProduct: nameProduct,
            category: category,
            costPrice: parseFloat(costPrice.replace(',', '.')) || 0,
            priceToSell: parseFloat(priceToSell.replace(',', '.')) || 0,
            quantity: quantity,
            warningPoint: warningPoint,
            userId: userId
        };

        try {
            //Chama o post para criar o produto 
            const response = await fetch("http://localhost:8000/products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json" // Etiqueta: "Estou enviando JSON"
                },
                body: JSON.stringify(newProduct) //Converte para o formato JSON
            });

            if (response.ok) {
                //Se o úsuario foi criado com sucesso
                //alert("Produto Cadastrado com sucesso!");
                navigate("/main_page", {
                    state: {
                        userId: userId,
                        user: user,
                        email: email
                    }
                });
            } else {
                //Se houver um erro no cadastro
                alert("Erro no cadastro: Revise os seus dados.");
            }
        } catch (err) {
            console.log(err);
        }
    }


    return <>
        <section id="registerToProduct">
            <div style={{ display: 'flex', justifyContent: 'center', padding: '60px 0' }}>
                <div className="card-form">
                    <div className="info-section">
                        <h1>Novo Produto</h1>
                        <p>Preencha os dados ao lado para adicionar um item ao seu catálogo.</p>
                    </div>
                    <form className="formNewProduct" onSubmit={handleNewProduct}>
                        <label className='label-register'>Nome:</label>
                        <input
                            type='text'
                            id="name"
                            name="name"
                            placeholder="Digite o nome do seu novo produto"
                            value={nameProduct}
                            onChange={(e) => setNameProduct(e.target.value)}
                            required
                        />
                        <br />
                        <label className='label-register'>Categoria</label>
                        <input
                            type='text'
                            id="category"
                            name="cetegory"
                            placeholder="Digite a categoria do seu produto"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            required
                        />
                        <br />
                        <label className='label-register'>Preço de custo:</label>
                        <input
                            type='text'
                            id="costPrice"
                            name="costPrice"
                            placeholder="Digite o preço de custo do seu produto"
                            value={costPrice}
                            onChange={(e) => setCostPrice(e.target.value)}
                            required
                        />
                        <br />
                        <label className='label-register'>Preço a vender:</label>
                        <input
                            type='text'
                            id="priceToSell"
                            name="priceToSell"
                            placeholder="Digite o preço a qual você vai vender o seu produto"
                            value={priceToSell}
                            onChange={(e) => setPriceToSell(e.target.value)}
                            required
                        />
                        <br />
                        <label className='label-register'>Quantidade em estoque:</label>
                        <input
                            type='text'
                            id="quantity"
                            name="quantity"
                            placeholder="Digite a quantidade que você possui em estoque do seu poduto:"
                            value={quantity}
                            onChange={(e) => setQuantity(parseInt(e.target.value, 10) || 0)}
                            required
                        />
                        <br />
                        <label className='label-register'>Quantidade Crítica:</label>
                        <input
                            type='text'
                            id="warningPoint"
                            name="warningPoint"
                            placeholder="Digite a quantidade crítica do estoque do produto:"
                            value={warningPoint}
                            onChange={(e) => setWarningPoint(parseInt(e.target.value, 10) || 0)}
                            required
                        />
                        <button
                            type="submit"
                            className="buttonRegisterProduct"
                        >
                            Cadastrar
                        </button>
                    </form>
                </div>
            </div>
        </section>
    </>
}

export default RegisterToProduct;