const btn_create = document.querySelector('#btn_create')
const btn_update = document.querySelector('#btn_update')
const table_usuarios = document.querySelector('#table_usuarios tbody')

const obtenerUsuarios = async () => {
    const url = 'http://localhost:3000/auth/usuarios';
    const resultado = await fetch(url);

    if (!resultado) return

    const users = await resultado.json()
    // console.log(users)

    users.forEach((usuario) => {
        const fila = `
        <tr>
            <td>${usuario.nombre}</td>
            <td>${usuario.telefono}</td>
            <td>${usuario.fecha_nac}</td>
            <td>${usuario.descripcion}</td>
            <td>
                <button onclick="showModal(${usuario.id_user})" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal2">
                    Editar
                </button>
                <button onclick="eliminarUsuario(${usuario.id_user})" type="button" class="btn btn-danger">
                    Borrar
                </button>
            </td>
        </tr>`

        table_usuarios.innerHTML += fila
    });
}

const crearUsuario = async () => {
    const url = `http://localhost:3000/auth/signup`;
    const nombre = document.querySelector('#nombre_crear').value
    const telefono = document.querySelector('#telefono_crear').value
    const fecha_nac = document.querySelector('#fecha_nac_crear').value
    const descripcion = document.querySelector('#descripcion_crear').value
    const password = document.querySelector('#password_crear').value

    const data = {
        nombre,
        telefono,
        fecha_nac,
        descripcion,
        password
    }

    const resultado = await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (resultado) {
        location.reload()
    }
}

const editarUsuario = async (id) => {

    const url = `http://localhost:3000/auth/usuarioedit/${id}`;

    const nombre = document.querySelector('#nombre').value
    const telefono = document.querySelector('#telefono').value
    const fecha_nac = document.querySelector('#fecha_nac').value
    const descripcion = document.querySelector('#descripcion').value
    const password = document.querySelector('#password').value

    const data = {
        nombre,
        telefono,
        fecha_nac,
        descripcion,
        password
    }

    const resultado = await fetch(url, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (resultado) {
        location.reload()
    }
}

const eliminarUsuario = async (id) => {
    const url = `http://localhost:3000/auth/usuariodelete/${id}`;

    const resultado = await fetch(url, {
        method: 'DELETE'
    });

    if (resultado) {
        location.reload()
    }
}

const showModal = async (id) => {
    const url = `http://localhost:3000/auth/byId/${id}`;
    let data

    const resultado = await fetch(url, {
        method: 'POST'
    })

    if (resultado) {
        data = await resultado.json()

        // console.log(data)
        document.querySelector('#id_user').value=data.id_user
        document.querySelector('#nombre').value = data.nombre
        document.querySelector('#telefono').value = data.telefono
        document.querySelector('#fecha_nac').value = data.fecha_nac
        document.querySelector('#descripcion').value = data.descripcion
        document.querySelector('#password').value = data.password
    }

}

obtenerUsuarios() // Get all users
btn_create.addEventListener("click", crearUsuario); // Create a new user
// btn_update.addEventListener("click", editarUsuario); // Update a user
