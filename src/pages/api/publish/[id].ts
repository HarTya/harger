import prisma from 'lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { apiHandler } from 'src/helpers/api';

export default apiHandler(handler);

function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'PUT':
            return publish(req, res);
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }

    async function publish(req, res) {
        const postId = req.query.id;
        const post = await prisma.post.update({
          where: { id: Number(postId) },
          data: { published: true }
        });
        res.json(post);
    }
}
