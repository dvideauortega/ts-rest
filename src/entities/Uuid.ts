import * as uuid from "uuid";

class Uuid {
    
    private stringId: string = "";
    private bufferedId: Buffer = Buffer.alloc(16);
    
    constructor(uid?: string | Buffer) {
        
        if (!uid) {
            this.stringId = uuid.v4();
            this.bufferedId = this.stringToBuffer(this.stringId);
        }

        if (uid instanceof Buffer) {
            this.bufferedId = uid;
            this.stringId = this.bufferToString(uid);
        } 
        
        if (typeof uid === "string") {
            this.stringId = uid;
            this.bufferedId = this.stringToBuffer(uid); 
        }
        
    }

    private stringToBuffer(uuidString: string): Buffer {
        
        if (!uuid.validate(uuidString)) 
            throw new Error("Invalid UUID string.");
        
        let bytesArray: ArrayLike<number> | Uint8Array = uuid.parse(uuidString);
        let uintArray: Uint8Array = new Uint8Array(bytesArray);
        
        return Buffer.from(uintArray.buffer);
    }

    private bufferToString(uuidBuffer: Buffer) {
        let uidString = uuid.stringify(uuidBuffer);
        if (uuid.validate(uidString)) return uidString;
        else throw new Error("Invalid UUID buffer.");
    }

    public getString(): string {
        return this.stringId;
    }

    public getBuffer(): Buffer {
        return this.bufferedId;
    }

}

export default Uuid;