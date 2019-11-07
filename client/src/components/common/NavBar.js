import React, { Component } from 'react';
import './NavBar.css';
import { Link } from 'react-router-dom';
import Rules from '../rules/Rules'
//import { is } from '@babel/types';
//import { isTemplateElement } from '@babel/types';

class NavBar extends Component {
    state = {
            isSidebarOpen: false,
            showPopup : false
        }
    
    handleMenuButtonClick = () => {
        this.setState({ 
            isSidebarOpen: !this.state.isSidebarOpen 
        });
    }
    togglePopup =() =>{  
        this.setState({  
             showPopup: !this.state.showPopup  
        });  
         }


    render() {
        return(
            <div className="container">
                        <div>  
            {this.state.showPopup ?  
            <Rules  
                      text='Rules of the game'  
                     
                      closePopup={this.togglePopup.bind(this)}  
            />  
            : null  
            }  
            </div> 
                <div className="menu-button" onClick={this.handleMenuButtonClick}>
                    <img className="icon" src="https://image.noelshack.com/fichiers/2019/44/2/1572343624-logo.png" alt="ironman"/>
                </div>

                   <nav  className={this.state.isSidebarOpen ? 'nav show' : 'nav'}>
                            <ul className="menu-items">
                                <Link to='/'>
                                    <li className="menu-list">
                                        <span className="menu-link" >Game</span>
                                    </li>
                                    </Link>
                                    <li className="menu-list" >
                                        <span className="menu-link" onClick={this.togglePopup} >Rules</span>
                                    </li>
                                    <Link to='/about'>
                                    <li className="menu-list">
                                        <span className="menu-link" >About</span>
                                    </li>
                                    </Link>
                            </ul>
                     </nav>
            </div>
        )
    }
}

export default NavBar;