import React from 'react';
import { CartSummary } from '../Cart/CartSummary';
import { ProgressBar } from '../ProgressBar /ProgressBar';
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
    disabled: true,
    error: {},
  };

  backToCart = (e) => {
    e.preventDefault();
    this.props.changePage('cart');
  };

  enablePayButton = () => {
    const { shippingInfo } = this.state;
    const hasEmptyField = Object.values(shippingInfo).some(field => field === '');
    this.setState({ disabled: hasEmptyField });
  }

  handleInputChange = (e) => {
    this.setState((prevState) => ({
      shippingInfo: {
        ...prevState.shippingInfo,
        [e.target.name]: e.target.value,
      },
    }), this.enablePayButton);
  };

  handleValidations = (type, value) => {
    let errorText;
    switch (type) {
      case 'name':
        errorText = onlyTextValidation(value);
        this.setState((prevState) => ({
          error: {
            ...prevState.error,
            name: errorText,
          },
        }));
        break;
      case 'zip':
        errorText = onlyNumberValidation(value);
        this.setState((prevState) => ({
          error: {
            ...prevState.error,
            zip: errorText,
          },
        }));
        break;
      case 'homePhone':
        errorText = onlyNumberValidation(value);
        this.setState((prevState) => ({
          error: {
            ...prevState.error,
            homePhone: errorText,
          },
        }));
        break;
      case 'cellPhone':
        errorText = errorText = onlyNumberValidation(value);
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
        if (!this.state.shippingInfo[val].length) {
          errorValue = { ...errorValue, [`${val}`]: 'Required' };
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
      this.props.changePage('payments');
      this.props.changeCurrentStep(2)
      this.props.getCartFinalPrice(this.props.mainState.storeItems)
    }
  };

  render() {
    const { storeItems, updateItemPrice, totalCartPrice, mainState , handleShippingChange} = this.props;
    return (
      <div>
          <ProgressBar mainState={mainState} />
        <form className="shippingForm" onSubmit={this.handleSubmit} action="">
          <div className="shippingInputsWrapper">
            <div className="shipInputs">
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
              <div className="itemPrices">
                <CartSummary storeItems={storeItems} updateItemPrice={updateItemPrice} />
              </div>
              <div className="summaryBox">
                <h4><u>Shipping Method</u></h4>
                <div className="shippingRadiosContainer">
                  <label htmlFor="standard">
                    <input
                      type="radio"
                      value="standard"
                      name="shippingOption"
                      id="back"
                      onChange={handleShippingChange}
                      checked={this.props.mainState.shippingOption === 'standard'}
                    />
                    Standard - Free
                  </label>
                  <label htmlFor="express">
                    <input
                      type="radio"
                      value="express"
                      name="shippingOption"
                      id="express"
                      onChange={handleShippingChange}
                      checked={this.props.mainState.shippingOption === 'express'}
                    />
                    Express - $1500
                  </label>
                </div>
              </div>
              <div className="totalAfterShipping">
                <div>Cart Subtotal: {mainState.cartSubtotal} </div>
                {/* <div>Final Price: {totalCartPrice(mainState.storeItems)} </div> */}
              </div>
              <div className="summaryButtons">
                <button className="PayNowButton" onClick={this.backToCart}>
                  Back To Cart
                </button>
                <button disabled={this.state.disabled} className="PayNowButton">Pay Now</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Shipping;
