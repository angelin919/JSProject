
export function attentionBlock(block){
    const div = document.createElement('div')
    const h3 = document.createElement('h3')
    
    const p = document.createElement('p')
    const span = document.createElement('span')
    
    const btDel = document.createElement('button')
    const btChancel = document.createElement('button')
    
    btDel.classList.add('bt_del')
    btChancel.classList.add('bt_chancel')
    div.classList.add('attention_block')
    span.classList.add('bt_attention_block')
    
    btDel.style.padding = '12px 35px'
    btDel.style.marginTop = '12px'
    btDel.style.background = '#9873FF'
    // btDel.style.display = 'block'
    
    h3.style.paddingBottom = '10px'
    
    p.textContent = 'Вы действительно хотите удалить данного клиента?'
    btDel.textContent = 'Удалить'
    btChancel.textContent = 'Отмена'
    h3.textContent = 'Удалить клиента'
    div.append(h3)
    div.append(p)
    span.append(btDel)
    span.append(btChancel)
    div.append(span)
    block.append(div)
    
    return div
    
    }