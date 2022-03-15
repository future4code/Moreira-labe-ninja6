import React from "react";


export default class TelaInicial extends React.Component {
    render(){
        return(
            <div>
    <button onClick={this.props.visualizarCadastro}>Cadastrar Serviço</button>
    <button onClick={this.props.visualizarCards}>Contratar Serviço</button>
            </div>
        )
    }
}