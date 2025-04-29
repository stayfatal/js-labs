class Repository {
    constructor(dbConnector) {
      this.db = dbConnector;
    }
  
    find(filters = {}) {
      let templates = this.db.read();
      
      if (filters.title) {
        templates = templates.filter(bp =>
          bp.title.toLowerCase().includes(filters.title.toLowerCase())
        );
      }
  
      if (filters.id !== undefined) {
        templates = templates.filter(bp => bp.id === filters.id);
      }
  
      return templates;
    }

    update(id, updatedData) {
        const templates = this.db.read();
        const index = templates.findIndex(bp => bp.id === id);

        if (index === -1) return null;

        templates[index] = { ...templates[index], ...updatedData };
        this.db.write(templates);

        return templates[index];
    }

    findById(id) {
        return this.db.read().find(bp => bp.id === id) || null;
    }

    insert(template) {
        const templates = this.db.read();
        const updatedtemplates = [...templates, template];
        this.db.write(updatedtemplates);
        return template;
    }

    delete(id) {
        const templates = this.db.read();
        const index = templates.findIndex(bp => bp.id === id);

        if (index === -1) return null;
        
        const filteredtemplates = templates.filter(bp => bp.id !== id);
        this.db.write(filteredtemplates);
        return filteredtemplates;
    }
}

module.exports={
    Repository,
}