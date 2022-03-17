interface ModalProps {
    active: boolean;
    setActive: (boolean) => void;
}

const Modal: React.FC<ModalProps> = ({ active, setActive, children }) => {
    return (
        <div
            className={active ? 'active Modal' : 'Modal'}
            onClick={() => setActive(false)}
        >
            <div onClick={e => e.stopPropagation()} className={active ? 'active Modal__content' : 'Modal__content'}>
                {children}
            </div>
        </div>
    );
};

export default Modal;