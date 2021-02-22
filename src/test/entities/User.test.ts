import * as chai from 'chai';

describe('Sum tests', () => { // the tests container
    it('2+2 = 4', () => {
        chai.expect(2+2).to.be.equal(4);
    });

    it('1+1 = 2', () => {
        chai.expect(1+1).to.be.equal(2);
    });

    it('3+3 = 6', () => {
        chai.expect(3+3).to.be.equal(6);
    });
});