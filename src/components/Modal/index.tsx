import { Modal } from "antd"

interface IPropModalForm{
    open: boolean,
    title : string,
    handleClose: ()=> void | undefined
}

export default function ModalForm({open, title, handleClose}:IPropModalForm) {
    return(
        <Modal
        title={title}
        visible={open} // visualizar modal
         onOk={handleClose} // botao de confimar 
         onCancel={handleClose}// botao de cancelar
        okText="Confirmar"
        cancelText="Cancelar"
        >
            <p>Cadastre o usuario</p>

        </Modal>
    )
}