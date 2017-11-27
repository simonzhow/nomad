// Converts a degrees-minutes-seconds representation to decimal
// e.g. [38, 5, 42.86] => 38.095284
export const dmsToDecimal = (dms) => (
  dms.reduce((acc, val, i) => (acc + (val / Math.pow(60, i))), 0)
)
