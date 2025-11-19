// Initialize all custom select boxes
document.addEventListener("DOMContentLoaded", function() {
	const selectBoxes = document.querySelectorAll(".select-box");
	const localeBadge = document.querySelector(".card__actions span");
	const localeBadgeParent = document.querySelector(".card__actions");
	const domainSpan = document.querySelector(".mockup__sender span:first-child");

	// Function to update locale badge text and style
	function updateLocaleBadge(localeText) {
		if (!localeBadge) return;
		// Extract locale name (e.g., "English – EN" -> "English")
		// Handle both HTML entity &ndash; and regular dash characters
		const localeName = localeText.split(/[–—\-]/)[0].trim();
		localeBadge.textContent = localeName;
		
		// Add active class to badge parent to change border color
		if (localeBadgeParent) {
			localeBadgeParent.classList.add("card__actions--active");
		}
	}

	// Function to update domain text in preview
	function updateDomainText(projectName) {
		if (!domainSpan) return;
		domainSpan.textContent = projectName;
	}

	// Function to update project icon in preview
	function updateProjectIcon(projectValue) {
		const iconElement = document.querySelector(".mockup__icon");
		if (!iconElement) return;
		
		// Map project values to icon filenames
		const iconMap = {
			"project_1": "ico-project-1.svg",
			"project_2": "ico-project-2.svg",
			"project_3": "ico-project-3.svg"
		};
		
		const iconFile = iconMap[projectValue] || "ico-project-default.svg";
		iconElement.src = `assets/${iconFile}`;
	}

	selectBoxes.forEach((selectBox) => {
		const selected = selectBox.querySelector(".selected");
		const optionsContainer = selectBox.querySelector(".options-container");
		const optionsList = selectBox.querySelectorAll(".option");

		if (selected && optionsContainer) {
			// Check if this is the locale selector
			const localeRadio = selectBox.querySelector('input[name="locale"]');
			const isLocaleSelector = localeRadio !== null;
			// Check if this is the project selector
			const projectRadio = selectBox.querySelector('input[name="project-selector"]');
			const isProjectSelector = projectRadio !== null;

			selected.addEventListener("click", (e) => {
				e.stopPropagation();
				// Close other open select boxes
				document.querySelectorAll(".options-container.active").forEach((container) => {
					if (container !== optionsContainer) {
						container.classList.remove("active");
					}
				});
				optionsContainer.classList.toggle("active");
			});

			optionsList.forEach((option) => {
				option.addEventListener("click", () => {
					const radio = option.querySelector("input[type='radio']");
					const label = option.querySelector("label");
					
					if (radio && label) {
						// Uncheck all radio buttons in this select box
						selectBox.querySelectorAll("input[type='radio']").forEach((r) => {
							r.checked = false;
						});
						
						// Check the selected radio button
						radio.checked = true;
						
						// Update selected text
						selected.innerHTML = label.innerHTML;
						
						// Update locale badge text if this is the locale selector
						if (isLocaleSelector) {
							updateLocaleBadge(label.textContent);
						}
						
						// Update domain text and icon in preview if this is the project selector
						if (isProjectSelector) {
							updateDomainText(label.textContent);
							updateProjectIcon(radio.value);
						}
					}
					optionsContainer.classList.remove("active");
				});
			});

			// Close select box when clicking outside
			document.addEventListener("click", (e) => {
				if (!selectBox.contains(e.target)) {
					optionsContainer.classList.remove("active");
				}
			});
		}
	});
});
