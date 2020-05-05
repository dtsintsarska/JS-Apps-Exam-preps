let {
    Repository
} = require("./solution.js");

let assert = require('chai').assert

describe("test Repository", function () {

    // Initialize props object
    let myClass;
    beforeEach(() => {
        let properties = {
            name: "string",
            age: "number",
            birthday: "object"
        };

        myClass = new Repository(properties)
    })

    describe("test constructor", function () {
        it("properties test", function () {

            assert.deepEqual(myClass.props, {
                age: 'number',
                birthday: 'object',
                name: 'string'
            })

            assert.deepEqual(myClass.data.size, 0)
        })

        it('nextID func test', () => {
            let entity = {
                name: "Pesho",
                age: 22,
                birthday: new Date(1998, 0, 7)
            }
            myClass.add(entity)

            let result = myClass.nextId()
            assert.equal(result, 1)
        })

    });

    describe('test getter count', () => {
        it('getter test', () => {

            let entity = {
                name: "Pesho",
                age: 22,
                birthday: new Date(1998, 0, 7)
            }
            myClass.add(entity)
            assert.equal(myClass.count, 1)
            assert.equal(myClass.data.size, myClass.count)
        })
    })

    describe('addEntity func test', () => {

        it('valid data test reply', () => {
            let entity = {
                name: "Pesho",
                age: 22,
                birthday: new Date(1998, 0, 7)
            }
            let bau = {
                name: "Emo",
                age: 12,
                birthday: new Date(2004, 5, 7)
            }
            assert.deepEqual(myClass.add(entity), 0)
            assert.deepEqual(myClass.add(bau), 1)

            assert.deepEqual(myClass.data instanceof Map, true)
        })

        it('invalid property test', () => {
            let entity = {
                name1: "Pesho",
                age: 12,
                birthday: new Date(1998, 0, 7)
            }
            let result = () => myClass.add(entity)
            assert.throw(result, `Property name is missing from the entity!`)
        })
        it('invalid data input', () => {
            let entity2 = {
                name: "Pesho",
                age: 12,
                birthday: 1999
            }
            let result2 = () => myClass.add(entity2)
            assert.throw(result2, `Property birthday is not of correct type!`)


        })
        it('invalid type property test', () => {
            let entity = {
                name: "Pesho",
                age: "California",
                birthday: new Date(1998, 0, 7)
            }

            let result = () => myClass.add(entity)
            assert.throw(result, `Property age is not of correct type!`)
        })

        it('test data save entity', () => {
            let entity = {
                name: "Pesho",
                age: 22,
                birthday: new Date(1998, 0, 7)
            }
            myClass.add(entity)
            assert.equal(myClass.data.size, 1)

            let expected = JSON.stringify(myClass.data.get(0))
            let result = JSON.stringify(entity)
            assert.deepEqual(expected, result)
        })
    })


    describe('test fun getID', () => {
        it('error handler', () => {
            let entity = {
                name: "Pesho",
                age: 22,
                birthday: new Date(1998, 0, 7)
            }
            myClass.add(entity)
            let result = () => myClass.getId(3)

            assert.throw(result, `Entity with id: 3 does not exist!`)
        })

        it('valid id', () => {
            let entity = {
                name: "Pesho",
                age: 22,
                birthday: new Date(1998, 0, 7)
            }
            let bau = {
                name: "Emo",
                age: 12,
                birthday: new Date(2004, 5, 7)
            }
            myClass.add(entity)
            myClass.add(bau)

            let result = JSON.stringify(myClass.getId(1))
            let expected = JSON.stringify(bau)
            assert.deepEqual(expected, result)
        })
    })

    describe('func update test', () => {
        it('error handler', () => {
            let entity = {
                name: "Pesho",
                age: 22,
                birthday: new Date(1998, 0, 7)
            }
            let newEntity = {
                name: "Pesho Petrov",
                age: 22,
                birthday: new Date(1998, 0, 7)
            }
            myClass.add(entity)
            let result = () => myClass.update(3, newEntity)

            assert.throw(result, `Entity with id: 3 does not exist!`)
        })
        it('with valid data - data size check', () => {

            let entity = {
                name: "Pesho",
                age: 22,
                birthday: new Date(1998, 0, 7)
            }
            let newEntity = {
                name: "Pesho Petrov",
                age: 22,
                birthday: new Date(1998, 0, 7)
            }

            myClass.add(entity)
            myClass.update(0, newEntity)
            assert.equal(myClass.data.size, 1)
            //LOOK!
            let expected = JSON.stringify(myClass.getId(0))
            let result = JSON.stringify(newEntity)
            assert.deepEqual(expected, result)
        })


        it('invalid type property test', () => {
            let entity = {
                name: "Pesho",
                age: 12,
                birthday: new Date(1998, 0, 7)
            }
            let bau = {
                name: "Pesho Petrov",
                age: 'California',
                birthday: new Date(1998, 0, 7)
            }

            myClass.add(entity)
            let result = () => myClass.update(0, bau)
            assert.throw(result, `Property age is not of correct type!`)
        })
        it('invalid property test', () => {
            let entity = {
                name: "Pesho",
                age: 12,
                birthday: new Date(1998, 0, 7)
            }
            let newEntity = {
                name: "Pesho",
                birthday: new Date(1998, 0, 7)
            }
            myClass.add(entity)
            let result = () => myClass.update(0, newEntity)
            assert.throw(result, `Property age is missing from the entity!`)

        })
    })

    describe('delete func test', () => {
        it('error handler', () => {
            let entity = {
                name: "Pesho",
                age: 22,
                birthday: new Date(1998, 0, 7)
            }
            myClass.add(entity)
            let result = () => myClass.del(3)

            assert.throw(result, `Entity with id: 3 does not exist!`)
        })
        it('with valid id', () => {
            let entity = {
                name: "Pesho",
                age: 22,
                birthday: new Date(1998, 0, 7)
            }
            myClass.add(entity)

            let bau = {
                name: "Gosho",
                age: 22,
                birthday: new Date(1998, 0, 7)
            }
            myClass.add(bau)
            myClass.del(1)
            assert.deepEqual(myClass.data.size, 1)
        })

        it('last test', () => {

            let entity = {
                name: "Pesho",
                age: 22,
                birthday: new Date(1998, 0, 7)
            }
            myClass.add(entity)

            let bau = {
                name: "Gosho",
                age: 22,
                birthday: new Date(1998, 0, 7)
            }
            myClass.add(bau)

            myClass.del(1)
            let result = JSON.stringify(myClass.data.get(1))

            assert.deepEqual(result, undefined)

        })
    })

});