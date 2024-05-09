import {BrowserRouter, Route, Routes} from 'react-router-dom';

import Login from './pages/login/index';
import Cadastro from './pages/cadastro/index';
import Principal from './pages/principal/index';

const Rotas = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login/>} />
                <Route path="/cadastro" element={<Cadastro/>} />
                <Route path="/principal" element={<Principal/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default Rotas;