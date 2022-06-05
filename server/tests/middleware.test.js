const apiCallTracker = require('../middleware/apiCallTracker');
const bodyValidator = require('../middleware/bodyValidator');

describe("Test API tracker middleware", () => {
    
    const mockReq = {
        method: 'GET',
        protocol: 'https',
        host: 'localhost:3000',
        originalUrl: '/users',
        get: function(prop) { return this[prop] }
    }

    // save original console.log function
    const log = console.log; 
    
    beforeEach(() => {
    // create a new mock function for each test
      console.log = jest.fn(); 
    });

    afterAll(() => {
    // restore original console.log after all tests
      console.log = log; 
    });

    test("Should log method and url", () => {
        apiCallTracker(mockReq, null, ()=>{})
        expect(console.log).toHaveBeenCalledWith(
            expect.stringContaining("GET: https://localhost:3000/users")
        );
        const message = console.log.mock.calls[0][0]; 
        // actually log out what the mock was called with
        // log(message); 
    });

    test("Should log method and url, followed by payload", () => {
        let enhancedMock = { 
            ...mockReq, 
            body: {
                foo: 'bar'
            }
        }
        apiCallTracker(enhancedMock, null, ()=>{})
        expect(console.log).toHaveBeenCalledWith(
            expect.stringContaining("- Payload: {\"foo\":\"bar\"}")
        );
        const message = console.log.mock.calls[1][0]; 
    });

    test("Should log method and url, followed by params", () => {
        let enhancedMock = { 
            ...mockReq, 
            params: {
                foo: 'bar'
            }
        }
        apiCallTracker(enhancedMock, null, ()=>{})
        expect(console.log).toHaveBeenCalledWith(
            expect.stringContaining("- Params: {\"foo\":\"bar\"}")
        );
        const message = console.log.mock.calls[1][0]; 
    });

});

describe("Test Body validator middleware", () => {
    
    const mockReq = {
        method: 'GET',
        url: '/users'
    }

    test("Should run callback once with no value", () => {
        const mockCallback = jest.fn( _ => {});
        bodyValidator(mockReq, null, mockCallback);
        // The mock function is called twice
        expect(mockCallback.mock.calls.length).toBe(1);
        // The first argument of the first call to the function was 0
        expect(mockCallback.mock.calls[0][0]).toBe(undefined);
    });

    test("Should run callback once with no value for a POST request with no params to be validated", () => {
        const updatedMock = {
            ...mockReq,
            method: 'POST',
            url: '/something'
        }
        const mockCallback = jest.fn( _ => {});
        bodyValidator(updatedMock, null, mockCallback);
        // The mock function is called twice
        expect(mockCallback.mock.calls.length).toBe(1);
        // The first argument of the first call to the function was 0
        expect(mockCallback.mock.calls[0][0]).toBe(undefined);
    });

    test("Should run callback once with no value for a POST request having params to be validated", () => {
        const updatedMock = {
            ...mockReq,
            method: 'POST',
            body: {
                email: 'somemail'
            }
        }
        const mockCallback = jest.fn( _ => {});
        bodyValidator(updatedMock, null, mockCallback);
        // The mock function is called twice
        expect(mockCallback.mock.calls.length).toBe(1);
        // The first argument of the first call to the function was 0
        expect(mockCallback.mock.calls[0][0]).toBe(undefined);
    });

    test("Should run callback once with err param", () => {
        const updatedMock = {
            ...mockReq,
            method: 'POST',
            body: {}
        }
        const mockCallback = jest.fn( _ => {});
        bodyValidator(updatedMock, null, mockCallback);
        // The mock function is called twice
        expect(mockCallback.mock.calls.length).toBe(1);
        // The first argument of the first call to the function was 0
        expect(typeof mockCallback.mock.calls[0][0]).toBe('object');
        expect(mockCallback.mock.calls[0][0]).toStrictEqual({
            code: 400,
            detail: `Following props are missing: email`
        })
    });


});
