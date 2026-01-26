import { useEffect, useState } from "react";

export default function Fichaje() {
  const [fichajes, setFichajes] = useState([]);
  const token = localStorage.getItem("jwt-token");

  
  const cargarFichajes = async () => {
    if (!token) return;

    try {
      const res = await fetch(
        import.meta.env.VITE_BACKEND_URL + "/api/mis-fichajes",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      if (!res.ok) throw new Error("Error al cargar fichajes");

      const data = await res.json();
      setFichajes(data.fichajes);
    } catch (error) {
      console.error("Error cargando fichajes:", error);
    }
  };

  
  const fichar = async () => {
    if (!token) {
      alert("No hay token, inicia sesión");
      return;
    }

    try {
      const res = await fetch(
        import.meta.env.VITE_BACKEND_URL + "/api/fichaje",
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      if (!res.ok) throw new Error("Error al fichar");

      await cargarFichajes();
    } catch (error) {
      console.error("Error fichando:", error);
    }
  };

  useEffect(() => {
    cargarFichajes();
  }, []);

  return (
    <div className="container text-center mt-5">
      <h1>Fichaje</h1>

      <button className="btn btn-success btn-lg my-4" onClick={fichar}>
        Entrada
      </button>
      <br/>
       <button className="btn btn-success btn-lg my-4" onClick={fichar}>
        salida
      </button>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Hora entrada</th>
            <th>Hor hola</th>
          </tr>
        </thead>
        <tbody>
          {fichajes.map((f) => (
            <tr key={f.id}>
              <td>
                {f.hora_entrada
                  ? new Date(f.hora_entrada).toLocaleString()
                  : "—"}
              </td>
              <td>
                {f.hora_salida
                  ? new Date(f.hora_salida).toLocaleString()
                  : "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}