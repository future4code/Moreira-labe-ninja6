import React from "react";
import styled from "styled-components";

const ItemContainer = styled.div`
    margin-top: 36px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  /* grid-auto-flow: column; */
  gap: 24px;
  align-items: center;

  div{
      border: 1px solid black;
      padding: 18px;
      display: flex;
      flex-direction: column;
      align-items: center;
      
  }


  button {
    margin: 16px 0;
  }
`;

export class ShoppingCartItem extends React.Component {
  render() {
    const produto = this.props.produtosNoCarrinho.map((item) => {
      return (
        <div key = {item.id}>
          <p>Serviço:{item.title}</p>
          <p>Preço:{item.price}</p>
          <button onClick={() => this.props.deleteServico(item.id)}>
            Remover
          </button>
        </div>
      );
    });

    return <ItemContainer>{produto}</ItemContainer>;
  }
}
