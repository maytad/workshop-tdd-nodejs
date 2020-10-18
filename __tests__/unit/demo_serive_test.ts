const demoService = require('../../src/demo_service')

// beforeEach(() => {
//     jest.spyOn(global.Math,'random').mockReturnValue(0.5)
// })

// afterEach(() => {
//     jest.spyOn(global.Math,'random').mockRestore()
// })

// it('should get number 5 from demo serive', () => {
//     const result = demoService.getNumber(null)
//     expect(result).toBe(5)
// })


it('should get number 5 from demo serive', () => {
    // const result = demoService.getNumber(null)
    // expect(result).toBe(5)

    const spy = jest.spyOn(global.Math,'random')
    demoService.getNumber(null)
    expect(spy).toBeCalled()
    expect(spy).toBeCalledTimes(1)
})
