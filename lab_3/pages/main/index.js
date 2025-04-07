import { AddCardButtonComponent } from '../../components/add-card-button/index.js'
import { TemplatesCardComponent } from '../../components/templates-card/index.js'
import { ApiTemplatesPage } from '../api-templates/index.js'

export class MainPage {
	constructor(parent) {
		this.parent = parent
		this.data = this.getData()
		this.firstCard={...this.data[0]}

		this.calculateDuplicates = this.calculateDuplicates.bind(this)
        this.calculateAverage = this.calculateAverage.bind(this)
        this.mergeArrays = this.mergeArrays.bind(this)
        this.findAnagrams = this.findAnagrams.bind(this)
	}

	getData() {
		return [
			{
				id: 1,
				title: 'Backend Developers Templates',
				elements: [
					{
                        title: "API scenario testing",
                        description: "Test API scenarios by iterating through a data set and triggering workflows based on responses.",
                        src: "https://voyager.postman.com/icon/workflows-postman-icon.svg"
                    },
                    {
                        title: "API testing basics",
                        description: "Learn how to write basic API tests using the Postman test syntax.",
                        src: "https://voyager.postman.com/icon/learning-documentation-icon-postman.svg"
                    },
                    {
                        title: "Async operations",
                        description: "Fast-track the process of building and executing requests in an asynchronous format.",
                        src: "https://voyager.postman.com/icon/agility.svg"
                    },
				],
			},
			{
				id: 2,
				title: 'Frontend Developers Templates',
				elements: [
					{
                        title: "API documentation",
                        description: "Create beautiful API documentation using Markdown. Simplify your workflow with clean and readable syntax.",
                        src: "https://voyager.postman.com/icon/appplication-performance-icon-postman.svg"
                    },
                    {
                        title: "API prototyping",
                        description: "Get up to speed with building an API prototype on Postman.",
                        src: "https://voyager.postman.com/icon/learning-documentation-icon-postman.svg"
                    },
                    {
                        title: "Content management API",
                        description: "Endpoints for managing posts, media, comments, and likes.",
                        src: "https://voyager.postman.com/icon/engineer-onboarding-icon-postman.svg"
                    },
				],
			},
			{
				id: 3,
				title: 'Fullstack Developers Templates',
				elements: [
					{
                        title: "Amazon Web Services infrastructure",
                        description: "Manage Cloud instances and storage using the AWS API.",
                        src: "https://voyager.postman.com/icon/from-collection.svg"
                    },
                    {
                        title: "Common API vulnerabilities check",
                        description: "Check your API for common vulnerabilities and improve its security and reliability.",
                        src: "https://voyager.postman.com/icon/bug-error-icon-postman.svg"
                    },
                    {
                        title: "Authorization methods",
                        description: "Learn more about different authorization types and quickly set up auth helpers for your API in Postman.",
                        src: "https://voyager.postman.com/icon/auth-postman-icon.svg"
                    },
				],
			},
            {
				id: 4,
				title: 'Quality Engineers Templates',
				elements: [
					{
                        title: "End-to-end testing",
                        description: "Test the functionality and performance of your API by simulating real-world user scenarios.",
                        src: "https://skills-assets.pstmn.io/collection-templates/end-to-end-testing-icon.svg"
                    },
                    {
                        title: "Contract testing",
                        description: "Test the interactions between two separate systems based on the contracts between them.",
                        src: "https://voyager.postman.com/icon/api-data-contract-icon-postman.svg"
                    },
                    {
                        title: "Functional testing",
                        description: "Verify your API's accuracy, reliability, and compliance with functional specifications.",
                        src: "https://voyager.postman.com/icon/learning-documentation-icon-postman.svg"
                    },
				],
			},
		]
	}

	get pageRoot() {
		return document.getElementById('main-page')
	}

	getHTML() {
		return `<div id="main-page" class="d-flex flex-wrap gap-3 p-3" style="background-color:rgb(255, 255, 255);"></div>

	<div class="container py-5">
        <h2 class="text-center mb-4">Postman Data Tools</h2>
        <div class="row g-4">
            <div class="col-md-6 col-lg-3">
                <div class="card tool-card p-3">
                    <h5 class="card-title">Duplicate Requests</h5>
                    <p class="card-text text-muted small">Count duplicate items in your request history</p>
                    <div class="mb-3">
                        <label class="form-label">Enter items:</label>
                        <input type="text" class="form-control" id="duplicatesInput" value="GET users, POST auth, GET users, GET items, POST auth">
                    </div>
                    <button id="btn-count-dublicates" class="btn btn-postman w-100" onclick="calculateDuplicates()">Count Duplicates</button>
                    <div class="result-box mt-3">
                        <p class="mb-1"><strong>Result:</strong></p>
                        <div id="duplicatesResult">-</div>
                    </div>
                </div>
            </div>

            <div class="col-md-6 col-lg-3">
                <div class="card tool-card p-3">
                    <h5 class="card-title">Response Time Avg</h5>
                    <p class="card-text text-muted small">Calculate average response time</p>
                    <div class="mb-3">
                        <label class="form-label">Enter numbers:</label>
                        <input type="text" class="form-control" id="averageInput" value="200, 150, 180, 220, 190">
                    </div>
                    <button id="btn-calculate-average" class="btn btn-postman w-100" onclick="calculateAverage()">Calculate Average</button>
                    <div class="result-box mt-3">
                        <p class="mb-1"><strong>Result:</strong></p>
                        <div id="averageResult">-</div>
                    </div>
                </div>
            </div>

            <div class="col-md-6 col-lg-3">
                <div class="card tool-card p-3">
                    <h5 class="card-title">Merge Status Codes</h5>
                    <p class="card-text text-muted small">Merge and sort status codes</p>
                    <div class="mb-3">
                        <label class="form-label">Array 1:</label>
                        <input type="text" class="form-control mb-2" id="array1Input" value="200, 404, 500">
                        <label class="form-label">Array 2:</label>
                        <input type="text" class="form-control" id="array2Input" value="301, 200, 403">
                    </div>
                    <button id="btn-merge-and-sort" class="btn btn-postman w-100" onclick="mergeArrays()">Merge & Sort</button>
                    <div class="result-box mt-3">
                        <p class="mb-1"><strong>Result:</strong></p>
                        <div id="mergeResult">-</div>
                    </div>
                </div>
            </div>

            <div class="col-md-6 col-lg-3">
                <div class="card tool-card p-3">
                    <h5 class="card-title">Find Similar Endpoints</h5>
                    <p class="card-text text-muted small">Group endpoint names by similarity</p>
                    <div class="mb-3">
                        <label class="form-label">Enter words:</label>
                        <input type="text" class="form-control" id="anagramsInput" value="listen, silent, post, stop, tops, pots, get">
                    </div>
                    <button id="btn-find-anagrams" class="btn btn-postman w-100" onclick="findAnagrams()">Find Anagrams</button>
                    <div class="result-box mt-3">
                        <p class="mb-1"><strong>Result:</strong></p>
                        <div id="anagramsResult">-</div>
                    </div>
                </div>
            </div>
        </div>
    </div>`
	}

