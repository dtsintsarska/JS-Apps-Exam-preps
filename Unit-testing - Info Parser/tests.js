let Parser = require("./solution.js");
let assert = require("chai").assert;


describe("MyTests", () => {
    let myParser;
    beforeEach(() => {
        myParser = new Parser('[ {"Nancy":"architect"}, {"John":"developer"}]')
    })


    describe('constructor test', () => {
        it('data test', () => {

            assert.deepEqual(myParser._data, [{
                    Nancy: 'architect'
                },
                {
                    John: 'developer'
                }
            ])
            assert.deepEqual(myParser._log, [])
        })

        it('getter data test', () => {
            assert.deepEqual(myParser.data, myParser._data)
            //TODO
            assert.deepEqual()
        })

        it('test print func', () => {

            let result = myParser.print()
            assert.deepEqual(result, 'id|name|position\n0|Nancy|architect\n1|John|developer')

            myParser.print()
            assert.deepEqual(myParser._log, ['0: print', '1: print'])
        })

        it('addEntries func', () => {
            let result = myParser.addEntries("Steven:tech-support Edd:administrator")
            assert.deepEqual(result, `Entries added!`)

            assert.deepEqual(myParser._data, [{
                "Nancy": "architect"
            }, {
                "John": "developer"
            }, {
                "Steven": "tech-support"
            }, {
                "Edd": "administrator"
            }])

            assert.deepEqual(myParser._log, ['0: addEntries'])
        })
        it('removeEntry func test', () => {

            let result = () => myParser.removeEntry("Kate")

            assert.throw(result, 'There is no such entry!')

            let actual = myParser.removeEntry('John')

            let entry = myParser._data.find(x => x.hasOwnProperty('John'))
            assert.deepEqual(entry.deleted, true)

            assert.deepEqual(actual, 'Removed correctly!')

            assert.deepEqual(myParser._log, ['0: removeEntry'])
        })
        it('addToLog func test', () => {

            let result = myParser._addToLog('print')
            assert.deepEqual(result, 'Added to log')

            myParser._addToLog('removeEntry')
            assert.deepEqual(myParser._log, ['0: print', '1: removeEntry'])

        })
    })


});