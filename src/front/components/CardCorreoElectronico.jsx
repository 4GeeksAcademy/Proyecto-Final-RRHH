import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useEffect, useState } from "react";

export default function CardCorreoElectronico() {

    const [user, setUser] = useState(null);
    const [userOpen, setUserOpen] = useState(false);
    const [empresa, setEmpresa] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("jwt-token");
        if (!token) return;

        const fetchData = async () => {
            try {
                const respUser = await fetch(
                    import.meta.env.VITE_BACKEND_URL + "/api/usuario",
                    { headers: { Authorization: "Bearer " + token } }
                );

                const userData = await respUser.json();
                setUser(userData.usuario);

                const respEmpresa = await fetch(
                    import.meta.env.VITE_BACKEND_URL + "/api/empresa",
                    { headers: { Authorization: "Bearer " + token } }
                );

                const empresaData = await respEmpresa.json();
                setEmpresa(empresaData.empresa);

            } catch (err) {
                console.error(err);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="bg-white  -w-lg p-15 max-h-m border border-default rounded-base shadow-xs">

            <h1 className="mb-4 text-2xl font-bold tracking-tight text-center md:text-5xl lg:text-4xl">​Bienvenido/a  {user ? `${user.nombre} ${user.apellidos}` : "..."}
                <br /> 🎉ya formas parte de nuestro equipo🎉​</h1>



            <a href="#">
                <img
                    src={empresa?.videoBienvenida || "/docs/assets/teamcoreLogo2.png"}
                    className="w-90 h-90 rounded-lg object-cover mx-auto"
                    autoPlay
                    loop
                    muted
                    playsInline
                />
            </a>
        
            <br />
            <br />
            <p className="text-center text-m w-150 mx-auto leading-relaxed mb-6">
                <span className="inline-block  border-black pb-1">
                    Estamos muy felices de que te unas a nuestro equipo.

                </span>

                <br />

                <span className="inline-block  pb-1">
                    En <span className="font-bold">{empresa?.nombre}</span> valoramos las ideas, el compromiso y las personas que hacen que las cosas sucedan.
                    Aquí encontrarás un equipo dispuesto a apoyarte, aprender contigo y celebrar cada logro en el camino.
                </span>

                <br />

                <span className="inline-block border-b-2 border-black pb-1">
                    Esta es una nueva etapa, y estamos seguros de que tu aporte será clave para seguir construyendo grandes cosas juntos.
                    ¡Gracias por sumarte, nos encanta tenerte aquí! 🚀
                </span>
            </p>
            <div className=" text-blue-600 underline font-bold text-start text-m w-150 mx-auto leading-relaxed mb-6">
                <Link to={"/login"}> Acceso a {empresa?.nombre}</Link>
            </div>
            <div className="text-center text-m w-150 mx-auto leading-relaxed mb-6 ">
                <span className="text-blue-600">Usuario:</span>
                <p>{user?.email}</p>
                <br />
                <span className="text-blue-600">contraseña:</span>
                <p>1234</p>
            </div>
            <p className="text-center text-m w-150 mx-auto leading-relaxed mb-6">
                Para cambiar tu contraseña podrás hacerlo tal y como te indicamos aquí.
                <br />
                <br />

                Por favor, no olvides que debes acceder siempre desde la <Link to={"/login"} className="underline text-blue-600">URL indicada en este email.</Link>
                <br />
                <br />
                <span className="text-red-600">IMPORTANTE:</span> Es obligatorio generar una nueva contraseña por motivos de seguridad. <br/> <br/>Gracias😊
            </p>
            <div className="text-2xl font-bold tracking-tight text-center md:text-5xl lg:text-4xl text-center text-m w-150 mx-auto leading-relaxed mb-6 border-b-2 border-black pb-1">
               <p>{empresa?.nombre}</p> 
            </div>
        </div>
    )
}