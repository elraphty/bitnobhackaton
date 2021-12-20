import Layout from '../../components/DashboardLayout';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { checkLogin } from '../../config';

export default function Dashboard() {
  const router = useRouter();

  useEffect(async () => {
    if(! await checkLogin())  {
      router.push('/login');
    }
  }, []);


  return (
    <Layout>
      <h2>Dashboard</h2>
    </Layout>
  );
}
