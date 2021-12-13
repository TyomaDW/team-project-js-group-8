const scrollBtn = document.querySelector('.isShowBtn');

window.onscroll = () =>  {
    if(window.scrollY >= 700) {
        scrollBtn.classList.add('isShowBtn_show');
    }
}

scrollBtn.onclick = () => {
    window.scrollTo(0, 0);
}