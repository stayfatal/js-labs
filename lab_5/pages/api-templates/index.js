import { HomeButtonComponent } from '../../components/home-button/index.js'
import { CaruselComponent } from '../../components/carusel/index.js'
import { MainPage } from '../main/index.js'

export class ApiTemplatesPage {
	constructor(parent, id) {
		this.parent = parent
		this.id = id
		this.data = this.getData()
	}

	getData() {
		const cards =  [
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
        

		return (
			cards.find(card => card.id === Number(this.id)) ||
			cards[0]
		)
	}

	getHTML() {
		return `
    <div id="api-templates-page">
        <div class="main-container">
            <!-- Шапка -->
            <header class="navbar navbar-expand-lg navbar-dark bg-white sticky-top">
                <div class="container-fluid">
                    <div id="home-button-container"></div>
                </div>
            </header>

            <div class="header-center">
                <h4 class="header-title">${this.data.title}</h4>
            </div>

            <div class="carousel-container" id="carousel-container"></div>
        </div>
    </div>`
	}

	clickBack() {
		const mainPage = new MainPage(this.parent)
		mainPage.render()
	}

	render() {
		this.parent.innerHTML = ''
		const html = this.getHTML()
		this.parent.insertAdjacentHTML('beforeend', html)

		const homeButtonContainer = document.getElementById('home-button-container')
		const homeButton = new HomeButtonComponent(homeButtonContainer)
		homeButton.render(this.clickBack.bind(this))

		const carouselContainer = document.getElementById('carousel-container')
		const carousel = new CaruselComponent(carouselContainer)
		carousel.render(this.data)
	}
}
