/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        verdolaga: {
          principal: '#00843D',
          oscuro: '#005A2B',
          claro: '#00A850',
          fondo: '#F4F6F4',
          suave: '#E8F5E9',
        },
      },
      boxShadow: {
        'verdolaga-suave': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        'verdolaga-elevada': '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
};
