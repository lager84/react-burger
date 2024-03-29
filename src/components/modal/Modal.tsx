import { useEffect, useCallback, FC} from 'react';
import ReactDOM from 'react-dom';
import styles from '../modal/modal.module.css'
import ModalOverlay from '../modal-overlay/ModalOverlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';






type TProps = {
    title?: string;
    children: React.ReactNode;
    btnClose: (e?: Event) => void;
}

const Modal:FC<TProps> = ({ title, children, btnClose }) => {


    const checkEsc = useCallback((e:KeyboardEvent) => {
        if (e.key === "Escape") {
            btnClose(e);
        }
    }, [btnClose]);



    useEffect(() => {
        document.addEventListener("keydown", checkEsc, false);

        return () => {
            document.removeEventListener("keydown", checkEsc, false);
        };
    }, [checkEsc]);




    return ReactDOM.createPortal((
        <>
            <div className={styles.modalOrder}>
                <div className={styles.ingredient_header}>
                    <h2 className={styles.ingredient_title}>{title}</h2>
                    <div className={styles.order_closeButton}><CloseIcon type="primary" onClick={btnClose} /></div>
                </div>
                {children}
            </div>
            <ModalOverlay onClick={btnClose} />
        </>

    ), document.getElementById('modals') as Element);
}


export default Modal