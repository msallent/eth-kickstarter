import type { GetServerSidePropsContext, NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ChangeEvent, useMemo, useState } from 'react';
import { Button, Card, CardProps, Grid, Header } from 'semantic-ui-react';
import { SmallForm } from '../../components/SmallForm/SmallForm';
import { getCampaign } from '../../utils/contracts';
import { web3 } from '../../utils/web3';

interface CampaignProps {
  minimumContribution: string;
  balance: string;
  totalRequests: string;
  totalContributors: string;
  manager: string;
}

const Campaign: NextPage<CampaignProps> = ({
  minimumContribution,
  balance,
  totalRequests,
  totalContributors,
  manager,
}) => {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [contribution, setContribution] = useState('');

  const router = useRouter();

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setContribution(event.target.value);
    setError('');
  };

  const onSubmit = async () => {
    setError('');
    setIsLoading(true);

    try {
      const [account] = await web3.eth.getAccounts();

      const campaign = getCampaign(router.query.id as string);
      await campaign.methods.contribute().send({ from: account, value: contribution });

      router.reload();
    } catch (error: any) {
      setError(error.message);
    }

    setIsLoading(false);
  };

  const cardItems = useMemo<Array<CardProps>>(
    () => [
      {
        header: manager,
        meta: 'Campaign Manager',
        description:
          'Address who created the campaign. Can create new requests to utilize available funds.',
        style: { overflowWrap: 'break-word' },
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
        header: `${minimumContribution} wei`,
        meta: 'Minimum Contribution',
        description: 'You must contribute at least this much wei to be a contributor.',
      },
      {
        header: `${web3.utils.fromWei(balance, 'ether')} ETH`,
        meta: 'Balance',
        description: 'Current available funds for the campaign.',
      },
    ],
    [manager, minimumContribution, totalRequests, totalContributors, balance]
  );

  return (
    <>
      <Header size="large" inverted>
        {router.query.id}:
      </Header>
      <Grid>
        <Grid.Column width="10">
          <Card.Group items={cardItems} itemsPerRow="2" />
        </Grid.Column>
        <Grid.Column width="6">
          <SmallForm
            label="Amount to Contribute"
            submitLabel="Contribute"
            error={error}
            isLoading={isLoading}
            onChange={onChange}
            onSubmit={onSubmit}
          />
          <Link href={`/campaigns/${router.query.id}/requests`}>
            <a>
              <Button style={{ marginTop: '1em' }} color="violet">
                View Requests
              </Button>
            </a>
          </Link>
        </Grid.Column>
      </Grid>
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
