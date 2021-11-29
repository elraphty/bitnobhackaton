import styles from '../styles/Home.module.css';
import Link from 'next/link';

export default function Layout(props) {
  return (
    <Link href="/">
        <a>
            <h1 className={styles.main_logo}>Bitcoin Gift</h1>
        </a>
    </Link>
  );
}