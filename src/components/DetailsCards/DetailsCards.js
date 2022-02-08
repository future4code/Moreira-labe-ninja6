import axios from 'axios';
import React from 'react';
import styled from 'styled-components';


const Main = styled.div`
  
  margin-top: 200px;
  color: black;
  text-align: center;
`

const Modal = styled.div`

`
const Pag = styled.span`
  background-color: blue;
  border-radius: 8px;
  color: white;
  font-size: bold;
`

const H2 = styled.h2`
  margin-top: 50px
`

const converterData = (date) => {
  const day = date.substring(8, 10);
  const month = date.substring(5, 7);
  const year = date.substring(0, 4);
  return `${day}/${month}/${year}`;
};

export default class DetailsCards extends React.Component {
    state = {
        jobsDetails: "",
        paymentMethods: [],
        title: "",
        price: 0,
        description: "",
        dueDate: ""

    }

    componentDidMount = () => {
        this.getTeste()
    }

    getTeste = () => {
        const url = "https://labeninjas.herokuapp.com/jobs/"+this.props.id
        const headers = {
            headers: { Authorization: "61a12014-0fc8-468d-912d-e80af25cbc49" },
          };
        axios
        .get(url, headers)
        .then((res) => {
            this.setState({jobsDetails: res.data,
            paymentMethods: res.data.paymentMethods,
            title: res.data.title,
            price: res.data.price,
            description: res.data.description,
            dueDate: res.data.dueDate})
        })
        .catch((err) => {
            console.log(err.data)
        })
    }

  render() {

 

    return <Main>
    <Modal>
    <H2>{this.state.title}</H2>
          <p>Aceita: <Pag>{this.state.paymentMethods}</Pag></p>
          <p>Até {converterData(this.state.dueDate)} por R${this.state.price.toFixed(2)}</p>
          <p>{this.state.description}</p>


      <button onClick={() => this.props.visualizarCards()} >Fechar</button>
    </Modal>
  </Main>;;
  }
}