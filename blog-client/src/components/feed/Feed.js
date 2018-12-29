import React, { Component } from 'react';
import axios from 'axios'

import './style.css';


class Feed extends Component {

  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      isLoaded : false,
    }
  }

  componentDidMount() {

    axios.get('http://localhost:5000/api/articles')
    .then(res => {
        let arr = Object.values(res);
        this.setState({
            isLoaded: true,
            posts: arr[0].docs,
        });
    })
    .catch(err => console.log(err));
  }

  render() {

    var { isLoaded, posts } = this.state;

    if(!isLoaded) {
        return <div>Loading...</div>
    } else {
        return (
            <div className="div-feed">
                <ul>
                    {posts.map(p => (
                        <li className="lista-feed" key={p._id}>
                            <p className="titulo" >Titulo: {p.title}</p>
                            <p className="subtitulo" >{p.subtitle}</p>
                            <p className="conteudo" >{p.content}</p>
                            <p className="author" >Autor: {p.author}</p>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
  }

}

export default Feed;