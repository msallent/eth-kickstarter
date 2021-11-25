import { ChangeEvent, FunctionComponent } from 'react';
import { Button, Form, Icon, Input, Message } from 'semantic-ui-react';

interface SmallFormProps {
  label: string;
  error?: string;
  isLoading: boolean;
  submitLabel: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
}

export const SmallForm: FunctionComponent<SmallFormProps> = ({
  label,
  error,
  isLoading,
  submitLabel,
  onChange,
  onSubmit,
}) => (
  <Form onSubmit={onSubmit} error={!!error}>
    <Form.Field>
      <label style={{ color: 'white' }}>{label}</label>
      <Input type="number" label="wei" labelPosition="right" onChange={onChange} />
    </Form.Field>
    <Button primary loading={isLoading}>
      {submitLabel}
    </Button>
    <Message error>
      <Icon name="delete" />
      <span>{error}</span>
    </Message>
  </Form>
);
