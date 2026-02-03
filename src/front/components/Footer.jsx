

export default function Footer() {
  return (
    <div className="flex flex-col">
      {/* Footer */}
      <footer className="bg-neutral-secondary py-4 text-center mt-auto">
        <div className="flex justify-center items-center">
          <a href="/" className="flex items-center">
            <video
              src="public/videoTeamcoreLogo.mp4"
              className="mr-3 h-8 w-8 rounded-full object-cover"
              autoPlay
              loop
              muted
              playsInline
            />

            <div className="flex flex-col items-center">
              <span className="text-xl font-semibold text-black">TeamCore</span>
              <p className="text-xs font-bold text-body lg:text-xs">
                Todo tu equipo, en un solo lugar.
              </p>
            </div>
          </a>
        </div>
        <p className="mt-2 text-gray-600">© 2026 Tu Compañía</p>
      </footer>
    </div>
  );
}