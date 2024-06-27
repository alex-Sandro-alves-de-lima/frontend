
import { Link } from 'react-router-dom'

const Products = () => {

    return (
        <div>
            <p>Products</p>
            <Link to="/productDetails/1">Produto 1</Link><br />
            <Link to="/productDetails/2">Produto 2</Link><br />
            <Link to="/productDetails/3">Produto 3</Link><br />
        </div>
    )
}

export default Products