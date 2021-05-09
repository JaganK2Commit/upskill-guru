import React, { useContext } from 'react';
import { Stack, Link } from 'office-ui-fabric-react';
import styles from './TopBar.style';
import { UserContext } from '../../UserContext';
import  { useHistory } from 'react-router-dom'

export default function TopBar() {
  const { user, setUser } = useContext(UserContext);
  const history = useHistory();
  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    history.push('/');
  }

  return (
      <nav className="navbar navbar-expand navbar-dark bg-primary py-1 ms-Grid">
        {/* <div className='ms-Grid-row'> */}
          <div class="navbar-nav mr-auto mt-2 mt-lg-0" style={{ marginLeft: "20px" }}>
            <a href="#" className="navbar-brand">UpSkill Guru</a>
          </div>
          <div className='form-inline my-2 my-lg-0' style={{ marginRight: "20px" }}>
            {!user
              ? (
                <div className='float-right'>
                 </div>
              )
              : <Link href="#" className={styles.links} onClick={() => logout()}>Logout</Link>
            }
          </div>
        {/* </div> */}
      </nav>
  );
}