import React from "react";
import "./SignUp.css";
import {withRouter} from "react-router";
//import PropTypes from 'prop-types';
class SignUp extends React.Component{
    constructor(){
        super();
        this.state = {
            success:undefined,
            message:undefined
        }
    }
    componentDidMount() {
        //let villagerName = this.props.match.params;
        //post sign up
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: 'React POST Request Example' })
        };
        fetch('http://localhost:5000/SignUp/', requestOptions)
            .then(response => response.json())
            .then(data =>
                this.setState({
                    success: data.success,
                    message: data.message
                })
            );
    }
    render(){
        return(
            // <h1> {this.state.villager[0].name}</h1>
            //                 //<img src={this.state.villager[0].image} alt=""/>
            //                 <p>Hobby: {this.state.villager[0].hobby}</p>
            <div>
                {(this.state.success!== undefined) ?
                    (this.state.success === true) ?
                        <div className="villager">
                            Sign Up Successful!
                        </div>
                    :
                "Sign Up Unsuccessful!"
                :
                ""
                }
            </div>
        )
    }
}
/*
Result.propTypes = {
    dickbutt = PropTypes.object,
    dickbutt2 = PropTypes.string
}
*/
export default withRouter(SignUp);