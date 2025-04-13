import db from "../models/index.js";

const ItemTag = db.ItemTag;
const Item = db.Item;
const Tag = db.Tag;

const itemTagController = {
    async addTagToItem(req, res) {
        try {
            const { item_id, tag_id } = req.body;

            // Validações básicas
            if (!item_id || !tag_id) {
                return res.status(400).json({ message: "Todos os campos são obrigatórios" });
            }

            // Verifica se os registros existem
            const itemExists = await Item.findByPk(item_id);
            const tagExists = await Tag.findByPk(tag_id);
            
            if (!itemExists || !tagExists) {
                return res.status(404).json({ message: "Item ou Tag não encontrado" });
            }

            // Verifica se a associação já existe
            const existingAssociation = await ItemTag.findOne({ 
                where: { item_id, tag_id } 
            });

            if (existingAssociation) {
                return res.status(400).json({ message: "Esta tag já está associada ao item" });
            }

            // Cria a associação
            const newAssociation = await ItemTag.create({
                item_id,
                tag_id
            });

            return res.status(201).json(newAssociation);

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erro ao associar tag ao item" });
        }
    },

    async getItemTags(req, res) {
        try {
            const { item_id } = req.params;

            const tags = await ItemTag.findAll({
                where: { item_id },
                include: [
                    {
                        model: Tag,
                        as: 'tag'
                    }
                ]
            });

            return res.status(200).json(tags);

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erro ao buscar tags do item" });
        }
    },

    async removeTagFromItem(req, res) {
        try {
            const { id } = req.params;

            const association = await ItemTag.findByPk(id);
            
            if (!association) {
                return res.status(404).json({ message: "Associação não encontrada" });
            }

            await association.destroy();

            return res.status(200).json({ 
                message: "Tag removida do item com sucesso" 
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erro ao remover tag do item" });
        }
    },

    async getItemsByTag(req, res) {
        try {
            const { tag_id } = req.params;

            const items = await ItemTag.findAll({
                where: { tag_id },
                include: [
                    {
                        model: Item,
                        as: 'item'
                    }
                ]
            });

            return res.status(200).json(items);

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erro ao buscar itens por tag" });
        }
    }
};

export default itemTagController;