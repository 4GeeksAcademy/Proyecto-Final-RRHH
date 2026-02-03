

export default function Footer() {
  return (
    <footer className="p-4 text-center mt-auto text-black bg-gray-50">
      <div className="flex justify-center items-center">
        <a href="/" className="flex items-center">
          <img
            src="src/front/assets/img/logo.png"
            className="mr-3 h-8 rounded-full"
            alt="Logo"
          />
          <span className="text-xl font-semibold">TeamCore</span>
        </a>
      </div>
      <p className="mt-2 text-gray-600 text-gray-400">© 2026 Tu Compañía</p>
    </footer>
  );
}
