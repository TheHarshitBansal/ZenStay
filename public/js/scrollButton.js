function sLeft() {
    const container = document.querySelector('.filters-container');
    container.scrollBy({
        left: -200,
        behavior: 'smooth'
    });
}

function scrollRight() {
    const container = document.querySelector('.filters-container');
    container.scrollBy({
        left: 200,
        behavior: 'smooth'
    });
}
