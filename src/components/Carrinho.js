import React from "react";
import { ShoppingCartItem } from "./ShoppingCart/ShoppingCartItem";
import styled from "styled-components";

const ContainerCarrinho = styled.div `
    background-color: rgb(230, 230, 250);
    height: 100vh;
    padding: 36px;


    button{
        font-size: 16px;
        
    }
`

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
      <ContainerCarrinho>
          <button onClick = {this.props.esconderCarrinho}>Adicionar mais serviços</button>
        <div>
          <ShoppingCartItem
            produtosNoCarrinho={this.props.produtosNoCarrinho}
            deleteServico={this.props.deleteServico}
          />
        </div>
        <button onClick={this.props.limparArrayServico}>Contrate!</button>
        <div>
          <h2>Valor Total: ${this.valorTotal()}</h2>
        </div>
      </ContainerCarrinho>
    );
  }
}
