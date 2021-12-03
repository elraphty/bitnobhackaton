import styles from '../styles/Home.module.css';
import Layout from '../components/Layout';
import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Message } from 'semantic-ui-react';

export default function Home() {
  const [token, setToken] = useState('');

  useEffect(() => {
    getToken();
  }, []);

  const getToken = async () => {
    const token = await localStorage.getItem('TOKEN');
    setToken(token);
  };

  return (
    <div>
      <Head>
        <title>Bitcoin Gift</title>
        <meta name="description" content="Bitnob giftcard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <section className={styles.index_paragraph}>
          <p>
            A bitcoin giftcard platform built for Bitnob's Bitcoin/Lightning
            network hackaton
          </p>
        </section>

        <section className={styles.main_content}>
          <div className={styles.card_wrap}>
            {token ? (
              <>
                <Link href="/giftcard/create">
                  <a>
                    <div className={styles.card}>
                      <h2>Create Bitcoin Giftcard</h2>
                    </div>
                  </a>
                </Link>
                <Link href="/giftcard/claim">
                  <a>
                    <div className={styles.card}>
                      <h2>Claim Bitcoin Giftcard</h2>
                    </div>
                  </a>
                </Link>
              </>
            ) : <Message error header="Oops!" content="Login to create or claim giftcards" />}
          </div>
        </section>
      </Layout>
    </div>
  );
}
