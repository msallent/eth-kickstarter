import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { ChangeEvent, useState } from 'react';
import { Button, Form, Header, Icon, Input, Message } from 'semantic-ui-react';
import { getCampaign } from '../../../../utils/contracts';
import { web3 } from '../../../../utils/web3';

const NewRequest: NextPage = () => {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState('');
  const [recipient, setRecipient] = useState('');
  const [description, setDescription] = useState('');

  const router = useRouter();

  const onChangeDescription = (event: ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
    setError('');
  };

  const onChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    setError('');
  };

  const onChangeRecipient = (event: ChangeEvent<HTMLInputElement>) => {
    setRecipient(event.target.value);
    setError('');
  };

  const onSubmit = async () => {
    setError('');
    setIsLoading(true);

    try {
      const [account] = await web3.eth.getAccounts();

      const campaign = getCampaign(router.query.id as string);
      await campaign.methods.createRequest(value, description, recipient).send({ from: account });

      router.push(`/campaigns/${router.query.id}/requests`);
    } catch (error: any) {
      setError(error.message);
    }

    setIsLoading(false);
  };

  return (
    <>
      <Header size="large" inverted>
        Create New Request:
      </Header>
      <div style={{ width: '50%' }}>
        <Form onSubmit={onSubmit} error={!!error}>
          <Form.Field>
            <label style={{ color: 'white' }}>Description</label>
            <Input onChange={onChangeDescription} />
          </Form.Field>
          <Form.Field>
            <label style={{ color: 'white' }}>Value</label>
            <Input label="wei" labelPosition="right" onChange={onChangeValue} />
          </Form.Field>
          <Form.Field>
            <label style={{ color: 'white' }}>Recipient</label>
            <Input onChange={onChangeRecipient} />
          </Form.Field>
          <Button primary disabled={isLoading} loading={isLoading}>
            Add Request
          </Button>
          <Message error>
            <Icon name="delete" />
            <span>{error}</span>
          </Message>
        </Form>
      </div>
    </>
  );
};

export default NewRequest;
