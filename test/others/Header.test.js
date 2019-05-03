import React from 'react';
import setup from '../mock/setup';
import Header from '../../src/components/Header.jsx';

describe('<Header />', () => {
  it('should render the header component', () => {
    const wrapper = setup(<Header />);
    expect(wrapper).toMatchSnapshot();
  });
  it('should render a different content in the header component', () => {
    const wrapper = setup(<Header location={{ pathname: '/signup' }} />);
    expect(wrapper).toMatchSnapshot();
  });
});
