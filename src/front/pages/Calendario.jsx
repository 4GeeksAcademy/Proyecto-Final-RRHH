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

          // const g = e.detail.data.booking.attendees
          // for i in g {
                

          // }

          const t = { FECHA: e.detail.data.date, TIEMPO_REUNION: e.detail.data.duration, EMAIL_ORGANIZADOR: e.detail.data.organizer.email,EMAIL_INVITADO: e.detail.data.booking.attendees[1].email }

          console.log("estos son los datos recogidos", t)


          fetch('https://api.sheetbest.com/sheets/e953b3bf-6eb2-424a-93b9-9e272aab7e92', {
            method: "POST",
            body: JSON.stringify(t),
            headers: {
              "Content-Type": "application/json"
            }
          })

        },

      });
    });
  }, []);

  

  return (
    <section className="">
      <div className="contenedor-calendly">
        <p>
          <Cal calLink="lazaro-fillaux" config={{ theme: "light" }}></Cal>
        </p>
      </div>
    </section>
  );
}