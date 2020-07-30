import React from 'react';
import { Auth } from 'aws-amplify';
import { styles } from './styles';
import { Redirect } from 'react-router-dom';


export const getUser = async () => {
    try {
        const user = await Auth.currentAuthenticatedUser();
        return user;
    } catch (err) {
        if (err === "not authenticated") {
            return null;
        } else {
            console.log(`Unexpected error: ${err}`);
            return null;
        }
    }
};

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            error: null,
            source: props.source,
            redirect: null
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.signIn = this.signIn.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    async signIn() {
        try {
            const { username, password } = this.state;
            await Auth.signIn(username, password);
            this.setState({ redirect: true });
        } catch (error) {
            console.log('error signing in', error);
        }
    }

    async componentDidMount() {
        const user = await getUser();
        if (user) {
            this.setState({ redirect: true });
        }
    }

    render() {
        if (this.state.redirect) {
            return (
                this.state.source ? <Redirect to={this.state.source} /> : <Redirect to="/" />
            )
        }

        return (
            <div >
                <h2>Login</h2>
                <input
                    onChange={this.handleInputChange}
                    name="username"
                    style={styles.input}
                    value={this.state.username}
                    placeholder="Username"
                />
                <input
                    name="password"
                    onChange={this.handleInputChange}
                    style={styles.password}
                    value={this.state.password}
                    type="password"
                    placeholder="Password"
                />
                <div style={styles.error} >
                    {this.state.error}
                </div>
                <button style={styles.button} onClick={this.signIn}>Sign In</button>

            </div>
        );
    }
}
export default SignIn;