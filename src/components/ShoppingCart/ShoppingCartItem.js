import React from "react";
import styled from "styled-components";

const ItemContainer = styled.div`
  display: grid;
  grid-auto-flow: column;
  gap: 4px;
  align-items: center;

  p {
    margin: 0;
  }
`;

export class ShoppingCartItem extends React.Component {
  render() {
    const produto = this.props.produtosNoCarrinho.map((item) => {
      return (
        <div>
          <p>{item.title}</p>
          <p>{item.price}</p>
          <button onClick={() => this.props.deleteServico(item.id)}>
            Remover
          </button>
        </div>
      );
    });

    return <ItemContainer>{produto}</ItemContainer>;
  }
}