	calculateDuplicates() {
		const input = document.getElementById('duplicatesInput').value;
		const arr = input.split(',').map(item => item.trim()).filter(item => item);
		
		const countMap = {};
		let duplicates = 0;
		
		for (const item of arr) {
			countMap[item] = (countMap[item] || 0) + 1;
			if (countMap[item] === 2) {
				duplicates++;
			}
		}
		
		document.getElementById('duplicatesResult').innerHTML = 
			`<span class="text-success">${duplicates}</span> duplicate(s) found in:<br><small>${JSON.stringify(arr)}</small>`;
	}

	calculateAverage() {
		const input = document.getElementById('averageInput').value;
		const arr = input.split(',').map(Number).filter(num => !isNaN(num));
		
		if (arr.length === 0) {
			document.getElementById('averageResult').textContent = 'Please enter valid numbers';
			return;
		}
		
		const sum = arr.reduce((acc, val) => acc + val, 0);
		const avg = sum / arr.length;
		
		document.getElementById('averageResult').innerHTML = 
			`Average: <span class="text-success">${avg.toFixed(2)}</span><br>From: ${JSON.stringify(arr)}`;
	}

	mergeArrays() {
		const input1 = document.getElementById('array1Input').value;
		const input2 = document.getElementById('array2Input').value;
		
		const arr1 = input1.split(',').map(Number).filter(num => !isNaN(num));
		const arr2 = input2.split(',').map(Number).filter(num => !isNaN(num));
		
		const merged = [...arr1, ...arr2];
		const sorted = merged.sort((a, b) => b - a);
		
		document.getElementById('mergeResult').innerHTML = 
			`Sorted result: <span class="text-success">${sorted.join(' ')}</span><br>
			 Merged from: ${JSON.stringify(arr1)} and ${JSON.stringify(arr2)}`;
	}

	findAnagrams() {
		const input = document.getElementById('anagramsInput').value;
		const words = input.split(',').map(word => word.trim()).filter(word => word);
		
		const groups = {};
		
		for (const word of words) {
			const sorted = word.toLowerCase().split('').sort().join('');
			if (!groups[sorted]) {
				groups[sorted] = [];
			}
			groups[sorted].push(word);
		}
		
		const result = Object.values(groups)
			.filter(group => group.length >= 2)
			.map(group => group.sort())
			.sort((a, b) => a[0].localeCompare(b[0]));
		
		let html = '';
		if (result.length === 0) {
			html = 'No groups found';
		} else {
			result.forEach(group => {
				html += `<div class="mb-1"><span class="badge bg-secondary">Group:</span> ${group.join(', ')}</div>`;
			});
		}
		
		document.getElementById('anagramsResult').innerHTML = html;
	}

	renderCards() {
		this.pageRoot.innerHTML = ''
		this.data.forEach(item => {
			const card = new TemplatesCardComponent(this.pageRoot)
			card.render(
				item,
				() => this.clickCard(item.id),
				() => this.handleRemoveCard(item.id)
			)
		})
		const addButton = new AddCardButtonComponent(this.pageRoot)
		addButton.render(() => this.handleAddCard())
	}

	clickCard(cardId) {
		const apiTemplatesPage = new ApiTemplatesPage(this.parent, cardId)
		apiTemplatesPage.render()
	}

	handleAddCard(){
		let newCard={...this.firstCard}
		newCard.id=this.data.length+1
		this.data.push(newCard)
		this.renderCards()
		console.log(this.data)
	}

	handleRemoveCard(cardId) {
		this.data = this.data.filter(item => item.id !== cardId)
		this.renderCards()
	}

	render() {
		this.parent.innerHTML = ''
		this.parent.insertAdjacentHTML('beforeend', this.getHTML())
		this.renderCards()

		document.getElementById("btn-count-dublicates").addEventListener('click', this.calculateDuplicates)
        document.getElementById("btn-calculate-average").addEventListener('click', this.calculateAverage)
        document.getElementById("btn-merge-and-sort").addEventListener('click', this.mergeArrays)
        document.getElementById("btn-find-anagrams").addEventListener('click', this.findAnagrams)
	}
}
