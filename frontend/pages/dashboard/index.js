import Layout from '../../components/DashboardLayout';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { checkLogin } from '../../config';
import { Table, Container } from 'semantic-ui-react';
import axios from 'axios';
import { BASE_URL } from '../../config';
import styles from '../../styles/dashboard.module.css';

export default function Dashboard() {
  const router = useRouter();
  const [token, setToken] = useState('');
  const [gifcards, setGiftcards] = useState([]);
  const [balance, setBalance] = useState({});

  useEffect(async () => {
    if (!(await checkLogin())) {
      router.push('/login');
    }

    await getToken();

    getGiftcards();
    getBalance();
  }, []);

  const getToken = async () => {
    const token = await localStorage.getItem('TOKEN');

    setToken(token);
  };

  const getGiftcards = async () => {
    const res = await axios.get(`${BASE_URL}giftcards/business`, {
      headers: {
        Authorization: `BEARER ${token}`,
      },
    });

    setGiftcards(res.data.giftcards);
  };

  const getBalance = async () => {
    const res = await axios.get(`${BASE_URL}giftcards/balance`, {
      headers: {
        Authorization: `BEARER ${token}`,
      },
    });

    setBalance(res.data.balance[0]);
  };

  return (
    <Layout>
      <section className={styles.balance}>
        <h3>Balance {balance.balance} BTC</h3>
      </section>
      <Table basic="very">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Code</Table.HeaderCell>
            <Table.HeaderCell>Amount</Table.HeaderCell>
            <Table.HeaderCell>Date</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {gifcards.map((card, i) => {
            return (
              <Table.Row>
                <Table.Cell>{card.code}</Table.Cell>
                <Table.Cell>{card.amount}</Table.Cell>
                <Table.Cell>{card.created_at}</Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </Layout>
  );
}
