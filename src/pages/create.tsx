import React, { useState } from 'react';
import Layout from '../components/Layout';
import Router from 'next/router';
import { postService, userService } from 'src/services';

const Draft: React.FC = () => {

    const user = userService.userValue

    const [error, setError] = React.useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const submitData = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        
        return postService.create(title, content, user)
            .then(() => Router.push('/drafts'))
            .catch(error => {
                setError(error);
            });
    };

    React.useEffect(() => {
        if (!userService.userValue) {
            Router.push('/');
        }
    }, []);

    if (!userService.userValue) {
        return (
          <Layout title='Новый отзыв'>
            <h1>Новый отзыв</h1>
            <p className='error'>Авторизуйтесь</p>
          </Layout>
        );
    }    

    return (
        <Layout title='Новый отзыв'>
            <div>
                <form onSubmit={submitData} className='form'>
                    <h1>Новый отзыв</h1>
                    <input
                        autoFocus
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Заголовок"
                        type="text"
                        value={title}
                    />
                    <textarea
                        cols={50}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Описание"
                        rows={8}
                        value={content}
                    />
                    <div className='form__buttons'>
                        <p className='error'>{error}</p>
                        <button disabled={!title || !content}>Создать</button>
                        <a className="back" href="#" onClick={() => Router.back()}>
                            или Отменить
                        </a>
                    </div>
                </form>
            </div>
            <style jsx>{`
                input {
                    margin-bottom: 30px;
                    width: 267px;
                }
                textarea {
                    margin-bottom: 15px;
                }
                button {
                    margin-bottom: 20px;
                }
                .error {
                    margin-bottom: 20px;
                }
                .back {
                    color: black;
                    font-size: 20px;
                }
                .back:hover {
                    text-decoration: underline;
                }
            `}</style>
        </Layout>
    );
};

export default Draft;