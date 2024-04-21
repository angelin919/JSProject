
export function validateClientForm(){
    const newClientForm = document.getElementById('newClient'),
    inputClientName = document.getElementById('name'),
    inputClientlastName = document.getElementById('lastName'),
    inputClientsurname = document.getElementById('surname'),
    inputClientArr = [inputClientName, inputClientlastName, inputClientsurname],
    regexp = /[^а-яА-ЯёЁ]+$/g,

    errowBlock = document.getElementById('errowBlock'),
    errowBlockMassage = document.getElementById('errowBlockMassage')

    errowBlock.style.display = 'block'

    console.log(inputClientArr)

    inputClientArr.forEach(function(input){

        console.log(input)

        input.addEventListener('input', function(e){
            e.preventDefault()
            
            errowBlockMassage.textContent = ''
            input.style.borderColor = 'rgba(200, 197, 209, 1)'
            console.log('что то пишут')
    
    
        })

    })


    if(!checkInput(inputClientName, errowBlockMassage, 'имя')){
        return false
    } else if(!checkInput(inputClientsurname, errowBlockMassage, 'Фамилия')) {
        return false
    } else if(!checkInput(inputClientlastName, errowBlockMassage, 'Отчество')) {
        return false
    } else if (!checkRegexp(inputClientsurname, errowBlockMassage, 'Фамилия', regexp)){
        return false
    } else if (!checkRegexp(inputClientName, errowBlockMassage, 'имя', regexp)){
        return false
    }else if (!checkRegexp(inputClientlastName, errowBlockMassage, 'Отчество', regexp)){
        return false
    } else {
        return true
    }

}



function checkInput(input, massage, name){

    if(input.value == ''){

        massage.textContent = `Поле ${name} не может быть пустым`
        input.style.borderColor = 'rgba(240, 106, 77, 1)'
        // block.append(massage)
        console.log(massage)

        
        return false

    } else {
        // massage.parentNode.remove()
        massage.textContent = ''
        input.style.borderColor = 'rgba(200, 197, 209, 1)'

    }

    return true

}

function checkRegexp(input, massage, name, regexp){

    if(regexp.test(input.value) || input.value.length < 2){
        // massage.textContent = ''
        
        massage.textContent = `Поле ${name} содержит недопустимые символы или корочe 2-х букв`
        input.style.borderColor = 'rgba(240, 106, 77, 1)'
        // block.append(massage)
        console.log(massage)

        
        return false

    } else {
        // massage.parentNode.remove()
        massage.textContent = ''
        input.style.borderColor = 'rgba(200, 197, 209, 1)'

    }

    return true

}

// function inputChange(input, massage){

//     input.addEventListener('change', function(){
//         massage.textContent = ''
//         input.style.borderColor = 'rgba(200, 197, 209, 1)'

//     })

// }

// inputClient.oninput = function(){
                
//     errowBlockMassage.textContent = ''
//     inputClient.style.borderColor = 'rgba(200, 197, 209, 1)'
//     console.log('что то пишут')
// }

    // inputClient.addEventListener('change', function(e){
    //     e.preventDefault()
        
    //     errowBlockMassage.textContent = ''
    //     inputClient.style.borderColor = 'rgba(200, 197, 209, 1)'
    //     console.log('что то пишут')


    // })
    




