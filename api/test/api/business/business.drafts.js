const expect = require('chai').expect;
const request = require('supertest');

const conn = require('../../../server');

describe('POST /business/drafts', ()=>{
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

    it('OK, creating a new business drafts', (done) => {
        request(conn.app).post('/business/drafts')
            .send({ pid: "asd", pname: "eaersxg", pbprice: "ghcghc", supplier: "fgdhrt"})
            .then((res => {
                const body = res.body;
                expect(body).to.contain.property('drafts');
                done();
            }))
            .catch((err) => done(err))
    })

    it('Fail, business  draft requires pid', (done) => {
        request(conn.app).post('/business/drafts')
            .send({pname: "eaersxg", pbprice: "ghcghc", supplier: "fgdhrt"})
            .then((res => {
                const body = res.body;
                expect(body.errors)
                done();
            }))
            .catch((err) => done(err))
    })
})