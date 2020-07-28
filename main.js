const tableBody = document.getElementById('characters-table-body')
const tableFooter = document.getElementById('characters-table-foot')

window.onload = () => {
    getApiData('https://rickandmortyapi.com/api/character')
}

const getApiData = url => {
    fetch(url, {method: 'GET'})
        .then(response => {
            if (!response.ok) throw new Error('response Error')
            return response.json()
        }).then(data => {
        renderTableBody(data.results)
        renderTableFooter(data.info)
    }).catch(error => console.log(error))
}

const renderTableBody = data => {
    tableBody.innerHTML = ''
    data.sort((a, b) => (a.name - b.name)).forEach(dataObj => {
        tableBody.insertRow().innerHTML =
            `<td>${dataObj.name}</td>
                 <td><img src="${dataObj.image}" alt="${dataObj.name}-img" class="rounded img-fluid"></td>
                 <td>${dataObj.status}</td>
                 <td>${dataObj.species}</td>
                 <td>${dataObj.gender}</td>
                 <td>${dataObj.origin.name}</td>
                 <td>${dataObj.location.name}</td>`
    })
}

const renderTableFooter = info => {
    tableFooter.innerHTML = ''
    const totalPages = info.pages
    const previousPageAction = `onclick="${info.prev ? `getNewData('${info.prev}')` : ''}"`
    const nextPageAction = `onclick="${info.next ? `getNewData('${info.next}')` : ''}"`
    const currentPage = parseInt(info.next.match(/\d+/g)[0]) - 1
    tableFooter.insertRow().innerHTML =
        `<td colspan="7">
                <div>
                    <button type="button" role="link" class="btn btn-secondary" ${previousPageAction}>Previous</button>
                    <button type="button" class="btn btn-secondary current-page" disabled>Page: ${currentPage}/${totalPages}</button>
                    <button type="button" role="link" class="btn btn-secondary" ${nextPageAction}>Next</button>
                </div>
            </td>`
}

const getNewData = newUrl => {
    window.scrollTo(0, 0)
    getApiData(newUrl)
}