import * as uuidLib from "uuid";


class Uuid {

    private buffer: Buffer = Buffer.from(uuidLib.NIL);
    private str: string = uuidLib.NIL;

    constructor(uuid?: Buffer | string) {
        if (!uuid) {
            this.buffer = this.randomBufferUuid();
            this.str = uuidLib.stringify(this.buffer);
        }

        if (uuid instanceof Buffer) {
            this.buffer = uuid;
            this.str = uuidLib.stringify(this.buffer);
        }

        if (typeof uuid === "string") {
            this.str = uuid;
            this.buffer = this.stringToBuffer(uuid);
        }

    }

    private randomBufferUuid() {
        const uuidStr= uuidLib.v4();
        const arrayLike: ArrayLike<number> = uuidLib.parse(uuidStr);
        const uint8Array: Uint8Array = new Uint8Array(arrayLike);
        return Buffer.from(uint8Array);
    }

    private stringToBuffer(uuid: string) {
        const arrayLike: ArrayLike<number> = uuidLib.parse(uuid);
        const uint8Array: Uint8Array = new Uint8Array(arrayLike);
        return Buffer.from(uint8Array);
    }

    public asBuffer(): Buffer {
        return this.buffer;
    }

    public asString(): string {
        return uuidLib.stringify(this.buffer);
    }

    public isValid() {
        return uuidLib.validate(this.str);
    }

}

export default Uuid;