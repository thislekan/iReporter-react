import '@babel/polyfill';
import React from 'react';
import setup from '../mock/setup';
import Routes from '../../src/routes/index.jsx';

describe('<Header />', () => {
  it('should render the route component', () => {
    const wrapper = setup(<Routes />);
    expect(wrapper).toMatchSnapshot();
  });
});
