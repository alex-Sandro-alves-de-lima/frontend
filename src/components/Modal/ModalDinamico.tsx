import { useState } from "react";
import ModalForm from "../Modal";

const ModalDinamico = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [open, setOpen]= useState(false);

  const handleOpen=()=>{
    setOpen(true)
  }  
  const handleClose=()=>{
    setOpen(false)
  }
  
  return (
    <div>
      <ModalForm handleClose={handleClose} title="Modal de teste" open={open}/>
        <button type="submit" onClick={()=>{handleOpen()}}>Abrir Modal</button>
    </div>
  )
}

export default ModalDinamico
