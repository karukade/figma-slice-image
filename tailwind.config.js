const spacing = [...Array(100).keys()].reduce((res, i) => {
  res[i + 1] = `${8 * (i + 1)}px`
  return res
}, {})

module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: ["./src/**/*.tsx"],
  theme: {
    spacing,
    extend: {},
  },
  variants: {},
  plugins: [],
}
