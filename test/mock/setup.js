/* eslint-disable import/no-extraneous-dependencies */
// import '@babel/polyfill';
import React from 'react';
import { Provider } from 'react-redux';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import thunk from 'redux-thunk';
import configMockStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
// import articlesReducer from '../../reducers/articleReducer';


export const mockState = {
  user: {
    isLoggedIn: false,
    authStatus: false,
    isLoading: false,
    message: '',
    id: '',
    email: 'abc@xyz.com',
    isAdmin: false,
    firstName: '',
    lasName: '',
    phoneNumber: '',
    username: '',
    token: '',
  },
  userIncidents: {
    incidents: [],
    message: '',
    isLoading: false,
  },
  incident: {
    isLoading: false,
    message: '',
    id: '',
    createdBy: '',
    createdOn: '',
    creator: '',
    updatedOn: '',
    title: '',
    type: '',
    location: '',
    status: '',
    comment: '',
    images: '',
    videos: '',
  },
};


export const createMockStore = () => {
  const mockStore = configMockStore([thunk]);
  configure({ adapter: new Adapter() });
  return mockStore;
};

const setup = (component, initailState = mockState) => {
  const mockStore = configMockStore([thunk]);
  configure({ adapter: new Adapter() });
  const connectedWrapper = mount(
    <Provider store={mockStore(initailState)}>
      <BrowserRouter>
        {component}
      </BrowserRouter>
    </Provider>,
  );
  return connectedWrapper;
};

export default setup;
