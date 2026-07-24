import { useLocation, Link } from "react-router-dom";
import { useState, useEffect } from "react";

interface Product {
    id: string;
    nameProduct: string;
    category: string;
    costPrice: number;
    priceToSell: number;
    quantity: number;
    warningPoint: number;
}


function MainPage() {
    //Pega os dados da página de login.
    const location = useLocation();

    //Armazena os produtos do cliente
    const [myProducts, setMyProducts] = useState<Product[]>([]);

    //Booleano que verifica se o modal deve aparecer
    const [isEditing, setIsEditing] = useState(false);

    //Armazena os dados do produto a ser editado
    const [editProduct, setEditProduct] = useState<Product | null>(null);

    //Armazena os dados do produto editado
    const [nameProduct, setNameProduct] = useState("");
    const [category, setCategory] = useState("");
    const [costPrice, setCostPrice] = useState("");
    const [priceToSell, setPriceToSell] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [warningPoint, setWarningPoint] = useState(0);


    //Save the userId
    const userId = location.state?.userId ?? localStorage.getItem('userId');
    //Save the name store
    const user = location.state?.user ?? localStorage.getItem('user');
    //Save the store's email address
    const email = location.state?.email ?? localStorage.getItem('email');

    //Função callbak que carrega os produtos
    const fetchMyProducts = async () => {
        try {
            //Chama o método get
            const response = await fetch(`http://localhost:8000/products/${userId}`);
            const data = await response.json(); //Converte do json
            // Só atualiza se o que veio da API for realmente uma lista (Array)
            if (Array.isArray(data)) {
                setMyProducts(data);
            } else {
                console.error("A API não devolveu uma lista:", data);
                setMyProducts([]); // Se der erro, mantém como lista vazia
            }
        } catch (err) {
            //Se houver um erro retorna isto
            console.error(`Erro ao carregar os produtos: ${err}`);
        }
    }

    const handleClickDelete = async (id: String) => {
        try {
            const response = await fetch(`http://localhost:8000/products/${id}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId: userId })
            });

            if (response.ok) {
                //Remove da lista o produto e mantem os que possuem id diferetes dele
                const updatedList = myProducts.filter(product => product.id !== id);
                //Atualiza a lista
                setMyProducts(updatedList);

                //Se foi removido com sucesso retorna isto
                //alert("Produto removido com sucesso!");
            } else {
                //Se houver um problema quanto ao delete referente ao usuário retorna isto
                alert("Não foi possivel deletar o produto.");
            }
        } catch (err) {
            //Se houver um problema referente ao banco de dados
            console.error("Erro ao deletar", err);
        }
    }

    const handleclickEdit = async () => {

        //Instãncia o produto editado
        const ProductEdit = {
            nameProduct: nameProduct,
            category: category,
            costPrice: parseFloat(String(costPrice).replace(',', '.')) || 0,
            priceToSell: parseFloat(String(priceToSell).replace(',', '.')) || 0,
            quantity: quantity,
            warningPoint: warningPoint,
            userId: userId
        };

        try {
            //Chama o método put para alterar um produto
            const response = await fetch(`http://localhost:8000/products/${editProduct?.id}`, {
                method: 'PUT',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(ProductEdit)
            });

            //Se deu certo
            if(response.ok){
                const newList = myProducts.map(p => {
                    if(p.id === editProduct?.id) {
                        //Retorna um objeto novo unindo os dados antigos com os novos
                        return {...p, ...ProductEdit};
                    }
                    return p;
                });

                //Atualiza a lista
                setMyProducts(newList);
                //fecha o modal
                setIsEditing(false);
                //Envia um alert
                //alert("Produto alterado com sucesso!");
            } else {
                //Se houve erro retorna isto
                alert("Não foi possivel alterar o produto.");
            }
        } catch(err){
            console.error("Erro ao editar o produto: " + err);
        }

    }

    //Carrega os produtos toda a vez que carregar o site
    useEffect(() => {
        if (userId) {
            fetchMyProducts();
        }
    }, [userId]);

    return <>
        <section style={{ flexGrow: 1 }}>
            <h1 className="textWelcome">Bem vindo  {user}</h1>
            <h2 className="">Este é o estoque da sua empresa:</h2>
            {myProducts?.map((product) => (
                <div className="product-card" key={product.id}>
                    <h3 className="nameProduct">{product.nameProduct}</h3>
                    <br />
                    <p>Categoria: {product.category}</p>
                    <p>Preço de custo: {product.costPrice}</p>
                    <p>Preço para vender: {product.priceToSell}</p>
                    <p>Quantidade: {product.quantity}</p>
                    <p>Limite de pouca quantidade: {product.warningPoint}</p>
                    <button className="buttonProduct" onClick={() => handleClickDelete(product.id)}>Deletar</button>
                    <button 
                    className="buttonProduct" 
                    onClick={() => { 
                        setIsEditing(true);
                        setEditProduct(product);
                        setNameProduct(product.nameProduct);
                        setCategory(product.category);
                        setCostPrice(product.costPrice);
                        setPriceToSell(product.priceToSell);
                        setQuantity(product.quantity);
                        setWarningPoint(product.warningPoint);
                        }}
                    >
                        Alterar
                    </button>
                </div>
            ))}
            <nav>
                <Link
                    to={"/register_to_product"}
                    state={{
                        userId: userId,
                        user: user,
                        email: email
                    }}
                >Adicione um produto novo</Link>
            </nav>
        </section>
        {isEditing && (
            <div className="modal-overlay">
                <div className="modal-content">
                    <h2>Edite o seu produto:</h2>
                    <label className='label-register'>Nome:</label>
                    <input
                        type='text'
                        id="name"
                        name="name"
                        placeholder="Digite o nome do seu novo produto"
                        defaultValue={editProduct?.nameProduct}
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
                        defaultValue={editProduct?.category}
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
                        defaultValue={editProduct?.costPrice}
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
                        defaultValue={editProduct?.priceToSell}
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
                        defaultValue={editProduct?.quantity}
                        onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
                        required
                    />
                    <br />
                    <label className='label-register'>Quantidade Crítica:</label>
                    <input
                        type='text'
                        id="warningPoint"
                        name="warningPoint"
                        placeholder="Digite a quantidade crítica do estoque do produto:"
                        defaultValue={editProduct?.warningPoint}
                        onChange={(e) => setWarningPoint(parseInt(e.target.value, 10))}
                        required
                    />
                    <div className="modal-actions">
                        <button 
                        className="buttonProduct"
                        onClick={() => setIsEditing(false)}
                        style={{backgroundColor: '#ccc'}} 
                        >
                            Cancelar
                        </button>
                        <button 
                        className="buttonProduct"
                        onClick={handleclickEdit}
                        >
                            Salvar
                        </button>
                    </div>
                </div>
            </div>
        )}
    </>
}

export default MainPage;