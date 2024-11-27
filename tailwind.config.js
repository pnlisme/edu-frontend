/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        ssm: { max: '786px' }, // Tạo breakpoint cho kích thước <= 640px
      },
      boxShadow: {
        'sidebar': '0 0 10px rgba(0, 0, 0, 0.7);', 
        'main-content': '0 0 10px rgba(0, 0, 0, 0.5);',
        'soft': '0 0 4px rgba(0, 0, 0, 0.5);',
        'bottom': '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
      },
      colors: {
        'primary-sidebar': '#050631;',
        'dark-sidebar': '#1d1f49;',
        'btn-darkmode': '#3C50E0',
        'bg-primary': '#e1ebfe;',
        'dark-bg-primary': '#C9D9FC;',
        'bg-linear': '#a9c0f8;',
        'dark-bg-linear': '#585FE0;',
      }
    },

  },
  plugins: [],
}

