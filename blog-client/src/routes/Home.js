import React, { Component } from 'react';

class Home extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            isLoaded : false,
        }
    }

    componentDidMount() {

        fetch('http://localhost:5000/api/artigos')
        .then(res => res.json())
        .then(json => {
            var x = Object.values(json);
            console.log(x);
            this.setState({
                isLoaded: true,
                posts: x[0],
            });
        });

        
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
                            </li>
                        ))}
                    </ul>
                </div>
            );
        }
        
    }

}

export default Home;