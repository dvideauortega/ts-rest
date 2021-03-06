import * as uuidLib from "uuid";


class Uuid {

    private buffer: Buffer;

    constructor(uuid?: Buffer) {
        if (!uuid) { 
            this.buffer = this.randomBufferUuid();
        } else {
            this.buffer = uuid;
        }
    }

    private randomBufferUuid() {
        const uuidStr= uuidLib.v4();
        const arrayLike: ArrayLike<number> = uuidLib.parse(uuidStr);
        const uint8Array: Uint8Array = new Uint8Array(arrayLike);
        return Buffer.from(uint8Array);
    }

    public asBuffer(): Buffer {
        return this.buffer;
    }

    public asString(): string {
        return uuidLib.stringify(this.buffer);
    }

}

export default Uuid;