import { useEffect, useState } from "react";



export default function Fichaje() {
  const [fichajes, setFichajes] = useState([]);
  const [usuario, setUsuario] = useState(null);
  const token = localStorage.getItem("jwt-token");
 

  // Cargar fichajes del usuario
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

  

  const agruparFichajesPorDia = (fichajes) => {
    const agrupados = {};

    fichajes.forEach((f) => {
      // Obtenemos solo la fecha sin la hora
      const fecha = new Date(f.hora_entrada || f.hora_salida)
        .toLocaleDateString();

      if (!agrupados[fecha]) agrupados[fecha] = [];
      agrupados[fecha].push(f);
    });

    return agrupados;
  };

  // Cargar datos del usuario
  const cargarUsuario = async () => {
    if (!token) return;

    try {
      const res = await fetch(
        import.meta.env.VITE_BACKEND_URL + "/api/usuario",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      if (!res.ok) throw new Error("Error al cargar usuario");

      const data = await res.json();
      setUsuario(data.usuario); // Ajusta según la respuesta de tu backend
    } catch (error) {
      console.error("Error cargando usuario:", error);
    }
  };

  // Función para fichar
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

  // Cargar datos al montar el componente
  useEffect(() => {
    cargarFichajes();
    cargarUsuario();
  }, [token]);

  return (
    <section className="p-4 md:p-8 bg-white">

      


      <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
        <table className="w-full text-sm text-left text-body">
          <thead className="text-sm bg-neutral-secondary-medium border-b border-t">
            <tr>
              <th className="px-6 py-3 text-left">Nombre</th>
              <th className="px-6 py-3 text-left">Rol</th>
              <th className="px-6 py-3 text-left">Fecha</th>
              <th className="px-6 py-3 text-left">Entrada</th>
              <th className="px-6 py-3 text-left">Salida</th>
            </tr>
          </thead>

          <tbody>
            {fichajes.length > 0 ? (
              fichajes.map((f) => (
                <tr key={f.id} className="border-b hover:bg-neutral-secondary-medium">
                  {/* Nombre */}
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-semibold">{usuario?.nombre || "Cargando..."}</span>
                      <span className="text-sm text-body">{usuario?.email || "Cargando..."}</span>
                    </div>
                  </td>

                  {/* Rol */}
                  <td className="px-6 py-4">{usuario?.puesto || "—"}</td>

                  {/* Fecha */}
                  <td className="px-6 py-4">
                    {f.hora_entrada
                      ? new Date(f.hora_entrada).toLocaleDateString()
                      : "—"}
                  </td>

                  {/* Entrada */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="h-2.5 w-2.5 rounded-full bg-success"></div>
                      <span>
                        {f.hora_entrada
                          ? new Date(f.hora_entrada).toLocaleTimeString()
                          : "—"}
                      </span>
                    </div>
                  </td>

                  {/* Salida */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="h-2.5 w-2.5 rounded-full bg-danger"></div>
                      <span>
                        {f.hora_salida
                          ? new Date(f.hora_salida).toLocaleTimeString()
                          : "—"}
                      </span>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center">
                  No hay fichajes todavía
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="">

        <div className="flex justify-center mt-4 space-x-2">
          <a
            href="#"
            className="text-body bg-neutral-secondary-medium border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading shadow-xs font-medium leading-5 rounded-base text-sm px-3 py-2 focus:outline-none"
          >
            Anterior
          </a>

          <a
            href="#"
            className="text-body bg-neutral-secondary-medium border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading shadow-xs font-medium leading-5 rounded-base text-sm px-3 py-2 focus:outline-none"
          >
            Siguiente
          </a>
        </div>
      </div>
    </section>
  );
}