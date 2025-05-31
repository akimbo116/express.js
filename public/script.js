const input = document.querySelector(".todo-input")


const addButton = document.querySelector('.add-btn')
.addEventListener('click', () => {
    const text = input.value.trim();
    if (!text) return alert("isi text tidak boleh kosong");
    fetch('/list',{
        method: "post",
        headers : {"Content-Type" : "application/json"},
        body : JSON.stringify({text : text})
    })
    .then(response => {
        if (!response.ok) {
            return response.json()
            .then(err => {throw new Error('Terjadi kesalahan' + err.message)})
        }
        return response.json();

    })
    .then((data) => {
        console.log(data)
        tampilkanData()
        input.value = "";
    })
    .catch(err => console.log("Kesalahan " + err.message))
        
});

function tampilkanData(data){
    const ul = document.querySelector('.todo-list')
    fetch('/list')
        .then((response) => response.json())
        .then((data )=> {
            ul.innerHTML = "";
            data.forEach(d => {
                const li = document.createElement('li')
                li.innerHTML = `
                    <li class="todo-item animate">
                        <span>${d.text}</span>
                        <button class="delete-btn" onclick="deleteList(${d.id})">✕</button>
                        <button class="check-btn" onclick="updateList(${d.id})">✔</button>
                    </li>
                `;
                ul.appendChild(li)    
            });
        })
}
async function updateList(id){
    try{
        const response = await fetch('/list/' + id,{
            method : "put"
        });
        if (!response.ok){
        return response.json().then((err) => {
            throw new Error("Terjadi Kesalahan " + err.message)
        })
        }
        const data = await response.json()
        tampilkanData(data);
    }catch(err){
        console.log("Terjadi Kesalahan " + err.message)
    }
}

async function deleteList(id){
    try{
        const response = await fetch('/list/' + id,{
            method : "delete"
        });
        if (!response.ok){
        return response.json().then((err) => {
            throw new Error("Terjadi Kesalahan server " + err.message)
        })
        }
        const data = await response.json();
        tampilkanData(data);
    }catch(err){
        console.log("terjadi sesuatu "+err.message)
    }
}

tampilkanData()



