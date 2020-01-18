function principal(){
    inicializar()
    processar()
    finalizar()
}

function inicializar(){
    console.log('inicializar')
}

function processar(){
    if(1==1) return
    console.log('processar')
}

function finalizar(){
    console.log('finalizar')
}

principal()