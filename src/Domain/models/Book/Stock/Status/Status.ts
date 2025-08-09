import ValueObject from 'Domain/models/shared/ValueObject';

export enum StatusEnum {
  InStock = 'InStock',
  LowStock = 'LowStock',
  OutOfStock = 'OutOfStock',
}
export type StatusLabel = '在庫あり' | '残りわずか' | '在庫切れ';

type StatusValue = StatusEnum;
export class Status extends ValueObject<StatusValue, 'Status'> {
  protected validate(): void {
    if (!Object.values(StatusEnum).includes(this._value)) {
      throw new Error('無効なステータスです。');
    }
  }

  public toLabel(): StatusLabel {
    switch (this._value) {
      case StatusEnum.InStock:
        return '在庫あり';
      case StatusEnum.LowStock:
        return '残りわずか';
      case StatusEnum.OutOfStock:
        return '在庫切れ';
      default:
        throw new Error('無効なステータスです。');
    }
  }
}
