const expect = require('chai').expect;
const request = require('supertest');

const conn = require('../../../server');

describe('POST /employee/add', ()=>{
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

    it('OK, creating a new employee', (done) => {
        request(conn.app).post('/supplier/add')
            .send({supplierId:"weatc", supplierName:"fjkhsduk", sAddress:"dsfhbskdf", supplierEmail:"sdjkhkjdsg", suppliermobile:"03235431",supplierdescription:"sdfbdjkfbdjkf"})
            .then((res => {
                const body = res.body;
                expect(body).to.contain.property('employee');
                done();
            }))
            .catch((err) => done(err))
    })

    it('Fail, employee requires employee Id', (done) => {
        request(conn.app).post('/supplier/add')
            .send({supplierName:"fjkhsduk", sAddress:"dsfhbskdf", supplierEmail:"sdjkhkjdsg", suppliermobile:"03235431",supplierdescription:"sdfbdjkfbdjkf"})
            .then((res => {
                const body = res.body;
                expect(body.errors)
                done();
            }))
            .catch((err) => done(err))
    })
})