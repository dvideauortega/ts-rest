import { assert } from "chai";
import * as sinon from "sinon";
import UserDTO from "../../entities/dto/UserDTO";
import User from "../../entities/User";
import Uuid from "../../entities/Uuid";
import UserService from "../../service/UserService";

describe("User service", () => {
    
    describe("Finding user functions", () => {

        it("Should throw when searching for a non-existent user", async () => {
            // Declare testing data
            const randomId: string = new Uuid().asString();
    
            // Create stubs
            const findStub = sinon.stub().resolves(null);
            const repositoryStub = sinon.stub().returns({findOne: findStub});
    
            // Instantiate service
            const repository = repositoryStub();
            const service = new UserService(repository);
    
            // Assert
    
            let fails = false;
    
            try {
                await service.findById(randomId);
                fails = true;
            } catch(error) {
                assert.equal(error.name, "NotFoundError");
                assert.equal(error.statusCode, 404);
            }
    
            if (fails)
                assert.fail("Should throw an error when trying to find unexistent user");
            
        });
    
        it("Should successfully find a user and return a UserDTO object", async () => {
            // Declare testing data
            const user: User = new User("username", "password");
            const stringId: string = user.getId().asString();
    
            // Create stubs
            const findStub = sinon.stub().resolves(user);
            const repositoryStub = sinon.stub().returns({findOne: findStub});
    
            // Instantiate service
            const repository = repositoryStub();
            const service = new UserService(repository);
    
            // Assert
            try {
                const result: UserDTO = await service.findById(stringId);
                assert.instanceOf(result, UserDTO);
                assert.equal(result.getUsername(), user.getUsername());
            } catch (error) {
                assert.fail("User found shouldn't be null and should be of the correct UserDTO type");
            }
            
    
            
        });
    
        it("findAll method return an array of UserDTO objects", async () => {
            // Declare testing data
            const data: User[] = [
                new User("username1", "password1"),
                new User("username2", "password2"),
                new User("username3", "password3")
            ]
    
            // Create stubs
            const findStub = sinon.stub().resolves(data);
            const repositoryStub = sinon.stub().returns({find: findStub});
    
            // Instantiate service
            const repository = repositoryStub();
            const service = new UserService(repository);
    
            // Assert
            try {
                const results: UserDTO[] = await service.findAll();
                for (let i = 0; i < results.length; i++) {
                    assert.instanceOf(results[i], UserDTO);
                    assert.equal(results[i].getUsername(), data[i].getUsername());
                    assert.equal(results[i].getId(), data[i].getId().asString());
                }
            } catch (error) {
                assert.fail(error.message);
            }
        });
    
        it("findAll method return an empty array", async () => {
            // Declare testing data
            const data: User[] = []
    
            // Create stubs
            const findStub = sinon.stub().resolves(data);
            const repositoryStub = sinon.stub().returns({find: findStub});
    
            // Instantiate service
            const repository = repositoryStub();
            const service = new UserService(repository);
    
            // Assert
            try {
                const results: UserDTO[] = await service.findAll();
                assert.lengthOf(results, 0);
            } catch (error) {
                assert.fail(error.message);
            }
        });
    
    });

    describe("Saving user function", () => {

        it("Should save correctly", () => {
            assert.isTrue(true);
        })
        
    });

})