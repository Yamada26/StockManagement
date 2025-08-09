import ValueObject from 'Domain/models/shared/ValueObject';

type TitleValue = string;
export default class Title extends ValueObject<TitleValue, 'Title'> {
  public static readonly MAX_LENGTH = 1000;

  public static readonly MIN_LENGTH = 1;

  protected validate(): void {
    if (
      this.value.length < Title.MIN_LENGTH ||
      this.value.length > Title.MAX_LENGTH
    ) {
      throw new Error(
        `タイトルは${Title.MIN_LENGTH}文字以上、${Title.MAX_LENGTH}文字以下でなければなりません。`,
      );
    }
  }
}
