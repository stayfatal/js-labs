class Service {
    constructor(repository) {
      this.repo = repository;
    }
  
    findTemplates(filters = {}) {
      if (filters.id) {
        return this.repo.findById(filters.id);
      }
      return this.repo.find(filters);
    }
  
    addTemplate(data) {
      return this.repo.insert(data);
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