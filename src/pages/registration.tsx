import Router from 'next/router';
import React from 'react';
import A from 'src/components/A';
import Layout from 'src/components/Layout';
import { userService } from 'src/services';

const Registration = () => {
    const [error, setError] = React.useState('');
    const [name, setName] = React.useState('');
    const [password, setPassword] = React.useState('');

    const submitData = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        return userService.registration(name, password)
            .then(() => {
                Router.push('/');
                setError('');
                setName('');
                setPassword('');
            })
            .catch(error => {
                setError(error);
            });
    };

    React.useEffect(() => {
        if (userService.userValue) {
            Router.push('/');
        }
    }, []);

    return (
        <Layout title='Регистрация'>
            <form onSubmit={submitData} className='form'>
                <h1>Регистрация</h1>
                <h2>Уже есть аккаунт? 
                    <span className='link'><A className='link' href='/login'>Войти</A></span>
                </h2>
                <input
                    autoFocus
                    onChange={(e) => setName(e.target.value)}
                    placeholder='Имя'
                    type='text'
                    value={name}
                />
                <input
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Пароль'
                    type='password'
                    value={password}
                />
                <div className='form__buttons'>
                    <p className='error'>{error}</p>
                    <button disabled={!name || !password}>Регистрация</button>
                    <a className='back' href='#' onClick={() => Router.back()}>
                        или Отменить
                    </a>
                </div>
                <style jsx>{`
                    h1 {
                        margin-bottom: 10px;
                    }
                    h2 {
                        margin-bottom: 30px;
                    }
                    .link {
                        color: fuchsia;
                        margin-left: 10px;
                    }
                    .link:hover {
                        text-decoration: underline;
                    }
                    input {
                        margin-bottom: 30px;
                    }
                    .error {
                        margin-bottom: 20px;
                    }
                    button {
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
            </form>
        </Layout>
    );
};

export default Registration;