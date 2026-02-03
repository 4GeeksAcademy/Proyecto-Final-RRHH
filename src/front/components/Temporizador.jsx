import { useEffect, useState, useRef } from "react";

export default function TemporizadorFichaje({ token, refrescarFichajes }) {
  const [segundos, setSegundos] = useState(0);
  const [activo, setActivo] = useState(false);
  const [horaInicio, setHoraInicio] = useState(() => {
    const guardado = localStorage.getItem("horaInicioFichaje");
    return guardado ? parseInt(guardado) : null;
  });

  const intervaloRef = useRef(null);
 useEffect(() => {
  const cargarFichajeActivo = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/mis-fichajes`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      if (!res.ok) return;

      const data = await res.json();

      // Buscar fichaje activo (sin hora de salida)
      const fichajeActivo = data.fichajes.find(
        (f) => !f.hora_salida
      );

      if (fichajeActivo && fichajeActivo.hora_entrada) {
        const inicio = new Date(fichajeActivo.hora_entrada).getTime();

        setHoraInicio(inicio);
        setActivo(true);
        localStorage.setItem("horaInicioFichaje", inicio);
      }
    } catch (error) {
      console.error("Error cargando fichaje activo:", error);
    }
  };

  cargarFichajeActivo();
}, [token]);

  // Actualiza el temporizador
  useEffect(() => {
    if (!activo || !horaInicio) return;

    const actualizarSegundos = () => {
      setSegundos(Math.floor((Date.now() - horaInicio) / 1000));
    };

    intervaloRef.current = setInterval(actualizarSegundos, 1000);
    actualizarSegundos();

    return () => clearInterval(intervaloRef.current);
  }, [activo, horaInicio]);

  // Iniciar fichaje
  const iniciar = async () => {
    const ahora = Date.now();
    setHoraInicio(ahora);
    setActivo(true);
    localStorage.setItem("horaInicioFichaje", ahora);

    try {
      await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/fichaje`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({ horaInicio: ahora }),
      });

      if (refrescarFichajes) refrescarFichajes();
    } catch (error) {
      console.error("Error al iniciar fichaje:", error);
      setActivo(false);
      setHoraInicio(null);
      localStorage.removeItem("horaInicioFichaje");
    }
  };

  // Finalizar fichaje
  const finalizar = async () => {
    const ahora = Date.now();

    try {
      await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/fichaje`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({ horaFin: ahora }),
      });

      if (refrescarFichajes) refrescarFichajes();
    } catch (error) {
      console.error("Error al finalizar fichaje:", error);
    } finally {
      setActivo(false);
      setSegundos(0);
      setHoraInicio(null);
      localStorage.removeItem("horaInicioFichaje");
      clearInterval(intervaloRef.current);
    }
  };

  // Mantener activo si hay fichaje en curso en localStorage
  useEffect(() => {
    if (horaInicio) setActivo(true);
  }, [horaInicio]);

  const formatearTiempo = () => {
    const hrs = Math.floor(segundos / 3600);
    const mins = Math.floor((segundos % 3600) / 60);
    const secs = segundos % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="my-4 text-center">
      <span className="text-center p-2  rounded inline-block text-2xl text-heading font-mono">
        {formatearTiempo()}
      </span>
      <div className="mt-2">
        <button
          onClick={iniciar}
          disabled={activo}
          className="bg-green-600 hover:bg-green-700 text-black py-2 px-4 rounded mr-2 disabled:opacity-50 shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5"
        >
          Iniciar
        </button>
        <button
          onClick={finalizar}
          disabled={!activo}
          className="bg-red-600 hover:bg-red-700 text-black py-2 px-4 rounded disabled:opacity-50 shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5"
        >
          Finalizar
        </button>
      </div>
    </div>
  );
}