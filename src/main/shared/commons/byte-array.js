export default class ByteArray {

  static toHexadecimalString(bytes) {
    return bytes.map((byte) => {

      if (byte < 0 || byte > 255) {
        throw new RangeError();
      }

      const hex = (byte & 0xFF).toString(16);

      if (hex.length === 2) {
        return hex;
      } else {
        return "0" + hex;
      }

    }).join("");
  }

  static fromHexadecimalString(string) {

    if (string.length % 2 !== 0) {
      throw new TypeError();
    }

    const characters = string.match(/.{2}/g);

    return characters.map((character) => {
      return parseInt(character, 16);
    });

  }

}
