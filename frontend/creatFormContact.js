import { formAddContact, divBlockArr } from "./js.js";

export function creatFormContact() {
    const select = document.createElement('select'),
        input = document.createElement('input'),
        optionPhone = document.createElement('option'),
        optionTelPlus = document.createElement('option'),
        optionEmail = document.createElement('option'),
        optionVK = document.createElement('option'),
        optionFacebook = document.createElement('option'),
        delBtValueInput = document.createElement('span'),
        divBlock = document.createElement('div')

    const addContact = document.getElementById('addContact')

    select.classList.add('select-css')
    input.classList.add('contactValue')
    delBtValueInput.classList.add('delBtValueInput')
    divBlock.classList.add('divBlock')

    input.placeholder = 'Введите данные контакта'
    input.name = 'contacts'

    optionPhone.value = 'phone'
    optionPhone.innerHTML = 'Телефон'
    optionTelPlus.value = 'telPlus'
    optionTelPlus.innerHTML = 'Доп. телефон'
    optionEmail.value = 'email'
    optionEmail.innerHTML = 'Email'
    optionVK.value = 'vk'
    optionVK.innerHTML = 'VK'
    optionFacebook.value = 'facebook'
    optionFacebook.innerHTML = 'Facebook'


    select.append(optionPhone)
    select.append(optionTelPlus)
    select.append(optionEmail)
    select.append(optionVK)
    select.append(optionFacebook)
    divBlock.append(select)
    divBlock.append(input)
    divBlock.append(delBtValueInput)
    formAddContact.append(divBlock)

    // delBtValueInput Удалить строку контакт клиента
    delBtValueInput.addEventListener('click', function (e) {
        e.preventDefault()

        const formEditContact = document.getElementById('formEditContact')
        if (formEditContact !== null) {
            let divContactsBlockArr = Array.from(formEditContact.querySelectorAll('.divBlock'))

            if (divContactsBlockArr.length > 0) {
                e.preventDefault()
                const index = divContactsBlockArr.indexOf(divBlock)
                divContactsBlockArr.filter((block, ind, arr) => {
                    if (ind === index) {
                        arr.pop(block[ind])

                    }
                })

                divBlock.remove()
                if (divContactsBlockArr.length < 10) {
                    const btEditAddContact = document.querySelector('.btEditAddContact')

                    if (btEditAddContact.disabled) {
                        btEditAddContact.removeAttribute("disabled")
                    }

                    if (addContact.disabled) {
                        addContact.removeAttribute("disabled")

                    }

                }

            }

        }

        if (divBlockArr.length > 0) {
            const index = divBlockArr.indexOf(divBlock)
            divBlockArr.filter((block, ind, arr) => {
                if (ind === index) {
                    arr.pop(block[ind])
                }
            })

            divBlock.remove()
            if (divBlockArr.length < 10) {
                addContact.removeAttribute("disabled")

            }
        }

    })

    return divBlock

}