import styles from '../styles/Home.module.css';
import Link from 'next/link';
import { Button } from 'semantic-ui-react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Header(props) {
  const router = useRouter();

  const [token, setToken] = useState('');

  useEffect(() => {
    getToken();
  }, []);

  const getToken = async () => {
    const token = await localStorage.getItem('TOKEN');
    setToken(token);
  };

  const logout = async () => {
    await localStorage.setItem('TOKEN', '');
    router.reload();
  };

  const login = async () => {
    router.push('/login');
  };

  const signup = async () => {
    router.push('/signup');
  };

  const dashboard = async () => {
    router.push('/dashboard');
  };

  return (
    <div className={styles.header}>
      <Link href="/">
        <a>
          <h1 className={styles.main_logo}>Bitcoin Gift</h1>
        </a>
      </Link>
      <section className={styles.header_right}>
        {!token ? (
          <>
            <Button onClick={login} primary className={styles.header_button}>
              Login
            </Button>
            <section className={styles.header_button_margin} />
            <Button onClick={signup} primary className={styles.header_button}>
              Signup
            </Button>
          </>
        ) : (
          <>
            <Button onClick={dashboard} primary className={styles.header_button}>
              Dashboard
            </Button>
            <section className={styles.header_button_margin}/>
            <Button onClick={logout} className={styles.header_button}>
              Logout
            </Button>
          </>
        )}
      </section>
    </div>
  );
}
