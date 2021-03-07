import * as process from "process";

import * as sinon from "sinon";
import * as JwtLib from "jsonwebtoken";
import * as dotenv from "dotenv";

import User from "../../entities/User";
import { assert } from "chai";
import AuthService from "../../service/AuthService";
import NotFoundError from "../../errors/NotFoundError";


describe("Auth service", () => {

    let secret: string | Buffer | { key: string | Buffer; passphrase: string };

    before("Loading env variables", () => {
        dotenv.config();
        secret = process.env.JWT_SECRET as (string | Buffer | { key: string | Buffer; passphrase: string });
    })

    it("should create a token if user credentials are correct", async () => {
        // Declare testing data
        const username: string = "username";
        const password: string = "password";
        const user: User = new User(username, password);
    
        // Create stubs
        const UserServiceStub = sinon.stub().returns({
            existsByUsername: sinon.stub().resolves(true),
            findByUsername: sinon.stub().resolves(user)
        }).prototype.constructor

        // Instantiate services
        const userServiceStub = new UserServiceStub();
        const authService = new AuthService(userServiceStub);
        
        // Call function under test
        const token = await authService.login(username, password);
        const secret = process.env.JWT_SECRET as (string | Buffer | { key: string | Buffer; passphrase: string })
        const decodedToken: {username: string, id: string} = await JwtLib.verify(token, secret) as ({username: string, id: string});

        // Assert
        assert.isNotNull(decodedToken.username);
        assert.isString(decodedToken.username);
        assert.equal(username, decodedToken.username);
        assert.isNotNull(decodedToken.id);
        assert.isString(decodedToken.id);
        assert.equal(user.getId().asString(), decodedToken.id);
        
    })

    it("Should throw a BadCredentialsError if password doesn't match", async () => {
        // Declare testing data
        const username: string = "username";
        const password: string = "password";
        const user: User = new User(username, password);
    
        // Create stubs
        const UserServiceStub = sinon.stub().returns({
            existsByUsername: sinon.stub().withArgs(username, password).resolves(true),
            findByUsername: sinon.stub().withArgs(username, password).resolves(user)
        }).prototype.constructor;

        // Instantiate services
        const userService = new UserServiceStub();
        const authService = new AuthService(userService);
        
        // Assert

        let fails = false;

        try {
            const token = await authService.login("username", "wrong password");
            fails = true;
        } catch(error) {
            assert.equal(error.name, "BadCredentialsError");
        }

        if (fails)
            assert.fail("Authentication should have thrown when credentials don't match");
        
    })

    it("Should throw a BadCredentialsError if username is wrong and doesn't exist", async () => {
    
        // Create stubs
        const userServiceStub = sinon.stub().returns({
            findByUsername: sinon.stub().rejects(new NotFoundError()),
            existsByUsername: sinon.stub().resolves(false)
        });

        // Create service
        const service = userServiceStub();
        const authService: AuthService = new AuthService(service);
        
        // Assert
        
        let fails = false;

        try {
            const token = await authService.login("username", "wrong password");
            fails = true;
        } catch(error) {
            assert.equal(error.name, "BadCredentialsError");
        }

        if (fails)
            assert.fail("Authentication should have thrown when credentials don't match");
        
    })


}) 