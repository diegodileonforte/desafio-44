const supertest = require('supertest')
const request = supertest('http://localhost:8080')
const expect = require('chai').expect


const id = '61104b656f8960c616c51192' //* id de producto como parametro debe ser reemplazado segun figure en mongodb Atlas
const url = '/api/productos'
const urlModify = `/api/productos/${id}`

const producto = {
    "title": 'Mario 3D', 
    "price": 500,
    "thumbnail": 'https://i.postimg.cc/YSvHdnkB/mb-mario.jpg'
};

const price = 10000;

describe("Test API REST", ()=>{
    describe('test GET', () => {
        it('debería retornar un status 200', async()=> {
            let response = await request.get(url);
            expect(response.status).to.eql(200);
        })
    })

    describe('test POST', ()=> {
        it('debe incorporar un producto', async()=>{
            let response = await request.post(url).send(producto)
            expect(response.status).to.eql(200)
        })
    })

    describe('test update/PUT', ()=>{
        it('debe modificar el precio del producto (segun id ingreso)', async()=>{
            let response = await request.put(urlModify).send({price: price})
            expect(response.status).to.eql(200)
        })
    })

    describe('test delete/DELETE', ()=>{
        it('debe eliminar el producto (segun id ingreso)', async()=>{
            let response = await request.delete(urlModify).send();
            expect(response.status).to.eql(200)
        })
    })
});