import FloatingInput from "../components/InputForm";
import useGlobalReducer from "../hooks/useGlobalReducer";

export default function CrearHorario() {

    const { store, dispatch } = useGlobalReducer();
    const token = localStorage.getItem("jwt-token");

    function crearHorario(event) {
        event.preventDefault();

        fetch(import.meta.env.VITE_BACKEND_URL + "/api/horario", {
            method: 'POST',
            body: JSON.stringify({
                "name": store.inputNombreHorario,
                "lunes_entrada": store.timeLunesEntrada,
                "lunes_salida": store.timeLunesSalida,
                "martes_entrada": store.timeMartesEntrada,
                "martes_salida": store.timeMartesSalida,
                "miercoles_entrada": store.timeMiercolesEntrada,
                "miercoles_salida": store.timeMiercolesSalida,
                "jueves_entrada": store.timeJuevesEntrada,
                "jueves_salida": store.timeJuevesSalida,
                "viernes_entrada": store.timeViernesEntrada,
                "viernes_salida": store.timeViernesSalida,
                "sabado_entrada": store.timeSabadoEntrada,
                "sabado_salida": store.timeSabadoSalida,
                "domingo_entrada": store.timeDomingoEntrada,
                "domingo_salida": store.timeDomingoSalida
            }),
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        })
            .then(response => response.json())
            .then(data => {
                dispatch({ type: 'crear_horario', payload: { horario: data.horario } });
                window.location.replace("/administracion");
            })
            .catch(error => console.log("Error en crear el horario:", error));
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 via-white to-indigo-50 px-4">
            <form className="w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-neutral-200 p-8 space-y-6" onSubmit={crearHorario}>
                <h2 className="text-3xl font-bold text-neutral-800 text-center">
                    Crear Horario
                </h2>
                <p className="text-sm text-neutral-500 text-center">
                    Completa el formulario para crear un horario
                </p>

                <FloatingInput id="name" label="Nombre" type="text" required onChange={(event) => dispatch({ type: 'set_input_nombre_horario', payload: { inputNombreHorario: event.target.value } })} />

                <div className="grid md:grid-cols-2 gap-6">
                    <FloatingInput id="lunes_entrada" label="Entrada Lunes" type="time" required onChange={(event) => dispatch({ type: 'set_lunes_entrada', payload: { timeLunesEntrada: event.target.value } })} />
                    <FloatingInput id="lunes_salida" label="Salida Lunes" type="time" required onChange={(event) => dispatch({ type: 'set_lunes_salida', payload: { timeLunesSalida: event.target.value } })} />
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                    <FloatingInput id="martes_entrada" label="Entrada Martes" type="time" required onChange={(event) => dispatch({ type: 'set_martes_entrada', payload: { timeMartesEntrada: event.target.value } })} />
                    <FloatingInput id="martes_salida" label="Salida Martes" type="time" required onChange={(event) => dispatch({ type: 'set_martes_salida', payload: { timeMartesSalida: event.target.value } })} />
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                    <FloatingInput id="miercoles_entrada" label="Entrada Miercoles" type="time" required onChange={(event) => dispatch({ type: 'set_miercoles_entrada', payload: { timeMiercolesEntrada: event.target.value } })} />
                    <FloatingInput id="miercoles_salida" label="Salida Miercoles" type="time" required onChange={(event) => dispatch({ type: 'set_miercoles_salida', payload: { timeMiercolesSalida: event.target.value } })} />
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                    <FloatingInput id="jueves_entrada" label="Entrada Jueves" type="time" required onChange={(event) => dispatch({ type: 'set_jueves_entrada', payload: { timeJuevesEntrada: event.target.value } })} />
                    <FloatingInput id="jueves_salida" label="Salida Jueves" type="time" required onChange={(event) => dispatch({ type: 'set_jueves_salida', payload: { timeJuevesSalida: event.target.value } })} />
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                    <FloatingInput id="viernes_entrada" label="Entrada Viernes" type="time" required onChange={(event) => dispatch({ type: 'set_viernes_entrada', payload: { timeViernesEntrada: event.target.value } })} />
                    <FloatingInput id="viernes_salida" label="Salida Viernes" type="time" required onChange={(event) => dispatch({ type: 'set_viernes_salida', payload: { timeViernesSalida: event.target.value } })} />
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                    <FloatingInput id="sabado_entrada" label="Entrada Sábado" type="time" onChange={(event) => dispatch({ type: 'set_sabado_entrada', payload: { timeSabadoEntrada: event.target.value } })} />
                    <FloatingInput id="sabado_salida" label="Salida Sábado" type="time" onChange={(event) => dispatch({ type: 'set_sabado_salida', payload: { timeSabadoSalida: event.target.value } })} />
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                    <FloatingInput id="domingo_entrada" label="Entrada Domingo" type="time" onChange={(event) => dispatch({ type: 'set_domingo_entrada', payload: { timeDomingoEntrada: event.target.value } })} />
                    <FloatingInput id="domingo_salida" label="Salida Domingo" type="time" onChange={(event) => dispatch({ type: 'set_domingo_salida', payload: { timeDomingoSalida: event.target.value } })} />
                </div>
                <button
                    type="submit"
                    className="w-full py-3
              rounded-lg
              bg-blue-600
              text-white
              font-medium
              hover:bg-blue-700
              transition"
                >
                    Crear horario
                </button>
            </form>
        </div>
    )
}