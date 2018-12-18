import React, { Component, Fragment } from 'react';
import axios from 'axios';

class Article extends Component {

    constructor (){
        super();
        this.state = {
          titulo: '',
          subtitulo: '',
          conteudo: '',
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

        const novoPost = {
            titulo: this.state.titulo,
            subtitulo: this.state.subtitulo,
            conteudo: this.state.conteudo,
        }
        
        var token = localStorage.getItem('token_');
        var headers = {
            'Content-Type': 'application/json',
            'Authorization' : token
        }

        axios.post('http://localhost:5000/api/artigos', novoPost, {headers: headers})
        .then(res => console.log(res.data))
        .catch(err => this.setState({errors : err.response.data, x: console.log(err)}));
      }

  render() {

    //const {errors} = this.state;

    return (  

      <Fragment>
        <form onSubmit={this.onSubmit}>
            <div>
                <span>Titulo</span>
                <input name="titulo" type="text" defaultValue={this.state.titulo} onChange={this.onChange}/>
            </div>
            <div>
                <span>Subtitulo</span>
                <input name="subtitulo" type="text" defaultValue={this.state.subtitulo} onChange={this.onChange}/>
            </div>
            <div>
                <span>Conteudo</span>
                <input name="conteudo" type="text" defaultValue={this.state.conteudo} onChange={this.onChange}/>
            </div>
            <br></br>
            <input type="submit"/>        
        </form>
      </Fragment>
    )
  }
}

export default Article;