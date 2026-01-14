import React from "react";

export default function Footer() {
  return (
    <div className="flex flex-col">
      {/* Footer */}
      <footer className="bg-neutral-secondary py-4 text-center mt-auto">
        <div className="flex justify-center items-center">
          <a href="/" className="flex items-center">
            <img
              src="https://trello.com/1/cards/6961547834f03e8a22cd95e9/attachments/69615640be59c35fab4ed930/download/Gemini_Generated_Image_ly6h57ly6h57ly6h.png"
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