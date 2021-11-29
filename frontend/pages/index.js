import styles from '../styles/Home.module.css';
import Layout from '../components/Layout';
import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
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
          </div>
        </section>
      </Layout>
    </div>
  );
}
