// Apply theme immediately to prevent flash of unstyled content
(function() {
	const savedTheme = localStorage.getItem("app-theme") || "dark";
	document.body.classList.add(savedTheme === "light" ? "theme-light" : "theme-dark");
	const mockupImg = document.querySelector(".mockup__img");
	if (mockupImg) {
		mockupImg.src = savedTheme === "light" 
			? "assets/iphone-mockup-push-light.png" 
			: "assets/iphone-mockup-push-dark.png";
	}
})();

// Theme switcher for entire interface
document.addEventListener("DOMContentLoaded", function() {
	const themeBtns = document.querySelectorAll(".theme-switcher__btn");

	// Function to update mockup image based on theme
	function updateMockupImage(theme) {
		const mockupImg = document.querySelector(".mockup__img");
		if (mockupImg) {
			if (theme === "light") {
				mockupImg.src = "assets/iphone-mockup-push-light.png";
			} else {
				mockupImg.src = "assets/iphone-mockup-push-dark.png";
			}
		}
	}

	// Function to set theme
	function setTheme(theme) {
		if (theme === "light") {
			document.body.classList.add("theme-light");
			document.body.classList.remove("theme-dark");
		} else {
			document.body.classList.add("theme-dark");
			document.body.classList.remove("theme-light");
		}
		localStorage.setItem("app-theme", theme);
		updateMockupImage(theme);
	}

	// Initialize theme switcher buttons
	themeBtns.forEach((btn) => {
		btn.addEventListener("click", function() {
			const theme = this.getAttribute("data-theme");
			
			// Update active state
			themeBtns.forEach((b) => b.classList.remove("theme-switcher__btn--active"));
			this.classList.add("theme-switcher__btn--active");

			// Apply theme to entire interface
			setTheme(theme);
		});
	});

	// Load saved theme or default to dark
	const savedTheme = localStorage.getItem("app-theme") || "dark";
	setTheme(savedTheme);
	
	// Set active button state
	const activeBtn = document.querySelector(`.theme-switcher__btn[data-theme="${savedTheme}"]`);
	if (activeBtn) {
		themeBtns.forEach((b) => b.classList.remove("theme-switcher__btn--active"));
		activeBtn.classList.add("theme-switcher__btn--active");
	}
});
