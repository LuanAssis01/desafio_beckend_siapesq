import db from "../models/index.js";

const ItemUser = db.ItemUser;
const User = db.User;
const Item = db.Item;

const itemUserController = {
    async createAssociation(req, res) {
        try {
            const { user_id, item_id, relation_type } = req.body;

            // Validações básicas
            if (!user_id || !item_id || !relation_type) {
                return res.status(400).json({ message: "Todos os campos são obrigatórios" });
            }

            // Verifica se os registros existem
            const userExists = await User.findByPk(user_id);
            const itemExists = await Item.findByPk(item_id);
            
            if (!userExists || !itemExists) {
                return res.status(404).json({ message: "Usuário ou Item não encontrado" });
            }

            // Verifica se a associação já existe
            const existingAssociation = await ItemUser.findOne({ 
                where: { user_id, item_id } 
            });

            if (existingAssociation) {
                return res.status(400).json({ message: "Esta associação já existe" });
            }

            // Cria a associação
            const newAssociation = await ItemUser.create({
                user_id,
                item_id,
                relation_type
            });

            return res.status(201).json(newAssociation);

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erro ao criar associação" });
        }
    },

    async getUserItems(req, res) {
        try {
            const { user_id } = req.params;

            const items = await ItemUser.findAll({
                where: { user_id },
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
            return res.status(500).json({ message: "Erro ao buscar itens do usuário" });
        }
    },

    async updateAssociation(req, res) {
        try {
            const { id } = req.params;
            const { relation_type } = req.body;

            const association = await ItemUser.findByPk(id);
            
            if (!association) {
                return res.status(404).json({ message: "Associação não encontrada" });
            }

            await association.update({ relation_type });

            return res.status(200).json({
                message: "Associação atualizada com sucesso",
                association
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erro ao atualizar associação" });
        }
    },

    async deleteAssociation(req, res) {
        try {
            const { id } = req.params;

            const association = await ItemUser.findByPk(id);
            
            if (!association) {
                return res.status(404).json({ message: "Associação não encontrada" });
            }

            await association.destroy();

            return res.status(200).json({ 
                message: "Associação removida com sucesso" 
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erro ao remover associação" });
        }
    }
};

export default itemUserController;