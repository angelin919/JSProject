
export function preLoader(){
const preLoaderBlock = document.createElement('div'),
preLoaderRow = document.createElement('img')
preLoaderRow.src = './img/preload.svg'

preLoaderBlock.classList.add('preLoaderBlock')
preLoaderRow.classList.add('preLoaderRow')

preLoaderBlock.append(preLoaderRow)

return preLoaderBlock

}