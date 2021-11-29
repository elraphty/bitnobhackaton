import React from "react";
import styles from '../styles/Home.module.css';
import Header from './Header';

export default function Layout(props) {
  return (
    <div>
      <main className={styles.main}>
        <Header />
        {props.children}
      </main>
    </div>
  );
}