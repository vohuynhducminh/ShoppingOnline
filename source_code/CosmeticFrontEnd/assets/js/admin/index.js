document.querySelector('.search-icon').onclick = function () {
    document.querySelector('.search-wrapper').classList.add('active');
}
document.querySelector('.close').onclick = function () {
    document.querySelector('.search-wrapper').classList.remove('active');
}
document.querySelector('#humburger-event').onclick = function () {
    document.querySelector('.app-container').classList.toggle('closed-sidebar');
    document.querySelector('#humburger-event').classList.toggle('is-active');
}