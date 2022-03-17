import prisma from 'lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { apiHandler } from 'src/helpers/api';

export default apiHandler(handler);

function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'POST':
            return create();
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }

    async function create() {
        const { title, content, user } = req.body;

        if (!title) throw 'Пустой заголовок';

        if (!content) throw 'Пустое описание';
        
        const result = await prisma.post.create({
            data: {
              title: title,
              content: content,
              author: { connect: { name: user.name } },
            },
        });

        return res.status(200).json(result);
    }
}
