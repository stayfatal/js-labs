import { AddCardButtonComponent } from '../../components/add-card-button/index.js'
import { TemplatesCardComponent } from '../../components/templates-card/index.js'
import { ApiTemplatesPage } from '../api-templates/index.js'
import { HomeButtonComponent } from '../../components/home-button/index.js'
import { SearchFilterComponent } from '../../components/filter/index.js'

export class MainPage {
    constructor(parent) {
        this.parent = parent
        this.data = this.getData()
        this.firstCard={...this.data[0]}
        this.handleSearch = this.handleSearch.bind(this)
    }

    getData() {
        return [
            {
                id: 1,
                title: 'Шаблоны для бэкенд-разработчиков',
                elements: [
                    {
                        title: "Тестирование API сценариев",
                        description: "Тестируйте сценарии API, перебирая набор данных и запуская workflows на основе ответов.",
                        src: "https://voyager.postman.com/icon/workflows-postman-icon.svg"
                    },
                    {
                        title: "Основы тестирования API",
                        description: "Научитесь писать базовые тесты API, используя синтаксис тестов Postman.",
                        src: "https://voyager.postman.com/icon/learning-documentation-icon-postman.svg"
                    },
                    {
                        title: "Асинхронные операции",
                        description: "Ускорьте процесс создания и выполнения запросов в асинхронном формате.",
                        src: "https://voyager.postman.com/icon/agility.svg"
                    },
                ],
            },
            {
                id: 2,
                title: 'Шаблоны для фронтенд-разработчиков',
                elements: [
                    {
                        title: "Документация API",
                        description: "Создавайте красивую документацию API с использованием Markdown. Упростите рабочий процесс с чистым и читаемым синтаксисом.",
                        src: "https://voyager.postman.com/icon/appplication-performance-icon-postman.svg"
                    },
                    {
                        title: "Прототипирование API",
                        description: "Быстро освоите создание прототипа API в Postman.",
                        src: "https://voyager.postman.com/icon/learning-documentation-icon-postman.svg"
                    },
                    {
                        title: "API управления контентом",
                        description: "Эндпоинты для управления постами, медиа, комментариями и лайками.",
                        src: "https://voyager.postman.com/icon/engineer-onboarding-icon-postman.svg"
                    },
                ],
            },
            {
                id: 3,
                title: 'Шаблоны для фулстек-разработчиков',
                elements: [
                    {
                        title: "Инфраструктура Amazon Web Services",
                        description: "Управляйте облачными инстансами и хранилищами с использованием AWS API.",
                        src: "https://voyager.postman.com/icon/from-collection.svg"
                    },
                    {
                        title: "Проверка уязвимостей API",
                        description: "Проверьте ваш API на распространенные уязвимости и улучшите его безопасность и надежность.",
                        src: "https://voyager.postman.com/icon/bug-error-icon-postman.svg"
                    },
                    {
                        title: "Методы авторизации",
                        description: "Узнайте больше о различных типах авторизации и быстро настройте помощников авторизации для вашего API в Postman.",
                        src: "https://voyager.postman.com/icon/auth-postman-icon.svg"
                    },
                ],
            },
            {
                id: 4,
                title: 'Шаблоны для инженеров по качеству',
                elements: [
                    {
                        title: "End-to-end тестирование",
                        description: "Тестируйте функциональность и производительность вашего API, имитируя реальные пользовательские сценарии.",
                        src: "https://skills-assets.pstmn.io/collection-templates/end-to-end-testing-icon.svg"
                    },
                    {
                        title: "Контрактное тестирование",
                        description: "Тестируйте взаимодействия между двумя отдельными системами на основе контрактов между ними.",
                        src: "https://voyager.postman.com/icon/api-data-contract-icon-postman.svg"
                    },
                    {
                        title: "Функциональное тестирование",
                        description: "Проверяйте точность, надежность и соответствие API функциональным спецификациям.",
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
        return `
        <header class="navbar navbar-expand-lg navbar-dark bg-white sticky-top">
                <div class="container-fluid">
                    <div id="home-button-container"></div>
                </div>
            </header>

        <!-- Добавляем контейнер для фильтра -->
        <div id="search-filter-container"></div>
        
        <div id="main-page" class="d-flex flex-wrap gap-3 p-3" style="background-color:rgb(255, 255, 255);"></div>
        `
    }

    handleSearch(searchTerm) {
        console.log(searchTerm)
        if (searchTerm){
            const filtered=this.data.filter(item => item.title.toLowerCase().includes(searchTerm.toLowerCase()))
            this.renderCards(filtered,false);
        }else{
            const filtered=this.data
            this.renderCards(filtered,true);
        }   
        console.log(filtered)
        
    }

    renderCards(data,renderAddButtonComponent) {
        this.pageRoot.innerHTML = ''
        console.log(this.data)
        data.forEach(item => {
            const card = new TemplatesCardComponent(this.pageRoot)
            card.render(
                item,
                () => this.clickCard(item.id),
                () => this.handleRemoveCard(item.id)
            )
        })

        if (renderAddButtonComponent){
            const addButton = new AddCardButtonComponent(this.pageRoot)
            addButton.render(() => this.handleAddCard())
        }
    }

    clickCard(cardId) {
        const apiTemplatesPage = new ApiTemplatesPage(this.parent, cardId)
        apiTemplatesPage.render()
    }

    handleAddCard(){
        let newCard={...this.firstCard}
        newCard.id=this.data[this.data.length-1].id+1
        this.data.push(newCard)
        this.renderCards(this.data,true)
        console.log(this.data)
    }

    handleRemoveCard(cardId) {
        this.data = this.data.filter(item => item.id !== cardId)
        this.renderCards(this.data,true)
    }

    render() {
        this.parent.innerHTML = ''
        this.parent.insertAdjacentHTML('beforeend', this.getHTML())

		const homeButtonContainer = document.getElementById('home-button-container')
		const homeButton = new HomeButtonComponent(homeButtonContainer)
		homeButton.render()

        const filterContainer = document.getElementById('search-filter-container');
        const searchFilter = new SearchFilterComponent(filterContainer, this.handleSearch);
        searchFilter.render();
        
        this.renderCards(this.data,true)
    }
}