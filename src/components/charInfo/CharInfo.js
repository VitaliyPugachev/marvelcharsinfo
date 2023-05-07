import React from 'react';
import { Component } from 'react';

import './charInfo.scss';
import Spinner from '../spinner/spinner';
import MarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/errorMessage';
import Skeleton from '../skeleton/Skeleton.js';

class CharInfo extends Component {
    state = {
        char: null,
        loading: false,
        error: false
    }

    marvelService = new MarvelService();

    onCharLoad = (char) => {
        this.setState({char, loading: false})
    }

    onError= () => {
        this.setState({loading: false, error: true})
    }

    updateChar = () => {
        const {charId} = this.props;
        if(!charId){
            return;
        };
        this.setState({loading: true});
        this.marvelService
            .getCharacter(charId)
            .then(this.onCharLoad)
            .catch(this.onError);
    }

    componentDidMount(){
        this.updateChar();
    }

    componentDidUpdate(prevProps, prevState){
        if(this.props.charId !== prevProps.charId){
            this.updateChar();
        }
    }

    render(){
        const {char, loading, error} = this.state;

        const skeleton = char || loading || error ? null : <Skeleton/>
        const errorMessage = error? <ErrorMessage/>:null;
        const spinner = loading? <Spinner/>:null;
        const content = !(loading || error || !char)? <View char={char}/>: null;

        return (
            <div className="char__info">
                {skeleton}
                {errorMessage}
                {spinner}
                {content}
            </div>
        )
    }
    
}

const View = ({char}) => {
    const {name, description, thumbnail, wiki, homepage, comics} = char;
    const style = thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"? {objectFit: 'contain'}: null;

    const comicsList = comics.map((item, i) => {
        if(i > 9) return;
        return (
            <li key={i} className="char__comics-item">
                {item.name}
            </li>
        )
    }) 

    return (
    <>
    <div className="char__basics">
        <img style={style} src={thumbnail} alt={name}/>
        <div>
            <div className="char__info-name">{name}</div>
            <div className="char__btns">
                <a href={homepage} className="button button__main">
                    <div className="inner">homepage</div>
                </a>
                <a href={wiki} className="button button__secondary">
                    <div className="inner">Wiki</div>
                </a>
            </div>
        </div>
    </div>
    <div className="char__descr">
        {description}
    </div>
    <div className="char__comics">Comics:</div>
    <ul className="char__comics-list">
        {comics.length === 0?'There is no comics with the character':null}
        {comicsList}
    </ul>
    </>
    )
}

export default CharInfo;