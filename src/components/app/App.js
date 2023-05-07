import React from "react";
import { Component } from "react";
import PropTypes from 'prop-types'

import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

import decoration from '../../resources/img/vision.png';

class App extends Component {

    state = {
        selectedChar: null
    }

    onCharSelect = (id) => {
        this.setState({selectedChar: id})
    }

    render(){
        return (
            <div className="app">
                <AppHeader/>
                <main>
                    <RandomChar/>
                    <div className="char__content">
                        <ErrorBoundary>
                            <CharList onCharSelect={this.onCharSelect}/>
                        </ErrorBoundary>
                        <ErrorBoundary>
                            <CharInfo charId={this.state.selectedChar}/>        
                        </ErrorBoundary>
                        
                    </div>
                    <img className="bg-decoration" src={decoration} alt="vision"/>
                </main>
            </div>
        )
    }
}

App.propTypes = {
    charId: PropTypes.number,
    onCharSelect: PropTypes.func.isRequired

}

export default App;