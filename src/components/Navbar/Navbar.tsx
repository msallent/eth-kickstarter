import Link from 'next/link';
import { FunctionComponent } from 'react';
import { Icon, Menu } from 'semantic-ui-react';

export const Navbar: FunctionComponent = () => (
  <Menu inverted>
    <Menu.Item as={Link} href="/">
      <a className="item header">ETH Kickstarter</a>
    </Menu.Item>
    <Menu.Menu position="right">
      <Menu.Item as={Link} href="/">
        <a className="item">Campaigns</a>
      </Menu.Item>
      <Menu.Item as={Link} href="/campaigns/new">
        <a className="item">
          <Icon name="add circle" />
          <span>Add New</span>
        </a>
      </Menu.Item>
    </Menu.Menu>
  </Menu>
);
