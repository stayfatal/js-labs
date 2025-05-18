export class HomeButtonComponent {
	constructor(parent) {
		this.parent = parent
	}

	addListeners(listener) {
		document.getElementById('home-button').addEventListener('click', listener)
	}

	getHTML() {
		return `
    <button id="home-button" style="padding: 0; border: none; background: none;">
		<img src="https://voyager.postman.com/logo/postman-logo-icon-orange.svg" 
			alt="Postman Logo" 
			width="40" 
			height="40" 
			class="d-inline-block align-top">
    </button>`
	}

	render(listener) {
		const html = this.getHTML()
		this.parent.insertAdjacentHTML('beforeend', html)
		this.addListeners(listener)
	}
}
