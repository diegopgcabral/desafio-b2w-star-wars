function sum(number1, number2) {
  return number1 + number2;
}

describe('Exemplo teste', () => {
  it('should be return 4 when put 2 and 2', () => {
    expect(sum(2, 2)).toBe(4);
  });
});
