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
            <div>
              <NavLink to='/' exact={true}
                className={cx(style.ireporterLogo, style.navigationLinks)}>iReporter</NavLink>
            </div>
            <div><NavLink to='/login' className={style.navigationLinks}>Login</NavLink></div>
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
