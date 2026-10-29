import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-verdolaga-oscuro text-white/90 py-8 px-4 sm:px-6 lg:px-8 mt-auto border-t border-verdolaga-principal">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div>
          <h2 className="text-lg font-bold text-white">Tienda Verdolaga</h2>
          <p className="text-xs text-emerald-200 mt-1">
            Proyecto Académico · Desarrollo Web — Universidad de Medellín
          </p>
        </div>
        <p className="text-xs text-white/70">
          © {new Date().getFullYear()} Tienda Verdolaga. Tienda temática independiente inspirada en el club Atlético Nacional.
        </p>
      </div>
    </footer>
  );
};
