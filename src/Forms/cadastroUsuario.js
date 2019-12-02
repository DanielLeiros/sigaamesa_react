import React from 'react';
import {ErrorMessage, Formik, Form, Field} from 'formik';
import * as yup from "yup";
import './cadastro.css';
import Sidebar from "../sideBar";
import axios from 'axios';
import { getToken } from '../security/auth';

const CadastroUser = (props) => {
    const handleSubmit = (values) => {  
        const token = getToken()        
        console.log(token)
        axios.post(`http://localhost:8080/sigaamesa/usuario/adicionar?nome=${values.nome}&cpf=${values.cpf}&senha=${values.password}&papel=${values.tipoUsuario}`
                 ).then(() => {
                     alert("Usuário cadastrado com sucesso")
                     props.history.push("/listagem-usuarios")
                    }).catch(err => alert("Não foi possível cadastrar o usuário..."))
    }
    const validations = yup.object().shape({
        nome:yup.string().min(3, "Tamanho mínimo de 3 caracteres").required("Campo nome é obrigatório"),
        cpf:yup.string().min(11, "No mínimo 11 caracteres").max(11, "No máximo 11 caracteres").required("Campo CPF é obrigatório"),
        password:yup.string().min(8, "Deve conter no mínimo 8 caracteres").required("Campo senha é obrigatório"),
        passwordConfirm: yup.string().oneOf([yup.ref('password'), null], "Deve ser igual ao campo senha")
        .required('Campo de confirmação de senha é obrigatório')
        
    })
   
    return(
        <Sidebar {...props} componente={
            <div className="container-cadastro"> 
                <div className="row">
                    <div className="form-fields col-12 align-self-center">
                        <div className="login-title">Cadastro de Usuário</div>
                        <Formik 
                            initialValues={{nome:"", password: "", passwordConfirm: "",tipoUsuario: "ADMIN", cpf: ""}}
                            onSubmit={handleSubmit}
                            validationSchema={validations}
                        >

                            <Form className="app-form">
                                <div className="row justify-content-center">
                                    <div className="form-group text-left col-6">
                                        <label className="exemple-name">Nome:</label>
                                        <Field name="nome" className="form-control" placeholder="Nome" maxLength={40}/>
                                        <ErrorMessage className="form-error" name="nome" component="span"/>                               
                                    </div>
                                    <div className="form-group text-left col-6">
                                        <label className="exemple-cpf">Cpf:</label>
                                        <Field name="cpf" className="form-control" placeholder="Cpf (apenas números)" maxLength={11}/>
                                        <ErrorMessage className="form-error" name="cpf" component="span"/>                               
                                    </div>
                                    <div className="form-group text-left col-6">
                                        <label className="exemple-Tipo">Tipo de usuário:</label>
                                        <Field className="form-control" component="select" name="tipoUsuario">
                                            <option value="ADMIN">Administrador</option>
                                            <option value="GARCOM">Garçom</option>
                                        </Field>
                                        <ErrorMessage className="form-error" name="tipoUsuario" component="span"/>  
                                    </div>
                                    <div className="form-group text-left col-6">
                                    <label className="exemple-password">Senha:</label>
                                        <Field name="password" className="form-control" placeholder="Senha" type="password" maxLength={25}/>
                                        <ErrorMessage className="form-error" name="password" component="span"/>
                                    </div>
                                    <div className="form-group text-left col-6">
                                        <label className="exemple-passwordConfirm">Confirmar senha:</label>
                                        <Field name="passwordConfirm" className="form-control" placeholder="Confirmar senha" type="password" maxLength={25}/>
                                        <ErrorMessage className="form-error" name="passwordConfirm" component="span"/>
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

export default CadastroUser;