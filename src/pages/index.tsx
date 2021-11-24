import type { NextPage } from 'next';
import { useMemo } from 'react';
import { Card, CardProps, Header } from 'semantic-ui-react';
import { campaignFactory } from '../utils/contracts';

interface HomeProps {
  campaigns: Array<string>;
}

const Home: NextPage<HomeProps> = ({ campaigns }) => {
  const cardItems = useMemo<Array<CardProps>>(
    () =>
      campaigns.map((campaign, index) => ({
        header: campaign,
        meta: `Campaign #${index + 1}`,
        description: <a>View Campaign</a>,
        image: '/eth-landscape.png',
        fluid: true,
      })),
    [campaigns]
  );

  return (
    <>
      <Header size="large" inverted>
        Active Campaigns:
      </Header>
      <Card.Group items={cardItems} itemsPerRow="2" />
    </>
  );
};

export const getServerSideProps = async () => {
  const campaigns = await campaignFactory.methods.getCampaigns().call();

  return {
    props: {
      campaigns,
    },
  };
};

export default Home;
