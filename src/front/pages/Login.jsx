import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useState } from "react";
import { useNavigate } from "react-router-dom"

export default function Login() {
    const { dispatch } = useGlobalReducer();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const resp = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/token`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, password})
                }
            );

            if(!resp.ok) throw new Error("Invalid credetials");

            const data = await resp.json();

            localStorage.setItem("jwt-token", data.token);
            dispatch({ type: 'login' });

            navigate("/dashboard");
        }catch(error) {
            console.error(error);
        }
    };

    return (
        <div className="relative min-h-screen overflow-hidden bg-black">

            <div
                className="absolute inset-0 bg-center bg-cover bg-no-repeat opacity-80"
                style={{
                    backgroundImage: "url('https://trello.com/1/cards/6961547834f03e8a22cd95e9/attachments/69615640be59c35fab4ed930/download/Gemini_Generated_Image_ly6h57ly6h57ly6h.png')",
                }}
            />

            <div className="absolute inset-0 animated-circuits" />


            <div className="relative z-10 flex items-center justify-center ">
                <div className=" text-black  p-0 overflow-hidden">

                    <div className="p-3">
                        <div className="min-h-screen flex items-center justify-center bg-neutral-primary-soft">
                            <div className="w-full max-w-sm bg-white opacity-80 p-6 border border-default rounded-base shadow-xs">
                                <form onSubmit={handleSubmit}>
                                    <h5 className="text-xl font-semibold text-heading mb-6">
                                        Inicia Sesion
                                    </h5>

                                    <div className="mb-4">
                                        <label htmlFor="email" className="block mb-2.5 text-sm font-medium text-heading">
                                            Correo Electronico
                                        </label>
                                        <input
                                            type="email"
                                            onChange={e => setEmail(e.target.value)}
                                            id="email"
                                            className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                                            placeholder="example@company.com"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="password" className="block mb-2.5 text-sm font-medium text-heading">
                                            Contraseña
                                        </label>
                                        <input
                                            type="password"
                                            onChange={e => setPassword(e.target.value)}
                                            id="password"
                                            className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                                            placeholder="•••••••••"
                                            required
                                        />
                                    </div>

                                    <div className="flex items-start my-6">
                                        <div className="flex items-center">
                                            <input
                                                id="checkbox-remember"
                                                type="checkbox"
                                                className="w-4 h-4 border border-default-medium rounded-xs bg-neutral-secondary-medium focus:ring-2 focus:ring-brand-soft"
                                            />
                                            <label htmlFor="checkbox-remember" className="ms-2 text-sm font-medium text-heading">
                                                Recuerdame
                                            </label>
                                        </div>

                                    </div>
                                    <Link to="#" className="ms-auto text-sm font-medium text-fg-brand hover:underline">
                                        ¿Olvide Contraseña?
                                    </Link>

                                    <div className="fflex items-center justify-center mb-6">
                                        <button to="/"
                                            type="submit"
                                            className="flex items-center justify-center text-center text-black bg-brand hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium rounded-base text-xl px-4 py-2.5 w-full">
                                            Entrar
                                        </button>
                                    </div>

                                    <div className="text-sm font-medium text-body">
                                        No Tengo Cuenta?{" "}
                                        <Link to="#" className="text-fg-brand hover:underline">
                                            Registrate
                                        </Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}