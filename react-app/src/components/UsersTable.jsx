import React from 'react';

export class UsersTable extends React.Component {
    constructor() {
        super();
        this.state = { 
            users: [],
            rows: [],
            search: ''
        };

        this.handleSearchClick = this.handleSearchClick.bind(this);
        this.hadnleOnChange = this.hadnleOnChange.bind(this);
    }

    async componentDidMount() {
        let response = await fetch('/api/users');
        let json = await response.json();
        this.setState({ users: json });
        this.updateRows(this.state.users);
    }

    handleSearchClick() {
        let users = this.state.search == '' ? this.state.users : this.findUsers(this.state.search);
        this.updateRows(users);
    }

    hadnleOnChange(event) {
        this.setState({ search: event.target.value });
    }

    updateRows(users) {
        this.setState({ rows: users.map(u => <Row key={u.id} user={u} />) });
    }

    findUsers(filter) {
        let filteredUsers = [];
        for (let user of this.state.users) {
            let push = false;
            for (let key in user) {
                if (user[key] !== null && user[key].toString().includes(filter)) {
                    push = true;
                    break;
                }
            }

            if (push) {
                filteredUsers.push(user);
            }
        }

        return filteredUsers;
    }

    render() {
        let names = [ '#', 'First Name', 'Last Name', 'E-Mail', 'Country', 'Date of Birth', 'Gender' ];
        let columnNames = names.map(n => <th key={n}> {n} </th>);
        return (
            <div>
                <div className='usersTable'>
                    <form className='pure-form'>
                        <input type='text' placeholder='Text for Search...' className='pure-input' onChange={this.hadnleOnChange} />
                        <button type='submit' className='pure-button' onClick={this.handleSearchClick}> Search </button>
                    </form>
                </div>
                <div className='usersTable'>
                    <table className='pure-table pure-table-horizontal'>
                        <thead>
                            <tr>
                                {columnNames}
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.rows}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

class Row extends React.Component {
    render() {
        let columns = Object.entries(this.props.user).map(u => <td key={u[0]}> {u[1]} </td>);
        return (
            <tr>
                {columns}
            </tr>
        );
    }
}