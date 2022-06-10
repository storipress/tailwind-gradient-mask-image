const test = require('ava').default
const path = require('path')
const postcss = require('postcss')
const tailwindcss = require('tailwindcss')
const gradientMaskImagePlugin = require('..')

function run(config, plugin = tailwindcss) {
  config = {
    ...{ plugins: [gradientMaskImagePlugin], corePlugins: { preflight: false } },
    ...config,
  }

  return postcss(plugin(config)).process('@tailwind utilities', {
    from: `${path.resolve(__filename)}`,
  })
}

test('should add the `gradient-mask-{dir}-{n}` components', async (t) => {
  const config = {
    content: [
      {
        raw: String.raw`<div class="gradient-mask-b-10"></div>`,
      },
    ],
  }

  const result = await run(config)
  t.snapshot(result.css)
})

test('should support dynamic value', async (t) => {
  const config = {
    content: [
      {
        raw: String.raw`<div class="gradient-mask-b-[15]"></div>`,
      },
    ],
  }

  const result = await run(config)
  t.snapshot(result.css)
})
