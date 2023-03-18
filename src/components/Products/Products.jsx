import React from 'react';
import { ItemCard } from './ItemCard';
import { ProductsService } from './ProductsServices';
import './Products.css';
import { FilterNav } from '../../FilterNav/FilterNav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const products = new ProductsService();

class Products extends React.Component {
  state = {
    data: [],
    loading: false, //!!! ALWAYS NEED A VISUAL TO DISPLAY TO USER EITHER LOADING OR ERROR !!!! //
    error: false,
  };

  componentDidMount() {
    this.setState({ loading: true });

    products.fetchProducts().then(
      (res) => {
        if (res && res.response.ok) {
          this.setState({
            data: res.wantedProductInfo,
            loading: false,
          });
          this.props.setStoreItems(this.state.data);
        } else {
          this.setState({ loading: false });
        }
      },
      (error) => {
        console.log(error);
        this.setState({
          loading: false,
          error: true,
        });
      }
    );
  }

  render() {
    const { data, loading, error } = this.state;
    const { mainState, filterNav } = this.props;

    return (
      <div className="products">
        <FilterNav mainState={mainState} filterNav={filterNav} />
        <div className="productsContainer">
          <div className="itemsWrapper">
            {!loading && !mainState.filteredItems.length
              ? data.map((item) => (
                  <ItemCard
                    key={item.id}
                    mainState={mainState}
                    data={item}
                    addToUserCart={this.props.addToUserCart}
                  />
                ))
              : mainState.filteredItems.map((item) => (
                  <ItemCard
                    key={item.id}
                    mainState={mainState}
                    data={item}
                    addToUserCart={this.props.addToUserCart}
                  />
                ))}

            {loading ? (
              <div className="loading">
                <FontAwesomeIcon icon={faSpinner} /> Loading Awesome Machines...
              </div>
            ) : null}
            {error && <h3>Error Loading Data</h3>}
          </div>
        </div>
      </div>
    );
  }
}

export default Products;
