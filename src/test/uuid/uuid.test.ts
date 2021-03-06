import { assert } from "chai";
import * as uuidLib from "uuid";
import Uuid from "../../entities/Uuid"

describe.only("UUID entity tests", () => {

    describe("Random UUID generation", () => {

        it("Should create a random V4 uuid with buffer representation", () => {
            const uuid = new Uuid();
            assert.instanceOf(uuid.asBuffer(), Buffer);
            assert.lengthOf(uuid.asBuffer(), 16);
        })

        it("Should create a random V4 uuid with buffer representation", () => {
            const uuid = new Uuid();
            assert.isString(uuid.asString());
            assert.lengthOf(uuid.asString(), 36);
        })

    })

    describe("String overloaded constructor UUID generation", () => {

        it("Should create both buffer and string representation using overloaded constructor with string UUID", () => {
            const generated: string = uuidLib.v4();
            const uuid = new Uuid(generated);
            assert.isString(uuid.asString());
            assert.lengthOf(uuid.asString(), 36);
            assert.equal(uuid.asString(), generated);
            assert.instanceOf(uuid.asBuffer(), Buffer);
            assert.lengthOf(uuid.asBuffer(), 16);
        })

        it("Should create both buffer and string representation using overloaded constructor with buffer UUID", () => {
            // Generate buffer uuid using library
            const strUuid: string = uuidLib.v4();
            const arrayLike: ArrayLike<number> = uuidLib.parse(strUuid);
            const uintArray: Uint8Array = new Uint8Array(arrayLike);
            const buffer = Buffer.from(uintArray);

            // Use entity to generate string representation

            const uuid = new Uuid(buffer);
            assert.isString(uuid.asString());
            assert.lengthOf(uuid.asString(), 36);
            assert.equal(uuid.asString(), strUuid);
            assert.instanceOf(uuid.asBuffer(), Buffer);
            assert.lengthOf(uuid.asBuffer(), 16);
            assert.equal(uuid.asBuffer(), buffer);
            
        })

    })
})