const nock = require("nock")
const eieiza = require('../../src/user_gateway')


it("Check repone from /users" , async () => {
    nock("https://jsonplaceholder.cypress.io")
        .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
        .get("/users").reply(200, [{}, {}])

    const res = await eieiza.getAllUser()
    
    expect(res.data.length).toEqual(2)
})
  

it("Check repone erro from /users" , async () => {
    nock("https://jsonplaceholder.cypress.io")
        .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
        .get("/users").reply(500, [])
    
    const res = await eieiza.getAllUser()
    expect(res.data.length).toEqual(0)
    expect(res.code).toEqual(500)
})
  