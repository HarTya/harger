import React from 'react';
import Router from 'next/router';

export type PostProps = {
  id: number;
  title: string;
  author: {
    name: string;
    email: string;
  } | null;
  content: string;
  published: boolean;
};

const Post: React.FC<{ post: PostProps }> = ({ post }) => {
  const authorName = post.author ? post.author.name : 'Неизвестно';
  return (
    <div onClick={() => Router.push('/p/[id]', `/p/${post.id}`)}>
      <h2 className='post-title'>{post.title}</h2>
      <p className='post-author'>By {authorName}</p>
      <p>{post.content}</p>
    </div>
  );
};

export default Post;