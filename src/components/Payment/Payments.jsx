import React from 'react';
import { InputBase } from '../InputBase/InputBase';
import { ProgressBar } from '../ProgressBar /ProgressBar';
// import { BuildPaymentInputs } from './BuildPaymentInputs';
import { OTHERCARDS } from './paymentData';
import {
  cardNumberValidation,
  expiryInputs,
  onlyTextValidation,
  securityCodeValidation,
} from './paymentValidations';

const INIT_CARD = {
  card: '',
  cardHolder: '',
  securityCode: '',
};

class Payments extends React.Component {
  state = {
    cardData: INIT_CARD,
    maxLength: OTHERCARDS.length,
    error: {},
    cardType: null,
  };

  findDebitCardType = (cardNumber) => {
    const regexPattern = {
      MASTERCARD: /^5[1-51][0-9]{1,}|^2[2-7][0-9]{1,}$/,
      VISA: /^4[0-9]{2,}$/,
      AMERICAN_EXPRESS: /^3[47][0-9]{5,}$/,
      DISCOVER: /^6(?:011|5[0-9]{2})[0-9]{3,}$/,
    };
    for (const card in regexPattern) {
      if (cardNumber.replace(/[^\d]/g, '').match(regexPattern[card])) return card;
    }
    return '';
  };

  handleValidations = (type, value) => {
    let errorText;
    switch (type) {
      case 'card':
        errorText = cardNumberValidation(value);
        this.setState((prevState) => ({
          cardType: this.findDebitCardType(value),
          error: {
            ...prevState.error,
            cardError: errorText,
          },
        }));
        break;
      case 'cardHolder':
        errorText = onlyTextValidation(value);
        this.setState((prevState) => ({
          error: { ...prevState.error, cardHolderError: errorText },
        }));
        break;
      case 'securityCode':
        errorText = securityCodeValidation(3, value);
        this.setState((prevState) => ({
          error: { ...prevState.error, securityCodeError: errorText },
        }));
        break;
      default:
        break;
    }
  };

  handleBlur = ({ target: { name, value } }) => this.handleValidations(name, value);

  handleInputData = ({ target: { name, value } }) => {
    if (name === 'card') {
      let mask = value.split(' ').join('');
      if (mask.length) {
        mask = mask.match(new RegExp('.{1,4}', 'g')).join(' ');
        this.setState((prevState) => ({
          cardData: {
            ...prevState.cardData,
            [name]: mask,
          },
        }));
      } else {
        this.setState((prevState) => ({
          cardData: {
            ...prevState.cardData,
            [name]: '',
          },
        }));
      }
    } else {
      this.setState((prevState) => ({
        cardData: {
          ...prevState.cardData,
          [name]: value,
        },
      }));
    }
  };

  checkErrorBeforeSave = () => {
    const { cardData } = this.state;
    let errorValue = {};
    let isError = false;
    Object.keys(cardData).forEach((val) => {
      console.log(Object.keys(cardData[val]));
      if (!cardData[val].length) {
        errorValue = { ...errorValue, [`${val}Error`]: 'Required' };
        isError = true;
      }
    });
    this.setState({ error: errorValue });
    return isError;
  };

  handleAddCard = (e) => {
    e.preventDefault();
    const errorCheck = this.checkErrorBeforeSave();
    console.log(errorCheck);
    if (!errorCheck) {
      this.setState({
        cardData: INIT_CARD,
        cardType: null,
      });
      this.props.changePage('confirmation');
      this.props.changeCurrentStep(3)
    }
  };

  render() {
    const { cardData, error, cardType, maxLength } = this.state;
    const { mainState } = this.props
    const paymentInputs = [
      {
        id: '1',
        type: 'text',
        label: 'Card Holder Name',
        name: 'cardHolder',
        error: 'cardHolderError',
      },
      {
        id: '2',
        type: 'text',
        label: 'Card Number',
        name: 'card',
        error: 'cardError',
      },
      {
        id: '4',
        type: 'text',
        label: 'CVV',
        name: 'securityCode',
        error: 'securityCodeError',
      },
    ];
    return (
   
      <div>
        <ProgressBar mainState={mainState}/>
        <div className=" inputsWrapper paymentsContainer">
          <h2>Payment</h2>
          {paymentInputs.length
            ? paymentInputs.map((item, index) => (
                <InputBase
                  key={index}
                  placeholder={item.label}
                  type={item.type}
                  value={cardData && cardData[item.name]}
                  onChange={this.handleInputData}
                  autoComplete="off"
                  maxLength={maxLength}
                  name={item.name}
                  onBlur={this.handleBlur}
                  error={error}
                  cardType={cardType}
                  isCard={item.name === 'card'}
                  errorM={
                    error && error[item.error] && error[item.error].length > 1
                      ? error[item.error]
                      : null
                  }
                />
              ))
            : null}
          <div style={{ display: 'flex', margin: 'auto', gap: '5px' }}>
            Expiry:
            <div>{expiryInputs}</div>
          </div>
          <div className="payNowButton">
            <button onClick={this.handleAddCard} type="button">
              PayNow{''}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Payments;
