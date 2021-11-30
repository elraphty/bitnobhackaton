import Layout from '../components/Layout';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Login() {
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
        <title>Bitcoin Gift Signup</title>
        <meta name="description" content="Login Giftcard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <section className={styles.index_paragraph}>
          <p>Enter your email and password to sign in</p>
        </section>

        <section className={styles.create_form}>
          <h3>Login</h3>
          <Form onSubmit={onSubmit} error={!!errorMessage}>
            <Form.Field className={styles.form_field}>
              <label className={styles.label}>Email</label>
              <Input
                value={email}
                type="email"
                placeholder="Enter email"
                onChange={(event) => setEmail(event.target.value)}
              />
            </Form.Field>
            <Message error header="Oops!" content={errorMessage} />

            <Form.Field className={styles.form_field}>
              <label className={styles.label}>Password</label>
              <Input
                value={password}
                type="password"
                placeholder="Enter password"
                onChange={(event) => setPassword(event.target.value)}
              />
            </Form.Field>
            <Message error header="Oops!" content={errorMessage} />

            <center>
              <Button loading={loading} primary id={styles.form_button}>
                Login!
              </Button>
            </center>
          </Form>
        </section>
      </Layout>
    </div>
  );
}
