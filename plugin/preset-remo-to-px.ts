
import type { Preset } from '@unocss/core'

const remRE = /^-?[\.\d]+rem$/

export default function remToPxPreset(): Preset {

  return {
    name: 'preset-rem-to-px',
    postprocess: (util) => {
      util.entries.forEach((i) => {
        const value = i[1]
        if (value && typeof value === 'string' && remRE.test(value))
          i[1] = `${+value.slice(0, -3) * 4}px`
      })
    },
  }
}
