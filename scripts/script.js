document.addEventListener("DOMContentLoaded", function () {
    let inpBuscar = document.getElementById("inputGet1Id");
    let btnBuscar = document.getElementById("btnGet1");
    btnBuscar.addEventListener("click", function () {
        fetch(`https://654235e1f0b8287df1ffb39a.mockapi.io/users/${inpBuscar.value}`,
            {
                method: 'GET',
            })
            .then(function (response) {
                if (!response.ok) {
                    if (response.status === 404) {
                        throw new Error("No existe tal persona");
                    } else {
                        throw new Error("No se pudo cargar la informacion de tal persona");
                    }
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                let resultado = document.getElementById("results");

                if (inpBuscar.value === "") {
                    let auxHTML = "";
                    if (Array.isArray(data)) {
                        for (let c = 0; c < data.length; c++) {
                            auxHTML += `
                            <br>
                            <div>
                                ID: ${data[c].id} <br>
                                Nombre: ${data[c].name} <br>
                                Apellido: ${data[c].lastname}
                            </div>
                            <br>
                        `;
                        }
                        resultado.innerHTML = auxHTML;
                    }
                } else {
                      if (data != undefined && data.id != undefined) {
                        resultado.innerHTML = `
                            ID: ${data.id} <br>
                            Nombre: ${data.name} <br>
                            Apellido: ${data.lastname}
                        `;
                    } else {
                        alert("Algo salio mal")
                    }
                }
            })
            .catch(function (error) {
                if (error.message === "No existe tal persona") {
                    resultado.innerHTML = "Esa persona no existe";
                }
            });
    });

    let inpNombre = document.getElementById("inputPostNombre");
    let inpApellido = document.getElementById("inputPostApellido");
    let btnAgregar = document.getElementById("btnPost");

    inpNombre.addEventListener("input", validarEntrada);
    inpApellido.addEventListener("input", validarEntrada);
    btnAgregar.addEventListener("click", function() {
        let nuevoUsuario = {
            name: inpNombre.value,
            lastname: inpApellido.value
        };
        console.log(nuevoUsuario);
        fetch(`https://654235e1f0b8287df1ffb39a.mockapi.io/users`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(nuevoUsuario)
            })
            .then(response => response.json())
            .then(data => {
            console.log(data);
            
            fetch(`https://654235e1f0b8287df1ffb39a.mockapi.io/users`,
            {
                method: 'GET',
            })
            .then(response =>response.json())
            .then(data =>{
                console.log(data);
                let resultado = document.getElementById("results");
                resultado.innerHTML = '';
                for(i = 0; i < data.length; i++)
                {
                    resultado.innerHTML +=
                    `
                        ID: ${data[i].id} <br>
                        Nombre: ${data[i].name} <br>
                        Apellido: ${data[i].lastname} <br>
                        <br>
                    `;
                }
            })
        })
    })

    let inpModificar = document.getElementById("inputPutId");
    let inpPutNombre = document.getElementById("inputPutNombre");
    let inpPutApellido = document.getElementById("inputPutApellido");
    let btnModificar = document.getElementById("btnPut");
    let btnEnviarMod = document.getElementById("btnSendChanges");
    
    inpModificar.addEventListener("input", validarModificar);
    btnEnviarMod.addEventListener("click", function(){
        let modificadoUsuario = {name : inpPutNombre.value,
        lastname : inpPutApellido.value};
        fetch(`https://654235e1f0b8287df1ffb39a.mockapi.io/users/${inpModificar.value}`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(modificadoUsuario)
        })
        .then(function (response) {
            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error("No existe tal persona");
                } else {
                    throw new Error("No se pudo cargar la informacion de tal persona");
                }
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            fetch(`https://654235e1f0b8287df1ffb39a.mockapi.io/users`,
            {
                method: 'GET',
            })
            .then(response =>response.json())
            .then(data =>{
                console.log(data);
                let resultado = document.getElementById("results");
                resultado.innerHTML = '';
                for(i = 0; i < data.length; i++)
                {
                    resultado.innerHTML +=
                    `
                        ID: ${data[i].id} <br>
                        Nombre: ${data[i].name} <br>
                        Apellido: ${data[i].lastname} <br>
                        <br>
                    `;
                }
            })
        })
    });

    let inpBorrar = document.getElementById("inputDelete");
    let btnBorrar = document.getElementById("btnDelete");

    inpBorrar.addEventListener("input", validarBorrar);
    btnBorrar.addEventListener("click", function(){
        fetch(`https://654235e1f0b8287df1ffb39a.mockapi.io/users/${inpBorrar.value}`,
        {
            method: 'DELETE',
        })
        .then(function (response) {
            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error("No existe tal persona");
                } else {
                    throw new Error("No se pudo cargar la informacion de tal persona");
                }
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            fetch(`https://654235e1f0b8287df1ffb39a.mockapi.io/users`,
            {
                method: 'GET',
            })
            .then(response =>response.json())
            .then(data =>{
                console.log(data);
                let resultado = document.getElementById("results");
                resultado.innerHTML = '';
                for(i = 0; i < data.length; i++)
                {
                    resultado.innerHTML +=
                    `
                        ID: ${data[i].id} <br>
                        Nombre: ${data[i].name} <br>
                        Apellido: ${data[i].lastname} <br>
                        <br>
                    `;
                }
            })
        })
    });

    function validarEntrada() {
        if (inpNombre.value.trim() !== "" && inpApellido.value.trim() !== "") {
            btnAgregar.disabled = false;
        } else {
            btnAgregar.disabled = true;
        }
    };

    function validarModificar() {
        if(inpModificar.value.trim() !== "")
        {
            btnModificar.disabled = false;
        }
        else
        {
            btnModificar.disabled = true;
        }
    };
   
    function validarBorrar() {
        if(inpBorrar.value.trim() !== "")
        {
            btnBorrar.disabled = false;
        }
        else
        {
            btnBorrar.disabled = true;
        }
    };
})
