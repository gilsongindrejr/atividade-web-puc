import React, { Component } from 'react';
import firebase from '../../firebase';
import { Link } from 'react-router-dom';

class Cadastro extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      senha: "",
      nome: "",
      sobrenome: "",
      nascimento: ""
    }

    this.cadastrar = this.cadastrar.bind(this);
  }

  async cadastrar() {
    const mensagem = document.getElementById("mensagem");
    try {

      await firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.senha)
        .then(async (retorno) => {

          await firebase.firestore().collection("usuario").doc(retorno.user.uid).set({
            nome: this.state.nome,
            sobrenome: this.state.sobrenome,
            nascimento: this.state.nascimento
          });
        });
      mensagem.innerHTML = "Cadastrado com sucesso"

      // Criar Collection
      //  firebase.firestore().collection("usuario").add({
      //         nome: this.state.nome,
      //         sobrenome: this.state.sobrenome
      //     });

    } catch (e) {
      if (e.code === "auth/invalid-email") {
        mensagem.innerHTML = "Email inválido."
      }
      else if (e.code === "auth/weak-password") {
        mensagem.innerHTML = "A senha deve possuir pelo menos 6 caracteres."

      }
      else {
        mensagem.innerHTML = "Erro ao concluir o cadastro."
      }
    }
  }

  render() {
    return (
      <>
        <div style={container}>
          <div style={{ display: 'flex', width: '30%', backgroundColor: '#ccc', height: '100vh', flexDirection: 'column', alignItems: 'center' }}>
            <h1>Tela de Cadastro</h1>
            <div style={inputContainer}>
              <label>Email:</label>
              <input style={inputStyle} type="email" placeholder="E-mail" required onChange={(e) => this.setState({ email: e.target.value })} />
            </div>
            <div style={inputContainer}>
              <label>Senha:</label>
              <input style={inputStyle} type="password" placeholder="Senha" min={6} required onChange={(e) => this.setState({ senha: e.target.value })} />
            </div>
            <div style={inputContainer}>
              <label>Nome:</label>
              <input style={inputStyle} type="text" placeholder="Nome" onChange={(e) => this.setState({ nome: e.target.value })} />
            </div>
            <div style={inputContainer}>
              <label>Sobrenome:</label>
              <input style={inputStyle} type="text" placeholder="Sobrenome" onChange={(e) => this.setState({ sobrenome: e.target.value })} />
            </div>
            <div style={inputContainer}>
              <label>Data de Nascimento:</label>
              <input style={inputStyle} type="date" placeholder="Data de Nascimento" onChange={(e) => this.setState({ nascimento: e.target.value })} />
            </div>
            <div>

              <button style={cadastrarBtn} onClick={this.cadastrar}>Cadastrar</button>
              <Link to="/">
                <button style={loginBtn}>Login</button>
              </Link>
            </div>
            <p id='mensagem'></p>
          </div>
        </div>
      </>
    );
  }

}

const container = {
  display: 'flex',
  justifyContent: 'center',
}

const inputStyle = {
  padding: '15px',
  width: '250px',
  margin: '10px 0px',
  border: '1px solid black'
};

const cadastrarBtn = {
  backgroundColor: '#3f2ff5',
  padding: '10px 20px',
  color: 'white',
  cursor: 'pointer',
  border: 'none',
  fontSize: '20px'
};

const loginBtn = {
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



export default Cadastro;