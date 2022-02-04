import React from "react";
import Cards from "./components/Cards/Cards";
import CadastrarProdutos from "./cadastrarProdutos/CadastrarProdutos";
import TelaInicial from "./components/TelaInicial";


export default class App extends React.Component {
  state = {
    visualizandoCards: "TelaInicial" ,
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

  render(){

    const telaCorreta = () => {
      switch (this.state.visualizandoCards) {
        case "Cadastro":
          return <CadastrarProdutos voltarTelaInicial = {this.visualizarTelaInicial} />;

        case "Cards": 
        return <Cards voltarTelaInicial = {this.visualizarTelaInicial}/>

        case "TelaInicial":
          return <TelaInicial visualizarCards = {this.visualizarCards}
           visualizarCadastro = {this.visualizarCadastro}/>;

           default: 
           return <h1>Página não encontrada</h1>
      }
    }

  return (
  <div>
    {telaCorreta()}
  </div>
      
    
  );
}
}

