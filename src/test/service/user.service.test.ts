import { expect } from "chai";
import * as sinon from "sinon";
import { getConnection, getRepository } from "typeorm";
import User from "../../entities/User";
import UserService from "../../service/UserService";

describe("User service GET functions", () => {
    
    it("Should return an array of users", async () => {
        // Setup

        let user = new User("david", "1234");

        const getOne = sinon.stub().resolves(user);
        const connection = { getRepository: sinon.stub() };

        connection.getRepository.withArgs(User).returns({ find: sinon.stub().resolves([user]) });
        
        // Test

        const service = new UserService(connection.getRepository(User));
        const results = await service.findAll();

        console.log(results);

    })

})