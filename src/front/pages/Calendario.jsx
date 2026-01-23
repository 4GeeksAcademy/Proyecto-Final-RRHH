import Cal from "@calcom/embed-react";
import { useEffect } from "react";
import { getCalApi } from "@calcom/embed-react";



export default function Calendario() {
  useEffect(() => {
    getCalApi().then((cal) => {
      cal("on", {
        action: "bookingSuccessful",
        callback: (e) => {


          console.log(e);

          const t = { fecha: e.detail.data.date, duración: e.detail.data.duration, organizador: e.detail.data.organizer.name }

          console.log("estos son los datos recogidos", t)


          fetch('https://supreme-space-dollop-wrj7jwv44vgq39rvp-3001.app.github.dev/api/reunión', {
            method: "POST",
            body: JSON.stringify(t),
            headers: {
              "Content-Type": "application/json"
            }
          })
            .then(resp => {
              console.log(resp.ok); // Será true si la respuesta es exitosa
              console.log(resp.status); // El código de estado 201, 300, 400, etc.
              return resp.json(); // Intentará parsear el resultado a JSON y retornará una promesa donde puedes usar .then para seguir con la lógica
            })
            .then(data => {
              // Aquí es donde debe comenzar tu código después de que finalice la búsqueda
              console.log(data); // Esto imprimirá en la consola el objeto exacto recibido del servidor
            })
            .catch(error => {
              // Manejo de errores
              console.log(error);
            });


        },

      });
    });
  }, []);

  

  return (
    <section className="">
      <div className="contenedor-calendly">
        <p>
          <Cal calLink="lazaro-fillaux/15min" config={{ theme: "light" }}></Cal>
        </p>
      </div>
    </section>
  );
}