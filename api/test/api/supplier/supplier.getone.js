const expect = require('chai').expect;
const request = require('supertest');

const conn = require('../../../server');

describe('POST /supplier/:name', ()=>{
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

    it('OK, get one supplier', (done) => {
        request(conn.app).get('/supplier/:name')
            .then((res => {
                const body = res.body;
                expect(body.length).to.equal(1)
                done();
            }))
            .catch((err) => done(err))
    })

})