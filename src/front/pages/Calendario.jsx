export default function Calendario() {
  return (
    <section className="">
      <h1 className="text-3xl mb-4 text-black">
        Página de calendario
      </h1>
      <p>
        <div className="calendly-inline-widget" data-url="https://calendly.com/fillaux33/30min" style="min-width:320px;height:700px;"></div>
        <script type="text/javascript" src="https://assets.calendly.com/assets/external/widget.js" async></script>
      </p>
    </section>
  );
}