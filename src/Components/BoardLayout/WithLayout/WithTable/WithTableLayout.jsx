import React, { Component } from "react";
import './stylesheet.scss';
import { connect } from "react-redux";
import { compose } from "redux";

/**Just adding template for general idea of withLayout */
const WithTableLayout = ( WrappedComponent )=>{

    class HOC extends Component{

        constructor(props){
            super(props);
            this.state = {
                data:[]
            }
        }

        render(){

            return(
               <WrappedComponent type="table" {...this.props}/>
            )
        }
    }

    return HOC;

}

const mapStateToProps = state =>({
    boardTasks: state.board.tasks
})

const composedTableLayout = compose(
    connect(mapStateToProps, null),
    WithTableLayout
)
export default  composedTableLayout;