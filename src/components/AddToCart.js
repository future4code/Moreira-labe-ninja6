// import React, { Component } from "react";

import React from "react";
import axios from "axios";
import styled from "styled-components";

const Carrinho = styled.div`
  background-color: aqua;
  width: fit-content;
`;
const Page = styled.div`
  background-image: linear-gradient(to right, #c6ffdd, #fbd786, #f7797d);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  display: flex;

  width: 100%;
  height: 100vh;
  li {
    list-style-type: none;
  }
  button {
    color: brown;
    border: 1px solid rosybrown;
    border-radius: 30px;
    padding: 8px;
    margin: 8px;
  }
  h2 {
    color: brown;
    font-size: 45px;
  }
`;

const CardUsuario = styled.div`
  display: flex;
  font-weight: bold;
  flex-direction: column;
  align-items: center;
  width: 70%;
  color: brown;
`;
const Line = styled.hr`
  border: 5px solid #f7797d;
  width: 600px;
`;
export class AddToCart extends React.Component {
  state = {
    pegarJobs: [],
    produtosNoCarrinho: [],
  };
  componentDidMount() {
    this.pegarJobs(); //Mostra os usuários na tela ao abrir a tela sem precisar clicar em um botão
    // this.getJobById();
  }
  componentDidUpdate() {
    this.pegarJobs();
  }

  adicionarProdutoCarrinho = (Id) => {
    const url = `https://labeninjas.herokuapp.com/jobs/${Id}`;
    const headers = {
      headers: { Authorization: "61a12014-0fc8-468d-912d-e80af25cbc49" },
    };
    // const body = { taken: true };
    axios
      .get(url, headers)
      .then((res) => {
        console.log(res); //ver o console com a resposta

        this.setState({
          produtosNoCarrinho: [...this.state.produtosNoCarrinho, res.data],
        });
      })
      .catch((err) => {
        console.log(err.response.data); //ver o console com o erro todo
        console.log(err); //ver o console com o erro
        // alert(err.response.data);
      });
    console.log(this.state); //Ver se está guardando o nome e email ao clicar
  };

  pegarJobs = () => {
    // console.log(this.state); //Ver se realmente estou pegando os usuarios

    const url = " https://labeninjas.herokuapp.com/jobs";
    const headers = {
      headers: { Authorization: "61a12014-0fc8-468d-912d-e80af25cbc49" },
    };
    axios
      .get(url, headers)
      .then((res) => {
        this.setState({ pegarJobs: res.data.jobs });
        // console.log(res); //Ver os dados no console
        //   console.log(res.data.result.list);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    // console.log(this.state.listaPlaylistsDetails); //Ver array de usuarios antes de dar o map
    const listaJobs = this.state.pegarJobs.map((servicos) => {
      return (
        <div key={servicos.id}>
          <p>{servicos.title}</p>
          <p>{servicos.description}</p>
          <p>{servicos.price}</p>
          <p>{servicos.paymentMethods}</p>
          <p>{servicos.dueDate}</p>
          <button onClick={() => this.adicionarProdutoCarrinho(servicos.id)}>
            Adicionar serviço
          </button>

          <Line />
        </div>
      );
    });
    const carrinho = this.state.produtosNoCarrinho.find((produto) => {
      <Carrinho key={produto.id}>
        <p>{produto.title}</p>
        <p>{produto.price}</p>
      </Carrinho>;
    });
    // console.log(this.state.produtosNoCarrinho);
    return (
      <div>
        {carrinho}
        <Page>
          <CardUsuario>
            <br />
            <br />
            <h2>Serviços</h2>
            <br />

            {listaJobs}
          </CardUsuario>
        </Page>
      </div>
    );
  }
}
