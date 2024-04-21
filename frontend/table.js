
import { creatContactClient, clientArr, render, divBlockArr } from "./js.js";
import { editCluentForm } from "./editClient.js";
import { serverDelClients, serverPatchClient, serverGetClient } from "./server.js";
import { dateFormater } from "./dateFormater.js";
import { attentionBlock } from "./attentionBlock.js";
import { creatFormContact } from "./creatFormContact.js";
import { createErrorsBlock } from "./validateServer.js";

export function creatTbody(client) {
    //Создаем таблицу
    const tbody = document.getElementById('tbody'),
        tr = document.createElement('tr'),
        tdID = document.createElement('td'),
        tdFIO = document.createElement('td'),
        tdDateCreat = document.createElement('td'),
        tdDateChange = document.createElement('td'),
        tdContactClient = document.createElement('td'),
        tdBt = document.createElement('td'),
        divBtChange = document.createElement('div'),
        divBtDelete = document.createElement('div')
        // tdBtDelete = document.createElement('td')
    //кнопки к Сотруднику
    const buttonChange = document.createElement('input')
    buttonChange.type = 'submit'
    buttonChange.value = 'Изменить'

    const buttonDelete = document.createElement('input')
    buttonDelete.type = 'submit'
    buttonDelete.value = 'Удалить'

    const preloadSvg = document.createElement('img')
    preloadSvg.classList.add('preloader_bt_svg')
    preloadSvg.src = './img/load.svg'

    const changeSVG = document.createElement('img')
    changeSVG.src = './img/edit.svg'

    const delSVG = document.createElement('img')
    delSVG.src = './img/Vector-9.svg'

    tdContactClient.classList.add('td_contact_client')
    //  const contactsBlock = document.createElement('div')

    tdFIO.classList.add('td_FIO')

    //Стили для кнопок
    tdBt.classList.add('tdBt')

    buttonChange.classList.add('buttonChange')
    buttonDelete.classList.add('buttonDelet')
    divBtChange.style.position = 'relative'

    tdID.style.color = 'rgba(176, 176, 176, 1)'
    tdID.style.fontSize = '12px'


    const linkArr = [];

    client.contacts.forEach(function (contact) {

        let img = document.createElement('img')
        img.classList.add('imgContact')
        let a = creatContactClient(contact, img)
        tdContactClient.append(a)
        linkArr.push(a)

    });

    if (linkArr.length > 4) {
        for (let i = 3; i < linkArr.length; i++) {
            linkArr[i].style.display = 'none'

        }

        let aMore = document.createElement('a')
        aMore.classList.add('aContactMore')

        let ct = linkArr.length - 4
        aMore.innerHTML = `<span>+${ct}</span>`
        tdContactClient.append(aMore)

        aMore.addEventListener('click', function (e) {

            for (let i = 3; i < linkArr.length; i++) {
                if (linkArr[i].style.display = 'none') {
                    linkArr[i].style.display = 'inline-block'
                    aMore.style.display = 'none'

                }
            }
        });
    }


    tdID.innerHTML = `${client.id}`.substring(0, 6)
    tdFIO.innerHTML = `${client.surname} ${client.name} ${client.lastName}`
    tdDateCreat.innerHTML = dateFormater(`${client.createdAt}`)
    tdDateChange.innerHTML = dateFormater(`${client.updatedAt}`)
    // tdContactClient.innerHTML = `${client.contacts}`

    divBtChange.append(changeSVG)
    divBtChange.append(preloadSvg)
    divBtDelete.append(delSVG)
    divBtChange.append(buttonChange)
    divBtDelete.append(buttonDelete)

    tr.append(tdID)
    tr.append(tdFIO)
    tr.append(tdDateCreat)
    tr.append(tdDateChange)
    tr.append(tdContactClient)
    tdBt.append(divBtChange)
    tdBt.append(divBtDelete)
    tr.append(tdBt)
    
    const sc = document.getElementById('sc')


    //Удалить данные пользователя и строку
    buttonDelete.addEventListener('click', async function (e) {
        e.preventDefault()
        let count = 1
        if (count = 1) {

            const attentionDiv = attentionBlock(sc),
                btDel = attentionDiv.querySelector('.bt_del'),
                btChancel = attentionDiv.querySelector('.bt_chancel')

            sc.classList.toggle('sc_after')
            btChancel.addEventListener('click', function (e) {
                e.preventDefault()
                attentionDiv.remove()
                sc.classList.toggle('sc_after')

            })

            btDel.addEventListener('click', async function (e) {
                e.preventDefault()

                clientArr.forEach(function (clientA, i) {
                    if (client.id == clientA.id) {
                        clientArr.splice(i, 1)
                    }
                })

                await serverDelClients(client.id)

                let elt = buttonDelete.closest('tr').remove()
                attentionDiv.remove()
                sc.classList.toggle('sc_after')
            });
        }
    });

    //Измеить данные пользователя кнопка
    buttonChange.addEventListener('click', async function (e) {
        e.preventDefault()
        let cl = await serverGetClient(client.id) // получение клиента с сервера 

        const trClient = buttonChange.closest('tr'), // клиент в таблице 
            a = editCluentForm(), // форма редактирования клиента
            closeImg = a.querySelector('img'), // получение крестика(закрытие) формы изменения клиента
            divContacts = a.querySelector('.divContacts') // Контакты клиента
        let divContactsBlockArr = [] // пустой массив
        sc.classList.toggle('sc_after')

        closeImg.addEventListener('click', function (e) {
            if (a) {
                a.remove()
                sc.classList.toggle('sc_after')
                divContactsBlockArr = []

            }
        });

        const h2 = a.querySelector('h2')
        a.querySelector('span').innerHTML = 'ID:' + cl.id

        const input = a.querySelectorAll('input')
        input[0].value = `${cl.surname}`
        input[1].value = `${cl.name}`
        input[2].value = `${cl.lastName}`

        for (let i = 0; i < cl.contacts.length; i++) {
            const b = creatFormContact()
            divContacts.append(b)

            let selectAC = b.querySelector('select'),
                inputAC = b.querySelector('input')

            for (let j = 0; j < selectAC.length; j++) {

                if (selectAC[j].value == cl.contacts[i].type) {
                    inputAC.value = cl.contacts[i].value
                    selectAC[j].selected = true;
                }
            }
        }

        const btEditDel = a.querySelector('.btEditDel'),
            btEditeSaveContact = a.querySelector('.btEditeSaveContact'),
            btEditAddContact = a.querySelector('.btEditAddContact')
        let delBts = [],
            delBtArr = []

        if (cl.contacts.length > 9) {
            btEditAddContact.disabled = 'true'
        } else {
            btEditAddContact.removeAttribute("disabled")
        }

        btEditAddContact.addEventListener('click', function (e) {
            e.preventDefault()
            divContactsBlockArr = []

            a.querySelectorAll('.divBlock').forEach(function (divBlock) {
                divContactsBlockArr.push(divBlock)
                divBlock.querySelectorAll('.delBtValueInput').forEach(function (delBt) {
                    delBtArr.push(delBt)
                })
            });

            const b = creatFormContact()
            divContacts.append(b)
            divContactsBlockArr.push(b)


            if (divContactsBlockArr.length > 9) {
                btEditAddContact.disabled = 'true'

            } else {
                console.log(divContactsBlockArr.length, '>> less 9 <<', divContactsBlockArr)
                delBts = []
                delBtArr = []
            }

            delBtArr.forEach(function (delBt, ind) {
                delBt.addEventListener('click', function (e) {
                    e.preventDefault()
                    divContactsBlockArr.pop()
                    if (divContactsBlockArr.length < 10) {
                        btEditAddContact.removeAttribute('disabled')
                    } 
    
                })
            });

        });

        a.querySelectorAll('.divBlock').forEach(function (divBlock) {
            divContactsBlockArr.push(divBlock)
            divBlock.querySelectorAll('.delBtValueInput').forEach(function (delBt) {
                delBtArr.push(delBt)
            })

        });


        //Измеить данные пользователя кнопка

        btEditeSaveContact.addEventListener('click', async function (e) {
            e.preventDefault()
            console.log('Save')

            let typeContact = [],
                inputClientArr = [],
                contacts = [],
                type = a.querySelectorAll('select'),
                value = a.querySelectorAll('.divBlock input')


            type.forEach(function (item) {
                typeContact.push(item.value)
            })

            value.forEach(function (item) {
                inputClientArr.push(item.value)
            })


            for (let x = 0; x < typeContact.length; x++) {
                contacts.push({
                    'type': typeContact[x],
                    'value': inputClientArr[x]
                })

            }

            cl = {
                id: client.id,
                name: input[1].value,
                surname: input[0].value,
                lastName: input[2].value,
                contacts: contacts

            }

            const td = trClient.querySelector('.buttonChange').closest('td')
            const btChgImg = td.querySelector('img')
            let errowBlock = document.getElementsByClassName('errowBlock')

            try {
                let dataRes = await serverPatchClient(cl)
                while (errowBlock.length > 0) {
                    for (let x = 0; x < errowBlock.length; x++) {
                        errowBlock[x].remove()
                    }
                }

                if (!dataRes.errors) {
                    console.log('CLIENT CHANGED')
                    btChgImg.style.visibility = 'hidden'
                    preloadSvg.style.display = 'block'
                   clientArr.forEach((clientTable,ind) => {
                        if (dataRes.id == clientTable.id) {
                            clientArr.splice(ind,1, dataRes)
                    
                        }
                    
                    })

                    preloadSvg.style.display = 'block'
                    render(clientArr)
                    setTimeout(() => {
                        render(clientArr)
                        preloadSvg.style.display = 'none'
                        btChgImg.style.visibility = 'visible'
                        a.remove()
                    }, 300)
                    trClient.remove()

                } else {

                    console.log('errors')
                    dataRes.errors.forEach(function (error) {
                        console.log('errors message')
                        console.log(error)
                        createErrorsBlock(error.message, error.field)

                    });

                }



            } catch (error) {
                console.log(error)

            } finally {
                sc.classList.toggle('sc_after')

            }

        })

        //Удаление клиента карточка
        btEditDel.addEventListener('click', async function (e) {
            e.preventDefault()
            let count = 1
            if (count = 1) {
                const attentionDiv = attentionBlock(sc)
                const btDel = attentionDiv.querySelector('.bt_del')
                const btChancel = attentionDiv.querySelector('.bt_chancel')
                a.style.display = 'none'

                btChancel.addEventListener('click', function (e) {
                    e.preventDefault()
                    attentionDiv.remove()
                    sc.classList.toggle('sc_after')
                    // a.style.display = 'block'
                    a.remove()

                })

                btDel.addEventListener('click', async function (e) {
                    e.preventDefault()
                    await serverDelClients(cl.id)
                    trClient.remove()
                    attentionDiv.remove()
                    a.remove()
                })
            }
        });
    });

    tbody.append(tr)

    return {
        tbody,
        tr,
        buttonDelete,
        buttonChange,

    }
};





