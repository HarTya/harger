import Link from 'next/link';
import { useRouter } from 'next/router';

interface ACustomLinkProps {
    href: string;
    children: React.ReactChild;
    className?: string;
    active?: string;
}

const A: React.FC<ACustomLinkProps> = ({ href, children, className }) => {
    const router = useRouter()
    return (
        <>
            <Link href={href}>
                <a className={router.asPath === href ? `${className} active` : className}>{children}</a>
            </Link>
            <style jsx>{`
                .active {
                    color: black;
                    background-color: rgba(255, 0, 255, 0.8);
                }
            `}</style>
        </>
    );
};

export default A;