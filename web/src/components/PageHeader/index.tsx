import React from 'react'
import logoImg from '../../assets/images/logo.svg';
import backIcon from '../../assets/icons/back.svg';
import { Link } from 'react-router-dom';
import './styles.css';

interface PageHeaderProps {
    title: string;
    description?: string;
}

const PageHeader: React.FunctionComponent<PageHeaderProps> = ( props ) => { //definir como um componente de funcao e setar a tipagem das propriedades
    return (
        <header className="page-header">
                <div className="top-bar-container">
                    <Link to="/">
                        <img src={backIcon} alt="Voltar"/>
                    </Link>
                        <img src={logoImg} alt="Profy"/>
                </div>

                <div className="header-content">
                    <strong>{props.title}</strong>
                    {props.description && <p> {props.description}</p>}

                    {props.children}
                </div>
                
            </header>
    )
}

export default PageHeader;
