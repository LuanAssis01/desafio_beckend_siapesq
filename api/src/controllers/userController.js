import db from "../models/index.js";
import { authService } from '../auth/jwt.js';

const User = db.User;

const userController = {
    async createUser(req, res) {
        try {
            const { first_name, last_name, email, username, password } = req.body;

            const userAlreadyExists = await User.findOne({ where: { email } })

            if (userAlreadyExists) {
                return res.status(400).json({ message: "User already exists!" })
            }

            if (!first_name || !last_name || !email || !username || !password) {
                return res.status(400).json({ message: "É obrigatório informar todos os campos acima!" })
            }

            const user = await User.create({
                first_name,
                last_name,
                email,
                username,
                password
            });

            return res.status(201).json(user);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erro ao criar usuário" });
        }
    },

    async getUser(req, res) {
        try {
            const users = await User.findAll();
            return res.status(200).json(users);
        } catch (error) {
            console.error(error.message);
            return res.status(500).json({ message: "Erro interno" });
        }
    },

    async putUser(req, res) {
        try {
            const { id } = req.params;
            const { first_name, last_name, email, username } = req.body;
    
            const user = await User.findByPk(id);
            if (!user) {
                return res.status(404).json({ message: "Usuário não encontrado" });
            }

            if (email && email !== user.email) {
                const emailExists = await User.findOne({ where: { email } });
                if (emailExists) {
                    return res.status(400).json({ message: "Este email já está em uso por outro usuário" });
                }
            }

            const updatedData = {
                first_name: first_name || user.first_name,
                last_name: last_name || user.last_name,
                email: email || user.email,
                username: username || user.username
            };
    
            await user.update(updatedData);
    
            return res.status(200).json({
                message: "Usuário atualizado com sucesso",
                user: user
            });
    
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erro ao atualizar usuário" });
        }
    },

    async deleteUser(req, res) {
        try {
            const { id } = req.params;
    
            const user = await User.findByPk(id);
            if (!user) {
                return res.status(404).json({ message: "Usuário não encontrado" });
            }

            await user.destroy();
    
            return res.status(200).json({ 
                message: "Usuário removido com sucesso" 
            });
    
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erro ao remover usuário" });
        }
    },
    
    async login(req, res) {
        try {
            const { email, password } = req.body;
            const { token, user } = await authService.login(email, password);
            
            return res.json({ 
                token,
                user: {
                    id: user.id,
                    email: user.email
                }
            });
        } catch (error) {
            return res.status(401).json({ message: error.message });
        }
    }
};

export default userController;
