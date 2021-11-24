import type { GetServerSidePropsContext, NextPage } from 'next';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { Card, CardProps, Header } from 'semantic-ui-react';
import { getCampaign } from '../../utils/contracts';
import { web3 } from '../../utils/web3';

interface CampaignProps {
  minimumContribution: number;
  balance: string;
  totalRequests: number;
  totalContributors: number;
  manager: string;
}

const Campaign: NextPage<CampaignProps> = ({
  minimumContribution,
  balance,
  totalRequests,
  totalContributors,
  manager,
}) => {
  const router = useRouter();

  const cardItems = useMemo<Array<CardProps>>(
    () => [
      {
        header: manager,
        meta: 'Campaign Manager',
        description:
          'Address who created the campaign. Can create new requests to utilize available funds.',
      },
      {
        header: minimumContribution,
        meta: 'Minimum Contribution (wei)',
        description: 'You must contribute at least this much wei to be a contributor.',
      },
      {
        header: totalRequests,
        meta: 'Number of Requests',
        description:
          'Requests to send campaign funds to vendors. Must be approved by majority of the contributors.',
      },
      {
        header: totalContributors,
        meta: 'Contributors',
        description: 'Number of people who have already contributed to this campaign.',
      },
      {
        header: web3.utils.fromWei(balance, 'ether'),
        meta: 'Balance',
        description: 'Current available funds for the campaign.',
      },
    ],
    [manager, minimumContribution, totalRequests, totalContributors, balance]
  );

  return (
    <>
      <Header size="large" inverted>
        Campaign {router.query.id}:
      </Header>
      <Card.Group items={cardItems} itemsPerRow="2" />
    </>
  );
};

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const campaign = getCampaign(context.params?.id as string);
  const summary = await campaign.methods.getSummary().call();

  return {
    props: {
      minimumContribution: summary[0],
      balance: summary[1],
      totalRequests: summary[2],
      totalContributors: summary[3],
      manager: summary[4],
    },
  };
};

export default Campaign;
