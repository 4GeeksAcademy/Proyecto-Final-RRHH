

export default function Footer() {
  return (
    <div className="flex flex-col">
      {/* Footer */}
      <footer className="bg-neutral-secondary py-4 text-center mt-auto">
        <div className="flex justify-center items-center">
          <a href="/" className="flex items-center">
            <img
              src="src/front/assets/img/logo.png"
              className="mr-3 h-8 rounded-full"
              alt="Logo"
            />
            <span className="text-xl font-semibold text-black">TeamCore</span>
          </a>
        </div>
        <p className="mt-2 text-gray-600">© 2026 Tu Compañía</p>
      </footer>
    </div>
  );
}