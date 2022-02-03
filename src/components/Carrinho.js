import React from "react";
import { ShoppingCartItem } from "./ShoppingCart/ShoppingCartItem";

export class Carrinho extends React.Component {
  valorTotal = () => {
    let totalValue = 0;

    for (let product of this.props.produtosNoCarrinho) {
      totalValue += product.price;
    }

    return totalValue;
  };
  render() {
    return (
      <div>
        <div>
          <ShoppingCartItem
            produtosNoCarrinho={this.props.produtosNoCarrinho}
            deleteServico={this.props.deleteServico}
          />
        </div>
        <div>
          <h2>A soma dos valores é: ${this.valorTotal()}</h2>
        </div>
      </div>
    );
  }
}
