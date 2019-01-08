const { expect } = require('chai');
const app = require('../server/app.js');
const supertest = require('supertest')(app)


// describe('Authentication', ()=> {
//     it('')

// })

describe('Server', ()=> {
    it('responds to http GET requests with status 200', ()=> {
        return supertest
            .get('/')
            .expect(200) // tests response status code
    })
})

describe('API Routes', ()=> {
    it('GET "/api/plants" responds with JSON OBJECT', ()=> {
        return supertest
            .get('/api/plants') // makes an HTTP request: GET '.../plants'
            .expect(200) // tests response status code
            .expect('Content-Type', /json/) // tests response header
    })

    it('GET takes a string querie, such as "api/plants?light_requirement=low", and responds with only applicable plants', ()=> {
        return supertest
            .get('/api/plants?light_required=low')
            .expect(200)
            .expect(res => {
                expect(res.body.plants.length).to.equal(1)
            })
    })

    it('GET takes a complex string querie, such as "api/plants?light_requirement=low,med", and responds with only applicable plants', ()=> {
        return supertest
            .get('/api/plants?light_required=low,med')
            .expect(200)
            .expect(res => {
                expect(res.body.plants.length).to.equal(2)
            })
    })

    it('POST "/api/plants" creates a new Plant row and returns as OBJECT', ()=> {
        return supertest
            .post('/api/plants')
            .send({
                plant: { 
                    name: 'Snake Plant', 
                    light_required: 'med' 
                }
            })
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')    
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(res => {
                expect(res.body).to.include({ name: 'Snake Plant', light_required: 'med' });
            })
    })

    it('GET "/api/plants/(id)" finds a plant by ID and returns as JSON OBJECT', ()=> {
        return supertest
            .post('/api/plants')
            .send({
                plant: { 
                    name: 'Snake Plant', 
                    light_required: 'med' 
                }
            })
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')    
            .expect(res => {
                return supertest.get(`/api/plants/${res.id}`)
                    .expect(200) // tests response status code
                    .expect('Content-Type', /json/) // tests response header
                    .expect(res => {
                        expect(res.body).to.include({ 
                            name: 'Silver Cactus', 
                            light_required: 'high' 
                        });
                    })
            })
    })
});