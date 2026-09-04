import { useState, type FormEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getApiErrorMessage, requestJson } from "./api";

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

    // Get the logged-in user information from navigation state or local storage.
    const userId = location.state?.userId ?? localStorage.getItem('userId') ?? '';
    const user = location.state?.user ?? localStorage.getItem('user') ?? '';
    const email = location.state?.email ?? localStorage.getItem('email') ?? '';
    const token = location.state?.token ?? localStorage.getItem('token');

    const handleNewProduct = async (e: FormEvent) => {
        e.preventDefault();

        if (!userId) {
            alert('Sua sessão não foi encontrada. Entre novamente.');
            return;
        }

        // Ensure the userId is the exact value returned by the login endpoint.
        const resolvedUserId = String(userId).trim();
        if (!resolvedUserId) {
            alert('Sua sessão é inválida. Entre novamente.');
            return;
        }

        const parsedCostPrice = Number.parseFloat(String(costPrice).replace(',', '.'));
        const parsedPriceToSell = Number.parseFloat(String(priceToSell).replace(',', '.'));

        // Create a product payload that matches the backend expectations.
        const newProduct = {
            nameProduct: nameProduct,
            category: category,
            costPrice: Number.isNaN(parsedCostPrice) ? 0 : parsedCostPrice,
            priceToSell: Number.isNaN(parsedPriceToSell) ? 0 : parsedPriceToSell,
            quantity: quantity,
            warningPoint: warningPoint,
            userId: resolvedUserId
        };

        try {
            await requestJson('/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(newProduct)
            });

            navigate('/main_page', {
                state: {
                    userId: resolvedUserId,
                    user: user,
                    email: email,
                    token: token
                }
            });
        } catch (error) {
            alert(getApiErrorMessage(error, 'Não foi possível cadastrar o produto agora.'));
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