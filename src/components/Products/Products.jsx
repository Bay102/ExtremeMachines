import React from 'react';
import { ItemCard } from './ItemCard';
import { ProductsService } from './ProductsServices';
import './Products.css';
import { FilterNav } from '../FilterNav/FilterNav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const products = new ProductsService();

class Products extends React.Component {
  state = {
    data: [],
    loading: false,
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
    const { loading, error } = this.state;
    
    const {
      mainState,
      filterNavCategory,
      updateUserSearch,
      handleUserSearch,
      addToUserCart,
    } = this.props;

    const { filteredItems, storeItems } = mainState;

    const createCards = (items) => {
      return items.map((item) => (
        <ItemCard
          key={item.id}
          mainState={mainState}
          data={item}
          addToUserCart={addToUserCart}
        />
      ));
    };

    return (
      <div className="products">
        <FilterNav
          mainState={mainState}
          updateUserSearch={updateUserSearch}
          handleUserSearch={handleUserSearch}
          filterNavCategory={filterNavCategory}
        />
        <div className="productsContainer">
          <div className="itemsWrapper">
            {!loading && !filteredItems.length
              ? createCards(storeItems)
              : createCards(filteredItems)}
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
