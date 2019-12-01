import React from 'react';
import Sidebar from './sideBar'
import axios from 'axios';
import {Link} from 'react-router-dom';
import { getToken } from './security/auth'

class ListagemReservas extends React.Component {
	constructor(props){
		super(props);
		this.state ={
			listaReservas: []
		}
	}
    
	componentDidMount() {
		this.getReservas();
	}

    getReservas = () => {
		const token = getToken()
    	axios.get("http://localhost:8080/sigaamesa/reservas", {headers:{token: token }}).then(response =>{
			this.setState({listaReservas: response.data})
    	}).catch(saida => console.log(saida))
    }

	deletarReserva = (id) => {
		const token = getToken()
		const instance = {
            method: 'delete',
            url: "http://localhost:8080/sigaamesa/reserva/excluir?id="+id,
            headers: {token: token}
          };
    	axios(instance).then(response =>{
			this.getReservas()
			alert("Reserva deletada com sucesso!")
    	}).catch(saida => console.log(saida))
    }

	render(){
		const {listaReservas} = this.state
	    return(
	        <Sidebar {...this.props} componente={
	            <div>	            	
	            	<h2 className="text-left inline">Reservas</h2>
	            	<button className="btn btn-primary novo-cadastro"><Link to="/cadastro-reserva">+ Nova Reserva</Link></button>
					<table>
						<thead>
							<tr>
								<th>Mesa</th>
								<th>Data</th>
								<th>Hora</th>
								<th>Refeição</th>
								<th>Cliente</th>
								<th>Status</th>
								<th>Ações</th>
							</tr>
						</thead>
						<tbody>
						{listaReservas.map( (item, key) => {
								return (
									<tr key={key}>
										<td>{item.mesa}</td>
										<td>{item.dataReserva}</td>
										<td>{item.horaReserva}</td>
										<td>{item.refeicao}</td>
										<td>{item.cliente}</td>
										<td>{item.descricao}</td>
										<td>

										<i className="r-icon fas fa-trash-alt clicavel" 
												onClick={() => this.deletarReserva(item.id)}>
											</i>
										</td>
									</tr>
									)
							})}
						</tbody>
					</table>
	            </div>
	        } />
	    );
	}
}

export default ListagemReservas;

const tiposReserva = {
	CONFIRMADA: 'Confirmada',
	CANCELADA: 'Cancelada',
	PENDENTE: 'Pendente'
}


/*
render(){
		const {listaReservas} = this.state
		const style = {padding:5, backgroundColor: "lightgrey", width: 110,  display: "inline-block"}
	    return(
	        <Sidebar {...this.props} componente={
	            <div className="counteiner-fluid">	            	
	            	<div className="col-12 text-left" style={{display: "block"}}>
		            	<h2 className="inline">Reservas</h2>
		            	<button className="btn btn-primary novo-cadastro"><Link to="/cadastro-reserva">+ Nova Reserva</Link></button>
					</div>
					<div className="column" style={{padding: 10, display: "block", bordeRadius: 20}}>	
						<ReactTable 
							data={horarios} 
							columns={columns} 
							defaultPageSize={11} 
							sortable={false}/>
					</div>
	            </div>
	        } />
	    );
	}
*/

/*const horarios = [
	{horario:'7:00-7:50', "sala 1": "Daphne Trindade", "sala 2": "Daniel Leiros","sala 3": "Daphne Trindade", "sala 4": "Daniel Leiros","sala 5": "Daphne Trindade", "sala 6": "Daniel Leiros","sala 7": "Daphne Trindade"},
	{horario:'8:00-8:50', "sala 1": "Daphne Trindade", "sala 2": "Daniel Leiros","sala 3": "Daphne Trindade", "sala 4": "Daniel Leiros","sala 5": "Daphne Trindade", "sala 6": "Daniel Leiros","sala 7": "Daphne Trindade"},
	{horario:'9:00-9:50', "sala 1": "Daphne Trindade", "sala 2": "Daniel Leiros","sala 3": "Daphne Trindade", "sala 4": "Daniel Leiros","sala 5": "Daphne Trindade", "sala 6": "Daniel Leiros","sala 7": "Daphne Trindade"},
	{horario:'10:00-10:50', "sala 1": "Daphne Trindade", "sala 2": "Daniel Leiros","sala 3": "Daphne Trindade", "sala 4": "Daniel Leiros","sala 5": "Daphne Trindade", "sala 6": "Daniel Leiros","sala 7": "Daphne Trindade"},
	{horario:'11:00-11:50', "sala 1": "Daphne Trindade", "sala 2": "Daniel Leiros","sala 3": "Daphne Trindade", "sala 4": "Daniel Leiros","sala 5": "Daphne Trindade", "sala 6": "Daniel Leiros","sala 7": "Daphne Trindade"},
	{horario:'12:00-12:50', "sala 1": "Daphne Trindade", "sala 2": "Daniel Leiros","sala 3": "Daphne Trindade", "sala 4": "Daniel Leiros","sala 5": "Daphne Trindade", "sala 6": "Daniel Leiros","sala 7": "Daphne Trindade"},
	{horario:'13:00-13:50', "sala 1": "Daphne Trindade", "sala 2": "Daniel Leiros","sala 3": "Daphne Trindade", "sala 4": "Daniel Leiros","sala 5": "Daphne Trindade", "sala 6": "Daniel Leiros","sala 7": "Daphne Trindade"},
	{horario:'14:00-14:50', "sala 1": "Daphne Trindade", "sala 2": "Daniel Leiros","sala 3": "Daphne Trindade", "sala 4": "Daniel Leiros","sala 5": "Daphne Trindade", "sala 6": "Daniel Leiros","sala 7": "Daphne Trindade"},
	{horario:'15:00-15:50', "sala 1": "Daphne Trindade", "sala 2": "Daniel Leiros","sala 3": "Daphne Trindade", "sala 4": "Daniel Leiros","sala 5": "Daphne Trindade", "sala 6": "Daniel Leiros","sala 7": "Daphne Trindade"},
	{horario:'16:00-16:50', "sala 1": "Daphne Trindade", "sala 2": "Daniel Leiros","sala 3": "Daphne Trindade", "sala 4": "Daniel Leiros","sala 5": "Daphne Trindade", "sala 6": "Daniel Leiros","sala 7": "Daphne Trindade"},
	{horario:'17:00-17:50', "sala 1": "Daphne Trindade", "sala 2": "Daniel Leiros","sala 3": "Daphne Trindade", "sala 4": "Daniel Leiros","sala 5": "Daphne Trindade", "sala 6": "Daniel Leiros","sala 7": "Daphne Trindade"}
]

const salas = ["sala 1","sala 2","sala 3","sala 4","sala 5","sala 6","sala 7"]

// const columns = salas.map((el) => {
// 	return (
// 		{Header:el, accessor: el, Cell: () => }
// 	)
// })
				

const columns =
[
	{Header:"horarios", accessor: 'horario'},
	{Header:"sala 1", accessor: "sala 1"},
	{Header:"sala 2", accessor: "sala 2"},
	{Header:"sala 3", accessor: "sala 3"},
	{Header:"sala 4", accessor: "sala 4"},
	{Header:"sala 5", accessor: "sala 5"},
	{Header:"sala 6", accessor: "sala 6"},
	{Header:"sala 7", accessor: "sala 7"}]*/