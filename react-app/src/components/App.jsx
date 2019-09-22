import React from 'react';
import { UserForm } from './UserForm';
import { UsersTable } from './UsersTable';

export class App extends React.Component {
    constructor() {
        super();
        this.state = { currentPage: 'index' };

        this.handleCreateClick = this.handleCreateClick.bind(this);
        this.handleViewClick = this.handleViewClick.bind(this);
    }

    handleCreateClick() {
        this.setState({ currentPage: 'create' });
    }

    handleViewClick() {
        this.setState({ currentPage: 'view' });
    }

    render() {
        let page;
        switch (this.state.currentPage) {
            case 'index':
            case 'create':
                page = <UserForm />;
                break;
            case 'view':
                page = <UsersTable />;
                break;
            default:
                break;
        }

        return (
            <div className="content">
                <div className='pure-menu pure-menu-horizontal'>
                    <a href='#' className='pure-menu-heading pure-menu-link'>Users</a>
                    <ul className='pure-menu-list'>
                        <li className='pure-menu-item'><a href='#' className='pure-menu-link' onClick={this.handleCreateClick}>Create</a></li>
                        <li className='pure-menu-item'><a href='#' className='pure-menu-link' onClick={this.handleViewClick}>View</a></li>
                    </ul>
                </div>
                <div className='page'>
                    {page}
                </div>
            </div>
        );
    }
}