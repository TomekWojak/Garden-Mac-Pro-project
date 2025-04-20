document.addEventListener('DOMContentLoaded', function(){

const navbarToggler = document.querySelector('.nav__toggle-btn')
const navMobile = document.getElementById('mobile-navigation')
const navMobileLinks = document.querySelectorAll('.nav__mobile-link')
const footerYear = document.querySelector('.footer__year')
const nav = document.querySelector('.nav')
const modeSwitcherMobile = document.querySelector('.mode-switcher-mobile')
const modeSwitcherDesktop = document.querySelector('.mode-switcher-desktop')
const tooltipText = document.querySelector('.tooltip-text')
const slider = document.querySelector('.gallery__slider')
const altTexts = ['Obraz przedstawia drewniany domek z ładną kamienną podmurówką', 'Obrazek przedstawia własnoręcznie wykonane, drewniane pomieszczenie do przechowywania drewna', 'Obrazek przedstawia pięknie udekorowany ogród ze starannie położoną korą drzewa', 'Obrazek przedstawia jeden ze sprzętów do wykonywania usług', 'Obrazek przedstawia ogród oraz ręcznie wykonane drewniane obudowy na kosze na śmieci', 'Obrazek przedstawia drzewko otoczone placem wysypanym korą', 'Obrazek przedstawia jeden ze sprzętów do wykonywania usług', 'Obrazek przedstawia małe pola uprawne znajdujące się w własnoręcznie wykonanych drewnianych obudowach', 'Obrazek przedstawia schludnie wyglądający i solidnie wykonany kojec dla psa', 'Obrazek przedstawia rząd drzew rosnących na terenie pokrytym korą, teren ten jest obgrodzony brukowymi słupkami', 'Obrazek przedstawia pięknie wykonany plac zabaw: huśtawkę, domek, zjeżdżalnie - wszystko wykonane z drewna i tworzywa sztucznego', 'Obrazek przedstawia czerwoną maszynę do cięcia gałęzi, a w tle stos gałęzi']

const carousellSpeed = 6000
let interval


let index = 1
const showNextImg = () => {
        const sliderImgDesktop = document.querySelector('.gallery__img-desktop')
        const sliderImgMobile = document.querySelector('.gallery__img-mobile')
        const mobileImages = ['/images/slider-gallery/garden-1.jpg', '/images/slider-gallery/garden-2.jpg', '/images/slider-gallery/garden-3.jpg', '/images/slider-gallery/garden-4.jpg', '/images/slider-gallery/garden-5.jpg', '/images/slider-gallery/garden-6.jpg', '/images/slider-gallery/garden-7.jpg', '/images/slider-gallery/garden-8.jpg', '/images/slider-gallery/garden-9.jpg', '/images/slider-gallery/garden-10.jpg', '/images/slider-gallery/garden-11.jpg', '/images/slider-gallery/garden-12.jpg']
        const desktopImages = ['/images/slider-gallery/garden-1-desktop.jpg','/images/slider-gallery/garden-2-desktop.jpg','/images/slider-gallery/garden-3-desktop.jpg','/images/slider-gallery/garden-4-desktop.jpg','/images/slider-gallery/garden-5-desktop.jpg','/images/slider-gallery/garden-6-desktop.jpg','/images/slider-gallery/garden-7-desktop.jpg','/images/slider-gallery/garden-8-desktop.jpg','/images/slider-gallery/garden-9-desktop.jpg','/images/slider-gallery/garden-10-desktop.jpg','/images/slider-gallery/garden-11-desktop.jpg','/images/slider-gallery/garden-12-desktop.jpg']

        if(index === mobileImages.length){
            index = 0
        }
        sliderImgMobile.classList.add('animated')
        sliderImgMobile.setAttribute('src', mobileImages[index])
        sliderImgMobile.setAttribute('alt', altTexts[index])

        sliderImgDesktop.classList.add('animated')
        sliderImgDesktop.setAttribute('src', desktopImages[index])
        sliderImgDesktop.setAttribute('alt', altTexts[index])
        index++

        setTimeout(() => {
            sliderImgDesktop.classList.remove('animated')
            sliderImgMobile.classList.remove('animated')
        }, 5000)

    }




const changeMode = () => {
        modeSwitcherMobile.classList.toggle('dark')
        document.body.classList.toggle('dark')
        modeSwitcherDesktop.classList.toggle('dark')
        changeTooltipContent()

        const isDark = document.body.classList.contains('dark');
        localStorage.setItem('dark-mode', isDark ? 'true' : 'false');
}

const changeTooltipContent = () => {
    if(modeSwitcherDesktop.classList.contains('dark') || document.body.classList.contains('dark')){
        tooltipText.textContent = 'Tryb nocny'
        tooltipText.style.color = '#000'
    }else {
        tooltipText.textContent = 'Tryb dzienny'
        tooltipText.style.color = '#fff'
    }
}

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

const startCarousel = () => {
    interval = setInterval(showNextImg, carousellSpeed)
}
const stopCarousel = () => {
    clearInterval(interval)
}

slider.addEventListener('mouseleave', startCarousel)
slider.addEventListener('mouseenter', stopCarousel)
startCarousel()
handleCurrentYear()
window.addEventListener('scroll', handleNav)
modeSwitcherMobile.addEventListener('click', changeMode)
modeSwitcherDesktop.addEventListener('click', changeMode)
window.addEventListener('DOMContentLoaded', () => {
    const darkMode = localStorage.getItem('dark-mode');
    if (darkMode === 'true') {
        document.body.classList.add('dark');
        modeSwitcherDesktop.classList.add('dark')
        modeSwitcherMobile.classList.add('dark')
    }
    changeTooltipContent()
})

})
