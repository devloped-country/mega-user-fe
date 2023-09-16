export class Crypto {
  static SHA256(cryptoObj, value) {
    return cryptoObj
      .SHA256(value)
      .words.map((num) => (num >>> 0).toString(16))
      .join('');
  }
}
