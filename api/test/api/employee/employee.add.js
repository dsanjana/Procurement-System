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
        request(conn.app).post('/employee/add')
            .send({employeeId: "qwe", employeeName: "efjkeaf", empAddress: "fseefef",employeeEmail: "sfsefesftugjhjbhnhkmmu", employeePassword: "sefefesfnvghjb", employeemobile: "646464", employeedescription: "Sfeefs"})
            .then((res => {
                const body = res.body;
                expect(body).to.contain.property('employee');
                done();
            }))
            .catch((err) => done(err))
    })

    it('Fail, employee requires employee Id', (done) => {
        request(conn.app).post('/employee/add')
            .send({employeeName: "efjkeaf", empAddress: "fseefef",employeeEmail: "sfsefesf", employeePassword: "sefefesf", employeemobile: "646464", employeedescription: "Sfeefs"})
            .then((res => {
                const body = res.body;
                expect(body.errors)
                done();
            }))
            .catch((err) => done(err))
    })
})