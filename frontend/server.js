const SERVER_URL = 'http://localhost:3000'

export async function serverAddClient(obj){
    let res = await fetch(SERVER_URL + '/api/clients', {
    method: "POST",
    headers:{'Content-Type': 'application/json'},
    body:JSON.stringify(obj),

    })

    let data = await res.json()
    console.log(data)

    return data
}

export async function serverGetClients(){
    let res = await fetch(SERVER_URL + '/api/clients', {
    method: "GET",
    headers:{'Content-Type': 'application/json'},

    })
    let data = await res.json()
    return data
}

export async function serverDelClients(id){
    let res = await fetch(SERVER_URL + '/api/clients/'+id, {
    method: "DELETE",
    

    })
    let data = await res.json()
    return data
}

export async function serverGetClient(id){
    let res = await fetch(SERVER_URL + '/api/clients/'+id, {
    method: "GET",
    headers:{'Content-Type': 'application/json'},

    })
    let data = await res.json()
    return data
}
export async function serverPatchClient(client){
    let res = await fetch(SERVER_URL + '/api/clients/'+client.id, {
    method: "PATCH",
    headers:{'Content-Type': 'application/json'},
    body:JSON.stringify(client),


    })
    let data = await res.json()
    return data
}
export async function serverSearchClients(value){
    let res = await fetch(SERVER_URL + `/api/clients?search=${value}`, {
    method: "GET",
    headers:{'Content-Type': 'application/json'},

    })
    let data = await res.json()
    return data
}