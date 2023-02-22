import { storeItems } from "./storeItems";

export const NEW_USER_DATA = {
  userEmail: "",
  userPassword: "",
  confirmPassword: "",
  firstName: "",
  lastName: "",
  userZip: "",
  cart: undefined,
  shipping: undefined,
  payment: undefined,
};

export const fakeUser = {
  email: "fake@devslopes.com",
  password: "Devslopes0!",
  cart: "",
  shipping: "",
  payment: "",
  firstName: "",
  lastName: "",
  postCode: "",
};

// export const stateComponents = {
//   displayPage: "cart",
//   currentUser: {},
//   users: {
//     fakeUser,
//   },
//   storeItems,
// };
