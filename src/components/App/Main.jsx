import { Component } from 'react';
import { Cart } from '../Cart/Cart';
import { stateComponents } from '../stateData';
import Shipping from '../Shipping/Shipping';
import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';
import './Main.css';
import { BuildRadios } from '../HomeScreenButtons/BuildRadios';

class Main extends Component {
  state = stateComponents;

  changePage = (value) => {
    this.setState({
      displayPage: value,
    });
  };

  updateState = (name, newState) => {
    // console.log([name], newState);
    this.setState({
      [name]: newState,
    });
  };

  updateSubState = (name, sub, state) => {
    this.setState((prevState) => ({
      [name]: {
        ...prevState[name],
        [sub]: state,
      },
    }));
  };

  render() {
    return (
      <div>
        <div className="headerWrapper">
          <h2>CarCommerce</h2>
          <BuildRadios changePage={this.changePage} />
        </div>
        <div className="mainContent">
          {this.state.displayPage === 'cart' && (
            <Cart
              updateSubState={this.updateSubState}
              storeItems={this.state.storeItems}
              changePage={this.changePage}
              updateState={this.updateState}
            />
          )}
          {this.state.displayPage === 'signIn' && (
            <SignIn changePage={this.changePage} updateState={this.updateState} updateSubState={this.updateSubState} />
          )}
          {this.state.displayPage === 'createAccount' && (
            <SignUp changePage={this.changePage} updateState={this.updateState} />
          )}
          {this.state.displayPage === 'shipping' && (
            <Shipping changePage={this.changePage} updateState={this.updateState} />
          )}
        </div>
      </div>
    );
  }
}

export default Main;
