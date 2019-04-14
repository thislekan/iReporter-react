/* eslint-disable no-shadow */
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import * as authSelector from '../store/selectors/authSelector';
import userSignup from '../store/actions/signupActions';
import validateFields from '../utils/inputValidator';
import style from '../styles/SignUp.css';
import quietImage from '../media/quiet.jpg';

Modal.setAppElement('#app');
class Signup extends React.Component {
  static propTypes = {
    userSignup: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    // location: PropTypes.object.isRequired,
    message: PropTypes.string,
    authStatus: PropTypes.string,
    isLoading: PropTypes.bool,
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
    };
  }

  // eslint-disable-next-line consistent-return
  componentWillReceiveProps(nextProps) {
    const { history } = this.props;
    const { message } = nextProps;
    if (message === 'Your signup was successful') return history.push('/user');
    if (message !== 'Your signup was successful') return this.setState({ message, openModal: true });
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
  submitData = () => {
    const { userSignup } = this.props;
    const payload = this.state;
    if (this.validateInput(payload, '/signup')) return userSignup(payload);
  }

  resetState = () => this.setState({ message: '', openModal: false });

  render() {
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
                {this.state.openModal && (
                  <Modal
                    isOpen={this.state.openModal}
                    contentLabel='Selected Option'
                    onRequestClose={this.resetState}
                    closeTimeoutMS={200}
                    className='modal'
                  >
                    <h3 className='modal__title'>Selected Option</h3>
                    {this.state.message && <p className='modal__body'>{this.state.message}</p>}
                    <button
                      className='button'
                      onClick={this.resetState}
                    >Okay</button>
                  </Modal>
                )}
                <form
                  className={style.form__inputs}
                  onSubmit={
                    (e) => {
                      e.preventDefault();
                      this.submitData();
                    }
                  }
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
  loginStatus: authSelector.getAuthStatus,
  isLoading: authSelector.getAuthIsLoading,
});

const mapDispacthToProps = { userSignup };

export default connect(mapStateToProps, mapDispacthToProps)(Signup);
