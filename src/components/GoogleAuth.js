import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {


    componentDidMount() {
        
        window.gapi.load('client:auth2', () => {

            window.gapi.client.init({

                clientId: '1001713058324-1gok8ab8b54o0rsuqpgahdqds3lsr25j.apps.googleusercontent.com',
                scope: 'email'

            }).then(() => {

                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange);

            });
        });

    }

    onAuthChange = (isSignedIn) => {

        if (isSignedIn) {

            this.props.signIn(this.auth.currentUser.get().getId());

        } else {

            this.props.signOut(this.auth.currentUser.get().getId());
            
        }

    }

    onSignInClick = () => {

        this.auth.signIn();
        

    }

    onSignOutClick = () => {

        this.auth.signOut();
         

    }
    renderAuthButton () {

        if (this.props.isSignedIn === null) {

            return (<div>I don't know if we are signed in.</div>);
        } else if (this.props.isSignedIn) {

            return (<button onClick={this.onSignOutClick} className="ui red google button">
                    <i className="google icon" />Sign Out</button>);

        } else {

            return(<button onClick={this.onSignInClick} className="ui red google button">
                <i className="google icon" />Sign In</button>);
        }


    };


    render() {

        return (

            <div>{this.renderAuthButton()}</div>


        );


    }


}

const mapPropsToState = state => {

    return {

        isSignedIn: state.auth.isSignedIn

    };

    

};

export default connect(mapPropsToState, { signIn, signOut })(GoogleAuth);