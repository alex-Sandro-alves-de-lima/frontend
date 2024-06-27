import { Button } from 'antd';
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'


const ProductDetails = () => {
    const { id } = useParams();
    const navegate = useNavigate();

    const handleEnviar = () => {
        //<Alert message="Success Text" type="success" />
        return navegate("/")
    }

    return (
        <div>
            <p>Product detail</p>
            <h1>Exibir id enviado via parametro {id}</h1>
            <Button type='primary' onClick={handleEnviar}> Enviar</Button>
        </div>
    )
}

export default ProductDetails
