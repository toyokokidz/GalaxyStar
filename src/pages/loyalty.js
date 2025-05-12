import React from 'react';
import Head from 'next/head';
import LoyaltyProgram from '../components/LoyaltyProgram/LoyaltyProgram';

export default function Loyalty() {
  return (
    <>
      <Head>
        <title>Loyalty Program | GalaxyStar</title>
        <meta name="description" content="Join our loyalty program and get rewarded for every purchase" />
      </Head>
      <LoyaltyProgram />
    </>
  );
} 