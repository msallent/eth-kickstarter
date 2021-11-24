import { FunctionComponent } from 'react';
import { Navbar } from '../Navbar/Navbar';
import styles from './Layout.module.css';

export const Layout: FunctionComponent = ({ children }) => (
  <div className={styles.container}>
    <Navbar />
    <div className={styles.wrapper}>{children}</div>
  </div>
);
