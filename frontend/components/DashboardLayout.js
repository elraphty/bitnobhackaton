import React from 'react';
import { Container, Icon, Menu, Segment, Sidebar } from 'semantic-ui-react';
import styles from '../styles/dashboard.module.css';
import DashHeader from './DashboardHeader';
import Link from 'next/link';

export default function DashboardLayout(props) {
  return (
    <main className={styles.main}>
      <Sidebar.Pushable as={Segment} className={styles.sidebar_pushable}>
        <Sidebar
          as={Menu}
          animation="overlay"
          icon="labeled"
          vertical
          visible
          width="thin">
          <Link href="/">
            <a>
              <Menu.Item as="a">
                <Icon name="home" />
                Home
              </Menu.Item>
            </a>
          </Link>
        </Sidebar>

        <Sidebar.Pusher>
          <Container>
            <Segment basic>
              <DashHeader />
              {props.children}
            </Segment>
          </Container>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </main>
  );
}
