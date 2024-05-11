/** @type {import('tailwindcss').Config} */
import plugin from 'tailwindcss/plugin'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {}
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.flex-center': {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        },
        '.flex-column': {
          display: 'flex',
          flexDirection: 'column'
        },
        '.flex-row': {
          display: 'flex',
          flexDirection: 'row'
        },
        '.flex-center-x': {
          display: 'flex',
          justifyContent: 'center'
        },
        '.flex-center-y': {
          display: 'flex',
          alignItems: 'center'
        },
        '.absolute-center': {
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        },
        '.absolute-center-x': {
          position: 'absolute',
          left: '50%',
          transform: 'translate(-50%, 0)'
        },
        '.absolute-center-y': {
          position: 'absolute',
          top: '50%',
          transform: 'translate(0, -50%)'
        }
      })
    })
  ]
}
