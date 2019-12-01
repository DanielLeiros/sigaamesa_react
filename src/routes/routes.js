import React, {useEffect, useState} from "react";
import PrivateRoute from "./privateRoute";
import {BrowserRouter, Route, Switch} from "react-router-dom";
// import NotFound from '../notFound';
import Login from "../login/login";
import CadastroUser from "../Forms/cadastroUsuario";
import CadastroReserva from "../Forms/cadastroReserva";
import CadastroSala from "../Forms/cadastroSala";
import ListagemReservas from "../home";
import ListagemUsuarios from "../usuarios";
import ReservasPendentes from "../Reservas/ReservasPendentes.js";
import ListagemSalas from "../Salas";


const Routes = () => {
	const [ref, setRef] = useState(window.location.pathname)
	useEffect(()=>{
		ref === "/login" ? document.body.className = 'container-login' : document.body.className=""; 
	},[ref])
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/login" component={props => <Login {...props} />} />
				<PrivateRoute exact path="/" component={props =>  <ListagemReservas {...props}/>} /> 
				<PrivateRoute exact path="/listagem-usuarios" component={props => <ListagemUsuarios {...props}/>} />
				<PrivateRoute exact path="/listagem-salas" component={props => <ListagemSalas {...props}/>} />
				<PrivateRoute exact path="/cadastro-usuario" component={props => <CadastroUser {...props}/>} />
				<PrivateRoute exact path="/cadastro-salas" component={props => <CadastroSala {...props}/>} />
				<PrivateRoute exact path="/cadastro-reserva" component={props => <CadastroReserva {...props}/>} />
				<PrivateRoute exact path="/editar-reserva/:id" component={props => <CadastroReserva {...props}/>} />
				<PrivateRoute exact path="/reservas-pendentes" component={props => <ReservasPendentes {...props}/>} />
			</Switch>
		</BrowserRouter>
	)
};

export default Routes;

