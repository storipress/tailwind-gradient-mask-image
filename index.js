const plugin = require('tailwindcss/plugin')

const CONFIG_KEY = 'gradientMaskImage'
const CLASS_PREFIX = 'gradient-mask'

module.exports = plugin(
  function ({ addUtilities, matchUtilities, theme }) {
    const values = theme(CONFIG_KEY)
    const directions = {
      t: 'to top',
      tr: 'to top right',
      r: 'to right',
      br: 'to bottom right',
      b: 'to bottom',
      bl: 'to bottom left',
      l: 'to left',
      tl: 'to top left',
    }

    matchUtilities(
      Object.fromEntries(
        Object.entries(directions).map(([shorthand, direction]) => [
          `${CLASS_PREFIX}-${shorthand}`,
          (value) => ({
            '-webkit-mask-image': `linear-gradient(${direction}, rgba(0, 0, 0, 1.0) ${value}%, transparent 100%)`,
            maskImage: `linear-gradient(${direction}, rgba(0, 0, 0, 1.0) ${value}%, transparent 100%)`,
          }),
        ])
      ),
      {
        supportsNegativeValues: false,
        values,
      }
    )

    addUtilities({
      [`${CLASS_PREFIX}-none`]: {
        '-webkit-mask-image': 'none',
        maskImage: 'none',
      },
    })
  },
  {
    theme: {
      [CONFIG_KEY]: {
        10: '10',
        20: '20',
        30: '30',
        40: '40',
        50: '50',
        60: '60',
        70: '70',
        80: '80',
        90: '90',
        100: '100',
      },
    },
  }
)
