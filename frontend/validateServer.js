
export function createErrorsBlock(massage, nameErr){
    const newClientBlock = document.getElementById('newClientBlock'),
    inputClientName = document.getElementById('name'),
    inputClientlastName = document.getElementById('surname'),
    inputContactValue = document.getElementsByClassName('contactValue'),
    inputClientArr = [inputClientName, inputClientlastName],
    errowBlock = document.createElement('div'),
    errowBlockMassage = document.createElement('p') //Создаю элемент сообщения
    errowBlockMassage.classList.add('errowBlockMassage')
    errowBlock.classList.add('errowBlock')
    errowBlock.style.display = 'block'
    // console.log(inputClientArr)
    // console.log(inputContactValue)

    if(inputContactValue){
        const contacts = Array.from(inputContactValue)
        contacts.forEach(function(contact){ 
            inputClientArr.push(contact)
        // console.log(inputClientArr)
        })
    }

    inputClientArr.forEach(function(item){  //перебераю поля для ввода имя и фамилия

        item.addEventListener('input', function(e){
            e.preventDefault()
            clearMassegeBlock(item, errowBlock)


        })
        

        if(nameErr && item.value == ''){

            errowBlockMassage.textContent = massage
            errowBlock.append(errowBlockMassage)
            item.style.borderColor = 'rgba(240, 106, 77, 1)'

            return false

        } else {
            item.style.borderColor = 'rgba(200, 197, 209, 1)'
            // errowBlockMassage.remove()
            
    
        }


    })

    newClientBlock.append(errowBlock)


}

function clearMassegeBlock(input, block){
    block.remove() //Удаляю элемент сообщения, если что то вводят в поля
    input.style.borderColor = 'rgba(200, 197, 209, 1)'
    console.log('что то пишут')

}

