import '@babel/polyfill';
import React from 'react';
import setup from '../mock/setup';
import ConnectedUserDashboard from '../../src/components/user/UserDashboard.jsx';

// const mockFn = jest.fn();
const location = { pathname: '/user' };

describe('<UserForm />', () => {
  it('Should render all elements', () => {
    const wrapper = setup(<ConnectedUserDashboard location={location} />);
    expect(wrapper).toMatchSnapshot();
  });
});
