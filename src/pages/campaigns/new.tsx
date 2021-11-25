import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { ChangeEvent, useState } from 'react';
import { Header } from 'semantic-ui-react';
import { SmallForm } from '../../components/SmallForm/SmallForm';
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
      await campaignFactory.methods
        .createCampaign(web3.utils.toWei(minimumContribution, 'ether'))
        .send({ from: account });

      router.push('/');
    } catch (error: any) {
      setError(error.message);
    }

    setIsLoading(false);
  };

  return (
    <>
      <Header size="large" inverted>
        Create New Campaign:
      </Header>
      <div style={{ width: '50%' }}>
        <SmallForm
          label="Minimum Contribution"
          submitLabel="Create"
          error={error}
          isLoading={isLoading}
          onChange={onChange}
          onSubmit={onSubmit}
        />
      </div>
    </>
  );
};

export default NewCampaign;
