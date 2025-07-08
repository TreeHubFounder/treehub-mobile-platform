
import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        
        // Lovart AI Enhanced Color System
        'lovart-primary': '#2C5F2D',
        'lovart-primary-light': '#4A7C59',
        'lovart-primary-dark': '#1E4220',
        'lovart-orange': '#FF6700',
        'lovart-orange-light': '#FF8533',
        'lovart-orange-dark': '#CC5200',
        'lovart-neutral': '#71797E',
        'lovart-neutral-light': '#8B9196',
        'lovart-neutral-dark': '#5A6066',
        'lovart-forest': '#2C5F2D',
        'lovart-forest-light': '#4A7C59',
        'lovart-forest-dark': '#1E4220',
        
        // Enhanced TreeHub Professional Color Palette
        primary: {
          50: "#f0f9f1",
          100: "#dcf2de", 
          200: "#bbe5c0",
          300: "#8bd096",
          400: "#55b569",
          500: "#2C5F2D", // Lovart primary green
          600: "#244f26",
          700: "#1e4220",
          800: "#1a361b",
          900: "#162d17",
          DEFAULT: "#2C5F2D",
          foreground: "#ffffff",
        },
        secondary: {
          50: "#fff7ed",
          100: "#ffedd5",
          200: "#fed7aa",
          300: "#fdba74",
          400: "#fb923c",
          500: "#FF6700", // Lovart orange
          600: "#ea580c",
          700: "#c2410c",
          800: "#9a3412",
          900: "#7c2d12",
          DEFAULT: "#FF6700",
          foreground: "#ffffff",
        },
        neutral: {
          50: "#f8f9fa",
          100: "#f1f3f4",
          200: "#e8eaed",
          300: "#dadce0",
          400: "#bdc1c6",
          500: "#71797E", // Lovart neutral
          600: "#5f6368",
          700: "#3c4043",
          800: "#202124",
          900: "#1a1a1a",
          DEFAULT: "#71797E",
        },
        forest: {
          50: "#f0f9f1",
          100: "#dcf2de",
          200: "#bbe5c0",
          300: "#8bd096",
          400: "#55b569",
          500: "#2C5F2D", // Forest green matching primary
          600: "#244f26",
          700: "#1e4220",
          800: "#1a361b",
          900: "#162d17",
        },
        earth: {
          50: "#faf9f7",
          100: "#f3f1ed",
          200: "#e6e0d7",
          300: "#d4cab8",
          400: "#bfaf94",
          500: "#a6936e",
          600: "#927c5c",
          700: "#78654c",
          800: "#635441",
          900: "#524639",
        },
        safety: {
          yellow: "#FDE047",
          orange: "#FB923C",
          red: "#EF4444",
        },
        skill: {
          climber: "#10B981",
          groundwork: "#8B5CF6",
          crane: "#F59E0B",
          phc: "#3B82F6",
          storm: "#EF4444",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        'lovart': '0 4px 6px -1px rgba(44, 95, 45, 0.1), 0 2px 4px -1px rgba(44, 95, 45, 0.06)',
        'lovart-lg': '0 10px 15px -3px rgba(44, 95, 45, 0.1), 0 4px 6px -2px rgba(44, 95, 45, 0.05)',
        'lovart-xl': '0 20px 25px -5px rgba(44, 95, 45, 0.1), 0 10px 10px -5px rgba(44, 95, 45, 0.04)',
        'soft': '0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        'soft-lg': '0 4px 8px 0 rgba(0, 0, 0, 0.12)',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-right": {
          "0%": { opacity: "0", transform: "translateX(20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "slide-up": {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
        "scale-in": {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "pulse-lovart": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.8" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
        "fade-in-up": "fade-in-up 0.6s ease-out",
        "slide-in-right": "slide-in-right 0.6s ease-out",
        "slide-up": "slide-up 0.3s ease-out",
        "scale-in": "scale-in 0.2s ease-out",
        "pulse-lovart": "pulse-lovart 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        display: ["Inter", "system-ui", "sans-serif"],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
      },
      letterSpacing: {
        tighter: '-0.05em',
        tight: '-0.025em',
        normal: '0em',
        wide: '0.025em',
        wider: '0.05em',
        widest: '0.1em',
      },
      lineHeight: {
        3: '.75rem',
        4: '1rem',
        5: '1.25rem',
        6: '1.5rem',
        7: '1.75rem',
        8: '2rem',
        9: '2.25rem',
        10: '2.5rem',
        none: '1',
        tight: '1.25',
        snug: '1.375',
        normal: '1.5',
        relaxed: '1.625',
        loose: '2',
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    function({ addUtilities }: any) {
      const newUtilities = {
        '.text-balance': {
          'text-wrap': 'balance',
        },
        '.text-pretty': {
          'text-wrap': 'pretty',
        },
      }
      addUtilities(newUtilities)
    }
  ],
} satisfies Config

export default config
