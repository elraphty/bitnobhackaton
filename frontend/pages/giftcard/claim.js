import Layout from '../../components/Layout';
import Head from 'next/head';
import styles from '../../styles/Home.module.css';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { BASE_URL } from '../../config';

export default function Home() {
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState('');
  const [code, setCode] = useState('');
  const [token, setToken] = useState('');

  useEffect(() => {
    getToken();
  }, []);

  const getToken = async () => {
    const token = await localStorage.getItem('TOKEN');
    setToken(token);
  };

  const router = useRouter();

  const onSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    setErrorMessage('');

    if (value === '' || code === '') {
      setErrorMessage('Please enter bitcoin amount');
    } else {
      setErrorMessage('');
    }

    try {
      const body = {
        amount: Number(value),
        code,
      };

      const res = await axios.post(`${BASE_URL}giftcards/claim`, body, {
        headers: {
          Authorization: `BEARER ${token}`,
        },
      });

      if (res.status !== 200) {
        setErrorMessage(res.data.msg);
      } else {
        setSuccessMessage('Successfully created giftcard');
        setValue('');
        setCode('');
      }
      setLoading(false);
    } catch (err) {
      setErrorMessage('Insuficient giftcard balance');
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
            Claim a giftcard by inputing the amount of bitcoin <br /> you want
            to claim, and the gifcard code
          </p>
        </section>

        <section className={styles.create_form}>
          <h3>Claim Giftcard</h3>
          <Form onSubmit={onSubmit} error={!!errorMessage}>
            <Form.Field>
              <label>Minimum Contribution</label>
              <Input
                label="CODE"
                labelPosition="right"
                value={code}
                type="text"
                placeholder="Enter giftcard code"
                onChange={(event) => setCode(event.target.value)}
              />
            </Form.Field>
            <Form.Field>
              <label>Minimum Contribution</label>
              <Input
                label="BTC"
                labelPosition="right"
                value={value}
                type="number"
                placeholder="Enter bitcoin value"
                onChange={(event) => setValue(event.target.value)}
              />
            </Form.Field>
            {errorMessage ?  <Message error header="Oops!" content={errorMessage} /> : null} 
            {successMessage ? <Message success header="Success!" content={successMessage} />: null}
            <center>
              <Button
                loading={loading}
                primary
                style={{
                  backgroundColor: '#24FEB7',
                  color: '#010f25',
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
