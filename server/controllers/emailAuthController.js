import * as emailAuthService from '../services/emailAuthService.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    try {

        const { email } = req.body;
        const existingUser = await emailAuthService.findUserByEmail(email)

        if (existingUser) {
            return res.status(409).json({ message: 'User already exists' });
        }

        const newUser = await emailAuthService.registerUser(req.body);
        res.status(201).json({ message: "User created successfully!", user: newUser });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error registering user' });
    }
}

export const login = async (req, res) => {
    try {

        const { email, password } = req.body;
        const user = await emailAuthService.findUserByEmail(email);

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const accessToken = jwt.sign({
            id: user.id,
            name: user.name,
            email: user.email
        }, process.env.JWT_SECRET, { expiresIn: '5m' });

        const refreshToken = jwt.sign({
            id: user.id,
            name: user.name,
            email: user.email
        }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });

        await emailAuthService.saveRefreshToken(user.id, refreshToken);

        res.json({ accessToken, refreshToken });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error logging in' });
    }
}

export const refreshToken = async (req, res) => {
    const { token } = req.body;
    if (!token) return res.sendStatus(401)

    try {

        const user = await emailAuthService.findUserByRefreshToken(token);
        if (!user) return res.sendStatus(403)

        jwt.verify(token, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
            if (err || user.id !== decoded.id) return res.sendStatus(403)

            const newAccessToken = jwt.sign({
                id: user.id,
                name: user.name,
                email: user.email
            }, process.env.JWT_SECRET, { expiresIn: '5m' });

            res.json({ accessToken: newAccessToken });
        });

    } catch (error) {
        res.sendStatus(500)
    }

}

export const logout = async (req, res) => {
    const { token } = req.body;
    if (!token) return res.sendStatus(204);

    try {
        await emailAuthService.revokeRefreshToken(token);
        res.sendStatus(204);
    } catch (error) {
        res.sendStatus(500)
    }
}

export const verifyToken = (req, res) => {
    res.status(200).json({ user: req.user });
}