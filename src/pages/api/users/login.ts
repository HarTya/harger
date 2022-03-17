import prisma from 'lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import { apiHandler } from 'src/helpers/api';

export default apiHandler(handler);

function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'POST':
            return login();
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }

    async function login() {
        const { name, password } = req.body;

        if (!name.trim()) throw 'Пустое имя';

        if (!password.trim()) throw 'Пустой пароль';
        
        const user = await prisma.user.findUnique({
            where: {
                name
            }
        })
    
        if (!user) throw 'Такого пользователя не существует';

        const comparePassword = password === user.password;
        if (!comparePassword) throw 'Неправильный пароль';

        const token = jwt.sign({ sub: user.id }, process.env.SECRET, { expiresIn: '7d' });
    
        return res.status(200).json({
            id: user.id,
            name: user.name,
            token
        });
    }
}
