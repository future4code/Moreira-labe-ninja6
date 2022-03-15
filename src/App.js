import React from "react";
import Cards from "./components/Cards/Cards";
import CadastrarProdutos from "./cadastrarProdutos/CadastrarProdutos";
import TelaInicial from "./components/TelaInicial";
import DetailsCards from "./components/DetailsCards/DetailsCards"


export default class App extends React.Component {
  state = {
    visualizandoCards: "TelaInicial" ,
    idDetails:""
  }

visualizarCards = () => {
  this.setState({visualizandoCards: "Cards"})
}

visualizarCadastro = () => {
  this.setState({visualizandoCards:"Cadastro"})
}


visualizarTelaInicial = () => {
  this.setState({visualizandoCards:"TelaInicial"})
}

vizualizarDetalhes = (id) => {
  this.setState({visualizandoCards: "CardsDetails", idDetails: id })
}

telaCorreta = () => {
  switch (this.state.visualizandoCards) {
    case "Cadastro":
      return <CadastrarProdutos voltarTelaInicial = {this.visualizarTelaInicial} />;

    case "Cards": 
    return <Cards voltarTelaInicial = {this.visualizarTelaInicial} vizualizarDetalhes={this.vizualizarDetalhes}/>

    case "CardsDetails":
    return <DetailsCards visualizarCards={this.visualizarCards} id={this.state.idDetails}/>

    case "TelaInicial":
      return <TelaInicial visualizarCards = {this.visualizarCards}
       visualizarCadastro = {this.visualizarCadastro}/>;

       default: 
       return <h1>Página não encontrada</h1>
  }
}

  render(){

  return (
  <div>
    {this.telaCorreta()}
  </div>
      
    
  );
}
}

