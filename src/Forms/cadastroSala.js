import React from 'react';
import {ErrorMessage, Formik, Form, Field} from 'formik';
import * as yup from "yup";
import './cadastro.css';
import Sidebar from "../sideBar"
import axios from 'axios';
import { getToken } from '../security/auth';

const CadastroSalas = (props) => {

    const handleSubmit = (values) => {    
        const token = getToken()      
        axios.post(`http://localhost:8080/sigaamesa/mesa/adicionar?numero=${values.numero}&qtdLugares=${values.qtdLugares}&descricao=${values.descricao}
         &permiteFixo=${values.permiteFixo}`, {headers: {token:token}}
         ).then(() =>{
            alert("Mesa cadastrada com sucesso");
            props.history.push("/listagem-salas")
         }).catch(err => alert("Não foi possível cadastrar a mesa..."))
    }
    const validations = yup.object().shape({
        numero:yup.string().required("Digite um número válido"),
        qtdLugares:yup.string(),
        descricao:yup.string(),
    })

    return(
        <Sidebar {...props} 
        componente={
            <div className="container-cadastro"> 
                <div className="row">
                    <div className="form-fields col-12 align-self-center">
                        <div className="login-title">Cadastrar Mesa</div>
                        <Formik 
                            initialValues={{numero: "", qtdLugares: "", descricao: "", permiteFixo: "false"}}
                            onSubmit={handleSubmit}
                            validationSchema={validations}
                        >

                            <Form className="app-form">
                                <div className="row justify-content-center">
                                    
                                    <div className="form-group text-left col-6">
                                        <label className="exemple-nome">Numero:</label>
                                        <Field name="numero" className="form-control" placeholder="numero" type="number" min="0" />
                                        <ErrorMessage className="form-error" name="numero" component="span"/>                               
                                    </div>
                                    
                                    <div className="form-group text-left col-6">
                                        <label className="exemple-localizacao">Lugares:</label>
                                        <Field name="qtdLugares" className="form-control" placeholder="Qtd Lugares" type="number" min="0"/>
                                        <ErrorMessage className="form-error" name="qtdLugares" component="span"/>
                                    </div>

                                    <div className="form-group text-left col-6">
                                        <label className="exemple-descricao">Descrição:</label>
                                        <Field name="descricao" component="textarea" className="form-control" placeholder="Descrição" maxLength={150}/>
                                        <ErrorMessage className="form-error" name="descricao" component="span"/>
                                    </div>

                                    <div className="form-group text-left col-6">
                                        
                                    </div>
                                </div>
                                <button className="btn btn-primary btn-md">Cadastrar</button>
                            </Form>
                        </Formik>
                    </div>
                </div>
            </div> 
        } />
    );
}

export default CadastroSalas;