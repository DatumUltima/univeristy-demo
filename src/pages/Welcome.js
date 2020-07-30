import React from 'react';
import Nav from './Nav';

class Welcome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentDidMount() {
    }

    render() {

        return (
            <div >
                <Nav />
                <h1>Welcome</h1>
            </div>
        );
    }
}

export default Welcome;