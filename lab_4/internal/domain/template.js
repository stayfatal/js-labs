class TemplateDTO {
	constructor(data) {
	  TemplateDTO._validate(data);
	  this.id = data.id;
	  this.title = data.title;
	  this.elements = data.elements;
	}
  
	static _validate(data) {
	  const numberId = Number.parseInt(data.id);
	  if (Number.isNaN(numberId)) {
		throw new Error('Invalid template ID');
	  }
  
	  if (!data.title || typeof data.title !== 'string') {
		throw new Error('Title is required');
	  }
  
	  if (!Array.isArray(data.elements)) {
		throw new Error('Elements must be an array');
	  }
	}
  
	toJSON() {
	  return {
		id: this.id,
		title: this.title,
		elements: this.elements,
	  };
	}
  }

module.exports={
	TemplateDTO,
}