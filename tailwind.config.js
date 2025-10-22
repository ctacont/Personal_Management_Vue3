import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans]
      },
      colors: {
        primary: {
          50: '#f2f9ff',
          100: '#e6f1ff',
          200: '#bfdfff',
          300: '#99cdff',
          400: '#4da8ff',
          500: '#007fff',
          600: '#0065cc',
          700: '#004c99',
          800: '#003266',
          900: '#001933'
        },
        accent: '#ff7a59'
      }
    }
  },
  plugins: []
}
