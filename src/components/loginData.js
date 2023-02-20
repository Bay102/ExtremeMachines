import { storeItems } from "./constants";

export const INIT_CARD = {
  userData: {
    userEmail: "",
    userPassword: "",
    userFirstName: "",
    userLastName: "",
    userZip: "",
  },
};

const fakeUser = {
   email: 'fake@devslopes.com',
   password: 'Devslopes0!',
   cart: '',
   shipping: '',
   payment: '',
   firstName: '',
   lastName: '',
   postCode: '',
}


export const stateComponents = {
   displayPage: 'cart' ,
   users: {
      fakeUser
   },
   storeItems
}