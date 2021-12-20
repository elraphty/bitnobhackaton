import Layout from '../components/Layout';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { BASE_URL } from '../config';

export default function Signup() {
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage('');

    if (name === '' || email === '' || phone === '' || password === '') {
      setErrorMessage('Please enter all fields');
    } else {
      setErrorMessage('');
    }

    try {
      const body = {
        name,
        email,
        phone,
        password,
      };
      const response = await axios.post(`${BASE_URL}users/register`, body);

      if (response.status === 200) {
        setLoading(false);

        router.push('/login');
      }
    } catch (err) {
      setLoading(false);
      setErrorMessage(err.message);
    }
  };

  return (
    <div>
      <Head>
        <title>Bitcoin Gift Signup</title>
        <meta name="description" content="Signup Giftcard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <section className={styles.index_paragraph}>
          <p>FIll all inputs to signup</p>
        </section>

        <section className={styles.create_form}>
          <h3>Signup</h3>
          <Form onSubmit={onSubmit} error={!!errorMessage}>
            <Form.Field className={styles.form_field}>
              <label className={styles.label}>Name</label>
              <Input
                value={name}
                type="text"
                placeholder="Enter name"
                required
                autocomplete={false}
                onChange={(event) => setName(event.target.value)}
              />
            </Form.Field>

            <Form.Field className={styles.form_field}>
              <label className={styles.label}>Email</label>
              <Input
                value={email}
                type="email"
                placeholder="Enter email"
                required
                autocomplete={false}
                onChange={(event) => setEmail(event.target.value)}
              />
            </Form.Field>

            <Form.Field className={styles.form_field}>
              <label className={styles.label}>Phone</label>
              <Input
                value={phone}
                type="tel"
                placeholder="Enter phone"
                required
                autocomplete={false}
                onChange={(event) => setPhone(event.target.value)}
              />
            </Form.Field>

            <Form.Field className={styles.form_field}>
              <label className={styles.label}>Password</label>
              <Input
                value={password}
                type="password"
                placeholder="Enter password"
                required
                autocomplete={false}
                onChange={(event) => setPassword(event.target.value)}
              />
            </Form.Field>
            <Message error header="Oops!" content={errorMessage} />

            <center>
              <Button loading={loading} primary id={styles.form_button}>
                Signup!
              </Button>
            </center>
          </Form>
        </section>
      </Layout>
    </div>
  );
}
