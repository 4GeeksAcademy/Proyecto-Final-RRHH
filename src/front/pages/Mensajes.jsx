import { useState } from "react";
export default function Mensajes() {

  const [correoElectronico, setCorreoElectronico] = useState("")

  function enviarCorreo(){
    fetch(`${import.meta.env.VITE_BACKEND_URL}/email-prueba`, {
      method: "POST" ,
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({recipient: correoElectronico}),
    })
    
    .then(resp => resp.json())
    .then(data => {
      console.log(data)
    })
    .catch(error =>{
      alert(error)
    })

  }

  
  return (
    <section className="">
      <h1 className="text-3xl mb-4 text-black">
        Página de Mensajes
      </h1>
      <input type="text" onChange={(e) => setCorreoElectronico(e.target.value)}></input>
      <button className="bg-green-600" onClick={enviarCorreo}>Enviar  correo electronico</button>
    </section>
  );
}
