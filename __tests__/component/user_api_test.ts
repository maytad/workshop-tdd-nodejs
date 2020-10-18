const request = require("supertest")
const nock1 = require("nock")
const userService1 = require('../../src/user_service')
const app = require('../../src/app')

test('api ja 200',async () => {
    nock1('https://jsonplaceholder.cypress.io')
        .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
        .get("/users").reply(200, [{}, {}])

    await request(app)
    .get('/api/users')
    .expect('Content-Type', /json/)
    .expect(200)
    .then((res) => {
        // console.log(res.body)
        expect(res.body.length).toBe(2)
    })
})

test('api ja 404',async () => {
    nock1('https://jsonplaceholder.cypress.io')
        .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
        .get("/users").reply(404,{ error: "User not found" })

    await request(app)
    .get('/api/users')
    .expect('Content-Type', /json/)
    .expect(404)
    .then((res) => {
        expect(res.body.error).toBe('User not found')
    })
})

test('api ja 500', (done) => {
    
    jest.spyOn(userService1, "searchUser").mockRejectedValue({code:500,data:[]})

     request(app)
    .get('/api/users')
    .expect('Content-Type', /json/)
    .expect(500)
    .end(function(err,res){
        if(err) throw err;
        done()
     })
})