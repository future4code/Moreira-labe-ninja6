import React from 'react';
import styled from 'styled-components';
import Cart from '../../img-matheus/cart.png'
import axios from 'axios';

const Main = styled.div`
  background-color: rgb(230,230,250);
`

const Cards = styled.div`
    box-shadow: rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;
    width: 300px;
    height: 200px;
    padding: 10px;
    border-radius: 15px;
    text-align: center;
    background-color: 	mediumorchid;
    margin: 20px;
`

const DivCards = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  margin: 30px;
`

const Img = styled.img`
  width: 18px;
  height: 18px;
`

const DivOrder = styled.div`
  padding: 50px 200px 50px 200px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const DivButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0px 15px 0px 15px;
`

const converterData = (date) => {
  const day = date.substring(8, 10)
  const month = date.substring(5, 7)
  const year = date.substring(0, 4)
  return `${day}/${month}/${year}`
}

const url = "https://labeninjas.herokuapp.com"

const headers = {
  headers: { Authorization: "61a12014-0fc8-468d-912d-e80af25cbc49" }
}

export default class Card extends React.Component {

  state = {
    search: '',
    minPrice: '',
    maxPrice: '',
    order: '',
    jobs: []
  }

  componentDidMount = () => {
    this.puxaCards()
  }

  OnChangeMinPrice = (event) => {
    this.setState({ minPrice: event.target.value })
  }
  OnChangeMaxPrice = (event) => {
    this.setState({ maxPrice: event.target.value })
  }
  OnChangeSearch = (event) => {
    this.setState({ search: event.target.value })
  }
  OnChangeOrder = (event) => {
    this.setState({ order: event.target.value })
  }

  puxaCards = () => {

    const urlJobs = `${url}/jobs`
    axios
      .get(urlJobs, headers)
      .then((res) => /* console.log(res.data)) */this.setState({ jobs: res.data.jobs }))
      .catch((err) => console.log(err.response))
  }

  render() {
    const serviços = this.state.jobs
      .filter(job => {
        return job.title.includes(this.state.search.toLocaleLowerCase())
      })
      .filter(job => {
        return this.state.minPrice === "" || job.price >= this.state.minPrice
      })
      .filter(job => {
        return this.state.maxPrice === "" || job.price <= this.state.maxPrice
      })
      .sort((firstJob, nextJob) => {
        switch (this.state.order) {
          case "name":
            return firstJob.title.localeCompare(nextJob.title)
          case "date":
            return new Date(firstJob.dueDate).getTime() - new Date(nextJob.dueDate).getTime()
          case "cres":
            return firstJob.price - nextJob.price
          default:
            return nextJob.price - firstJob.price
        }
      })
      .map((job) => {
        return <Cards key={job.id}>  <h4>{job.title}</h4> <p> Prazo: {converterData(job.dueDate)}</p> <h4>R$ {job.price.toFixed(2)}</h4>
          <DivButton>
            <button>Ver Detalhes</button> <button><Img src={Cart} /></button>
          </DivButton>
        </Cards>
      })

    return <Main>
      <DivOrder>
        <input
          placeholder="Pesquisar"
          type="text"
          onChange={this.OnChangeSearch}
          value={this.state.search}
        />
        <input
          placeholder="Preço Mínimo"
          type="number"
          onChange={this.OnChangeMinPrice}
          value={this.state.minPrice}
        />
        <input
          placeholder="Preço Máximo"
          type="number"
          onChange={this.OnChangeMaxPrice}
        />
        <div>
          <label htmlFor="sort">Classificar por: </label>
          <select
            name="sort"
            value={this.state.order}
            onChange={this.OnChangeOrder}
          >
            <option value="name"> Título </option>
            <option value="cres"> Preço Crescente</option>
            <option value="decres"> Preço Decrescente</option>
            <option value="date"> Prazo </option>
          </select>
        </div>
      </DivOrder>

      <DivCards>
        {serviços}
      </DivCards>;
    </Main>
  }
}
