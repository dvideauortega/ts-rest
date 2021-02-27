import { assert, expect } from "chai";
import * as uuid from "uuid";
import UuidUtils from "../../utils/UuidUtils";

describe("UUID conversion utilities", () => {
    
    describe("Conversion from string to buffer", () => {
        
        it("Should convert valid string UUID to buffer format of length 16", () => {
            let str = UuidUtils.randomStringUuid();
            let bytes = UuidUtils.stringToBuffer(str);
            assert.equal(str, uuid.stringify(bytes));
            assert.lengthOf(bytes, 16);
            assert.instanceOf(bytes, Buffer);
        });

        it("Should throw an error if invalid UUID string is passed", () => {
            let invalidUuid = "aaaa-aaaa-aaaa-aaaa";
            let shouldThrow = () => UuidUtils.stringToBuffer(invalidUuid);
            assert.throws(shouldThrow, TypeError);
        });

        it("Should throw an error if NIL UUID is passed", () => {
            let shouldThrow = () => UuidUtils.stringToBuffer(uuid.NIL);
            assert.throws(shouldThrow, Error);
        });

    })

    describe("Conversion from buffer to string", () => {
        
        it("Should convert buffer UUID to valid dashed string format", () => {
            let bytes = UuidUtils.randomBufferUuid();
            let str =  UuidUtils.bufferToString(bytes);
            assert.isTrue(uuid.validate(str));
            assert.isString(str);
            assert.lengthOf(str, 36);
        })
    
        it("Should throw an error if null is passed", () => {
            let shouldThrow = () => UuidUtils.stringToBuffer("");
            assert.throws(shouldThrow, Error);
        });

        it("Should throw an error if invalid UUID buffer is passed", () => {
            const buffer: Buffer = Buffer.alloc(16, "aaaabbbbccccddddff");
            const shouldThrow = () => UuidUtils.bufferToString(buffer);
            assert.throws(shouldThrow, TypeError);
        });

        it("Should throw if NIL buffer", () => {
            const buffer: Buffer = Buffer.alloc(16);
            const shouldThrow = () => UuidUtils.bufferToString(buffer);
            assert.throws(shouldThrow, "UUID should not be NIL UUID");
        });
    
    })

});