import Price from './Price';

describe('Price', () => {
  // 正常系
  it('正しい値と通貨コードJPYで有効なPriceを作成する', () => {
    const validAmount = 500;
    const price = new Price({ amount: validAmount, currency: 'JPY' });
    expect(price.amount).toBe(validAmount);
    expect(price.currency).toBe('JPY');
  });

  // 異常系
  it('MIN未満の値でPriceを生成するとエラーを投げる', () => {
    const lessThanMin = Price.MIN - 1;
    expect(() => {
      // eslint-disable-next-line no-new
      new Price({ amount: lessThanMin, currency: 'JPY' });
    }).toThrow(
      `価格は${Price.MIN}円から${Price.MAX}円の間でなければなりません。`,
    );
  });

  it('MAX超の値でPriceを生成するとエラーを投げる', () => {
    const moreThanMax = Price.MAX + 1;
    expect(() => {
      // eslint-disable-next-line no-new
      new Price({ amount: moreThanMax, currency: 'JPY' });
    }).toThrow(
      `価格は${Price.MIN}円から${Price.MAX}円の間でなければなりません。`,
    );
  });
});
