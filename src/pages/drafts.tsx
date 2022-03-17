import React from 'react';
import { GetServerSideProps } from 'next';
import Layout from '../components/Layout';
import Post, { PostProps } from '../components/Post';
import prisma from 'lib/prisma';
import { userService } from 'src/services';
import Router from 'next/router';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const drafts = await prisma.post.findMany({
    where: {
      author: { name: userService.userValue.name },
      published: false,
    },
    include: {
      author: {
        select: { name: true },
      },
    },
  });
  return {
    props: { drafts },
  };
};

type Props = {
  drafts: PostProps[];
};

const Drafts: React.FC<Props> = (props) => {

  React.useEffect(() => {
      if (!userService.userValue) {
          Router.push('/');
      }
  }, []);
  
  if (!userService.userValue) {
      return (
        <Layout title='Мои Черновики'>
          <h1>Мои Черновики</h1>
          <p className='error'>Авторизуйтесь</p>
        </Layout>
      );
  }    

  return (
    <Layout title='Мои Черновики'>
      <h1>Мои Черновики</h1>
      {props.drafts.length ?
        props.drafts.map((post) => (
          <div key={post.id} className="post">
            <Post post={post} />
          </div>
        ))
        : <p className='error'>Пусто</p>
      }
    </Layout>
  );
};

export default Drafts;