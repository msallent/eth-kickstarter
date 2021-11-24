import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { ChangeEvent, useState } from 'react';
import { Button, Form, Icon, Input, Message } from 'semantic-ui-react';
import { campaignFactory } from '../../utils/contracts';
import { web3 } from '../../utils/web3';

const NewCampaign: NextPage = () => {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [minimumContribution, setMinimumContribution] = useState('');

  const router = useRouter();

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMinimumContribution(event.target.value);
    setError('');
  };

  const onSubmit = async () => {
    setError('');
    setIsLoading(true);

    try {
      const [account] = await web3.eth.getAccounts();
      await campaignFactory.methods.createCampaign(minimumContribution).send({ from: account });

      router.push('/');
    } catch (error: any) {
      setError(error.message);
    }

    setIsLoading(false);
  };

  return (
    <>
      <Message
        attached
        header="Create a new campaign"
        content="Fill out the form below to create a new campaign"
      />
      <Form onSubmit={onSubmit} className="attached fluid segment">
        <Form.Field>
          <label>Minimum contribution</label>
          <Input type="number" label="wei" labelPosition="right" onChange={onChange} />
        </Form.Field>
        <Button primary disabled={!minimumContribution || isLoading} loading={isLoading}>
          Create
        </Button>
      </Form>
      {(!minimumContribution || error) && (
        <Message error={!!error} warning={!minimumContribution} attached="bottom">
          {error ? <Icon name="delete" /> : <Icon name="warning" />}
          {error || 'Please fill out the form'}
        </Message>
      )}
    </>
  );
};

export default NewCampaign;
