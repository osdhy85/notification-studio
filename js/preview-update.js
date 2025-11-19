// Real-time preview update functionality
document.addEventListener("DOMContentLoaded", function() {
	const titleInput = document.getElementById("push-title");
	const bodyInput = document.getElementById("push-body");
	const imageInput = document.getElementById("img-url");
	const form = document.querySelector(".editor");
	
	const titlePreview = document.querySelector(".mockup__title");
	const bodyPreview = document.querySelector(".mockup__body");
	const domainSpan = document.querySelector(".mockup__sender span:first-child");
	const textInner = document.querySelector(".mockup__text-inner");
	
	// Default values from HTML
	const defaultDomain = "sender";
	const defaultTitle = "title";
	const defaultBody = "body text";
	
	// Create image element if it doesn't exist
	let imagePreview = document.querySelector(".mockup__image");
	if (!imagePreview && textInner) {
		imagePreview = document.createElement("img");
		imagePreview.className = "mockup__image";
		imagePreview.style.display = "none";
		imagePreview.style.maxWidth = "100%";
		imagePreview.style.borderRadius = "var(--br-4)";
		imagePreview.style.marginTop = "0.5rem";
		textInner.appendChild(imagePreview);
	}
	
	// Function to reset preview to default values
	function resetPreview() {
		if (titlePreview) {
			titlePreview.textContent = defaultTitle;
		}
		if (bodyPreview) {
			bodyPreview.textContent = defaultBody;
		}
		if (domainSpan) {
			domainSpan.textContent = defaultDomain;
		}
		if (imagePreview) {
			imagePreview.style.display = "none";
		}
		// Reset icon to default
		const iconElement = document.querySelector(".mockup__icon");
		if (iconElement) {
			iconElement.src = "assets/ico-project-default.svg";
		}
	}
	
	// Handle form reset event
	if (form) {
		form.addEventListener("reset", function() {
			resetPreview();
		});
	}

	// Update title
	if (titleInput && titlePreview) {
		titleInput.addEventListener("input", function() {
			titlePreview.textContent = this.value || "title";
		});
	}

	// Update body
	if (bodyInput && bodyPreview) {
		bodyInput.addEventListener("input", function() {
			bodyPreview.textContent = this.value || "body text";
		});
	}

	// Update image
	if (imageInput && imagePreview) {
		imageInput.addEventListener("input", function() {
			const imageUrl = this.value.trim();
			if (imageUrl) {
				imagePreview.src = imageUrl;
				imagePreview.style.display = "block";
				imagePreview.onerror = function() {
					this.style.display = "none";
				};
			} else {
				imagePreview.style.display = "none";
			}
		});
	}
});

