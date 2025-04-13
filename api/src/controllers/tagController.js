import db from "../models/index.js";

const Tag = db.Tag;

const tagController = {
    async createTag(req, res) {
        try {
            const { name } = req.body;

            if (!name) {
                return res.status(400).json({ message: "O campo 'name' é obrigatório" });
            }

            const tagAlreadyExists = await Tag.findOne({ where: { name } });

            if (tagAlreadyExists) {
                return res.status(400).json({ message: "Tag já existe!" });
            }

            const newTag = await Tag.create({ name });

            return res.status(201).json(newTag);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erro ao criar tag" });
        }
    },

    async getTag(req, res) {
        try {
            const tags = await Tag.findAll();
            return res.status(200).json(tags);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erro ao listar tags" });
        }
    },

    async putTag(req, res) {
        try {
            const { id } = req.params;
            const { name } = req.body;
    
            const tagToUpdate = await Tag.findByPk(id);
            if (!tagToUpdate) {
                return res.status(404).json({ message: "Tag não encontrada" });
            }

            if (name && name !== tagToUpdate.name) {
                const nameExists = await Tag.findOne({ where: { name } });
                if (nameExists) {
                    return res.status(400).json({ message: "Este nome já está em uso por outra tag" });
                }
            }

            await tagToUpdate.update({ name });
    
            return res.status(200).json({
                message: "Tag atualizada com sucesso",
                tag: tagToUpdate
            });
    
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erro ao atualizar tag" });
        }
    },

    async deleteTag(req, res) {
        try {
            const { id } = req.params;
    
            const tagToDelete = await Tag.findByPk(id);
            if (!tagToDelete) {
                return res.status(404).json({ message: "Tag não encontrada" });
            }

            await tagToDelete.destroy();
    
            return res.status(200).json({ 
                message: "Tag removida com sucesso" 
            });
    
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erro ao remover tag" });
        }
    }
};

export default tagController;