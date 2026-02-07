import React, { useState, useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useNavigate } from "react-router-dom";

export default function EditarPerfil() {
    const { dispatch } = useGlobalReducer();
    const [nombre, setNombre] = useState("");
    const [apellidos, setApellidos] = useState("");
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);

    const token = localStorage.getItem("jwt-token");
    const backend = import.meta.env.VITE_BACKEND_URL;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            if (!token) return;
            try {
                const res = await fetch(`${backend}/api/usuario`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (!res.ok) return;
                const data = await res.json();
                setNombre(data.usuario.nombre || "");
                setApellidos(data.usuario.apellidos || "");
                if (data.usuario.foto_perfil) {
                    setPreview(`${backend}/uploads/${data.usuario.foto_perfil}`);
                }
            } catch (e) {
                console.error(e);
            }
        };
        fetchUser();
    }, [token]);

    useEffect(() => {
        if (!file) return;
        const url = URL.createObjectURL(file);
        setPreview(url);
        return () => URL.revokeObjectURL(url);
    }, [file]);

    const handleFile = (e) => {
        const f = e.target.files[0];
        if (f) setFile(f);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        if (!token) return;
        setLoading(true);
        setMessage(null);

        try {
            // Update basic data
            const res = await fetch(`${backend}/api/usuario`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ nombre, apellidos }),
            });

            if (!res.ok) throw new Error("Error actualizando usuario");

            const updated = await res.json();

            // If there's a file, upload it
            if (file) {
                const form = new FormData();
                form.append("file", file);
                const respFile = await fetch(`${backend}/api/usuario/photo`, {
                    method: "POST",
                    headers: { Authorization: `Bearer ${token}` },
                    body: form,
                });
                if (!respFile.ok) throw new Error("Error subiendo foto");
                const dataFile = await respFile.json();
                updated.usuario.foto_perfil = dataFile.foto_perfil;
            }

            // Emitir evento para que Navbar se actualice
            window.dispatchEvent(new CustomEvent("user-updated", { detail: updated.usuario }));

            setMessage("Perfil actualizado correctamente");
            setLoading(false);
            // opcional: navegar al dashboard
            // navigate('/');
        } catch (err) {
            console.error(err);
            setMessage(err.message || "Error");
            setLoading(false);
        }
    };

    return (
        <section className="p-6 max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Editar perfil</h1>
            <form onSubmit={handleSave} className="bg-white p-6 rounded-xl shadow">
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Nombre</label>
                    <input value={nombre} onChange={(e) => setNombre(e.target.value)} className="w-full border px-3 py-2 rounded" />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Apellidos</label>
                    <input value={apellidos} onChange={(e) => setApellidos(e.target.value)} className="w-full border px-3 py-2 rounded" />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Foto de perfil</label>
                    {preview ? (
                        <img src={preview} alt="preview" className="w-24 h-24 rounded-full object-cover mb-2" />
                    ) : (
                        <div className="w-24 h-24 rounded-full bg-gray-200 mb-2 flex items-center justify-center">Iniciales</div>
                    )}
                    <input type="file" accept="image/*" onChange={handleFile} />
                </div>

                {message && <p className="mb-3 text-sm text-green-600">{message}</p>}

                <div className="flex gap-3">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded" type="submit" disabled={loading}>{loading ? 'Guardando...' : 'Guardar'}</button>
                    <button onClick={() => navigate(-1)} type="button" className="px-4 py-2 bg-gray-200 rounded">Cancelar</button>
                </div>
            </form>
        </section>
    );
}
