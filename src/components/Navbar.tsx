import React, {ReactNode} from 'react';
import {Box, Link, useTheme} from '@mui/material';
import {NavLink} from 'react-router-dom';

export const navLinks = [
  {
    name: 'Home',
    path: ''
  },
  {
    name: 'Registered Users',
    path: '/valid',
  },
  {
    name: 'Search User',
    path: '/search',
  }
]

type link = {
  name: string;
  path: string;
  component: ReactNode;
};

interface NavbarProps {
  /**
   * What color to use
   */
  links?: link[];
}

/**
 * main user navigation
 */
const Navbar: React.FC<NavbarProps> = ({}: NavbarProps) => {
  const theme = useTheme();
  const preventDefault = (event: React.SyntheticEvent) =>
    event.preventDefault();
  return (
    <nav>
      {navLinks.map(({name, path}) => (
        <NavLink
          key={name}
          to={path}
          style={({isActive}) => ({
            textDecoration: 'none',
            padding: '10px',
            color: isActive
              ? 'blue'
              : 'black',
            fontWeight: isActive ? 'bold' : 'normal'
          })}>
          {name}
        </NavLink>
      ))}
    </nav>
  );
};

export default Navbar;
