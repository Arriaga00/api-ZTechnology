const Router = require('express').Router
const request = require('supertest')

describe('GET /sales',() => {
    test('espera un codigo de respuesta 200', async () => {
     const response =   await request(Router).get('/sales').send()
     expect(response.statusCode).toBe(200)
    }, 10000) 
})
