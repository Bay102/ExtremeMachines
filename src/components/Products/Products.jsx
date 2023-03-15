import React from "react";
import { ItemCard } from "./ItemCard";
import { ProductsService } from "./ProductsServices";
import './Products.css'

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
         this.props.setStoreItems(this.state.data)
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
   return (
     <div className="productsContainer">
       <div className="itemsWrapper">
         {!loading ? (
           data.map((item) => <ItemCard key={item.id} data={item} />)
         ) : (
           <div>Loading...</div>
         )}
         {error && <h3>Error Loading Data</h3>}
       </div>
     </div>
   );
 }
}

export default Products;
