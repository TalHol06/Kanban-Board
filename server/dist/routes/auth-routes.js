import { Router } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
const SECRET_KEY = process.env.JWT_SECRET_KEY || 'default_secret_key';
export const login = async (req, res) => {
    // TODO: If the user exists and the password is correct, return a JWT token
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const token = jwt.sign({ id: user.id, email: user.username }, SECRET_KEY, { expiresIn: '1h' });
        return res.status(200).json({ token });
    }
    catch (err) {
        return res.status(500).json({ message: err });
    }
};
const router = Router();
// POST /login - Login a user
router.post('/login', login);
export default router;
