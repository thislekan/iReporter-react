const state = {
  user: {
    isLoggedIn: false,
    authStatus: false,
    isLoading: false,
    message: '',
    id: undefined,
    email: undefined,
    isAdmin: false,
    firstName: undefined,
    lasName: undefined,
    phoneNumber: undefined,
    username: undefined,
    token: undefined,
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

export default state;
