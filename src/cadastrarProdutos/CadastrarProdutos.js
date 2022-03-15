import React from "react";
import axios from "axios";
import { Autorizacao, UrlJobs } from "./Geral";
import {
  MenuItem,
  Select,
  TextField,
  FormControl,
  InputLabel,
} from "@material-ui/core";
import { Button } from "@material-ui/core";
import styled from "styled-components";

const ContainerCadastrar = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: center;
  justify-content: center; */
  padding: 36px;
  height: 100vh;
  width: fit-content;
  row-gap: 24px;
  margin: 0 auto;
`;

//Peguei da net
const verCalendario = () => {
  const data = new Date(Date.now());
  const mes = ("0" + (data.getMonth() + 1)).slice(-2);
  const ano = data.getFullYear();
  let dia = Number(data.getDay()) + 2;
  dia = ("0" + dia.toString()).slice(-2);
  return `${ano}-${mes}-${dia}`;
};

export default class CadastrarProdutos extends React.Component {
  state = {
    cadastros: [],
    title: "",
    description: "",
    price: "",
    paymentMethods: [], //escolher em checkBox
    dueDate: verCalendario(),
  };

  //TARGETS
  onTexto = (e) => {
    this.setState({ title: e.target.value });
  };
  onDescricao = (e) => {
    this.setState({ description: e.target.value });
  };
  onNumero = (e) => {
    this.setState({ price: e.target.value });
  };
  onPagamento = (e) => {
    const novaFormaPagamento = [...e.target.value];
    this.setState({ paymentMethods: novaFormaPagamento });
  };
  onData = (e) => {
    this.setState({ dueDate: e.target.value });
  };
  cadastroProduto = () => {
    const number = Number(this.state.price);
    const body = {
      title: this.state.title,
      description: this.state.description,
      price: number,
      paymentMethods: this.state.paymentMethods,
      dueDate: this.state.dueDate,
    };
    axios
      .post(UrlJobs, body, Autorizacao)
      .then((res) => {
        this.setState({
          title: "",
          describe: "",
          description: "",
          paymentMethods: [],
          price: "",
          dueDate: "",
        });
        alert("Produto cadastrado com sucesso!");
      })
      .catch((err) => {
        alert(err);
      });
  };

  render() {
    return (
      <ContainerCadastrar>
        <Button
          variant="outlined"
          color="secondary"
          onClick={this.props.voltarTelaInicial}
        >
          Voltar para Tela Inicial
        </Button>
        <h1>Cadastre seu serviço</h1>
        <TextField
          variant="outlined"
          color="primary"
          value={this.state.title}
          onChange={this.onTexto}
          placeholder="Nome do produto"
        ></TextField>
        <TextField
          variant="outlined"
          color="primary"
          value={this.state.description}
          onChange={this.onDescricao}
          placeholder="Sobre do produto"
        ></TextField>
        <TextField
          variant="outlined"
          color="primary"
          type="number"
          value={this.state.price}
          onChange={this.onNumero}
          placeholder="Preço do produto"
        ></TextField>
        <FormControl fullWidth>
          <InputLabel id="demo-multiple-checkbox">
            Formas de Pagamento
          </InputLabel>
          <Select
            variant="outlined"
            value={this.state.paymentMethods}
            onChange={this.onPagamento}
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            label="Formas de Pagamento"
            autoWidth
            multiple
          >
            <MenuItem selected disabled value="">
              Formas de Pagamento
            </MenuItem>
            <MenuItem value="pix">PIX</MenuItem>
            <MenuItem value="cartao">Cartão Crédito/Débito</MenuItem>
            <MenuItem value="paypal">Paypal</MenuItem>
            <MenuItem value="boleto">Boleto</MenuItem>
            <MenuItem value="metaMask">MetaMask</MenuItem>
          </Select>
        </FormControl>

        <TextField
          id="date"
          label="Prazo"
          type="date"
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
          value={this.state.dueDate}
          onChange={this.onData}
          placeholder="Data de entega"
        ></TextField>

        <Button
          variant="outlined"
          color="secondary"
          onClick={this.cadastroProduto}
        >
          Cadastrar Produto
        </Button>
      </ContainerCadastrar>
    );
  }
}
