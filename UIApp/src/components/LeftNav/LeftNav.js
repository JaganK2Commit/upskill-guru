import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Nav } from "office-ui-fabric-react/lib/Nav";
import { useHistory, useLocation } from "react-router-dom";
import styles from "./LeftNav.style";
import httpCommon from "../../http-common";
import { UserContext } from "../../UserContext";
const LeftNav = ({ className: classNameProp, ...other }) => {
  const history = useHistory();
  const location = useLocation();
  const { user } = useContext(UserContext);
  const links = [
    {
      name: "Home",
      url: "/home",
      key: "home",
    },
    {
      name: "Account",
      url: "/account",
      key: "account",
    },
    {
      name: "Favorite Search",
      url: "/favorites",
      key: "favorites",
    },
  ];

  if (user.roleId != 1)
    links.push({
      name: "Manage Database",
      url: "/ManageDB",
      key: "ManageDB",
    });

  const handleLinkClick = (event, link) => {
    if (!link.external) {
      event.preventDefault();
      history.push(link.url);
    }
  };

  const getSelectedKey = () => {
    const pathParts = location.pathname.split("/");
    if (pathParts[1] === "") return "home";

    const activeLink = links.find((link) => pathParts[1] === link.key);
    return activeLink ? activeLink.key : null;
  };

  return (
    <div>
      <Nav
        onRenderLink={(item) => (
          <div className="ms-Nav-linkText">{item.name}</div>
        )}
        selectedKey={getSelectedKey()}
        className={styles}
        onLinkClick={handleLinkClick}
        groups={[
          {
            links,
            // links: links.filter(l => l.url.trim() !== ''),
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
  className: "",
};

export default LeftNav;
