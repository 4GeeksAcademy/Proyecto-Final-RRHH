import Cards from "../components/Cards";
import Cards2 from "../components/Cards2";
import GraficoTrabajo from "../components/GraficoTrabajo";
import GraficoTareas from "../components/GraficoTareas";
import TemporizadorFichaje from "../components/Temporizador";

export default function Dashboard() {
  return (
    <section className="">
      <h1 className="text-3xl mb-4 text-black">
        Panel de Control
      </h1>
      <p>Aquí se van a mostrar una vista general de lo que es la aplicacion
         y desde aqui mismo tambien pueden ir a diferentes paginas de la aplicacion</p>
    </section>
  );
}