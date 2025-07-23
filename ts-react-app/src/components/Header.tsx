import { useAuth } from '../hooks';

import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Logo from '../assets/images/oneGlobeLogoWhite.png';

import {
  PrimaryNav,
  Menu,
  NavMenuButton,
  Title,
  Icon,
  Header as USWDSHeader,
} from '@trussworks/react-uswds';

const Header: React.FC = () => {
  const auth = useAuth();

  const [expanded, setExpanded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  const userMenuItems = [
    <div className="bg-white" key="user-menu-item">
      <div className="padding-2">
        <span className="text-black">
          {auth.user?.username ? auth.user?.username : 'Name'}
        </span>
      </div>
    </div>,
    <div className="bg-white" key="log-out-button">
      <NavLink
        to="/"
        className="padding-2 block bg-gray-500"
        style={{ textDecoration: 'none' }}
        onClick={async (e) => {
          e.preventDefault();
          await auth.logout();
          window.location.reload();
        }}
        onMouseEnter={(e) => {
          (e.target as HTMLElement).style.color = '#4a5568';
        }}
        onMouseLeave={(e) => {
          (e.target as HTMLElement).style.color = '#000000';
        }}
      >
        Log out
      </NavLink>
    </div>,
  ];

  const onToggle = (): void => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const navItems = [
    <>
      <button
        key="user-dropdown"
        title="User Menu"
        aria-expanded={isOpen}
        aria-controls="user-dropdown"
        onClick={onToggle}
        className={`usa-accordion__button usa-nav__link`}
        type="button"
      >
        <span className="text-white">
          User <Icon.Person className="w-7 h-7" role="presentation" />
        </span>
      </button>
      <Menu
        key="user-menu"
        items={userMenuItems}
        isOpen={isOpen}
        id="user-dropdown"
        className="bg-white"
      />
    </>,
  ];

  return (
    <>
      <div
        onClick={toggleMenu}
        aria-hidden={true}
        className={`usa-overlay ${expanded ? 'is-visible' : ''}`}
      ></div>
      <USWDSHeader
        className="bg-primary-darker border-x-0 border-t-0 border-b-2 border-solid border-cyan"
        basic
      >
        <div className="usa-nav-container maxw-full">
          <div className="usa-navbar">
            <Title>
              <Link to="/">
                <img className="h-8" src={Logo} alt="OneGlobe Logo" />
              </Link>
            </Title>
            <NavMenuButton onClick={toggleMenu} label="Menu" />
          </div>
          <PrimaryNav
            items={navItems}
            mobileExpanded={expanded}
            onToggleMobileNav={toggleMenu}
          />
        </div>
      </USWDSHeader>
    </>
  );
};

export default Header;
