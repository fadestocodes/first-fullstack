import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
		fontFamily: {
			sans: ['Geist Sans', 'Inter', 'sans-serif']
		},
  		screens: {
  			xs: '475px',
			bigscreen : '2400px',
  			'main-hover': {
  				raw: '(hover: hover)'
  			}
  		},
		animation: {
			jiggle: 'jiggle 0.5s ease-in-out 2', // Runs 1 time
			'delayed-jiggle': 'jiggle 0.5s ease-in-out 1 ',  // 60-second delay
			takeoff: 'takeoff 2s ease-in-out infinite',
			takeoffFlyLand: 'takeoffFlyLand 5s ease-in-out infinite',
			fadeIn: 'fadeIn 0.2s ease-in-out',
		},
		keyframes: {
			jiggle: {
				'0%': { transform: 'rotate(0deg)' },
				'25%': { transform: 'rotate(5deg)' },
				'50%': { transform: 'rotate(-5deg)' },
				'75%': { transform: 'rotate(5deg)' },
				'100%': { transform: 'rotate(0deg)' },
			},
			takeoff: {
				'0%': { transform: 'translate(0, 0) rotate(0deg)' },
				'50%': { transform: 'translate(30px, -20px) rotate(10deg)' },
				'100%': { transform: 'translate(80px, -50px) rotate(15deg)' },
			},
			takeoffFlyLand: {
				'0%': {
				transform: 'translateX(-200px) translateY(0) rotate(0deg)',
				},
				'25%': {
					transform: 'translateX(-100px) translateY(-45px) rotate(30deg)',
				},
				'50%': {
					transform: 'translateX(0) translateY(-45px) rotate(0deg)',
				},
				'75%': {
					transform: 'translateX(100px) translateY(-45px) rotate(-30deg)',
				},
				'100%': {
					transform: 'translateX(200px) translateY(0) rotate(0deg)',
				},
			},
			fadeIn: {
				'0%': { opacity: '0' },
				'100%': { opacity: '1' },
			  },
		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			},
  			brand: {
  				DEFAULT: 'hsl(var(--brand))',
  				foreground: 'hsl(var(--brand-foreground))'
  			},
  			highlight: {
  				DEFAULT: 'hsl(var(--highlight))',
  				foreground: 'hsl(var(--highlight-foreground))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography"), require("tailwind-scrollbar-hide")],
} satisfies Config;
