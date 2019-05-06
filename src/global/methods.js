export default {

  getFeet (length) {
    return Math.floor(length / 12)
  },

  getInches (length) {
    return Math.floor(length % 12)
  },

  getFraction (length) {
    let decimal = (length % 12) % 1
    let numerator = decimal * 16
    let denominator = 16

    for (let i = 0; i < 3; i++) {
      if (numerator % 2 == 0) {
        numerator /= 2
        denominator /= 2
      } else {
        break;
      }
    }

    if (numerator > 0) return `${numerator}/${denominator}`
    else return null

  },

  getNumerator (length) {
    let decimal = (length % 12) % 1
    let numerator = decimal * 16
    let denominator = 16

    for (let i = 0; i < 3; i++) {
      if (numerator % 2 == 0) {
        numerator /= 2
        denominator /= 2
      } else {
        break;
      }
    }

    if (numerator > 0) return numerator
    else return null
  },

  getDenominator (length) {
    let decimal = (length % 12) % 1
    let numerator = decimal * 16
    let denominator = 16

    for (let i = 0; i < 3; i++) {
      if (numerator % 2 == 0) {
        numerator /= 2
        denominator /= 2
      } else {
        break;
      }
    }

    if (numerator > 0) return denominator
    else return null
  },

  getSequences (number) {
    let sequences = []
    for (var i = 0; i < parseFloat(number); i++) {
      sequences.push(i + 1)
    }
    return sequences
  }

}
