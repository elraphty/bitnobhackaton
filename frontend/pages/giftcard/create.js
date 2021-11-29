import Layout from '../../components/Layout';
import Head from 'next/head';
import styles from '../../styles/Home.module.css';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState('');

  const router = useRouter();

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      router.push('/');
    } catch (err) {
      setErrorMessage(err.message);
    }
    setLoading(false);
  };

  return (
    <div>
      <Head>
        <title>Bitcoin Gift</title>
        <meta name="description" content="Create Giftcard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <section className={styles.index_paragraph}>
          <p>
            Create a giftcard by inputing the amount of Bitcoin you want to gift
            out
          </p>
        </section>

        <section className={styles.create_form}>
          <h3>Create Giftcard</h3>
          <Form onSubmit={onSubmit} error={!!errorMessage}>
            <Form.Field>
              <label>Minimum Contribution</label>
              <Input
                label="BTC"
                labelPosition="right"
                value={value}
                type="number"
                onChange={(event) => setValue(event.target.value)}
              />
            </Form.Field>
            <Message error header="Oops!" content={errorMessage} />
            <center>
              <Button
                loading={loading}
                primary
                style={{
                  backgroundColor: '#61CE70',
                }}>
                Create!
              </Button>
            </center>
          </Form>
        </section>
      </Layout>
    </div>
  );
}