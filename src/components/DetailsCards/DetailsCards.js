import axios from 'axios';
import React from 'react';
import styled from 'styled-components';


const MainTotal = styled.div`
  background-color: aliceblue;
  height: 100vh;
  width: 100vw;
  overflow-y: hidden;
  overflow-x: hidden;
  display: flex;
  justify-content: space-around
`
const Button = styled.button`
  border-radius: 10px;
  border: 0px;
  background-color: #191970;
  color: white;
  font-weight: 550;
  font-size: 15px;
  padding: 5px;
  :hover{
    cursor: pointer;
    transform: scale(1.1);
    transition: all 0.5s ease 0s;
    background-color: #1f57c5;
    color: white;
  }
`

const Main = styled.div`
  width: 600px;
  height: 300px;
  margin-top: 200px;
  color: black;
  text-align: center;
  background-color: royalblue;
  border-radius: 25px;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
  font-weight: bold;
`

const Modal = styled.div`

`
const Pag = styled.span`
  background-color: blue;
  border-radius: 8px;
  color: white;
  font-size: bold;
  padding: 4px;
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

 

    return <MainTotal>
    <Main>
    <Modal>
    <H2>{this.state.title}</H2>
          <p>Aceita: <Pag>{this.state.paymentMethods}</Pag></p>
          <p>Até {converterData(this.state.dueDate)} por R${this.state.price.toFixed(2)}</p>
          <p>{this.state.description}</p>


      <Button onClick={() => this.props.visualizarCards()} >Fechar</Button>
    </Modal>
  </Main>
  </MainTotal>
  }
}