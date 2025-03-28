
const navbarToggler = document.querySelector('.nav__toggle-btn')
const navMobile = document.getElementById('mobile-navigation')
const navMobileLinks = document.querySelectorAll('.nav__mobile-link')

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
    }

    navMobileLinks.forEach(link => link.addEventListener('click', () => {
        navbarToggler.classList.add('closed')
        navbarToggler.setAttribute('aria-expanded', 'false')
        navMobile.setAttribute('aria-expanded', 'false')
        navMobile.classList.remove('collapsed')
        navMobile.setAttribute('inert', 'true')
        link.classList.remove('animation')
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