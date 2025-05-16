class TemplateUrls {
    constructor() {
        this.baseUrl = 'http://localhost:8000';
    }

    getTemplates() {
        return `${this.baseUrl}/templates`;
    }

    getTemplateById(id) {
        return `${this.baseUrl}/templates/${id}`;
    }

    createTemplate() {
        return `${this.baseUrl}/templates`;
    }

    updateTemplate(id) {
        return `${this.baseUrl}/templates/${id}`;
    }

    deleteTemplate(id) {
        return `${this.baseUrl}/templates/${id}`;
    }
}

export const templateUrls = new TemplateUrls(); 