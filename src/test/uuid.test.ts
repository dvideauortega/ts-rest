import { assert } from 'chai';
import { validate } from 'uuid';
import Uuid from '../entities/Uuid';

describe('UUID', () => {
    
    it("Should be be a valid buffered UUID of length 16", () => {
        const id = new Uuid().getBuffer();
        assert.instanceOf(id, Buffer);
        assert.lengthOf(id, 16);
    });

    it("String without dashes should be of length 32", () => {
        const id: string = new Uuid().getString();
        assert.isString(id);
        assert.lengthOf(id, 32);
    });

    it("String with dashes should be of length 36 and correctly validated in uuid library", () => {
        const id: string = new Uuid().getDashedString();
        const isValid: boolean = validate(id);
        assert.lengthOf(id, 36);
        assert.isTrue(isValid);
    })

});