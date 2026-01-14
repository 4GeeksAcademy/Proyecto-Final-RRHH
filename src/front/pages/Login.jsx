import CardInicioSesion from "../components/CardInicioSesion";

export default function Login() {
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
                        <CardInicioSesion />
                    </div>
                </div>
            </div>
        </div>

    )
}