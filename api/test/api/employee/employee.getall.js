const expect = require('chai').expect;
const request = require('supertest');

const conn = require('../../../server');

describe('GET /employee/', ()=>{
    before((done) => {
        conn.connect()
            .then(()=> done())
            .catch((err)=> done(err));
    })

    after((done) => {
        conn.close()
            .then(()=> done())
            .catch((err)=> done(err));
    })

    it('OK, get all employees', (done) => {
        request(conn.app).get('/employee/')
            .then((res => {
                const body = res.body;
                expect(body).to.be.a('array')
                done();
            }))
            .catch((err) => done(err))
    })

})