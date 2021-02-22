import * as uuid from "uuid";

class Uuid {
    private stringDashedId: string;
    private stringId: string;
    private bufferedId: Buffer;
    
    constructor() {
        this.stringDashedId = uuid.v4();
        this.stringId = this.stringDashedId.split("-").join("");
        this.bufferedId = Buffer.alloc(16, this.stringId, "hex");
    }

    public getString(): string {
        return this.stringId;
    }

    public getDashedString(): string {
        return this.stringDashedId;
    }

    public getBuffer(): Buffer {
        return this.bufferedId;
    }

}

export default Uuid;