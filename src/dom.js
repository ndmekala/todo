const pagePopulate = (a) => {
    const box = document.querySelector('#testdiv')
    const displayElement = (currentValue) => {
        for (let key in currentValue) {
            box.innerHTML += key + ': ' + currentValue[key] + '<br>';
        }
        box.innerHTML += '<br>'
    }
    a.forEach(element => displayElement(element))
}

export {pagePopulate}