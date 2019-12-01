import React, {useState, useEffect} from 'react';
import {ErrorMessage, Formik, Form, Field} from 'formik';
import * as yup from "yup";
import './cadastro.css';
import Sidebar from "../sideBar"
import axios from 'axios';
import { getToken } from '../security/auth';

const CadastroReserva = (props) => {

    const [salas, setSalas] = useState([]);

    useEffect(()=>{
        getSalas();
    },[])

    const getSalas = () => {
        const token = getToken()
        axios.get('http://localhost:8080/sigaamesa/mesas')
        .then(response => setSalas(response.data))
        .catch(err => alert("Não foi possível encontrar mesas..."))    
    }

    const handleSubmit = (values) => {
        const token = getToken()        
        axios.post(`http://localhost:8080/sigaamesa/reserva/adicionar?usuarioId=1&mesaId=${values.sala}&refeicao=${values.refeicao}&dataReserva=${values.data}&horaReserva=${values.horario}&cliente=${values.cliente}`, {headers:{token: token }}
         ).then(() =>{
             alert("Reserva realizada com sucesso")
             props.history.push("/")
            }).catch(err => alert("Não foi possível registrar a reserva..."+ err))
    }

    const validations = yup.object().shape({
        sala:yup.string().required("Digite uma sala válida"),
        data:yup.string().min(10).required(),
        horario:yup.number().max(13).min(11).when('refeicao', () =>({
            is: "JANTAR", then: yup.number().max(21).min(18).required() 
        }) ).required(),
        cliente: yup.string().max(40).required(),
    })

    return(
        <Sidebar {...props} 
        componente={
            <div className="container-cadastro"> 
                <div className="row">
                    <div className="form-fields col-12 align-self-center">
                        <div className="login-title">Solicitar Reserva</div>
                        <Formik 
                            initialValues={{sala: "", data: "", refeicao: "ALMOCO", horario: "", cliente: ""}}
                            onSubmit={handleSubmit}
                            validationSchema={validations}
                        >

                            <Form className="app-form">
                                <div className="row justify-content-center">

                                    <div className="form-group text-left col-3">
                                    <label className="exemple-data">Data:</label>
                                        <Field name="data" className="form-control" type="date" placeholder="Data"/>
                                        <ErrorMessage className="form-error" name="data" component="span"/>
                                    </div>
                                    <div className="form-group text-left col-6">
                                        <label className="exemple-Tipo">Refeição:</label>
                                        <Field className="form-control" component="select" name="refeicao">
                                            <option value="ALMOCO">Almoço</option>
                                            <option value="JANTAR">Jantar</option>
                                        </Field>
                                        <ErrorMessage className="form-error" name="refeicao" component="span"/>  
                                    </div>
                                    <div className="form-group text-left col-3">
                                    <label className="exemple-data">Horário:</label>
                                        <Field name="horario" className="form-control" type="number" placeholder="Horário"
                                        />
                                        <ErrorMessage className="form-error" name="horario" component="span"/>
                                    </div>
                                
                                    <div className="form-group text-left col-6">
                                        <label className="exemple-sala">Mesa:</label>
                                        <Field name="sala" className="form-control" component="select">
                                            <option value={null}>Selecione uma mesa</option>
                                            {salas.map((element, index) => {
                                                return <option key={index} value={element.id}>{"Mesa-"+element.numero+ " Lugares-"+ element.qtdLugares}</option>  
                                            })}    
                                        </Field>
                                        <ErrorMessage className="form-error" name="sala" component="span"/>                               
                                    </div>
                                    <div className="form-group text-left col-3">
                                    <label className="exemple-data">cliente:</label>
                                        <Field name="cliente" className="form-control" type="text" placeholder="Cliente"
                                        />
                                        <ErrorMessage className="form-error" name="cliente" component="span"/>
                                    </div>
                                </div>
                                <button className="btn btn-primary btn-md" type="submit">Cadastrar</button>
                            </Form>
                        </Formik>
                    </div>
                </div>
            </div> 
        } />
    );
}

export default CadastroReserva;

/*<DatePicker
      selected={startDate}
      onChange={date => setStartDate(date)}
      locale="pt-BR"
      showTimeSelect
      timeFormat="p"
      minTime={setHours(setMinutes(new Date(), 0), 7)}
      maxTime={setHours(setMinutes(new Date(), 0), 17)}
      timeIntervals={60}
      dateFormat="Pp"
    />*/