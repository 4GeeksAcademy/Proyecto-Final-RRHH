import Cal from "@calcom/embed-react";
import { useEffect } from "react";
import { getCalApi } from "@calcom/embed-react";




export default function Calendario() {

  const token = localStorage.getItem("jwt-token");
  useEffect(() => {
    getCalApi().then((cal) => {
      cal("on", {
        action: "bookingSuccessful",
        callback: (e) => {
          console.log(e);

          const t = {
            "nombre": "",
            "link": e.detail.data.booking.videoCallUrl,
            "fecha": e.detail.data.date,
            "duracion": e.detail.data.duration,
            "organizador": e.detail.data.organizer.name,
            "usuarios": e.detail.data.booking.attendees
          };

          console.log("Reunion: ", t)

          fetch(import.meta.env.VITE_BACKEND_URL + "/api/reunion", {
            method: "POST",
            body: JSON.stringify(t),
            headers: {
              "Content-Type": "application/json",
              "Authorization": "Bearer " + token,
            },
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
    <section className="p-6 dark:bg-gray-900 dark:text-white">
      <div className="contenedor-calendly">
        <p>
          <Cal calLink="raul-arroyo/30min" config={{ theme: "light" }}></Cal>
        </p>
      </div>
    </section>
  );
}