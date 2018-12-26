const { expect } = require('chai');
const app = require('supertest-as-promised')('../server/app.js');

describe('tests', ()=> {
    it('are running', ()=> {
        expect(false).to.be.not.ok;
    })
});

describe('Server', ()=> {
    it('responds to http GET requests with status 200', ()=> {
        return app.get('/')
            .expect(200) // tests response status code
            // .expect('Content-Type', /json/) // tests response header
            // .expect((res) => {
            //     console.log(res)
            //     expect(res.body).to.eql([]) // tests response body
            // })
    })
})
