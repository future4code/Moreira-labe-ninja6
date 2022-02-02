// import React, { Component } from 'react'
// import { ShoppingCart } from './ShoppingCart/ShoppingCart'

// export class AppContainer extends Component {
  
//   state = {

//   }



//   onAddProductToCart = productId =>{
//     const productInCart = this.state.productsInCart.find(product => productId === product.id)

//     if(productInCart){
//       const newProductsInCart = this.state.productsInCart.map(product => {
//         if(productId === product.id) {
//           return {
//             ...product,
//             quantity = product.quantity + 1
//           }
//         }

//         return product 
//       })

//       this.setState ({produInCart: newProductsInCart})
//     } else{
//       const productToAdd = products.find(product => productId === product.id)

//       const newProductsInCart = [...this.state.productsInCart, {...productToAdd, quantity: 1} ]

//       this.setState({productdInCart: newProductsInCart})
//     }
//   }
  

//   onRemoveProductFromCart = (productId) => {
//     const newProductsInCart = this.state.productsInCart.map((product) =>{
//       if(product.id === productId) {
//         return{
//           ...product,
//           quantity: product.quantity - 1
//         }
//       }
//       return product
//     }).filter((product) => product.quantity > 0)

//     this.setState({productsInCart: newProductsInCart})
//   }

  
  
//   render() {
//     return (
//       <AppContainer>
//       <ShoppingCart
//       productsInCart = {this.state.productsInCart}
//       onRemoveProductFromCart = {this.onRemoveProductFromCart}
//       />
//       </AppContainer>
//     );
//   }
// }
