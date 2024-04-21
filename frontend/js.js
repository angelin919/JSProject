import { serverAddClient, serverGetClients, serverDelClients } from "./server.js"
import { creatTbody } from "./table.js"
import { creatFormContact } from "./creatFormContact.js"
import { preLoader } from "./preloader.js"
import { createErrorsBlock } from './validateServer.js'
import { } from './search.js'


let column = '',
    ColumnDir = 'true'

//Массив Контактов
export let clientArr = []
let serverDataClients = await serverGetClients()
console.log(serverDataClients)

//Массив картинок
let contactsImgArr = [
    { id: "facebook", type: 'facebook', img: './img/fb-2.svg' },
    { id: "ВК", type: 'vk', img: './img/vk-3.svg' },
    { id: "Телефон", type: 'phone', img: './img/phone.svg' },
    { id: "Доп. Телефон", type: 'telPlus', img: './img/phone.svg' },
    { id: "Почта", type: 'email', img: './img/mail-2.svg' }
]

if (serverDataClients !== null) {
    clientArr = serverDataClients

}

render(clientArr)

//получение кнопок (добавить нового клиента, блок данных клиента, крестик)
const buttonNC = document.getElementById('buttonNC')
const newClient = document.getElementById('newClient')
const closeImg = document.querySelector('.close_img')
const sc = document.getElementById('sc')

export const newClientBlock = document.getElementById('newClientBlock')
export const formAddContact = document.getElementById('formAddContact')

//Кнопка открыть модальное окно добавить нового клиента
buttonNC.addEventListener('click', function (e) {
    e.preventDefault()
    if (newClientBlock.style.display !== 'block') {
        newClientBlock.style.display = 'block'
        sc.classList.toggle('sc_after')
    } else {
        newClientBlock.style.display = 'none'
        sc.classList.toggle('sc_after')
        document.body.style.backgroundColor = '#F5F5F5'
    }

})

//Кнопка закрыть модальное окно(крестик)

closeImg.addEventListener('click', function (e) {
    e.preventDefault()
    newClientBlock.style.display = 'none'
    sc.classList.toggle('sc_after')

})


//получение кнопку addContact созданик поля для ввода нового контакта
const addContact = document.getElementById('addContact')
const btCancel = document.getElementById('cancel')
export let divBlockArr = []

//Кнопка добавить контакт по клику до 8 контактов
addContact.addEventListener('click', function (e) {
    e.preventDefault()
    let contactElm = creatFormContact()
    formAddContact.style.display = 'block'
    divBlockArr.push(contactElm)

    if (divBlockArr.length > 9) {
        addContact.disabled = 'true'
    }

})


//cancel
btCancel.addEventListener('click', function (e) {
    e.preventDefault()
    cleanValue()
})

function cleanValue() {
    let values = newClient.querySelectorAll('input')
    let divBlocks = document.querySelectorAll('.divBlock')
    divBlocks.forEach(function (divBlock) {
        divBlock.remove()
    })
    values.forEach(function (value) {

        value.value = ''
    })
    newClientBlock.style.display = 'none'
    sc.classList.toggle('sc_after')

}


//получение ФИО
const newClientlastName = document.getElementById('lastName')
const newClientName = document.getElementById('name')
const newClientsurname = document.getElementById('surname')


//получение кнопки Сохранить
const btSave = document.getElementById('save')

//кнопка сохранить по клику
btSave.addEventListener('click', async function (e) {
    e.preventDefault()
    console.log('save client button')
    let contacts = [],
        typeContact = [],
        inputClientArr = []

    // if(!validateClientForm()){
    //     console.log('Валидация не прошла')
    //     return false
    // } else {

    let type = formAddContact.querySelectorAll('select')
    type.forEach(function (item) {
        typeContact.push(item.value)

    })
    let value = Array.from(formAddContact.querySelectorAll('input'))
    value.forEach(function (item) {
        inputClientArr.push(item.value)
    })

    for (let x = 0; x < inputClientArr.length; x++) {
        contacts.push({
            'type': typeContact[x],
            'value': inputClientArr[x]
        })

    }

    let client = {
        name: newClientName.value,
        lastName: newClientlastName.value,
        surname: newClientsurname.value,
        contacts: contacts,

    }

    const preloadSvg = document.querySelector('.preloader_svg')
    let errowBlock = document.getElementsByClassName('errowBlock')
    try {

        const dataRes = await serverAddClient(client)
        while (errowBlock.length > 0) {
            for (let x = 0; x < errowBlock.length; x++) {
                errowBlock[x].remove()
            }
        }

        if (!dataRes.errors) {
            console.log('CLIENT ADD')
            preloadSvg.style.display = 'block'
            clientArr.push(dataRes)
            render(clientArr)
            setTimeout(() => {
                preloadSvg.style.display = 'none'
                cleanValue()
            }, 300)
            divBlockArr = []
        } else {
            dataRes.errors.forEach(function (error) {
                createErrorsBlock(error.message, error.field)

            });

        }

    } catch (e) {
        console.log('errors catch')
        console.log(e)

    } finally {
        console.log('errors finally')
        console.log(client)

    }
    // }    


})


//Рендер

export function render(clientArr) {
    let copyArr = [...clientArr]
    copyArr = sortClients(column, ColumnDir)
    tbody.innerHTML = ''
    copyArr.forEach(function (client) {
        client.contacts.forEach(function (contact) {
            // console.log(contact)

        })
        creatTbody(client)
    })
}

//Получить колонку таблицы клиента
const thAll = document.querySelectorAll('th')

thAll.forEach(element => {
    if (element.dataset.column) {
        element.addEventListener('click', function (e) {
            e.preventDefault()
            column = this.dataset.column
            const img = element.querySelector('img')
            img.classList.toggle('roteat')
            ColumnDir = !ColumnDir
            render(clientArr)

        })
    }

})

//Получить строку из таблицы клиента
const trAll = document.querySelectorAll('tr')
trAll.forEach(element => {
    element.addEventListener('click', function (e) {
        e.preventDefault()
        let clientTr = element
        let id = clientTr.querySelector('td')

    })
})


//Устаноливает тип и картинку для контактов
export function creatContactClient(contact, img) {

    let linkContact = document.createElement('a')
    let linkSpan = document.createElement('span')

    linkContact.classList.add('link_contacts')
    linkSpan.classList.add('tooltipContact')

    contactsImgArr.forEach(function (imgType) {

        if (imgType.type === contact.type) {
            img.src = imgType.img
            // img.title = `${imgType.id}: ${contact.value}`
            linkSpan.innerHTML = `${imgType.id}: ${contact.value}`
            linkContact.append(img)
            linkContact.append(linkSpan)

        }
    })

    return linkContact

}

//SORT
function sortClients(prop, dir) {
    let copyArr = [...clientArr]
    return copyArr.sort(function (A, B) {
        if ((!dir == false ? A[prop] < B[prop] : A[prop] > B[prop]))
            return -1
    })

}

sc.append(preLoader())
window.onload = test();

function test() {
    const preloader = document.querySelector('.preLoaderBlock')
    //   sc.classList.add('loaded_hiding')
    window.setTimeout(function () {
        sc.classList.remove('loaded_hiding')
        preloader.remove()
    }, 300);
}




//Export
export { newClientlastName, newClientName, newClientsurname }



