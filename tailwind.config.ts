import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				'din': ['DIN Next', 'sans-serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
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
				// Semantic color system
				success: {
					50: '142 76% 96%',
					100: '142 69% 90%', 
					200: '142 64% 82%',
					300: '142 69% 68%',
					400: '142 76% 53%',
					500: '142 76% 45%',
					600: '142 72% 36%',
					700: '142 64% 29%',
					800: '142 53% 24%',
					900: '142 47% 20%',
					DEFAULT: 'hsl(142 76% 45%)',
					foreground: 'hsl(142 76% 96%)'
				},
				warning: {
					50: '54 92% 95%',
					100: '54 96% 88%',
					200: '53 98% 77%',
					300: '50 98% 64%',
					400: '47 96% 53%',
					500: '45 93% 47%',
					600: '42 87% 40%',
					700: '37 81% 32%',
					800: '35 77% 27%',
					900: '33 73% 23%',
					DEFAULT: 'hsl(45 93% 47%)',
					foreground: 'hsl(54 92% 95%)'
				},
				error: {
					50: '0 86% 97%',
					100: '0 93% 94%',
					200: '0 96% 89%',
					300: '0 94% 82%',
					400: '0 91% 71%',
					500: '0 84% 60%',
					600: '0 72% 51%',
					700: '0 74% 42%',
					800: '0 70% 35%',
					900: '0 63% 31%',
					DEFAULT: 'hsl(0 84% 60%)',
					foreground: 'hsl(0 86% 97%)'
				},
				// Blue-purple brand colors
				monday: {
					blue: 'hsl(240 100% 70%)',
					'blue-light': 'hsl(240 100% 75%)',
					'blue-dark': 'hsl(245 83% 68%)',
					purple: 'hsl(245 83% 68%)',
					'purple-light': 'hsl(245 83% 75%)',
					'purple-dark': 'hsl(248 56% 58%)',
					gray: {
						50: 'hsl(220 15% 97%)',
						100: 'hsl(220 15% 95%)',
						200: 'hsl(220 13% 91%)',
						300: 'hsl(220 13% 85%)',
						400: 'hsl(220 10% 60%)',
						500: 'hsl(220 10% 50%)',
						600: 'hsl(220 15% 40%)',
						700: 'hsl(220 15% 30%)',
						800: 'hsl(220 15% 20%)',
						900: 'hsl(220 15% 15%)',
					}
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'scale-in': {
					'0%': {
						transform: 'scale(0.95)',
						opacity: '0'
					},
					'100%': {
						transform: 'scale(1)',
						opacity: '1'
					}
				},
				'bounce-gentle': {
					'0%, 100%': {
						transform: 'translateY(-2%)',
						'animation-timing-function': 'cubic-bezier(0.8, 0, 1, 1)'
					},
					'50%': {
						transform: 'translateY(0)',
						'animation-timing-function': 'cubic-bezier(0, 0, 0.2, 1)'
					}
				},
				'pulse-blue': {
					'0%, 100%': {
						'box-shadow': '0 0 0 0 rgba(108, 108, 255, 0.7)'
					},
					'50%': {
						'box-shadow': '0 0 0 10px rgba(108, 108, 255, 0)'
					}
				},
				'float': {
					'0%, 100%': {
						transform: 'translateY(0px)'
					},
					'50%': {
						transform: 'translateY(-8px)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.3s ease-out',
				'scale-in': 'scale-in 0.2s ease-out',
				'bounce-gentle': 'bounce-gentle 1s infinite',
				'pulse-blue': 'pulse-blue 2s infinite',
				'float': 'float 3s ease-in-out infinite'
			},
			boxShadow: {
				'monday': '0 4px 20px rgba(108, 108, 255, 0.15)',
				'monday-hover': '0 8px 25px rgba(108, 108, 255, 0.25)',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
