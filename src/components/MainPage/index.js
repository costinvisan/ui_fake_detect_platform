import React, { Component } from 'react';
import NavigationHeader from '../NavigationHeader'
import SearchBar from '../SearchBar'
import './style.scss'
import ArticlesComparison from '../ArticlesComparison';

class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value_response: null
        }
    }

    parentFunction = (data_from_child) => {
        this.setState({ value_response: JSON.parse(data_from_child) });
    }

    render() {
        return (
            <div>
                <NavigationHeader />
                <div className='body'>
                    <div className='searchbar'>
                        <SearchBar functionCallFromParent={this.parentFunction.bind(this)} />
                    </div>
                    {this.state.value_response != null ? <ArticlesComparison articleComparison={this.state.value_response} /> : <div></div>}
                </div>
            </div>
        );
    };
}

export default MainPage;
