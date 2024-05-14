import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  toEscapedSelector,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'
import { parseColor } from '@unocss/preset-mini'
import { presetKite } from '@lihaochen/unocss-preset'

export default defineConfig({
  presets: [
    presetUno({
      dark: 'media',
    }),
    presetKite(),
    presetAttributify(),
    presetTypography(),
    presetIcons({
      scale: 1.2,
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
  rules: [
    [
      /^border-gradient-(.+)$/,
      ([, c], { theme }) => {
        const color = parseColor(c, theme)
        if (color?.color) {
          return {
            'border-color': 'transparent',
            'background-clip': 'padding-box, border-box',
            'background-origin': 'padding-box, border-box',
            'background-image': `linear-gradient(to right, ${color.color}, ${color.color}), linear-gradient(to right, #00DC82, #1DE0B1, #36E4DA)`,
          }
        }
      },
      { autocomplete: 'border-gradient-$colors' },
    ],
    [
      /^gradient-mask-(l|r)-(.+)$/,
      ([, d, c], { rawSelector, theme }) => {
        const color = parseColor(c, theme)
        if (color?.color) {
          const selector = toEscapedSelector(rawSelector)
          const struct = d === 'l' ? 'before' : 'after'
          return `${selector}:hover${selector}::${struct}{opacity: 0.2;}
          ${selector}::${struct} {
            content: '';
            position: absolute; top: 0; bottom: 0;
            ${d === 'l' ? 'left: 0' : 'right: 0'};
            width: 20%; opacity: 0;
            border-radius: inherit;
            transition: opacity 300ms;
            background: linear-gradient(to ${d === 'l' ? 'right' : 'left'}, ${color.color}, transparent);
          }`
        }
      },
      { autocomplete: 'gradient-mask-(l|r)-$colors' },
    ],
  ],
})
