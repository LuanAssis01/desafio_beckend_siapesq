import db from "../models/index.js";

const Item = db.Item;

const itemController = {
    async createItem(req, res) {
        try {
            const { name, description, image_uri } = req.body;

            const itemAlreadyExists = await Item.findOne({ where: { name } });

            if (itemAlreadyExists) {
                return res.status(400).json({ message: "Item already exists!" });
            }

            if (!name || !description || !image_uri) {
                return res.status(400).json({ message: "É obrigatório informar todos os campos acima!" });
            }

            const newItem = await Item.create({
                name,
                description,
                image_uri,
            });

            return res.status(201).json(newItem);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erro ao criar item" });
        }
    },

    async getItem(req, res) {
        try {
            const items = await Item.findAll();
            return res.status(200).json(items);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erro ao listar itens" });
        }
    },

    async putItem(req, res) {
        try {
            const { id } = req.params;
            const { name, description, image_uri } = req.body;
    
            const item = await Item.findByPk(id);
            if (!item) {
                return res.status(404).json({ message: "Item não encontrado" });
            }

            if (name && name !== item.name) {
                const nameExists = await Item.findOne({ where: { name } });
                if (nameExists) {
                    return res.status(400).json({ message: "Este nome já está em uso por outro item" });
                }
            }

            const updatedData = {
                name: name || item.name,
                description: description || item.description,
                image_uri: image_uri || item.image_uri,
            };
    
            await item.update(updatedData);
    
            return res.status(200).json({
                message: "Item atualizado com sucesso",
                item: item
            });
    
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erro ao atualizar item" });
        }
    },

    async deleteItem(req, res) {
        try {
            const { id } = req.params;
    
            const item = await Item.findByPk(id);
            if (!item) {
                return res.status(404).json({ message: "Item não encontrado" });
            }

            await item.destroy();
    
            return res.status(200).json({ 
                message: "Item removido com sucesso" 
            });
    
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erro ao remover item" });
        }
    }
};

export default itemController;