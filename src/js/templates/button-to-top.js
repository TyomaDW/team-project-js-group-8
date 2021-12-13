const scrollBtn = document.querySelector('.isShowBtn');

scrollBtn.addEventListener('click', onClick);
window.addEventListener('scroll', onScroll);

function onScroll() {
    if(window.scrollY < 300) {
        scrollBtn.classList.remove('isShowBtn_show');
    } else if(window.scrollY >= 300) {
        scrollBtn.classList.remove('isShowBtn_hide');
        scrollBtn.classList.add('isShowBtn_show');
    }
}

function onClick() {
    scrollBtn.classList.add('isShowBtn_hide');
    window.scrollTo(0, 0);
    onScroll();
}