import React from "react";

export default function Footer() {
	return (

		<div className="flex flex-col min-h-screen">
			
			<nav className="bg-neutral-primary fixed w-full z-20 top-0 border-b border-default">
				
			</nav>

		
			<main className="flex-1 pt-20">
				
				<h1 className="text-2xl text-center mt-10">Contenido Principal</h1>
			</main>

			{/* Footer */}
			<footer className="bg-neutral-secondary py-4 text-center mt-auto">
				© 2026 Tu Compañía
			</footer>
		</div>
	);

}