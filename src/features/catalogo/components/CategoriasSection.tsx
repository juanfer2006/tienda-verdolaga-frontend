import React from 'react';

const CATEGORIAS = [
  {
    titulo: 'Camisetas',
    descripcion: 'Diseños clásicos, alternativos, retro y ediciones conmemorativas para coleccionistas.',
    icono: '👕',
  },
  {
    titulo: 'Accesorios',
    descripcion: 'Gorras, bufandas de estadio, termos, billeteras y complementos verdolagas.',
    icono: '🧢',
  },
  {
    titulo: 'Coleccionables',
    descripcion: 'Balones dorados, posters retro, réplicas de trofeos y placas decorativas históricas.',
    icono: '🏆',
  },
];

export const CategoriasSection: React.FC = () => {
  return (
    <section id="categorias" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
      <div className="max-w-2xl mx-auto mb-10">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-verdolaga-oscuro">
          Categorías de Productos
        </h2>
        <p className="text-sm sm:text-base text-gray-600 mt-2">
          Explora nuestras líneas temáticas diseñadas especialmente para la hinchada verdolaga.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
        {CATEGORIAS.map((cat) => (
          <article
            key={cat.titulo}
            className="p-6 bg-white rounded-xl border border-gray-200 border-t-4 border-t-verdolaga-principal shadow-verdolaga-suave hover:shadow-verdolaga-elevada hover:-translate-y-1 transition-all duration-200"
          >
            <div className="text-3xl mb-3">{cat.icono}</div>
            <h3 className="text-lg font-bold text-verdolaga-oscuro mb-2">{cat.titulo}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{cat.descripcion}</p>
          </article>
        ))}
      </div>
    </section>
  );
};
