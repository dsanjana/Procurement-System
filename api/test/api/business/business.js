const expect = require('chai').expect;
const request = require('supertest');

const conn = require('../../../server');

describe('POST /add', ()=>{
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

    it('OK, creating a new business product', (done) => {
        request(conn.app).post('/business/add')
            .send({ pid: "asd", pname: "eaersxg", pbprice: "ghcghc", supplier: "fgdhrt"})
            .then((res => {
                const body = res.body;
                expect(body).to.contain.property('business');
                done();
            }))
            .catch((err) => done(err))
    })
})