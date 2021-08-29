const http = require('http')

const prod = JSON.stringify({
    title: "Mario 3D", 
    price: 500,
    thumbnail: "https://i.postimg.cc/YSvHdnkB/mb-mario.jpg"   
})

const options = {
    hostname: 'localhost',
    port: 8080,
    path: '/api/productos',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': prod.length
    }
}

const req = http.request(options, res => {
    console.log(`statusCode: ${res.statusCode}`)

    res.on('data', d => {
        process.stdout.write(d)
    })
})

req.on('error', error => {
    console.log(error)
})

req.write(prod)

req.end()