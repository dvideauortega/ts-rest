import { assert } from "chai";
import * as uuid from "uuid";
import UserDTO from "../../entities/dto/UserDTO";
import User from "../../entities/User"
import UuidUtils from "../../utils/UuidUtils";

describe("Creation of UserDTO object", () => {

    describe("fromUser function", () => {

        it("Should convert a user with valid fields", () => {
            let bufferId = UuidUtils.randomBufferUuid();
            let stringId = UuidUtils.bufferToString(bufferId); 
            let user = new User("test", "test", bufferId);
            let dto = UserDTO.fromUser(user);
            assert.equal(dto.getUsername(), user.getUsername());
            assert.equal(dto.getId(), stringId);
        })

    });

    describe("UserDTO construction", () => {
        
        it("Should throw an error when trying to create a DTO with empty fields", () => {
            let fn = () => new UserDTO("", "");
            assert.throws(fn, Error, "Neither ID nor username can be empty");
        })
    
        it("Should throw an error when trying to create a DTO with empty username", () => {
            let id: string = UuidUtils.randomStringUuid();
            let fn = () => new UserDTO(id, "");
            assert.throws(fn, Error, "Neither ID nor username can be empty");
        })
    
        it("Should throw an error when trying to create a DTO with empty id", () => {
            let fn = () => new UserDTO("", "username");
            assert.throws(fn, Error, "Neither ID nor username can be empty");
        })
    
        it("Should throw an error when trying to create a DTO with invalid UUID", () => {
            let id: string = "xxxx-xxxx-xxxxx-xxxxx";
            let dto = () => new UserDTO(id, "username");
            assert.throws(dto, Error, "Invalid UUID was passed");
        })
    
        it("Should throw an error when trying to create a DTO with NIL UUID", () => {
            let id: string = uuid.NIL;
            let dto = () => new UserDTO(id, "username");
            assert.throws(dto, Error, "The ID shouldn't be a NIL UUID");
        })
    
    })

})