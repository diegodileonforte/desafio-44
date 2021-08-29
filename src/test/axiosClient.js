const axios = require('axios')

const producto = {
    title: 'Mario 3D', 
    price: 500,
    thumbnail: 'https://i.postimg.cc/YSvHdnkB/mb-mario.jpg'
}

const axiosDelete = async () => {
    try {
        
        const resp = await axios.delete('http://localhost:8080/api/productos/610f6585f3ef9e415102f3c9');
        console.log('DELETE',resp);
    } catch (err) {
        console.log(err);
    }
};

axiosDelete();