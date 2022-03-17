import prisma from 'lib/prisma';
import { GetServerSideProps } from 'next';
import React from 'react';
import Layout from 'src/components/Layout';
import Post, { PostProps } from 'src/components/Post';

export const getServerSideProps: GetServerSideProps = async () => {
    const feed = await prisma.post.findMany({
        where: { published: true },
        include: {
            author: {
                select: { name: true }
            }
        }
    });
    return { props: { feed } };
};

type Props = {
    feed: PostProps[];
};

const Blog: React.FC<Props> = (props) => {
    return (
        <Layout title='Отзывы'>
            <h1>Отзывы</h1>
            {props.feed.length ?
                props.feed.map((post) => (
                    <div key={post.id} className='post'>
                        <Post post={post} />
                    </div>
                ))
                : <p className='error'>Напишите первым!</p>
            }
        </Layout>
    );
};

export default Blog;