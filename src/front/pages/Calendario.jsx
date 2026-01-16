import { InlineWidget } from "react-calendly";


export default function Calendario() {
  return (
    <section className="">
      <h1 className="text-3xl mb-4 text-black">
        Página de calendario
      </h1>
      <div className="contenedor-calendly">
        <p>
          <InlineWidget url="https://calendly.com/" />
        </p>
      </div>
    </section>
  );
}