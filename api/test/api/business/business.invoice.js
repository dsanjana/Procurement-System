const expect = require('chai').expect;
const request = require('supertest');

const conn = require('../../../server');

describe('POST /business/invoice', ()=>{
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

    it('OK, creating a new business invoice', (done) => {
        request(conn.app).post('/business/invoice')
            .send({pid: "asds", pname:"akuydyfyuawd", psprice: "5613", pqty: "45", pcategory: "augudaud", description:"iusiga", supplier:"uyasgdyda"})
            .then((res => {
                const body = res.body;
                expect(body).to.contain.property('cart');
                done();
            }))
            .catch((err) => done(err))
    })

    it('Fail, business invoice requires pid', (done) => {
        request(conn.app).post('/business/invoice')
            .send({pid: "asds", pname:"akuydyfyuawd", psprice: "5613", pcategory: "augudaud", description:"iusiga", supplier:"uyasgdyda"})
            .then((res => {
                const body = res.body;
                expect(body.errors)
                done();
            }))
            .catch((err) => done(err))
    })
})