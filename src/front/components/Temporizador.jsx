import { useEffect, useState } from "react";

export default function TemporizadorFichaje() {
  const [segundos, setSegundos] = useState(0);
  const [activo, setActivo] = useState(false);
  const [pausado, setPausado] = useState(false);

 
  useEffect(() => {
    let intervalo = null;

    if (activo && !pausado) {
      intervalo = setInterval(() => {
        setSegundos((prev) => prev + 1);
      }, 1000);
    }

    return () => clearInterval(intervalo);
  }, [activo, pausado]);

  
  const iniciar = () => {
    setActivo(true);
    setPausado(false);
  };

 
  const pausar = () => {
    setPausado(true);
  };

  
  const reanudar = () => {
    setPausado(false);
  };

 
  const finalizar = () => {
    setActivo(false);
    setPausado(false);

   
    console.log("Tiempo trabajado (segundos):", segundos);

   
    setSegundos(0);
  };

  
  const formatearTiempo = () => {
    const hrs = Math.floor(segundos / 3600);
    const mins = Math.floor((segundos % 3600) / 60);
    const secs = segundos % 60;

    return `${hrs.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="max-w-xs mx-auto rounded-xl shadow p-4 w-full text-center">

      <label className="block mb-2 text-sm font-medium text-heading">
      </label>

      
      <div className="relative mb-4">
        <div className="absolute inset-y-0 end-0 flex items-center pe-3.5 pointer-events-none">
          <svg className="w-4 h-4 text-body" viewBox="0 0 24 24" fill="none">
            <path
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </div>

        <input
          type="text"
          value={formatearTiempo()}
          disabled
          className="block w-full p-2.5  text-heading text-sm rounded-base shadow-xs text-center"
        />
      </div>

      
      <div className="flex gap-2 justify-between">

        {!activo && (
          <button
            onClick={iniciar}
            className="w-full bg-green-600 hover:bg-green-700 text-white text-sm font-medium py-2 rounded-lg"
          >
            Iniciar
          </button>
        )}

        {activo && !pausado && (
          <button
            onClick={pausar}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-medium py-2 rounded-lg"
          >
            Pausar
          </button>
        )}

        {activo && pausado && (
          <button
            onClick={reanudar}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 rounded-lg"
          >
            Reanudar
          </button>
        )}

        {activo && (
          <button
            onClick={finalizar}
            className="w-full bg-red-600 hover:bg-red-700 text-white text-sm font-medium py-2 rounded-lg"
          >
            Finalizar
          </button>
        )}

      </div>
    </div>
  );
}
