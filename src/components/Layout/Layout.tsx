import { FunctionComponent } from 'react';
import { Navbar } from '../Navbar/Navbar';

export const Layout: FunctionComponent = ({ children }) => (
  <div style={{ maxWidth: '960px', margin: '0 auto' }}>
    <Navbar />
    <div style={{ marginTop: '40px' }}>{children}</div>
  </div>
);
