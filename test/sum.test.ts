const sum = require('../controllers/sum')

describe('modulo de suma',() => {
  test('suma 1 + 2 es igual a 3', () => {
    expect(sum(1,2)).toBe(3)
  })
})

