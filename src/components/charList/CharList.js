import React from 'react';
import { Component } from 'react';


import MarvelService from '../../services/MarvelService';
import './charList.scss';
import ErrorMessage from '../errorMessage/errorMessage';
import Spinner from '../spinner/spinner';

class CharList extends Component {

    seletectRef = [];

    setRef = e => {
        this.seletectRef.push(e)
    }

    focusOnItem = (id) => {
        this.seletectRef.forEach(e => e.classList.remove('char__item_selected'));
        this.seletectRef[id].classList.add('char__item_selected');
        this.seletectRef[id].focus();
    }

    state = {
        charList: [],
        loading: true,
        error: false,
        newItemLoading: false,
        offset: 255
    }



    onRequest = (offset) => {
        this.marvelService.getAllCharacters(offset)
        .then(this.onCharListLoaded)
        .catch(this.onError)
    }

    marvelService = new MarvelService();

    onCharListLoaded = (newCharList) => {
        this.setState(({charList, offset}) => ({
            charList: [...charList, ...newCharList],
            loading: false,
            newItemLoading: false,
            offset: offset + 9
        }))
    }

    onError = () => {
        this.setState({loading: false, error: true})
    }

    componentDidMount() {
        this.onRequest(888);
    }


    renderItems(arr) {
        const items =  arr.map((item, i) => {
            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }
            
            return (
                <li tabIndex={0}
                    className="char__item"
                    key={item.id}
                    ref={this.setRef}
                    onClick={() => {
                        this.props.onCharSelect(item.id);
                        this.focusOnItem(i);
                    }}
                    onKeyPress={(e) => {
                        if (e.key === ' ' || e.key === "Enter") {
                            this.props.onCharSelect(item.id);
                            this.focusOnItem(i);
                        }
                    }}>
                    <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                    <div className="char__name">{item.name}</div>
                </li>
            )
        });
        // А эта конструкция вынесена для центровки спиннера/ошибки
        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }

    render() {

        const {charList, loading, error, newItemLoading, offset} = this.state;
        
        const items = this.renderItems(charList);

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? items : null;

        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
                <button className="button button__main button__long"
                        disabled={newItemLoading}
                        onClick={() => this.onRequest(offset)}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;