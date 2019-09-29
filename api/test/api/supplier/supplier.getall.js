const expect = require('chai').expect;
const request = require('supertest');

const conn = require('../../../server');

describe('GET /supplier/', ()=>{
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

    it('OK, get all suppliers', (done) => {
        request(conn.app).get('/supplier/')
            .then((res => {
                const body = res.body;
                expect(body).to.be.a('array')
                done();
            }))
            .catch((err) => done(err))
    })

})