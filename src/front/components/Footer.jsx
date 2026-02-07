

export default function Footer() {
  return (
    <div className="flex flex-col">
      {/* Footer */}
      <footer className="bg-neutral-secondary dark:bg-gray-900 py-4 text-center mt-auto border-t border-gray-200 dark:border-gray-700">
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
              <span className="text-xl font-semibold text-black dark:text-white">TeamCore</span>
              <p className="text-xs font-bold text-body dark:text-gray-400 lg:text-xs">
                Todo tu equipo, en un solo lugar.
              </p>
            </div>
          </a>
        </div>
        <p className="mt-2 text-gray-600 dark:text-gray-400">© 2026 Tu Compañía</p>
      </footer>
    </div>
  );
}