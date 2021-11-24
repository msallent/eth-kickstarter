import type { NextPage } from 'next';
import { campaignFactory } from '../utils/campaignFactory';

interface HomeProps {
  campaigns: Array<string>;
}

const Home: NextPage<HomeProps> = ({ campaigns }) => {
  return <div>Campaigns: {campaigns.length}</div>;
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
