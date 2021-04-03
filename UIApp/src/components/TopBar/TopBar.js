import React, { useContext } from 'react';
import { Stack, Link } from 'office-ui-fabric-react';
import styles from './TopBar.style';
import { UserContext } from '../../UserContext';

export default function TopBar() {
  const { user, setUser } = useContext(UserContext);

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  }

  return (
      <nav className="navbar navbar-expand navbar-dark bg-dark ms-Grid">
        {/* <div className='ms-Grid-row'> */}
          <a href="/" className="navbar-brand">UpSkill-Guru</a>
          <div className={styles}>
            {!user
              ? (
                <div className='float-right'>
                  <Link href="/Login" className={styles.links}>Login</Link> |  
                  <Link href="/CreateAccount" className={styles.links}>Register</Link>
                </div>
              )
              : <Link href="#" className={styles.links} onClick={() => logout()}>logout</Link>
            }
          </div>
        {/* </div> */}
      </nav>
  );
}