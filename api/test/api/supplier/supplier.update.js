const expect = require('chai').expect;
const request = require('supertest');

const conn = require('../../../server');

describe('POST /supplier/edit/:id', ()=>{
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

    it('OK, update a supplier', (done) => {
        request(conn.app).post('/supplier/edit/:id')
            .send({supplierId:"weatc", supplierName:"fjkhsduk", sAddress:"dsfhbskdf", supplierEmail:"sdjkhkjdsg", suppliermobile:"03235431",supplierdescription:"sdfbdjkfbdjkf"})
            .then((res => {
                const body = res.body;
                expect(body).to.contain.property('employee');
                done();
            }))
            .catch((err) => done(err))
    })

    it('Fail, update supplier requires supplier Id', (done) => {
        request(conn.app).post('/supplier/edit/:id')
            .send({ supplierName:"fjkhsduk", sAddress:"dsfhbskdf", supplierEmail:"sdjkhkjdsg", suppliermobile:"03235431",supplierdescription:"sdfbdjkfbdjkf"})
            .then((res => {
                const body = res.body;
                expect(body.errors)
                done();
            }))
            .catch((err) => done(err))
    })
})