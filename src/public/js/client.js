const socket = io.connect()

let pantalla = document.getElementById('pantalla')
let botonChat = document.getElementById('btnChat')

botonChat.addEventListener('click', () => { validar() })

function validar() {
    let user = document.getElementById('userChat').value
    let mensaje = document.getElementById('messageChat').value
    console.log(mensaje)
    if (mensaje === "" || user === "") {
        alert(`CAMPOS REQUERIDOS`)
    } else if (mensaje.includes("administrador") || mensaje.includes("Administrador") || mensaje.includes("ADMINISTRADOR") ) {
        let msgAdmin = {
            author: {
                nombre: document.getElementById('userName').value,
            },
            text: document.getElementById('messageChat').value,
        };
        socket.emit('messageAdmin', msgAdmin)
        document.getElementById('messageChat').value = ""
    } else {
        let mensaje = {
            author: {
                email: document.getElementById('userChat').value,
                nombre: document.getElementById('userName').value,
                apellido: document.getElementById('userLastName').value,
                edad: document.getElementById('userAge').value,
                alias: document.getElementById('userAlias').value,
                avatar: document.getElementById('userAvatar').value
            },
            text: document.getElementById('messageChat').value,
        };
        socket.emit('new-message', mensaje);
        document.getElementById('messageChat').value = ""
    };
};


let date = new Date()
newDate = [
    date.getDate(),
    date.getMonth() + 1,
    date.getFullYear()].join('/') + ' ' +
    [date.getHours(),
    date.getMinutes(),
    date.getSeconds()].join(':')

function renderMessage(data) {
    let html = data.map((elem, i) => {
        return (`
        <div>
        <img src="${elem.author.avatar}" alt="avatar" style="width:8%"/>
        <strong style="color:blue">${elem.author.email}</strong></span>
        (a las <span>${newDate.toString()}</span>)
        dijo: <i style="color:green">${elem.text}</i></div>`)
    }).join(' ')
    document.getElementById('pantalla').innerHTML = html
}

socket.on('new-message-server', (data) => {
    renderMessage(data);
})

function oldMsg(data) {
    console.log(data)
    let html2 = data.map((elem, i) => {
        return (`
        <div>
        <img src="${elem.author.avatar}" alt="avatar" style="width:8%"/>
        <strong style="color:blue">${elem.author.email}</strong></span>
        (a las <span>${newDate.toString()}</span>)
        dijo: <i style="color:green">${elem.text}</i></div>`);
    }).join(' ');
    document.getElementById('pantallaOld').innerHTML = html2;
}


document.getElementById("btnOldMsg").addEventListener("click", async function () {

    const msgNormalized = await fetch('http://localhost:8080/mensajes/norm')
        .then(res => res.json())
        .then(data => { return data })
        .catch(err => console.log(err))

    const msgNormalizedLength = JSON.stringify(msgNormalized).length

    /* -------------- Desnomarlizacion del archivo recibido desde el back -------------- */
    const schemaAuthor = new normalizr.schema.Entity('author', {}, { idAttribute: 'id' });
    const schemaMensaje = new normalizr.schema.Entity('mensaje', {
        author: schemaAuthor
    }, { idAttribute: '_id' })
    const schemaMensajes = new normalizr.schema.Entity('mensajes', {
        mensajes: [schemaMensaje]
    }, { idAttribute: 'id' })

    const msgDesnormalized = normalizr.denormalize(msgNormalized.result, schemaMensajes, msgNormalized.entities)
    const msgDesnormalizedLength = JSON.stringify(msgDesnormalized).length


    oldMsg(msgDesnormalized.mensajes)

    let porcentual = parseInt((msgNormalizedLength * 100) / msgDesnormalizedLength)

    document.getElementById('compress').innerText = porcentual

})




/* -------------------  PRODUCTOS -------------------------- */

// ENVIAR PRODUCTOS POR SOCKET
document.getElementById('btnForm').addEventListener('click', () => { validarForm() }); // al apretar el boton ejecuta la fn valida()

// Funcion que valida que los input no esten vacios y si estan OK envia la informacion al server
function validarForm() {
    let title = document.getElementById('title').value;
    let price = document.getElementById('price').value;
    let thumbnail = document.getElementById('thumbnail').value;
    if (title === "" || price === "" || thumbnail === "") {
        alert(`CAMPOS REQUERIDOS PARA AGREGAR PRODUCTO`)
    } else {
        let newProd = {
            title: document.getElementById('title').value,
            price: document.getElementById('price').value,
            thumbnail: document.getElementById('thumbnail').value
        };
        socket.emit('new-producto', newProd)

        document.getElementById('title').value = ""
        document.getElementById('price').value = ""
        document.getElementById('thumbnail').value = ""
    };
};


// GET 
const fragment = document.createDocumentFragment();
const tabla = document.getElementById('tableProd');
const template = document.getElementById('templateList').content;

// Traer productos
document.addEventListener('DOMContentLoaded', e => { fetchData() });

const fetchData = async () => {
    const res = await fetch('http://localhost:8080/api/productos');
    const data = await res.json();
    console.log(data)
    verProdHtml(data);
};

const verProdHtml = data => {
    data.forEach(producto => {

        template.getElementById('prodTitle').textContent = producto.title;
        template.getElementById('prodPrice').textContent = producto.price;
        template.getElementById('prodImg').setAttribute("src", producto.thumbnail);

        const clone = template.cloneNode(true)
        fragment.appendChild(clone)
    });
    tabla.appendChild(fragment)
};


socket.on('new-prod-server', async data => {
    let array = []
    array.push(await data)
    verProdHtml(array)

})