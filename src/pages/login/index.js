import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../../firebase';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            senha: ""
        }

        this.login = this.login.bind(this);
    }

    async login() {
        const mensagem = document.getElementById("mensagem")

        await firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.senha)
            .then(() => {
                mensagem.innerHTML = "Acessando..."
                window.location.href = "./principal";
            })
            .catch((e) => {
                console.log(e.code)
                if (e.code === "auth/invalid-email") {
                    mensagem.innerHTML = "Email inválido"
                }
                else if (e.code === "auth/wrong-password") {
                    mensagem.innerHTML = "Senha inválida"

                }
            })
    }

    render() {
        return (
            <div style={container}>
                <div style={{ display: 'flex', width: '30%', backgroundColor: '#ccc', height: '100vh', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                    <div>
                        <h1>Acessar</h1>
                        <div style={inputContainer}>
                            <label>Email:</label>
                            <input style={inputStyle} type="text" placeholder='E-mail' required onChange={(e) => this.setState({ email: e.target.value })} />
                        </div>
                        <div style={inputContainer}>
                            <label>Senha:</label>
                            <input style={inputStyle} type="password" placeholder='Senha' required onChange={(e) => this.setState({ senha: e.target.value })} />
                        </div>
                        <button style={acessarBtn} onClick={this.login}>Acessar</button>
                        <Link to="/cadastro">
                            <button style={cadastrarBtn}>Cadastrar</button>
                        </Link>
                    </div>
                    <p id='mensagem'></p>
                    <div>

                    </div>
                </div>
            </div>
        )
    }

}


const inputStyle = {
    padding: '15px',
    width: '250px',
    margin: '10px 0px',
    border: '1px solid black'
};

const acessarBtn = {
    backgroundColor: '#3f2ff5',
    padding: '10px 20px',
    color: 'white',
    cursor: 'pointer',
    border: 'none',
    fontSize: '20px'
};

const container = {
    display: 'flex',
    justifyContent: 'center',
}

const cadastrarBtn = {
    backgroundColor: '#fff',
    padding: '10px 20px',
    fontSize: '20px',
    cursor: 'pointer',
    border: '1px solid #ccc',
    marginLeft: '40px',
};

const inputContainer = {
    marginBottom: '15px',
    flexDirection: 'column',
    alignItems: 'start',
    display: 'flex',
};

export default Login;