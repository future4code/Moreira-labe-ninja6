import React from "react";
import axios from "axios";
import { Autorizacao, UrlJobs } from "./Geral";
import { MenuItem, Select, TextField } from "@mui/material";

//Peguei da net
const verCalendario = () => {
    const data = new Date(Date.now())
    const mes = ("0" + (data.getMonth() + 1)).slice(-2)
    const ano = data.getFullYear()
    let dia = Number(data.getDay()) + 2
    dia = ("0" + dia.toString()).slice(-2)
    return `${ano}-${mes}-${dia}`
}

export default class CadastrarProdutos extends React.Component {
    state = {
        cadastros: [],
        title: '',
        description: '',
        price: '',
        paymentMethods: [], //escolher em checkBox
        dueDate: verCalendario(),
    }

    componentDidMount() {
        this.getAllCodeTeste();
    }

    //TARGETS
    onTexto = (e) => {
        this.setState({ title: e.target.value })
    }
    onDescricao = (e) => {
        this.setState({ description: e.target.value })
    }
    onNumero = (e) => {
        this.setState({ price: e.target.value })
    }
    onPagamento = (e) => {
        const novaFormaPagamento = [...e.target.value]
        this.setState({ paymentMethods: novaFormaPagamento })
    }
    onData = (e) => {
        this.setState({ dueDate: e.target.value })
    }

    componentDidMount() {
        this.getAllCodeTeste();
    }

    //Cadastrar Produtos() => 
    cadastroProduto = () => {
        const number = Number(this.state.price)
        const body = {
            title: this.state.title,
            description: this.state.description,
            price: number,
            paymentMethods: this.state.paymentMethods,
            dueDate: this.state.dueDate,
        };
        axios.post(UrlJobs, body, Autorizacao)
            .then((res) => {
                this.setState({
                    title: "",
                    describe: "",
                    description: "",
                    paymentMethods: [],
                    price: '',
                })
            })
            .catch((err) => {
                alert(err)
            })
    }

    getAllCodeTeste = () => {
        axios.get(UrlJobs, Autorizacao)
            .then((res) => {
                this.setState({ cadastros: res.data.jobs })
                console.log('imprirmir', res.data.jobs);
            })
            .catch((err) => {
                console.log('seu erro é', err);
            })
    }

    render() {
        const imprimir = this.state.cadastros.map((produto) => {
            return (
                <div key={produto.id}>
                    <h1>{produto.title}</h1>
                    <h3>{produto.description}</h3>
                </div>
            )
        })

        return (
            <div>
                <h1> Hello World</h1>
                <input value={this.state.title} onChange={this.onTexto} placeholder="Nome do produto"></input>
                <input value={this.state.description} onChange={this.onDescricao} placeholder="Sobre do produto"></input>
                <input type="number" value={this.state.price} onChange={this.onNumero} placeholder="Preço do produto"></input>

                <Select
                    value={this.state.paymentMethods}
                    onChange={this.onPagamento}
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                >
                    <MenuItem value=""></MenuItem>
                    <MenuItem value="pix">PIX</MenuItem>
                    <MenuItem value="cartao">Cartão Crédito/Débito</MenuItem>
                    <MenuItem value="paypal">Paypal</MenuItem>
                    <MenuItem value="boleto">Boleto</MenuItem>
                    <MenuItem value="metaMask">MetaMask</MenuItem>
                </Select>

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

                <button onClick={this.cadastroProduto}>Cadastrar Produto</button>
                <div>
                    {imprimir}
                </div>
            </div >
        )
    }
}
