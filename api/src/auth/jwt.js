import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import db from '../models/index.js';

const User = db.User;
const jwtSecret = process.env.JWT_SECRET || 'seuSegredoSuperSecreto';

export const authService = {
  async login(email, password) {
    const user = await User.findOne({ where: { email } });
    if (!user) throw new Error('Usuário não encontrado');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error('Senha inválida');

    const token = this.generateToken(user);
    return { token, user: { id: user.id, email: user.email } };
  },

  verifyToken(token) {
    try {
      return jwt.verify(token, jwtSecret);
    } catch (err) {
      throw new Error('Token inválido ou expirado');
    }
  },

  generateToken(user) {
    return jwt.sign(
      { id: user.id, email: user.email },
      jwtSecret,
      { expiresIn: '24h' }
    );
  }
};

export const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, jwtSecret);
    if (!decoded.id) {
      return res.status(401).json({ message: 'Token inválido' });
    }

    const user = await User.findByPk(decoded.id);
    if (!user) {
      return res.status(401).json({ message: 'Usuário não encontrado' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido ou expirado' });
  }
};
