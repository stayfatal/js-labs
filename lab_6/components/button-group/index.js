export class ButtonGroupComponent {
	constructor(parent) {
		this.parent = parent
	}

	getHTML(data) {
		return `
      <div class="btn-group mt-3" role="group" aria-label="Действия с карточкой">
				<button type="button" 
                class="btn" 
                id="remove-${data.id}"
                style="background-color: #white; 
                       border: 1px solid #e5e7eb;
                       color: rgb(224, 83, 31);
                       transition: all 0.3s ease;">
            <i class="bi bi-trash"></i> Удалить
        </button>
        <button type="button" 
                class="btn" 
                id="view-${data.id}"
                style="background-color: rgb(224, 83, 31); 
                       border: 1px solid rgb(224, 83, 31);
                       color: #ffffff;
                       transition: all 0.3s ease;">
            <i class="bi bi-calculator"></i> Просмотр
        </button>
        
      </div>
    `
	}

	addListeners(data, viewListener, removeListener) {
		document
			.getElementById(`view-${data.id}`)
			.addEventListener('click', viewListener)
		document
			.getElementById(`remove-${data.id}`)
			.addEventListener('click', removeListener)
	}

	render(data, analyzeListener, removeListener) {
		const html = this.getHTML(data)
		this.parent.insertAdjacentHTML('beforeend', html)
		this.addListeners(data, analyzeListener, removeListener)
	}
}
