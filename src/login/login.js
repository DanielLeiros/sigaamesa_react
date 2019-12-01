import React, {useEffect} from 'react';
import './login.css';
import logo from '../images/logo-n-bg.png';
import img from '../images/ufrn-reitoria.jpg';
import {ErrorMessage, Formik, Form, Field} from 'formik';
import * as yup from "yup";
import axios from 'axios';



const Login = (props) => {

    useEffect(()=>{
        document.body.className="container-login"
    },[])

    const handleSubmit = values => {
        const instance = {
            method: 'post',
            url: 'http://localhost:8080/authenticate',
            headers: {cpf: values.cpf, senha: values.password}
          };
        // axios(instance).then((e) =>{
        //     sessionStorage.setItem('token', "Bearer "+e.data.token);
        //     props.history.push("/")
        // }).catch((err) => console.log(err))
        sessionStorage.setItem('token', "Bearer "+"This is a fake token");
        props.history.push("/")
    }
    const validations = yup.object().shape({
        cpf:yup.string().min(11).required("Preencha o campo Cpf"),
        password:yup.string().min(3).required("Preencha o campo senha"),
    })

    return(
        <div>
            <div className="bg-form row">
                <div className="form-fields col-md-6 col-sm-12 align-self-center">
                    <div className="login-title">Autenticação de Usuário</div>
                    <Formik 
                        initialValues={{cpf: "", password:""}}
                        onSubmit={handleSubmit}
                        validationSchema={validations}
                    >

                        <Form className="app-form">
                            <div className="row justify-content-center">
                                <div className="form-group text-left col-8">
                                    <label className="exemple-cpf">Cpf:</label>
                                    <Field name="cpf" className="form-control" placeholder="Cpf"/>
                                    <ErrorMessage className="form-error" name="cpf" component="span"/>
                                </div>
                                <div className="form-group text-left col-8">
                                <label className="exemple-password">Senha:</label>
                                    <Field name="password" className="form-control" placeholder="Senha" type="password" default="secret"/>
                                    <ErrorMessage className="form-error" name="password" component="span"/>
                                </div>
                            </div>
                            <button className="btn btn-primary btn-md" type="submit">Login ></button>
                        </Form>
                    </Formik>
                </div>
                <img className="logo col-6" src={logo} alt="sigaAchave" />
            </div>
        </div>
    );
}

export default Login;