import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'purple-0': '#6b6d9d',
        'purple-1': '#5E608B',
        'purple-2': '#515378',
        'purple-3': '#454666',
        'purple-4': '#383953',
        'purple-5': '#2b2c41',
        'purple-gray': '#5e607b',
        'purple-violet': '#897CCC',
        'gray-350': '#B7BCC5',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class',
    }),
    require('autoprefixer'),
  ],
}
export default config
