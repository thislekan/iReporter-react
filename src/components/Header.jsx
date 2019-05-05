import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import cx from 'classnames';
import style from '../styles/header.css';

function Header(props) {
  const { location } = props;
  return (
    <div>
      {(location.pathname === '/login' || location.pathname === '/signup') ? '' : <header>
        <nav>
          <div className={style.navigationWrapper}>
            <div
              style={
                {
                  marginLeft: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                }
              }
            >
              <NavLink to='/' exact={true}
                className={cx(style.ireporterLogo, style.navigationLinks)}>iReporter</NavLink>
            </div>
            {(location.pathname === '/admin' || location.pathname === '/user') ? null : <div className={style['login-link']}>
              <NavLink to='/login' className={style.navigationLinks}>Login</NavLink>
            </div>}
            {(location.pathname === '/user' || location.pathname === '/admin') ? <div>
              <NavLink
                onClick={() => localStorage.removeItem('persist:root')}
                to='/'
                className={style['log-out-btn']}
              >
                Log Out
              </NavLink>
            </div> : null}
          </div>
        </nav>
      </header>}
    </div>
  );
}

Header.propTypes = {
  location: PropTypes.object.isRequired,
};

export default withRouter(Header);
