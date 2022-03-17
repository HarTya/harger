import prisma from 'lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import { apiHandler } from 'src/helpers/api';

export default apiHandler(handler);

function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'POST':
            return registration();
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }

    async function registration() {
        const { name, password } = req.body;

        if (!name.trim()) throw 'Пустое имя';

        if (!password.trim()) throw 'Пустой пароль';

        const candidate = await prisma.user.findUnique({
            where: {
                name: name.toLowerCase().trim()
            }
        })
    
        if (candidate) throw 'Пользователь с таким именем уже существует';

        const validName = name.trim()

        const validPassword = password.trim()

        const result = await prisma.user.create({
            data: {
                name: validName,
                password: validPassword
            }
        });

        const token = jwt.sign({ sub: result.id }, process.env.SECRET, { expiresIn: '7d' });
    
        return res.status(200).json({
            id: result.id,
            name: result.name,
            token
        });
    }
}
