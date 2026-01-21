import React from "react";
import { useEffect } from "react";

export default function Fichaje() {

  const fichar = async (tipo) => {
    const token = localStorage.getItem("token");

    const response = await fetch(
      process.env.BACKEND_URL + "/api/fichaje",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token
        },
        body: JSON.stringify({
          tipo: tipo // "entrada" o "salida"
        })
      }
    );

    const data = await response.json();
    console.log(data);
  };

  useEffect(() => {
  fetch(process.env.BACKEND_URL + "/api/mis-fichajes", {
    headers: {
      "Authorization": "Bearer " + localStorage.getItem("token")
    }
  })
    .then(res => res.json())
    .then(data => setFichajes(data.fichajes));
}, []);



  return (
    <section className="">
      <h1 className="text-3xl mb-4 text-black">
        Página de Fichaje
      </h1>

      <button onClick={() => fichar("entrada")}>
        Fichar entrada
      </button>

      <button onClick={() => fichar("salida")}>
        Fichar salida
      </button>
    </section>
  );
}