import FloatingInput from "../components/InputForm.jsx";
import FloatingSelect from "../components/FloatingSelect.jsx";

export default function CrearUsuario() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 via-white to-indigo-50 px-4">
      <form className="w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-neutral-200 p-8 space-y-6">

        <h2 className="text-3xl font-bold text-neutral-800 text-center">
          Crear Usuario
        </h2>
        <p className="text-sm text-neutral-500 text-center">
          Completa el formulario para registrarte
        </p>

        {/* Email */}
        <FloatingInput id="email" label="Correo electrónico" type="email" />

        {/* Passwords */}
        <div className="grid md:grid-cols-2 gap-6">
          <FloatingInput id="password" label="Contraseña" type="password" />
          <FloatingInput id="repeat_password" label="Confirmar contraseña" type="password" />
        </div>

        {/* Name */}
        <div className="grid md:grid-cols-2 gap-6">
          <FloatingInput id="first_name" label="Nombre" />
          <FloatingInput id="last_name" label="Apellidos" />
        </div>

        {/* Extra */}
        <div className="grid md:grid-cols-2 gap-6">
          <FloatingInput id="phone" label="Teléfono" type="tel" />
          <FloatingInput id="dni" label="DNI" />
        </div>

        {/* Selects */}
        <div className="grid md:grid-cols-2 gap-6">
          <FloatingSelect id="horario" label="Horario">
            <option value="">Selecciona horario</option>
            <option value="mañana">Mañana</option>
            <option value="tarde">Tarde</option>
          </FloatingSelect>

          <FloatingSelect id="rol" label="Rol">
            <option value="">Selecciona rol</option>
            <option value="admin">Administrador</option>
            <option value="user">Usuario</option>
          </FloatingSelect>
        </div>

        <div className="grid md:grid-cols-1 gap-6">
          <FloatingSelect id="empresa" label="Empresa">
            <option value="">Selecciona empresa</option>
            <option value="google">Google</option>
            <option value="amazon">Amazon</option>
            <option value="meta">Meta</option>
          </FloatingSelect>
        </div>

        <div className="grid md:grid-cols-1 gap-6">
          {/* File upload */}
          <div className="relative">
            <label className="block text-sm font-medium text-neutral-600 mb-2">
              Foto de Perfil
            </label>
            <input
              type="file"
              className="w-full text-sm text-neutral-700 file:mr-4 pl-3 file:py-2 file:px-4
                         file:rounded-lg file:border-0
                         file:bg-indigo-50 file:text-indigo-700
                         hover:file:bg-indigo-100
                         border border-neutral-300 rounded-xl cursor-pointer"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-sky-500 text-white font-semibold text-lg hover:opacity-90 transition shadow-md"
        >
          Crear cuenta
        </button>
      </form>
    </div>
  );
}
