// Plant Data Model Needs to: 
//  get all Plants in a unified model
    //Includes: name, id, light_requirements
//  be able to create new records
//  validate data entries

const { expect } = require('chai');
const { models, sync, seed } = require('../server/db');
const { Plant, User } = models;

describe('db models', ()=> {
    beforeEach(()=> {
        return sync({ force: true })
            .then(()=> seed());
    })

    describe('Plant data model ', ()=> {
        // Plant Model responds with a JSON object.
        it('returns a predictable collection of objects', ()=> {
            return Plant.findAll()
                .then(plants => {
                    // expect(plants.length).to.eql(3); // Confirm Expected Seed Data Rows

                    plants.forEach( plant => {
                        expect(plant).to.be.an('object');
                        expect(plant).to.have.a.property('name');
                        expect(plant).to.have.a.property('id');
                        expect(plant).to.have.a.property('light_required');
                    }) 
                })
        });
        
        it('creates new rows and validates inputs', ()=> {
            return Plant.create({ name: 'high-light-plant', light_required: 'high'})
                .then(res => res.dataValues)
                .then(plant => {
                    expect(plant.id).to.be.a('string');
                    expect(plant.name).to.be.a('string');
                    expect(plant.light_required).to.be.a.a('string');                    

                    // Plant.findAll()
                    //     .then(plants => expect(plants.length).to.eql(4));
                })
        })
    })

//     describe('User data model', ()=> {
//         it('returns a predeictable collection of objects',   ()=> {
//             return User.findAll()
//                 .then(users => {
//                     users.forEach(user => {
//                         expect(user).to.be.an('object');
//                         expect(user).to.have.a.property('user');
//                         expect(user).to.have.a.property('password');
//                     })
//                 })
//         })
//     })
    
})