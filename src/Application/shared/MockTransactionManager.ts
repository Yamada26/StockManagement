export default class MockTransactionManager {
  // eslint-disable-next-line class-methods-use-this
  public async begin<T>(callback: () => Promise<T>) {
    return callback();
  }
}
