let currentPage = window.location.pathname
const items = document.querySelectorAll('header .links a')

for (let item of items) {
    if (currentPage.includes(item.getAttribute('href'))) {
        item.classList.add('active')
    }
}

let selectedPage = 15,
    totalPages = 20,
    pages = [],
    oldPage


for (let currentPage = 1; currentPage <= totalPages; currentPage++) {

    const firstAndLastPage = currentPage == 1 || currentPage == totalPages
    const pagesAfterSelectedPage = currentPage <= selectedPage + 2
    const pagesBeforeSelectedPage = currentPage >= selectedPage - 2

    if (firstAndLastPage || pagesAfterSelectedPage && pagesBeforeSelectedPage) {
        
        if (oldPage && currentPage - oldPage > 2) {
            pages.push('...')
        }
        if (oldPage && currentPage - oldPage == 2) {
            pages.push(oldPage + 1)
        }
        pages.push(currentPage)

        oldPage = currentPage
    }

}
console.log(pages)