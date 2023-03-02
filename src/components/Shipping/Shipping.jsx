// Show all shipping fields as depicted in the screenshot below
// Have standard and express shipping options -- the shipping & handling/checkout prices should adjust accordingly
// Ensure phone fields cannot take text (only numbers)
// Ensure postal code cannot take text (only numbers)
// Make sure all fields are completed or prevent the user from moving forward. Show appropriate error messages
// Back to cart button should go back to cart
// There should be a Next or "Payment" button to go to next screen
import React from 'react';
import { CartSummary } from '../Cart/CartSummary';
import { onlyNumberValidation, onlyTextValidation } from '../validations';
import { BuildShippingInputs } from './BuildShippingInputs';
import './Shipping.css';

class Shipping extends React.Component {
  state = {
    shippingInfo: {
      addressTitle: '',
      name: '',
      address: '',
      zip: '',
      homePhone: '',
      cellPhone: '',
    },
    error: {},
  };

  backToCart = (e) => {
    e.preventDefault();
    this.props.changePage('cart')
  }

  handleInputChange = (e) => {
    this.setState((prevState) => ({
      shippingInfo: {
        ...prevState.shippingInfo,
        [e.target.name]: e.target.value,
      },
    }));
  };

  handleValidations = (type, value) => {
    let errorText;
    switch (type) {
      case "name":
        errorText = onlyTextValidation(value);
        this.setState((prevState) => ({
          error: {
            ...prevState.error,
            name: errorText,
          },
        }));
        break;
    case "zip":
        errorText = onlyNumberValidation(value);
        this.setState((prevState) => ({
          error: {
            ...prevState.error,
            zip: errorText,
          },
        }));
        break;
      case "homePhone":
        errorText = onlyNumberValidation(value);
        this.setState((prevState) => ({
          error: {
            ...prevState.error,
            homePhone: errorText,
          },
        }));
        break;
        case "cellPhone":
           errorText =  errorText = onlyNumberValidation(value);
            this.setState((prevState) => ({
              error: {
                ...prevState.error,
                cellPhone: errorText,
              },
            }));
        break;
      default:
        break;
    }
  };

  handleBlur = (e) => this.handleValidations(e.target.name, e.target.value);

  errorCheck = () => {
    let errorValue = {};
    let isError = false;
    Object.keys(this.state.shippingInfo)
      .slice(0, 6)
      .forEach((val) => {
        //ask how to make other validations required
        if (!this.state.shippingInfo[val].length) {
          errorValue = { ...errorValue, [`${val}`]: "Required" };
          isError = true;
        }
      });
    this.setState({ error: errorValue });
    return isError;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const requiredFieldErrorCheck = this.errorCheck();
    if (!requiredFieldErrorCheck) {
      this.props.changePage('payments')
    }
  }

  render() {
    const { storeItems, updateItemPrice, } = this.props;
    return (
      <div>
        <form className="shippingForm" onSubmit={this.handleSubmit} action="">
          <div className="shippingInputsWrapper">
            <h3>Shipping</h3>
            <BuildShippingInputs
              state={this.state}
              changePage={this.changePage}
              handleInputChange={this.handleInputChange} 
              handleBlur={this.handleBlur}
            />
          </div>
          <div className="shippingSummaryContainer">
            <h3 className="summaryTitle">Summary</h3>

            <CartSummary storeItems={storeItems} updateItemPrice={updateItemPrice} />
            <div className="summaryBox">
              <h4>Shipping Method</h4>
              <div className="shippingInputsContainer">
                <label htmlFor="back">
                  {' '}
                  Standard
                  <input type="radio" value="" name="back" id="back"  />
                </label>
                <label htmlFor="pay">
                  {' '}
                  Express
                  <input type="radio" value="" name="pay" id="pay"  />
                </label>
              </div>
            </div>

            <div className="summaryButtons">
              <button className="PayNowButton" onClick={this.backToCart}>Back To Cart</button>
              <button className="PayNowButton">Pay Now</button> 
            </div>
          </div>
          {/* <div className="chooseShipping"></div> */}
        </form>
      </div>
    );
  }
}

export default Shipping;
