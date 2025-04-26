document.addEventListener("DOMContentLoaded", function () {
	const navbarToggler = document.querySelector(".nav__toggle-btn");
	const navMobile = document.getElementById("mobile-navigation");
	const navMobileLinks = document.querySelectorAll(".nav__mobile-link");
	const footerYear = document.querySelector(".footer__year");
	const nav = document.querySelector(".nav");
	const modeSwitcherMobile = document.querySelector(".mode-switcher-mobile");
	const modeSwitcherDesktop = document.querySelector(".mode-switcher-desktop");
	const tooltipText = document.querySelector(".tooltip-text");
	const slider = document.querySelector(".gallery__slider");
	const mobileImages = document.querySelectorAll(".gallery__img-mobile");
	const desktopImages = document.querySelectorAll(".gallery__img-desktop");

	const carousellSpeed = 4000;
	let index = 0;

	if (window.innerWidth <= 700) {
		mobileImages[0].classList.add("active");
	} else {
		desktopImages[0].classList.add("active");
	}

	const showNextImg = () => {
		if (window.innerWidth <= 700) {
			desktopImages.forEach((img) => img.classList.remove("active"));
			if (index === mobileImages.length - 1) {
				mobileImages[index].classList.remove("active");
				index = 0;
				mobileImages[index].classList.add("active");
			} else {
				mobileImages[index].classList.remove("active");
				index++;
				mobileImages[index].classList.add("active");
			}
		} else {
			mobileImages.forEach((img) => img.classList.remove("active"));
			if (index === desktopImages.length - 1) {
				desktopImages[index].classList.remove("active");
				index = 0;
				desktopImages[index].classList.add("active");
			} else {
				desktopImages[index].classList.remove("active");
				index++;
				desktopImages[index].classList.add("active");
			}
		}
	};
	const changeMode = () => {
		modeSwitcherMobile.classList.toggle("dark");
		document.body.classList.toggle("dark");
		modeSwitcherDesktop.classList.toggle("dark");
		changeTooltipContent();

		const isDark = document.body.classList.contains("dark");
		localStorage.setItem("dark-mode", isDark ? "true" : "false");
	};

	const changeTooltipContent = () => {
		if (
			modeSwitcherDesktop.classList.contains("dark") ||
			document.body.classList.contains("dark")
		) {
			tooltipText.textContent = "Tryb nocny";
			tooltipText.style.color = "#000";
		} else {
			tooltipText.textContent = "Tryb dzienny";
			tooltipText.style.color = "#fff";
		}
	};

	navbarToggler.addEventListener("click", () => {
		const isOpened = navbarToggler.getAttribute("aria-expanded");

		if (isOpened === "false") {
			navbarToggler.setAttribute("aria-expanded", "true");
			navbarToggler.classList.remove("closed");
			navMobile.setAttribute("aria-expanded", "true");
			navMobile.classList.add("collapsed");
			navMobile.removeAttribute("inert");
		} else {
			navbarToggler.classList.add("closed");
			navbarToggler.setAttribute("aria-expanded", "false");
			navMobile.setAttribute("inert", "true");
			navMobile.setAttribute("aria-expanded", "false");
			navMobile.classList.remove("collapsed");
			setTimeout(() => {
				navbarToggler.classList.remove("closed");
			}, 500);
		}
		navMobileLinks.forEach((link) =>
			link.addEventListener("click", () => {
				navbarToggler.classList.add("closed");
				navbarToggler.setAttribute("aria-expanded", "false");
				navMobile.setAttribute("aria-expanded", "false");
				navMobile.classList.remove("collapsed");
				navMobile.setAttribute("inert", "true");
				navMobileLinks.forEach((link) => link.classList.remove("animation"));
				setTimeout(() => {
					navbarToggler.classList.remove("closed");
				}, 500);
			})
		);
		handleNavItemsAnimation();
	});
	const handleNavItemsAnimation = () => {
		let delayTime = 0;
		navMobileLinks.forEach((link) => {
			link.classList.toggle("animation");
			link.style.animationDelay = "." + delayTime + "s";
			delayTime++;
		});
	};

	const handleNav = () => {
		const threshold = 600;
		const buffer = 20;
		const shouldShrink =
			window.scrollY > threshold + buffer && window.innerWidth >= 700;
		const shouldExpand = window.scrollY < threshold - buffer;
		if (shouldShrink) {
			nav.classList.add("shrink");
		} else if (shouldExpand) {
			nav.classList.remove("shrink");
		}
	};

	const handleCurrentYear = () => {
		const year = new Date().getFullYear();
		footerYear.innerText = year;
	};

	setInterval(showNextImg, carousellSpeed);

	handleCurrentYear();
	window.addEventListener("scroll", handleNav);
	modeSwitcherMobile.addEventListener("click", changeMode);
	modeSwitcherDesktop.addEventListener("click", changeMode);
	window.addEventListener("DOMContentLoaded", () => {
		const darkMode = localStorage.getItem("dark-mode");
		if (darkMode === "true") {
			document.body.classList.add("dark");
			modeSwitcherDesktop.classList.add("dark");
			modeSwitcherMobile.classList.add("dark");
		}
		changeTooltipContent();
	});
});
