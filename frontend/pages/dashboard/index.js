import Layout from '../../components/DashboardLayout';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { checkLogin } from '../../config';
import { Table, Modal, Button, Header, Icon, Form, Input, Message } from 'semantic-ui-react';
import axios from 'axios';
import { BASE_URL } from '../../config';
import styles from '../../styles/dashboard.module.css';

export default function Dashboard() {
  const router = useRouter();
  const [token, setToken] = useState('');
  const [gifcards, setGiftcards] = useState([]);
  const [balance, setBalance] = useState({});
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(async () => {
    if (!(await checkLogin())) {
      router.push('/login');
    }

    const nToken = await getToken();

    getGiftcards(nToken);
    getBalance(nToken);
  }, []);

  const getToken = async () => {
    const token = await localStorage.getItem('TOKEN');

    setToken(token);
    return token;
  };

  const getGiftcards = async (token) => {
    const res = await axios.get(`${BASE_URL}giftcards/business`, {
      headers: {
        Authorization: `BEARER ${token}`,
      },
    });

    setGiftcards(res.data.giftcards);
  };

  const getBalance = async (token) => {
    const res = await axios.get(`${BASE_URL}giftcards/balance`, {
      headers: {
        Authorization: `BEARER ${token}`,
      },
    });

    setBalance(res.data.balance[0]);
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    setErrorMessage('');

    if(value === '') {
      setErrorMessage('Please enter bitcoin amount');
    } else if(value > balance.balance) {
      setErrorMessage('Amount is greater than ur bitcoin balance');
    } else {
      setErrorMessage('');
    }

    try {
      // const body = {
      //   amount: Number(value)
      // };

      // await axios.post(`${BASE_URL}giftcards`, body, {
      //   headers: {
      //     Authorization: `BEARER ${token}`,
      //   }
      // });

      // setSuccessMessage('Successfully created giftcard');
      // setValue('');
      // setLoading(false);

    } catch (err) {
      setErrorMessage(err.message);
    }
    setLoading(false);
  };

  return (
    <Layout>
      <Modal
        closeIcon
        open={open}
        trigger={
          <section className={styles.balance}>
            <h3>Balance {balance.balance} BTC</h3>
          </section>
        }
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}>
        <Header icon="money" content="Withdraw funds" />
        <Modal.Content>
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
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color="red" onClick={() => setOpen(false)}>
            <Icon name="remove" /> Close
          </Button>
          <Button color="green" onClick={onSubmit}>
            <Icon name="checkmark" /> Withdraw
          </Button>
        </Modal.Actions>
      </Modal>
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
