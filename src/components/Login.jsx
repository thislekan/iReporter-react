import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import style from '../styles/login.css';
import quietImage from '../media/quiet.jpg';
import validateFields from '../utils/inputValidator';
import * as authSelector from '../store/selectors/authSelector';
import authenticateUser from '../store/actions/authActions';
import AlertMessage from './reuseables/AlertMessage.jsx';
import Loader from './reuseables/Loader.jsx';

class Login extends React.Component {
  static propTypes = {
    authenticateUser: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    message: PropTypes.string,
    authStatus: PropTypes.string,
    isLoading: PropTypes.bool,
    isAdmin: PropTypes.bool,
  }

  static defaultProps = {
    message: '',
    authStatus: '',
    isLoading: false,
    isAdmin: false,
  }

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      openModal: false,
      message: '',
      email: '',
      password: '',
      isAdmin: false,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.message) return null;
    const {
      message, isLoading, authStatus, isAdmin,
    } = nextProps;
    return {
      message, isLoading, authStatus, isAdmin,
    };
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value.trim() });

  resetState = () => this.setState({ message: '', openModal: false });

  validateInput = (payload, route) => {
    const result = validateFields(payload, route);
    if (typeof result === 'string') {
      this.setState({ message: result, openModal: true });
      return false;
    }
    return true;
  }


  // eslint-disable-next-line consistent-return
  submitData = (e) => {
    const { authenticateUser: userLogin } = this.props;
    const { email, password } = this.state;
    e.preventDefault();
    const payload = { email, password };
    if (this.validateInput(payload)) return userLogin({ payload, route: 'user/login' });
  }

  render() {
    const {
      message, openModal, isLoading, isAdmin,
    } = this.state;
    const { history } = this.props;
    if (message === 'User successfully logged in') return history.push('/user');
    if (isAdmin) return history.push('/admin');
    return (
      <div className={style.login__body}>
        <div className={style.content}>
          <div className={style.content__body}>
            <div className={style.loginAside}>
              <img src={quietImage} alt="" />
            </div>
            <div id="form">
              {isLoading && <Loader isLoading={isLoading} />}
              <AlertMessage
                message={message}
                resetState={this.resetState}
                openModal={openModal}
              />
              <div className={style.form__body}>
                <div className={style.form__navigation}>
                  <div><Link className={style.links} to={'/signup'}>Sign Up</Link></div>
                  <div><Link className={style.links} to={'/login'}>Log In</Link></div>
                </div>
                <form
                  className={style.form__inputs}
                  onSubmit={this.submitData}
                >
                  <div className={style.inputDiv}>
                    <label htmlFor="email">EMAIL</label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      onBlur={this.handleChange}
                    />
                  </div>
                  <div className={style.inputDiv}>
                    <label htmlFor="password">PASSWORD</label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      onBlur={this.handleChange}
                    />
                  </div>
                  <div className="btn-div">
                    <button
                      id="login-btn"
                      type="submit"
                    >
                      Log In
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  message: authSelector.getAuthMessage,
  loginStatus: authSelector.getAuthStatus,
  isLoading: authSelector.getAuthIsLoading,
  isAdmin: authSelector.getAuthIsAdmin,
});
const mapDispacthToProps = { authenticateUser };

export default connect(mapStateToProps, mapDispacthToProps)(Login);