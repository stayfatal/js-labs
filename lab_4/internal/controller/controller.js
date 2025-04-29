const { Router } = require("express")
const { TemplateDTO } = require("../domain/template");

class Controller {
    constructor(service) {
        this.service = service

        this.findTemplates = this.findTemplates.bind(this);
        this.addTemplate = this.addTemplate.bind(this);
        this.updateTemplate = this.updateTemplate.bind(this);
        this.deleteTemplate = this.deleteTemplate.bind(this);
        this.findTemplateById = this.findTemplateById.bind(this);
    }

    findTemplates(req, res) {
        try {
            const filters = {
                ...req.query,
                id: req.params.id ? Number(req.params.id) : undefined
            }
            
            const result = this.service.findTemplates(filters)
            
            res.json(result.map(item => new TemplateDTO(item).toJSON()))
        } catch (err) {
            console.log(err)
            res.status(400).json({ 
                status: 'error',
                message: err.message
            })
        }
    }

    findTemplateById(req, res) {
        try {
            const id = Number.parseInt(req.params.id)
            const result = this.service.findTemplates({id})
            if (!result){
                res.status(404).json({ 
                    status: 'not found'
                })
                return
            }
            res.json(new TemplateDTO(result).toJSON())
        } catch (err) {
            console.log(err)
            res.status(400).json({ 
                status: 'error',
                message: err.message
            })
        }
    }

    updateTemplate(req, res) {
        try {
            const id = Number(req.params.id)
            const data = new TemplateDTO(req.body)
            
            const result = this.service.updateTemplate(id, data)
            if (!result){
                res.status(404).json({ 
                    status: 'not found'
                })
                return
            }

            res.json(new TemplateDTO(result).toJSON())
        } catch (err) {
            console.log(err)
            res.status(400).json({
                status: 'error', 
                message: err.message
            })
        }
    }

    addTemplate(req, res) {
        try {
            const data = new TemplateDTO(req.body)
            const result = this.service.addTemplate(data)
            res.status(201).json(new TemplateDTO(result).toJSON())
        } catch (err) {
            res.status(400).json({
                status: 'error',
                message: err.message
            })
        }
    }

    deleteTemplate(req, res) {
        try {
            const id = Number(req.params.id)
            const result = this.service.deleteTemplate(id)
            if (!result){
                res.status(404).json({ 
                    status: 'not found'
                })
                return
            }
            
            res.json({
                deleted: id,
                count: result.length
            })
        } catch (err) {
            console.log(err)
            res.status(400).json({
                status: 'error',
                message: err.message
            })
        }
    }
}

function SetupRoutes(service){
    controller=new Controller(service)

    const router = Router()

    router.get('/', controller.findTemplates)
    router.get('/:id', controller.findTemplateById)
    router.post('/', controller.addTemplate)
    router.delete('/:id', controller.deleteTemplate)
    router.put('/:id', controller.updateTemplate)

    return router
}

module.exports={
    SetupRoutes,
}