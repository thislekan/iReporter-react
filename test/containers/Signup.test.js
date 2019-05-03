import '@babel/polyfill';
import React from 'react';
import setup from '../mock/setup';
import ConnectedSignup from '../../src/components/Signup.jsx';

const mockFn = jest.fn();
const history = { push: mockFn };

describe('<UserForm />', () => {
  it('Should render all elements', () => {
    const wrapper = setup(<ConnectedSignup history={history} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('should respond to input change and alter state (email) of component', () => {
    const wrapper = setup(<ConnectedSignup history={history} />);
    const signupWrapper = wrapper.find('Signup');
    signupWrapper.find('#email').simulate('change', { target: { name: 'email', value: 'wrestle@wwe.com' } });
    expect(signupWrapper.state('email')).toBe('wrestle@wwe.com');
    expect(wrapper.find('#email').props().value).toBe('wrestle@wwe.com');
  });
  it('should submit form', () => {
    const wrapper = setup(<ConnectedSignup history={history} />);
    const signupWrapper = wrapper.find('Signup');
    signupWrapper.find('form').simulate('submit', { preventDefault: mockFn });
    expect(mockFn).toHaveBeenCalled();
  });
});
