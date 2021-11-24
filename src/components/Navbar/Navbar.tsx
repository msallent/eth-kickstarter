import Link from 'next/link';
import { FunctionComponent } from 'react';
import { Icon, Menu } from 'semantic-ui-react';

export const Navbar: FunctionComponent = () => (
  <Menu inverted>
    <Menu.Item header link>
      <Link href="/">
        <a>ETH Kickstarter</a>
      </Link>
    </Menu.Item>
    <Menu.Menu position="right">
      <Menu.Item link>
        <Link href="/">
          <a>Campaigns</a>
        </Link>
      </Menu.Item>
      <Menu.Item link>
        <Icon name="add circle" />
        <Link href="/campaigns/new">
          <a>Add New</a>
        </Link>
      </Menu.Item>
    </Menu.Menu>
  </Menu>
);
