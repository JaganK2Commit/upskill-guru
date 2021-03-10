import React from 'react';
import PropTypes from 'prop-types';
import { Nav } from 'office-ui-fabric-react/lib/Nav';
import { useHistory, useLocation } from 'react-router-dom';
import styles from './LeftNav.style';

const LeftNav = ({className: classNameProp, ...other }) => {
  const history = useHistory();
  const location = useLocation();

  const links = [
    {
      name: 'Home',
      url: '/',
      key: 'home',
    },
    {
      name: 'Account',
      url: '/Account',
      key: 'account',
    },
    {
      name: 'Skill search',
      url: '/skill-search',
      key: 'skill-search',
    },
    {
      name: 'Saved Search',
      url: '/saved-search',
      key: 'saved-search',
    },
    {
      name: 'Logout',
      url: '/logout',
      key: 'logout',
    },
  ];

  const handleLinkClick = (event, link) => {
    if (!link.external) {
      event.preventDefault();
      history.push(link.url);
    }
  };

  const getSelectedKey = () => {
    const pathParts = location.pathname.split('/');
    if (pathParts[1] === '') return 'home';

    const activeLink = links.find(link => pathParts[1] === link.key);
    return activeLink ? activeLink.key : null;
  };

  return (
    <div >
      <Nav
        onRenderLink={item => (
          <div className="ms-Nav-linkText">
            {item.name}
          </div>
        )}
        selectedKey={getSelectedKey()}
        className={styles}
        onLinkClick={handleLinkClick}
        groups={[
          {
            links: links.filter(l => l.url.trim() !== ''),
          },
        ]}
        {...other}
      />
    </div>
  );
};

LeftNav.propTypes = {
  className: PropTypes.string,
};

LeftNav.defaultProps = {
  className: '',
};

export default LeftNav;
