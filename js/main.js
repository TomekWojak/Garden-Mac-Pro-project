
const navbarToggler = document.querySelector('.nav__toggle-btn')
const navMobile = document.getElementById('mobile-navigation')
const navMobileLinks = document.querySelectorAll('.nav__mobile-link')
const footerYear = document.querySelector('.footer__year')
const nav = document.querySelector('.nav')

navbarToggler.addEventListener('click', () => {
    const isOpened = navbarToggler.getAttribute('aria-expanded')

    if(isOpened === 'false'){
        navbarToggler.setAttribute('aria-expanded', 'true')
        navbarToggler.classList.remove('closed')
        navMobile.setAttribute('aria-expanded', 'true')
        navMobile.classList.add('collapsed')
        navMobile.removeAttribute('inert')
    }else {
        navbarToggler.classList.add('closed')
        navbarToggler.setAttribute('aria-expanded', 'false')
        navMobile.setAttribute('inert', 'true')
        navMobile.setAttribute('aria-expanded', 'false')
        navMobile.classList.remove('collapsed')
        setTimeout(() => {
            navbarToggler.classList.remove('closed')
        }, 500)
    }
    navMobileLinks.forEach(link => link.addEventListener('click', () => {
        navbarToggler.classList.add('closed')
        navbarToggler.setAttribute('aria-expanded', 'false')
        navMobile.setAttribute('aria-expanded', 'false')
        navMobile.classList.remove('collapsed')
        navMobile.setAttribute('inert', 'true')
        navMobileLinks.forEach(link => link.classList.remove('animation'))
        setTimeout(() => {
            navbarToggler.classList.remove('closed')
        }, 500)
    }))
    handleNavItemsAnimation()
})
const handleNavItemsAnimation = () => {
    let delayTime = 0;
    navMobileLinks.forEach(link => {
        link.classList.toggle('animation')
        link.style.animationDelay = '.' + delayTime + 's'
        delayTime++
    })
}

const handleNav = () => {
    const threshold = 600; 
    const buffer = 20; 
    const shouldShrink = window.scrollY > threshold + buffer && window.innerWidth >= 700;
    const shouldExpand = window.scrollY < threshold - buffer;
    if (shouldShrink) {
        nav.classList.add('shrink');
    } else if (shouldExpand) {
        nav.classList.remove('shrink');
    }
};

const handleCurrentYear = () => {
    const year = (new Date).getFullYear()
    footerYear.innerText = year
}

handleCurrentYear()
window.addEventListener('scroll', handleNav)
