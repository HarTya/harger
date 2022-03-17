import Head from 'next/head';
import React from 'react';
import Header from './Header';

interface LayoutProps {
    title: string;
    children?: React.ReactNode;
    center?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, title }) => {
    return (
        <>
            <Head>
                <title>{title} | AndrewDesignPictures</title>
            </Head>
            <Header />
            <main>
                {children}
            </main>
        </>
    );
};

export default Layout;