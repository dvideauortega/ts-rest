import * as uuid from "uuid";
import InvalidUuidError from "../errors/InvalidUuid.error";

class UuidUtils {

    public static stringToBuffer(uuidString: string): Buffer {
        
        if (!uuidString) throw new Error("UUID string is required.");
        if (uuidString == uuid.NIL) throw new Error("UUID should not be NIL UUID");
        
        let bytesArray: ArrayLike<number> = uuid.parse(uuidString); // throws TypeError if invalid uuid is passed
        let uintArray: Uint8Array = new Uint8Array(bytesArray);
        return Buffer.from(uintArray);
    }

    public static bufferToString(uuidBuffer: Buffer) {
        
        let str = uuid.stringify(uuidBuffer);
        
        if (!uuidBuffer) throw new Error("UUID buffer is required");
        if (str == uuid.NIL) throw new Error("UUID should not be NIL UUID");
        
        return str;
    }

    public static randomStringUuid(): string {
        return uuid.v4();
    }

    public static randomBufferUuid(): Buffer {
        let str: string = uuid.v4();
        return UuidUtils.stringToBuffer(str);
    }

}

export default UuidUtils;