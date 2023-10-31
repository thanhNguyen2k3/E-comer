import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      width: {
        layout: '1192px',
    },
    colors: {
        primary: '#6eb89f',
        secondary: '#438E44',
        hot: '#E22D2D',
        content: '#545454',
        sub: '#a5a5a5',
        nav: '#777',
    },
    },
  },
  plugins: [],
}
export default config
