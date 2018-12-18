import React, { Component } from 'react';
import axios from 'axios';

class Home extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            isLoaded : false,
        }
    }

    componentDidMount() {

        axios.get('http://localhost:5000/api/artigos')
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
                <div>
                    <ul>
                        {posts.map(p => (
                            <li key={p._id}>
                                <h3>{p.titulo}</h3>
                                <p>{p.permalink}</p>
                                <p>{p.subtitulo}</p>
                                <p>{p.conteudo}</p>
                                <p>{p.createdAt}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            );
        }
        
    }

}

export default Home;