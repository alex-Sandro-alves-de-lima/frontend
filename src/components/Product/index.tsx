import { useEffect } from 'react';
import productStore from '../../store/product.store'; // Atualize o caminho para o arquivo onde está o estado de Zustand
import { IProduct } from '../../modules/product.entity'; // Atualize o caminho para o arquivo onde está a interface IProduct

const ProductList = () => {
    const { products, fetchProducts } = productStore();

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    if (!products.length) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Produtos</h1>
            <ul>
                {products.map((product: IProduct) => (
                    <li key={product.id}>
                        <h2>{product.desc_marca}</h2>
                        <p>{product.desc_prod.join(', ')}</p>
                        <div>
                            {product.images.map(image => (
                                <img key={image.id} src={image.end_link_imagem} alt={product.desc_marca} width="100" />
                            ))}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ProductList;
