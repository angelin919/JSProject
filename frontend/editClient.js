
export function editCluentForm() {
    const formEditContact = document.createElement('form'),
        h2 = document.createElement('h2'),
        inputEditName = document.createElement('input'),
        inputEditsurname = document.createElement('input'),
        inputEditlastName = document.createElement('input'),
        labelEditName = document.createElement('label'),
        labelEditsurname = document.createElement('label'),
        labelEditlastName = document.createElement('label'),
        divBt = document.createElement('div'),
        divContacts = document.createElement('div'),
        btEditAddContact = document.createElement('input'),
        btEditeSaveContact = document.createElement('input'),
        btEditDel = document.createElement('input'),
        span = document.createElement('span'),
        closeImg = document.createElement('img')


    span.classList.add('spanTitle')
    span.style.marginLeft = '10px'

    closeImg.classList.add('close_img')
    closeImg.src = './img/close.png'
    formEditContact.classList.add('formEditContact')
    formEditContact.setAttribute('id', 'formEditContact')
    formEditContact.name = 'formEditContact'

    h2.classList.add('titleClient')
    inputEditName.classList.add('inputEditName')
    inputEditsurname.classList.add('inputEditsurname')
    inputEditlastName.classList.add('inputEditlastName')

    btEditAddContact.classList.add('btEditAddContact')
    btEditeSaveContact.classList.add('btEditeSaveContact')
    btEditDel.classList.add('btEditDel')
    divBt.classList.add('divBt')
    divContacts.classList.add('divContacts')
    // h2.innerHTML = 'Изменить данные'
    btEditAddContact.value = 'Добавить контакт'
    btEditAddContact.type = 'submit'
    btEditeSaveContact.value = 'Сохранить'
    btEditeSaveContact.type = 'submit'
    btEditDel.value = 'Удалить контакт'
    btEditDel.type = 'submit'
    labelEditName.textContent = 'Имя'
    labelEditsurname.textContent = 'Фамилия'
    labelEditlastName.textContent = 'Отчество'

    h2.innerHTML = `Изменить данные:`
    // span.innerText = client.id
    // inputEditsurname.value = client.surname
    // inputEditName.value = client.name
    // inputEditlastName.value = client.lastName


    const section = document.getElementById(('sc'))

    formEditContact.append(closeImg)
    formEditContact.append(h2)
    formEditContact.append(span)
    formEditContact.append(labelEditsurname)
    formEditContact.append(inputEditsurname)
    formEditContact.append(labelEditName)
    formEditContact.append(inputEditName)
    formEditContact.append(labelEditlastName)
    formEditContact.append(inputEditlastName)
    divBt.append(btEditAddContact, btEditeSaveContact)
    formEditContact.append(divContacts)
    formEditContact.append(divBt)
    formEditContact.append(btEditDel)
    section.append(formEditContact)


    return formEditContact

}

