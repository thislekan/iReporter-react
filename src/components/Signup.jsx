import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as authSelector from '../store/selectors/authSelector';
import authenticateUser from '../store/actions/authActions';
import validateFields from '../utils/inputValidator';
import style from '../styles/SignUp.css';
import quietImage from '../media/quiet.jpg';
import AlertMessage from './reuseables/AlertMessage.jsx';
import Loader from './reuseables/Loader.jsx';


class Signup extends React.Component {
  static propTypes = {
    authenticateUser: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    message: PropTypes.string,
    authStatus: PropTypes.string,
    isLoading: PropTypes.bool,
    isAdmin: PropTypes.bool,
  }

  static defaultProps = {
    isAdmin: false,
    authStatus: '',
    isLoading: false,
    message: '',
  }

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      message: '',
      openModal: false,
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

  validateInput = (payload, route) => {
    const result = validateFields(payload, route);
    if (typeof result === 'string') {
      this.setState(() => ({ message: result, openModal: true }));
      return false;
    }
    return true;
  }

  // eslint-disable-next-line consistent-return
  submitData = (e) => {
    const { authenticateUser: signupUser } = this.props;
    const payload = this.state;
    e.preventDefault();
    if (this.validateInput(payload, '/signup')) return signupUser({ payload, route: 'user/create' });
  }

  resetState = () => this.setState({ message: '', openModal: false });

  render() {
    const { message, openModal, isLoading } = this.state;
    const { history } = this.props;
    if (message === 'Your signup was successful') return history.push('/user');
    return (
      <div className={style.signup__body}>
        <div className={style.content}>
          <div className={style.content__body}>
            <div className={style.signupAside}>
              <img src={quietImage} alt="" />
            </div>
            <div id="form">
              <div className={style.form__body}>
                <div className={style.form__navigation}>
                  <div><Link className={style.links} to={'/signup'}>Sign Up</Link></div>
                  <div><Link className={style.links} to={'/login'}>Log In</Link></div>
                </div>
                {isLoading && <Loader isLoading={isLoading} />}
                {message && <AlertMessage
                  message={message}
                  resetState={this.resetState}
                  openModal={openModal}
                />}
                <form
                  className={style.form__inputs}
                  onSubmit={this.submitData}
                >
                  <div className={style.inputDiv}>
                    <label htmlFor="name">LAST NAME</label>
                    <input
                      type="text"
                      name="lastName"
                      id="last-name"
                      onBlur={this.handleChange}
                      placeholder="Enter your last name"
                    />
                  </div>
                  <div className={style.inputDiv}>
                    <label htmlFor="name">FIRST NAME</label>
                    <input
                      type="text"
                      name="firstName"
                      id="first-name"
                      onBlur={this.handleChange}
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div className={style.inputDiv}>
                    <label htmlFor="email">EMAIL</label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      onBlur={this.handleChange}
                      placeholder="Enter your email address"
                    />
                  </div>
                  <div className={style.inputDiv}>
                    <label htmlFor="password">PASSWORD</label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      onBlur={this.handleChange}
                      placeholder="******"
                    />
                  </div>
                  <div className={style.inputDiv}>
                    <label htmlFor="confirm password">CONFIRM PASSWORD</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      id="confirm-password"
                      onBlur={this.handleChange}
                      placeholder="******"
                    />
                  </div>
                  <div className="btn-div">
                    <button
                      id="signup-btn"
                      type="submit"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div >
    );
  }
}

const mapStateToProps = createStructuredSelector({
  message: authSelector.getAuthMessage,
  authStatus: authSelector.getAuthStatus,
  isLoading: authSelector.getAuthIsLoading,
  isAdmin: authSelector.getAuthIsAdmin,
});

const mapDispacthToProps = { authenticateUser };

export default connect(mapStateToProps, mapDispacthToProps)(Signup);
