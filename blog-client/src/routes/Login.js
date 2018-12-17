import React, { Component, Fragment } from 'react';
import axios from 'axios';

class Login extends Component {

    constructor (){
        super();
        this.state = {
          email: '',
          senha: '',
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
    
        const user = {
            email: this.state.email,
            senha: this.state.senha
        }
        
        axios.post('http://localhost:5000/api/autores/login', user)
        .then(res => console.log(res.data))
        .catch(err => this.setState({errors : err.response.data, x: console.log(err)}));
      }

  render() {

    //const {errors} = this.state;

    return (  

      <Fragment>
        <form onSubmit={this.onSubmit}>
            <div>
                <span>Email</span>
                <input name="email" type="text" defaultValue={this.state.email} onChange={this.onChange}/>
            </div>
            <div>
                <span>Senha</span>
                <input name="senha" type="password" defaultValue={this.state.senha} onChange={this.onChange}/>
            </div>
            <br></br>
            <input type="submit"/>        
        </form>
      </Fragment>
    )
  }
}

export default Login;