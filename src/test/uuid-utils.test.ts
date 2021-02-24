import { assert } from "chai";
import * as uuid from "uuid";
import UuidUtils from "../utils/UuidUtils";

describe("UUID conversion utilities", () => {

    it("Should convert string UUID to buffer format of length 16", () => {
        let str = UuidUtils.randomStringUuid();
        let bytes = UuidUtils.stringToBuffer(str);
        assert.equal(str, uuid.stringify(bytes));
        assert.lengthOf(bytes, 16);
        assert.instanceOf(bytes, Buffer);
    })

    it("Should convert buffer UUID to valid dashed string format", () => {
        let bytes = UuidUtils.randomBufferUuid();
        let str =  UuidUtils.bufferToString(bytes);
        assert.isTrue(uuid.validate(str));
        assert.isString(str);
        assert.lengthOf(str, 36);
    })

});