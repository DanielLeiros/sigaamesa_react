import React from 'react';
import Sidebar from '../sideBar'
import axios from 'axios';
import {Link} from 'react-router-dom';
import { getToken } from '../security/auth'

class ReservasPendentes extends React.Component {
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
    	axios.get("http://localhost:8080/sigaachave/reservas/status?status=PENDENTE", {headers:{token:token}}).then(response =>{
			this.setState({listaReservas: response.data})
    	}).catch(saida => console.log(saida))
    }

    alterarStatusReserva = (id, sala, status) => {
		const token = getToken()		
		const instance = {
            method: 'put',
            url: "http://localhost:8080/sigaachave/reserva/atualizar?id="+id+"&status=" + status + "&idSala=" + sala,
            headers: {token: token}
		  };
    	axios(instance).then(response =>{
			this.getReservas("PENDENTES")
			status === "CONFIRMADA" ? alert("Reserva confirmada!") : alert("Reserva cancelada!")  	
    	}).catch(saida => {
			console.log(saida)
			alert("Não foi possível realizar a ação, tente novamente ou contate nosso suporte!")
		}
			)
    }

	render(){
		const {listaReservas} = this.state
	    return(
	        <Sidebar {...this.props} componente={
	            <div>	            	
	            	<h2 className="text-left inline">Reservas pendentes</h2>
	            	<button className="btn btn-primary novo-cadastro"><Link to="/cadastro-reserva">+ Nova Reserva</Link></button>
					<table>
						<thead>
							<tr>
								<th>Sala</th>
								<th>Data</th>
								<th>Horário</th>
								<th>Tipo</th>
								<th>Status</th>
								<th>Ações</th>
							</tr>
						</thead>
						<tbody>
						{listaReservas.map( (item, key) => {
								return (
									<tr key={key}>
										<td>{item.sala}</td>
										<td>{item.dataConsulta}</td>
										<td>{item.horaConsulta + "h"}</td>
										<td>{item.isFixo ? "Fixo" : "Não-Fixo"}</td>
										<td>{tiposReserva[item.status]}</td>
										<td>

										<i className="g-icon fas fa-check clicavel" 
												onClick={() => this.alterarStatusReserva(item.id, item.idSala,  "CONFIRMADA")}>
											</i>
										<i className="r-icon fas fa-times clicavel" 
												onClick={() => this.alterarStatusReserva(item.id, item.idSala, "CANCELADA")}>
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

export default ReservasPendentes;

const tiposReserva = {
	CONFIRMADA: 'Confirmada',
	CANCELADA: 'Cancelada',
	PENDENTE: 'Pendente'
}