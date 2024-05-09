import React, { Component } from "react";
import firebase from "../../firebase";
import { Link } from "react-router-dom";

class Principal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nome: "",
      sobrenome: "",
      nascimento: "",
    };
  }

  async componentDidMount() {
    await firebase.auth().onAuthStateChanged(async (usuario) => {
      if (usuario) {
        var uid = usuario.uid;

        await firebase
          .firestore()
          .collection("usuario")
          .doc(uid)
          .get()
          .then((retorno) => {
            this.setState({
              nome: retorno.data().nome,
              sobrenome: retorno.data().sobrenome,
              nascimento: retorno.data().nascimento,
            });
          });
      }
    });
  }

  render() {
    return (
      <div style={container}>
        <div
          style={{ width: '30%', backgroundColor: '#ccc', height: '100vh', display: "flex", flexDirection: "column", alignItems: "center" }}
        >
          <h1>Dados do Usuário:</h1>{" "}
          <div style={inputContainer}>
            <label>Nome:</label>
            <input
              style={inputStyle}
              type="text"

              value={this.state.nome}
            />
          </div>
          <div style={inputContainer}>
            <label>Sobrenome:</label>
            <input
              style={inputStyle}
              type="text"

              value={this.state.sobrenome}
            />
          </div>
          <div style={inputContainer}>
            <label>Nascimento:</label>
            <input
              style={inputStyle}
              type="text"

              value={this.state.nascimento}
            />
          </div>
          <div>
            <Link to="/">
              <button style={voltarBtn}>Voltar</button>
            </Link>
          </div>

        </div>
      </div>
    );
  }
}

const inputStyle = {
  padding: '15px',
  width: '250px',
  margin: '10px 0px',
  border: '1px solid black'
};

const container = {
  display: 'flex',
  justifyContent: 'center',
}

const inputContainer = {
  marginBottom: '15px',
  flexDirection: 'column',
  alignItems: 'start',
  display: 'flex',
};

const voltarBtn = {
  backgroundColor: '#fff',
  padding: '10px 20px',
  fontSize: '20px',
  cursor: 'pointer',
  border: '1px solid #ccc',
  marginLeft: '40px',
};


export default Principal;
