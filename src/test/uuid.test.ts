import { assert } from 'chai';
import { v4, validate } from 'uuid';
import Uuid from '../entities/Uuid';

describe('UUID', () => {
    
    describe("Empty constructor", () => {
        
        it("Should be be a valid buffered UUID of length 16", () => {
            const id = new Uuid().getBuffer();
            assert.instanceOf(id, Buffer);
            assert.lengthOf(id, 16);
        });

        it("String with dashes should be of length 36 and correctly validated in uuid library", () => {
            const id: string = new Uuid().getString();
            const isValid: boolean = validate(id);
            assert.lengthOf(id, 36);
            assert.isTrue(isValid);
        })
    
    })

    describe("From existing uuid string", () => {

        it("Should transform standard v4 uuid dashed string to binary 16", () => {
            const str: string = v4();
            const uuid: Uuid = new Uuid(str);
            const buffer: Buffer = uuid.getBuffer();
            assert.lengthOf(buffer, 16);
            assert.instanceOf(buffer, Buffer);
        })
    })

});