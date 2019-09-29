const ceasar = str => {
  const decoded = {
    a: 'n',
    b: 'o',
    c: 'p',
    d: 'q',
    e: 'r',
    f: 's',
    g: 't',
    h: 'u',
    i: 'v',
    j: 'w',
    k: 'x',
    l: 'y',
    m: 'z',
    n: 'a',
    o: 'b',
    p: 'c',
    q: 'd',
    r: 'e',
    s: 'f',
    t: 'g',
    u: 'h',
    v: 'i',
    w: 'j',
    x: 'k',
    y: 'l',
    z: 'm',
    ' ': ' ',
    '-': '-',
    '.': '.',
    ',': ',',
    ':': ':',
    '/': '/',
    '!': '!',
    '"': '"',
    '\n': '\n'
  }

  // convert the string to lowercase
  str = str.toLowerCase()

  // decipher the code
  let decipher = ''
  for (let i = 0; i < str.length; i++) {
    decipher += decoded[str[i]]
  }

  // return the output
  return decipher
}

module.exports = ceasar
