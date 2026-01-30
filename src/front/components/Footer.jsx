export default function Footer({ darkMode = false }) {
  return (
    <footer className={`p-4 text-center mt-auto ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
      <div className="flex justify-center items-center">
        <a href="/" className="flex items-center">
          <img
            src="/assets/logo.png"
            className="mr-3 h-8 rounded-full"
            alt="Logo"
          />
          <span className="text-xl font-semibold">TeamCore</span>
        </a>
      </div>
      <p className={`mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>© 2026 Tu Compañía</p>
    </footer>
  );
}