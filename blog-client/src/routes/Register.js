import React, { Component, Fragment } from 'react';
import axios from 'axios';

class Register extends Component {

    constructor (){
        super();
        this.state = {
          nome: '',
          email: '',
          senha: '',
          senha2: '',
          errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
      }

      onChange(e){
          this.setState({[e.target.name]: e.target.value});
      }

      onSubmit(e){
        e.preventDefault();

        const novoUser = {
            nome: this.state.nome,
            email: this.state.email,
            senha: this.state.senha,
            senha2: this.state.senha2
        }
        
        axios.post('http://localhost:5000/api/autores/cadastro', novoUser)
        .then(res => console.log(res.data))
        .catch(err => this.setState({errors : err.response.data, x: console.log(err)}));
      }

  render() {

    //const {errors} = this.state;

    return (  

      <Fragment>
        <form onSubmit={this.onSubmit}>
            <div>
                <span>Nome</span>
                <input name="nome" type="text" defaultValue={this.state.nome} onChange={this.onChange}/>
            </div>
            <div>
                <span>Email</span>
                <input name="email" type="text" defaultValue={this.state.email} onChange={this.onChange}/>
            </div>
            <div>
                <span>Senha</span>
                <input name="senha" type="password" defaultValue={this.state.senha} onChange={this.onChange}/>
            </div>
            <div>
            <span>Repita sua senha</span>
                <input name="senha2" type="password" defaultValue={this.state.senha2} onChange={this.onChange}/>
                </div>
            <br></br>
            <input type="submit"/>        
        </form>
      </Fragment>
    )
  }
}

export default Register;