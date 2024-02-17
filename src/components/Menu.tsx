import React, { useEffect } from 'react';
import { menu } from '../conf/index.js';
import styles from '../styles/Menu.module.css';
import useStore from '../store/index.js';
import { MenuOption, IMenu } from '../types/index.js';

const Menu = () => {
    const { setOptionChoosed } = useStore();

    const handeOnChange = (e: EventTarget) => {
        const { value } = e as HTMLInputElement;
        setOptionChoosed(value as MenuOption);
    };

    return (
        <div className={styles.select} tabIndex={1}>
            {menu.map((item: IMenu) => (
                <div key={item.id}>
                    <input
                        className={styles.input}
                        name="menu"
                        type="radio"
                        id={item.id}
                        value={item.id}
                        onChange={(e) => handeOnChange(e.target)}
                    />
                    <label htmlFor={item.id} className={styles.option}>
                        {item.name}
                    </label>
                </div>
            ))}
        </div>
    );
};

export default Menu;
