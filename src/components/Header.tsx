import React from 'react';
import { userService } from 'src/services';
import A from './A';
import Modal from './Modal';
import { useRouter } from 'next/router';

const Header: React.FC = () => {

    const [active, setActive] = React.useState(false)

    const user = userService.userValue
    const router = useRouter()

    let left = (
        <div className='left'>
            {user ?
                <>
                    <A href='/' className='header-link'>Отзывы</A>
                    <A href='/drafts' className='header-link'>Мои Черновики</A>
                </>
                :   <>
                        <A href='/' className='header-link'>Отзывы</A>
                    </>
            }
        </div>
    )

    let right = (
        <div className='right'>
        {user ?
            <>
                <p className='header-text'>{user.name}</p>
                <A href='/create' className='header-link'>Новый отзыв</A>
                <button className='header-button' onClick={() => userService.logout()}>Выйти</button>
            </>
            :   null
        }
        </div>
    )

    return (
        <div className='header'>
            <div onClick={() => setActive(!active)} className='menu__icon'>
                <span></span>
            </div>
            {active ?
            <Modal active={active} setActive={setActive}>
                {left}
                {right}
            </Modal>
            :   <>
                    {left}
                    {right}
                </>
            }
            {user ? <p className='header-text-mobile'>{user.name}</p> : <button onClick={() => router.push('/login')} className='header-button-mobile'>Авторизация</button>}
        </div>
    );
};

export default Header;