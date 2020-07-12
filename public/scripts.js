let currentPage = window.location.pathname
const items = document.querySelectorAll('header .links a')

for (let item of items) {
    if (currentPage.includes(item.getAttribute('href'))) {
        item.classList.add('active')
    }
}