const { IDCounter } = require('../db/counter');

class Service {
    constructor(repository) {
      this.repo = repository;
      this.idCounter = new IDCounter();
    }
  
    findTemplates(filters = {}) {
      if (filters.id) {
        return this.repo.findById(filters.id);
      }
      return this.repo.find(filters);
    }
  
    addTemplate(data) {
      // Генерируем новый ID и добавляем его к данным
      const newId = this.idCounter.getNextId();
      const templateData = {
        ...data,
        id: newId
      };
      return this.repo.insert(templateData);
    }
  
    updateTemplate(id, updatedData) {
      return this.repo.update(id, updatedData);
    }
  
    deleteTemplate(id) {
      return this.repo.delete(id);
    }
}

module.exports={
    Service,
}