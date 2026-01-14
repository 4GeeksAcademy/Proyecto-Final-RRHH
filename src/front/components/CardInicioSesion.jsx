import React from "react";
import { Link } from "react-router-dom";

export default function CardInicioSesion({ email, password, to }) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-neutral-primary-soft">
            <div className="w-full max-w-sm bg-white opacity-80 p-6 border border-default rounded-base shadow-xs">
                <form>
                    <h5 className="text-xl font-semibold text-heading mb-6">
                        Inicia Sesion
                    </h5>

                    <div className="mb-4">
                        <label htmlFor="email" className="block mb-2.5 text-sm font-medium text-heading">
                            Correo Electronico
                        </label>
                        <input

                            type="email"
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
                     <Link to="/"
                        type="submit"
                        className="flex items-center justify-center text-center text-black bg-brand hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium rounded-base text-xl px-4 py-2.5 w-full">
                        Entrar
                    </Link>
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
    )
}