import React from 'react'
import ReactDOM from 'react-dom'

import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

import "./assets/css/gem.css"
import "./assets/material-icon/material-icons.css"

let config = {
    apiKey: "AIzaSyD69fVmX1N539fYPjj4X2mu7hDR4LYAnL8",
    authDomain: "ycccamp.firebaseapp.com",
    databaseURL: "https://ycccamp.firebaseio.com",
    projectId: "ycccamp",
    storageBucket: "ycccamp.appspot.com",
    messagingSenderId: "191460697180"
};
firebase.initializeApp(config);
let firestore = firebase.firestore();

class App extends React.Component {
    state = {
        data: []
    }

    componentDidMount(){
        firestore.collection("gemstone").orderBy("point","desc").onSnapshot(snapshots => {
            this.setState({
                data: []
            })
            snapshots.forEach(doc => {
                this.setState({
                    data: [...this.state.data, doc.data()]
                });
            })
        })
    }

    render(){
        return(
            <>
                <div id="background"></div>
                <div id="scoreboard">
                    <div className="card-wrapper">
                        {this.state.data.map((data,index) => 
                            <div className="card" key={index}>
                                <h1>{data.point}</h1>
                                <h6>Gemstones</h6>
                                <p>{data.name}</p>
                            </div>
                        )}
                    </div>
                </div>
            </>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));