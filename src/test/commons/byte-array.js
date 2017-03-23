import {describe, it} from "mocha";
import {expect} from "chai";

import ByteArray from "../../main/commons/byte-array";

describe("ByteArray", () => {

  describe("#toHexadecimalString", () => {

    it("should convert byte array to hexadecimal string", () => {
      const bytes = [7, 155, 42, 14, 5, 255];
      const hexString = "079b2a0e05ff";
      expect(ByteArray.toHexadecimalString(bytes)).to.equals(hexString);
    });

    it("should throw TypeError if parameter is not an array", () => {
      expect(() => { ByteArray.toHexadecimalString(7); }).to.throw(TypeError);
    });

    it("should throw RangeError if array contains negative integer", () => {
      expect(() => { ByteArray.toHexadecimalString([-5]); })
        .to.throw(RangeError);
    });

    it("should throw RangeError if array contains integer greater than 255",
      () => {
        expect(() => { ByteArray.toHexadecimalString([256]); })
          .to.throw(RangeError);
    });

  });

  describe("#fromHexadecimalString", () => {

    it("should convert hexadecimal string to byte array", () => {
      const string = "079b2a0e05ff";
      const byteArray = [7, 155, 42, 14, 5, 255];
      expect(ByteArray.fromHexadecimalString(string)).to.deep.equals(byteArray);
    });

    it("should throw TypeError if string length is not a multiple of 2", () => {
        const string = "079";
        expect(() => { ByteArray.fromHexadecimalString(string); })
          .to.throw(TypeError);
    });

  });

});
