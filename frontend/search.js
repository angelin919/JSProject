import { clientArr } from './js.js'
import { creatTbody } from './table.js'
import { serverSearchClients } from './server.js'

//search

const searchAria = document.getElementById('search_aria')
const search = document.getElementById('search')
const ul = document.createElement('ul')
ul.classList.add('ulSearchClient')

searchAria.addEventListener('input', searchEvent)

export async function searchEvent(value) {

    value = searchAria.value.trim()
    const clients = await serverSearchClients(value)

    if (ul.querySelectorAll('li')) {
        ul.querySelectorAll('li').forEach(function (li) {
            li.remove()
        })
    }

    clients.forEach(client => {

        if (value !== '') {
            ul.style.display = 'block'
            const li = document.createElement('li'),
                a = document.createElement('a')
            let link;
            li.append(a)
            ul.append(li)
            search.append(ul)
            a.innerText = `${client.surname} ${client.name} ${client.lastName}`
            const str = a.innerText // Текст ссылка ФИО

            if (!str.toLowerCase().includes(value.toLowerCase())) {
                console.log("Нет совпадений")
            } else {
                const newArr = []
                a.innerHTML = markLetter(str, str.toLowerCase().search(value.toLowerCase()), value.length)
                let linksTD = getColumnSurname(value, newArr)
                a.addEventListener('click', function (e) {
                    e.preventDefault()
                    link = a.textContent.toLowerCase()
                    linksTD.forEach(function (linkTD) {
                        console.log(link)
                        console.log(linkTD.textContent.toLowerCase())
                        if (link == linkTD.textContent.toLowerCase()) {
                            linkTD.closest('tr').classList.toggle('animation')
                            linkTD.scrollIntoView({ block: "center", behavior: "smooth" })

                            const timerId = setTimeout(() => {
                                linkTD.closest('tr').classList.toggle('animation')
                            }, 3000)
                            // clearTimeout(timerId)

                        } else {
                            console.log(link, linkTD, 'NOT = NOT')
                        }
                    })

                })

            }

        } else {
            ul.style.display = 'none'
            reTable(clientArr)
        }

    });

}

async function reTable(arr) {
    const tbody = document.getElementById('tbody')
    tbody.innerHTML = ''
    arr.forEach(function (client) {
        client.contacts.forEach(function (contact) {
        })
        creatTbody(client)
    })

}

function getColumnSurname(value, arr) {
    const tbody = document.getElementById('tbody')
    const tdfioClient = tbody.getElementsByClassName('td_FIO')
    for (let f of tdfioClient) {
        if (!f.textContent.toLowerCase().includes(value.toLowerCase().trim())) {
            console.log('not found value')
        } else {
            f.innerHTML = markLetter(f.textContent, f.textContent.toLowerCase().search(value.toLowerCase().trim()), value.trim().length)
            console.log(f)
            arr.push(f)
        }
    }
    return arr

}

function markLetter(str, pos, len) {
    console.log('выделяем')
    str.slice(0, pos) + '<b>' + str.slice(pos, pos + len) + '</b>' + str.slice(pos + len)
    return str.slice(0, pos) + '<b>' + str.slice(pos, pos + len) + '</b>' + str.slice(pos + len)
}






