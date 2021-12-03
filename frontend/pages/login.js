import Layout from '../components/Layout';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from  'axios';
import {BASE_URL} from '../config';
import { checkLogin } from '../config';

export default function Login() {
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();

  useEffect(async () =>  {
    if(await checkLogin())  {
      router.push('/');
    }
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage('');

    if(email === '' || password === '') {
      setErrorMessage('Please enter your email and password');
    } else {
      setErrorMessage('');
    }

    try {
      const body = {
        email,
        password
      };

      const response = await axios.post(`${BASE_URL}users/login`, body);
      if(response.data.token) {
        setSuccessMessage('Successfully Logged in');
        localStorage.setItem('TOKEN', response.data.token);

        setTimeout(() => {
          router.push('/dashboard');
        }, 2000);
      }
    } catch (err) {
      setLoading(false);
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

            <Form.Field className={styles.form_field}>
              <label className={styles.label}>Password</label>
              <Input
                value={password}
                type="password"
                placeholder="Enter password"
                onChange={(event) => setPassword(event.target.value)}
              />
            </Form.Field>
            {errorMessage ? (<Message error header="Oops!" content={errorMessage} />) : null}
            {successMessage ? (<Message success header="Success!" content={successMessage} />) : null}
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
