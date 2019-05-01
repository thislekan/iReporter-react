const state = {
  user: {
    isLoggedIn: false,
    authStatus: false,
    isLoading: false,
    message: '',
    id: '',
    email: '',
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

export default state;
