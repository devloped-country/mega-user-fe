export class Crypto {
  static encrypt(cryptoObj, value) {
    return cryptoObj.AES.encrypt(value, 'Secret Passphrase').toString();
  }
}
