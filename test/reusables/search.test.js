import React from 'react';
import { shallow } from 'enzyme';
import SearchComponent from '../../src/components/search-and-filter/SearchComponent.jsx';

describe('<SearchComponent />', () => {
  it('Should render the component', () => {
    const wrapper = shallow(
      <SearchComponent />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
