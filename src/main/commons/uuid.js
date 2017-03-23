import ByteArray from "./byte-array";
import Crypto from "crypto";

export default class UUID {

  static random() {
    const bytes = Crypto.randomBytes(16);
    bytes[6] = (bytes[6] & 0x0f) | 0x40;
    bytes[8] = (bytes[8] & 0x3f) | 0x80;
    return new UUID(Array.prototype.slice.call(bytes, 0));
  }

  static fromString(string) {
    const withoutSeparators = string.replace(/-/g, "");
    const bytes = ByteArray.fromHexadecimalString(withoutSeparators);
    return new UUID(bytes);
  }

  constructor(bytes) {

    if (!Array.isArray(bytes)) {
      throw new TypeError();
    }

    if (bytes.length != 16) {
      throw new RangeError();
    }

    bytes.forEach((element, index, array) => {
      if (element < 0 || element > 255) {
        throw new RangeError();
      }
    });

    this._bytes = bytes;
    this._formatted = this._formatBytes(bytes);

    if (this._formatted.charAt(14) !== "4") {
      throw new RangeError();
    }

    const c = this._formatted.charAt(19);

    if (c !== "8" && c !== "9" && c !== "a" && c !== "b") {
      throw new RangeError();
    }

  }

  _formatBytes(bytes) {
    const hex = ByteArray.toHexadecimalString(bytes);
    return hex.substring(0, 8) + "-" +
           hex.substring(8, 12) + "-" +
           hex.substring(12, 16) + "-" +
           hex.substring(16, 20) + "-" +
           hex.substring(20);
  }

  getBytes() {
    return this._bytes;
  }

  toString() {
    return this._formatted;
  }

}
