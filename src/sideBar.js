import React from 'react';
import {Link} from 'react-router-dom';
import logo from  './images/logo-n-bg.png'

class SideBar extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      navIsOpen: false,
      navOpen: "SideBar",
      toggle: "navbar-toggle",   
    }
  }

handleToggleBar = () =>{
    let isOpen = !this.state.navIsOpen
    this.setState({
      navIsOpen: isOpen,
      navOpen: isOpen ? "SideBar nav-open" : "SideBar",
      toggle: isOpen ? "navbar-toggle toggled" : "navbar-toggle"    ,
    })
  }  

  render(){
    const {componente} = this.props
    return (
      <div className={this.state.navOpen}>
        <div className="wrapper">
            <div className="sidebar colaps" data-color="siga-a-chave">
                 <div className="logo">
                  <Link to="/" className="simple-text logo-normal">
                    <img src={logo} alt="logo sigaAchave"/>
                  </Link>
                </div>
                <div className="sidebar-wrapper text-left" id="sidebar-wrapper">
                    <ul className="nav">
                      <li>
                        <Link to='/'><i className="w-icon fas fa-calendar-check"></i>Reservas</Link>
                      </li>
                      {/* <li>
                        <Link to='/reservas-pendentes'><i className="w-icon fas fa-eye"></i>Análise de reservas</Link>
                      </li> */}
                      <li>
                        <Link to='/listagem-usuarios'><i className="w-icon fas fa-user-plus"></i>Usuários</Link>
                      </li>
                      <li>
                        <Link to='/listagem-salas'><i className="w-icon fas fa-map"></i>Mesas</Link>
                      </li>
                    </ul>            
                </div>
            </div>
        </div>
        <div className="main-panel" id="main-panel">
          <nav className="navbar navbar-expand-lg navbar-transparent bg-primary navbar-absolute">
            <div className="container-fluid">
              <div className="navbar-wrapper">
                <div className={this.state.toggle} onClick={this.handleToggleBar}>
                  <button type="button" className="navbar-toggler">
                    <span className="navbar-toggler-bar bar1"></span>
                    <span className="navbar-toggler-bar bar2"></span>
                    <span className="navbar-toggler-bar bar3"></span>
                  </button>
                </div>
              </div>
              <div className="collapse navbar-collapse justify-content-end" id="navigation">
                <ul className="navbar-nav">
                   <li className="nav-item">
                    <a className="nav-link">
                      <span>Meu Perfil</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>        
          <div className="panel-header panel-header-sm" >
          </div>
          <div className="content" style={{marginTop: "30px"}}>
            <div className="row">
              <div className="col-md-12">
              {/*Chamando componente para calcular e imprimir na tela!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!11*/}
                {componente}
              {/*Componente chamado e impresso na tela com sucesso ou quase!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!11*/}
              </div>
            </div>
          </div>
        </div>  
      </div>
    );
  }
}

export default SideBar;