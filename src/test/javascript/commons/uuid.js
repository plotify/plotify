import { describe, it } from "mocha";
import { expect } from "chai";

import UUID from "../../../main/javascript/commons/uuid";

const exampleBytes = [31, 71, 77, 243,
                      251, 88,
                      66, 93,
                      188, 170,
                      228, 215, 189, 16, 110, 118];
const exampleString = "1f474df3-fb58-425d-bcaa-e4d7bd106e76";

describe("UUID", () => {

  describe("#constructor", () => {

    it("should construct object with given bytes", () => {
      const uuid = new UUID(exampleBytes);
      expect(uuid.getBytes()).to.deep.equals(exampleBytes);
    });

    it("should throw TypeError if parameter is not a byte array", () => {
      expect(() => { new UUID("1f474df3"); }).to.throw(TypeError);
    });

    it("should throw RangeError if byte array contains less than 16 elements",
      () => {
      expect(() => { new UUID([1, 2, 3]); }).to.throw(RangeError);
    });

    it("should throw RangeError if byte array contains more than 16 elements",
      () => {
      const bytes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
      expect(() => { new UUID(bytes); }).to.throw(RangeError);
    });

    it("should throw RangeError if byte array contains invalid element", () => {
      const bytes = exampleBytes.slice(0);
      bytes[0] = 256; // Valid: 0 - 255
      expect(() => { new UUID(bytes); }).to.throw(RangeError);
    });

    it("should throw RangeError if 13. hexadecimal digit is not 4", () => {
      const bytes = exampleBytes.slice(0);
      bytes[6] = 0;
      expect(() => { new UUID(bytes); }).to.throw(RangeError);
    });

    it("should throw RangeError if 17. hexadecimal digit is not [8, 9, a, b]",
      () => {
        const bytes = exampleBytes.slice(0);
        bytes[8] = 0;
        expect(() => { new UUID(bytes); }).to.throw(RangeError);
    });

  });

  describe("#random", () => {

    it("should construct random UUID", () => {
      expect(UUID.random()).to.be.an.instanceof(UUID);
    });

  });

  describe("#fromString", () => {

    it("should construct object with given string", () => {
      const uuid = UUID.fromString(exampleString);
      expect(uuid.getBytes()).to.deep.equals(exampleBytes);
    });

    it("should throw TypeError if parameter is not a string", () => {
      expect(() => { UUID.fromString(123); }).to.throw(TypeError);
    });

  });

  describe("#toString", () => {

    it("should return formatted uuid as string", () => {
      const uuid = new UUID(exampleBytes);
      expect(uuid.toString()).to.equals(exampleString);
    });

  });

});
