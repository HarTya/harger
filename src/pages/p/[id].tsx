import prisma from 'lib/prisma';
import { GetServerSideProps } from 'next';
import Router from 'next/router';
import React from 'react';
import Layout from 'src/components/Layout';
import { PostProps } from 'src/components/Post';
import { postService, userService } from 'src/services';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const post = await prisma.post.findUnique({
    where: {
      id: Number(params?.id) || -1
    },
    include: {
      author: {
        select: { name: true }
      }
    }
  });
  return {
    props: post
  };
};

const Post: React.FC<PostProps> = (props) => {

  const [error, setError] = React.useState('');

  const postBelongsToUser = userService.userValue && userService.userValue.name === props.author?.name;
  let title = props.title;
  if (!props.published) {
    title = `${title} (Черновик)`;
  }

  const publishPost = async (id) => {
    return postService.publish(id)
      .then(() => Router.push('/'))
      .catch(error => {
        setError(error);
    });
  };

  const deletePost = async (id) => {
    return postService.delete(id)
      .then(() => Router.back())
      .catch(error => {
        setError(error);
    });
  };

  return (
    <Layout title='Отзыв'>
      <div className='post body'>
        <span onClick={() => Router.back()} className='post-arrow'></span>
        <h2 className='post-title'>{title}</h2>
        <p className='post-author'>By {props?.author?.name || 'Неизвестно'}</p>
        <p>{props.content}</p>
        <p className='error'>{error}</p>
        <div className='post__buttons'>
          {!props.published && postBelongsToUser && (
            <button className='post__buttons-button' onClick={() => publishPost(props.id)}>Опубликовать</button>
          )}
          {postBelongsToUser && (
            <button className='post__buttons-button' onClick={() => deletePost(props.id)}>Удалить</button>
          )}
        </div>
      </div>
      <style jsx>{`
        .post {
          margin-bottom: 0px;
        }
        .post-arrow {
          border: solid #fff;
          border-width: 0 4px 4px 0;
          display: inline-block;
          padding: 6px;
          margin-bottom: 20px;
          border-radius: 3px;
          transform: rotate(135deg);
          -webkit-transform: rotate(135deg);
          cursor: pointer;
        }
        .body {
          cursor: default;
        }
        .post__buttons {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          margin-top: 20px;
        }
        .post__buttons-button:not(:last-child) {
          margin-right: 15px;
        }
      `}</style>
    </Layout>
  );
};

export default Post;