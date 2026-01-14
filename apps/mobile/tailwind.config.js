/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        background: 'rgb(var(--background) / <alpha-value>)',
        foreground: 'rgb(var(--foreground) / <alpha-value>)',
        primary: {
          300: 'rgb(var(--primary-300) / <alpha-value>)', // lighter
          400: 'rgb(var(--primary-400) / <alpha-value>)', // light
          DEFAULT: 'rgb(var(--primary) / <alpha-value>)', // dark
          600: 'rgb(var(--primary-600) / <alpha-value>)', // darker
          700: 'rgb(var(--primary-700) / <alpha-value>)', // darkest
          foreground: 'rgb(var(--primary-foreground) / <alpha-value>)',
        },
        muted: {
          DEFAULT: 'rgb(var(--muted) / <alpha-value>)',
          foreground: 'rgb(var(--muted-foreground) / <alpha-value>)',
        },
        border: {
          DEFAULT: 'rgb(var(--border) / <alpha-value>)',
          focus: 'rgb(var(--border-focus) / <alpha-value>)',
          hover: 'rgb(var(--border-hover) / <alpha-value>)',
        },
        // accent colors
        warning: 'rgb(var(--warning) / <alpha-value>)',
        destructive: 'rgb(var(--destructive) / <alpha-value>)',
        success: 'rgb(var(--success) / <alpha-value>)',
        info: 'rgb(var(--info) / <alpha-value>)',
      },
    },
    animation: {
      'fade-in': 'cubic-bezier(0.4, 0, 1, 1) 0.3s forwards',
      pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
    },
  },
  plugins: [],
};
