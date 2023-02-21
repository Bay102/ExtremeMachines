import { storeItems } from "./storeItems";

export const NEW_USER_DATA = {
  userEmail: "",
  userPassword: "",
  confirmPassword: "",
  userFirstName: "",
  userLastName: "",
  userZip: "",
  cart: "",
  shipping: "",
  payment:"",
};

const fakeUser = {
  email: "fake@devslopes.com",
  password: "Devslopes0!",
  cart: "",
  shipping: "",
  payment: "",
  firstName: "",
  lastName: "",
  postCode: "",
};
// create new user function will add new user data too state of users
export const stateComponents = {
  displayPage: "signIn",
  currentUser: {},
  users: {
    fakeUser,
  },
  storeItems,
};
