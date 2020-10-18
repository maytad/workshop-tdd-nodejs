const userService = require('../../src/user_service')
const userGetway = require('../../src/user_gateway')
it('ต้องการ user 2 คน', async () => {
    jest.spyOn(userGetway,'getAllUser').mockReturnValue(Promise.resolve({
        code: 200,
        data: [[],[]],
    }))
    const result = await userService.searchUser()
    expect(result.data.length).toBe(2)
})

it('ต้องการ user 0 คน fail', async () => {
    jest.spyOn(userGetway,'getAllUser').mockReturnValue(Promise.reject({
        code: 500,
        data: [],
    }))
    
    try {
        await userService.searchUser()
    } catch (error) {
        expect(error.code).toBe(500)
    }
    // userService.searchUser().catch((value) => expect(value.code).toBe(500))
    
})