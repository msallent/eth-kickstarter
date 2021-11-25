import type { GetServerSidePropsContext, NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';
import { Button, Header, Icon, Message, Table } from 'semantic-ui-react';
import { getCampaign } from '../../../utils/contracts';
import { web3 } from '../../../utils/web3';

interface RequestsProps {
  totalRequests: string;
  totalContributors: string;
  requests: Array<any>;
}

const Requests: NextPage<RequestsProps> = ({ totalRequests, totalContributors, requests }) => {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const onApprove = async (requestIndex: number) => {
    setError('');
    setIsLoading(true);

    try {
      const [account] = await web3.eth.getAccounts();

      const campaign = getCampaign(router.query.id as string);
      await campaign.methods.approveRequest(requestIndex).send({ from: account });

      router.reload();
    } catch (error: any) {
      setError(error.message);
    }

    setIsLoading(false);
  };

  const onFinalize = async (requestIndex: number) => {
    setError('');
    setIsLoading(true);

    try {
      const [account] = await web3.eth.getAccounts();

      const campaign = getCampaign(router.query.id as string);
      await campaign.methods.finalizeRequest(requestIndex).send({ from: account });

      router.reload();
    } catch (error: any) {
      setError(error.message);
    }

    setIsLoading(false);
  };

  const tableHeader = useMemo(
    () =>
      ['ID', 'Description', 'Amount', 'Recipient', 'Approvals', 'Approve', 'Finalize'].map(
        (header, index) => <Table.HeaderCell key={index}>{header}</Table.HeaderCell>
      ),
    []
  );

  const tableRows = useMemo(
    () =>
      requests.map((request, index) => (
        <Table.Row key={index} textAlign="center">
          <Table.Cell>{index}</Table.Cell>
          <Table.Cell>{request.description}</Table.Cell>
          <Table.Cell>{`${request.value} wei`}</Table.Cell>
          <Table.Cell>{request.recipient}</Table.Cell>
          <Table.Cell>{`${request.approvals} / ${totalContributors}`}</Table.Cell>
          <Table.Cell>
            <Button
              basic
              color="green"
              loading={isLoading}
              disabled={isLoading}
              onClick={() => onApprove(index)}
            >
              Approve
            </Button>
          </Table.Cell>
          <Table.Cell>
            <Button
              basic
              color="red"
              loading={isLoading}
              disabled={isLoading}
              onClick={() => onFinalize(index)}
            >
              Finalize
            </Button>
          </Table.Cell>
        </Table.Row>
      )),
    [requests, totalContributors, isLoading]
  );

  return (
    <>
      <Header size="large" inverted>
        Requests:
      </Header>
      <Link href={`/campaigns/${router.query.id}/requests/new`}>
        <a>
          <Button primary>Add Request</Button>
        </a>
      </Link>
      <Table celled>
        <Table.Header>
          <Table.Row textAlign="center">{tableHeader}</Table.Row>
        </Table.Header>
        <Table.Body>{tableRows}</Table.Body>
      </Table>
      <Message error hidden={!error}>
        <Icon name="delete" />
        <span>{error}</span>
      </Message>
      <span style={{ color: 'white' }}>
        Found {totalRequests} {totalRequests === '1' ? 'request.' : 'requests.'}
      </span>
    </>
  );
};

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const campaign = getCampaign(context.params?.id as string);
  const totalRequests = await campaign.methods.totalRequests().call();
  const totalContributors = await campaign.methods.totalContributors().call();

  const requests = await Promise.all(
    [...Array(parseInt(totalRequests))].map(async (_, index) => {
      return JSON.parse(JSON.stringify(await campaign.methods.requests(index).call()));
    })
  );

  return {
    props: {
      totalRequests,
      totalContributors,
      requests,
    },
  };
};

export default Requests;
