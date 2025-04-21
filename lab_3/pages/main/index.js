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

        this.calculateDuplicates = this.calculateDuplicates.bind(this)
        this.calculateAverage = this.calculateAverage.bind(this)
        this.mergeArrays = this.mergeArrays.bind(this)
        this.findAnagrams = this.findAnagrams.bind(this)
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

        <div class="container py-5">
            <h2 class="text-center mb-4">Инструменты Postman для работы с данными</h2>
            <div class="row g-4">
                <div class="col-md-6 col-lg-3">
                    <div class="card tool-card p-3">
                        <h5 class="card-title">Дублирующиеся запросы</h5>
                        <p class="card-text text-muted small">Подсчет повторяющихся элементов в истории запросов</p>
                        <div class="mb-3">
                            <label class="form-label">Введите элементы:</label>
                            <input type="text" 
                                   class="form-control" 
                                   id="duplicatesInput" 
                                   value="GET users, POST auth, GET users, GET items, POST auth">
                        </div>
                        <button id="btn-count-dublicates" 
                                class="btn btn-postman w-100" 
                                onclick="calculateDuplicates()">
                            Подсчитать дубликаты
                        </button>
                        <div class="result-box mt-3">
                            <p class="mb-1"><strong>Результат:</strong></p>
                            <div id="duplicatesResult">-</div>
                        </div>
                    </div>
                </div>

                <div class="col-md-6 col-lg-3">
                    <div class="card tool-card p-3">
                        <h5 class="card-title">Среднее время ответа</h5>
                        <p class="card-text text-muted small">Вычисление среднего времени ответа</p>
                        <div class="mb-3">
                            <label class="form-label">Введите числа:</label>
                            <input type="text" 
                                   class="form-control" 
                                   id="averageInput" 
                                   value="200, 150, 180, 220, 190">
                        </div>
                        <button id="btn-calculate-average" 
                                class="btn btn-postman w-100" 
                                onclick="calculateAverage()">
                            Вычислить среднее
                        </button>
                        <div class="result-box mt-3">
                            <p class="mb-1"><strong>Результат:</strong></p>
                            <div id="averageResult">-</div>
                        </div>
                    </div>
                </div>

                <div class="col-md-6 col-lg-3">
                    <div class="card tool-card p-3">
                        <h5 class="card-title">Объединение статус-кодов</h5>
                        <p class="card-text text-muted small">Объединение и сортировка статус-кодов</p>
                        <div class="mb-3">
                            <label class="form-label">Массив 1:</label>
                            <input type="text" 
                                   class="form-control mb-2" 
                                   id="array1Input" 
                                   value="200, 404, 500">
                            <label class="form-label">Массив 2:</label>
                            <input type="text" 
                                   class="form-control" 
                                   id="array2Input" 
                                   value="301, 200, 403">
                        </div>
                        <button id="btn-merge-and-sort" 
                                class="btn btn-postman w-100" 
                                onclick="mergeArrays()">
                            Объединить и отсортировать
                        </button>
                        <div class="result-box mt-3">
                            <p class="mb-1"><strong>Результат:</strong></p>
                            <div id="mergeResult">-</div>
                        </div>
                    </div>
                </div>

                <div class="col-md-6 col-lg-3">
                    <div class="card tool-card p-3">
                        <h5 class="card-title">Поиск похожих эндпоинтов</h5>
                        <p class="card-text text-muted small">Группировка названий эндпоинтов по схожести</p>
                        <div class="mb-3">
                            <label class="form-label">Введите слова:</label>
                            <input type="text" 
                                   class="form-control" 
                                   id="anagramsInput" 
                                   value="listen, silent, post, stop, tops, pots, get">
                        </div>
                        <button id="btn-find-anagrams" 
                                class="btn btn-postman w-100" 
                                onclick="findAnagrams()">
                            Найти анаграммы
                        </button>
                        <div class="result-box mt-3">
                            <p class="mb-1"><strong>Результат:</strong></p>
                            <div id="anagramsResult">-</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`
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
            `<span class="text-success">${duplicates}</span> дубликат(ов) найдено в:<br><small>${JSON.stringify(arr)}</small>`;
    }

    calculateAverage() {
        const input = document.getElementById('averageInput').value;
        const arr = input.split(',').map(Number).filter(num => !isNaN(num));
        
        if (arr.length === 0) {
            document.getElementById('averageResult').textContent = 'Пожалуйста, введите корректные числа';
            return;
        }
        
        const sum = arr.reduce((acc, val) => acc + val, 0);
        const avg = sum / arr.length;
        
        document.getElementById('averageResult').innerHTML = 
            `Среднее: <span class="text-success">${avg.toFixed(2)}</span><br>Из: ${JSON.stringify(arr)}`;
    }

    mergeArrays() {
        const input1 = document.getElementById('array1Input').value;
        const input2 = document.getElementById('array2Input').value;
        
        const arr1 = input1.split(',').map(Number).filter(num => !isNaN(num));
        const arr2 = input2.split(',').map(Number).filter(num => !isNaN(num));
        
        const merged = [...arr1, ...arr2];
        const sorted = merged.sort((a, b) => b - a);
        
        document.getElementById('mergeResult').innerHTML = 
            `Отсортированный результат: <span class="text-success">${sorted.join(' ')}</span><br>
             Объединено из: ${JSON.stringify(arr1)} и ${JSON.stringify(arr2)}`;
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
            html = 'Группы не найдены';
        } else {
            result.forEach(group => {
                html += `<div class="mb-1"><span class="badge bg-secondary">Группа:</span> ${group.join(', ')}</div>`;
            });
        }
        
        document.getElementById('anagramsResult').innerHTML = html;
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

        document.getElementById("btn-count-dublicates").addEventListener('click', this.calculateDuplicates)
        document.getElementById("btn-calculate-average").addEventListener('click', this.calculateAverage)
        document.getElementById("btn-merge-and-sort").addEventListener('click', this.mergeArrays)
        document.getElementById("btn-find-anagrams").addEventListener('click', this.findAnagrams)
    }
}