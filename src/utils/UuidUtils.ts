import * as uuid from "uuid";

class UuidUtils {

    public static stringToBuffer(uuidString: string): Buffer {
        
        if (!uuidString || !uuid.validate(uuidString)) 
            throw new Error("UUID string is required.");
        
        let bytesArray: ArrayLike<number> = uuid.parse(uuidString);
        let uintArray: Uint8Array = new Uint8Array(bytesArray);
        
        return Buffer.from(uintArray);
    }

    public static bufferToString(uuidBuffer: Buffer) {

        if (!uuidBuffer)
            throw new Error("UUID buffer is required");
        
        return uuid.stringify(uuidBuffer);
    }

    public static randomStringUuid(): string {
        return uuid.v4();
    }

    public static randomBufferUuid(): Buffer {
        let str: string = uuid.v4();
        let arrayLike: ArrayLike<number> = uuid.parse(str);
        let uintArray: Uint8Array = new Uint8Array(arrayLike);
        return Buffer.from(uintArray);
    }

}

export default UuidUtils;