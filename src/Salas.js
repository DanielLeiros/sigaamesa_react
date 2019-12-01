import React from 'react';
import Sidebar from './sideBar'
import axios from 'axios';
import {Link} from 'react-router-dom';
import { getToken } from './security/auth';

class ListagemSalas extends React.Component {
	constructor(props){
		super(props);
		this.state ={
			listaSalas: []
		}
	}
    
	componentDidMount() {
		this.getSalas();
	}

    getSalas = () => {
		const token = getToken()
    	axios.get("http://localhost:8080/sigaamesa/mesas", {headers:{token: token }}).then(response =>{
			this.setState({listaSalas: response.data})
			console.log(response.data)
    	}).catch(saida => console.log(saida))
    }

	deletarSalas = (id) => {
		const token = getToken()
		const instance = {
            method: 'delete',
            url: "http://localhost:8080/sigaamesa/mesa/excluir?id="+id,
            headers: {token: token}
          };
    	axios(instance).then(response =>{
			this.getSalas()
			alert("Sala deletada com sucesso!")
    	}).catch(saida => alert("Não foi possível remover a sala, é possível que ela possua alguma reserva ou chamado cadastrado. Se persistir contate o suporte."))
    }

	render(){
		const {listaSalas} = this.state
	    return(
	        <Sidebar {...this.props} componente={
	            <div>	            	
	            	<h2 className="text-left inline">Mesas</h2>
	            	<button className="btn btn-primary novo-cadastro"><Link to="/cadastro-salas">+ Nova Mesa</Link></button>
					<table>
						<thead>
							<tr>
								<th>Número</th>
								<th>Lugares</th>
								<th>Descrição</th>
								<th>Ações</th>
							</tr>
						</thead>
						<tbody>
						{listaSalas.map( (item, key) => {
							console.log(item)
								return (
									<tr key={key}>
										<td>{item.numero}</td>
										<td>{item.qtdLugares}</td>
										<td>{item.descricao}</td>
										<td>

										<i className="r-icon fas fa-trash-alt clicavel" 
												onClick={() => this.deletarSalas(item.id)}>
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

export default ListagemSalas;