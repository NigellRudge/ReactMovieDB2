import React from 'react';
import {media_url} from '../utils/config';

export default class ShowCard extends React.Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }

    render(){
        return (
            <div className="mt-8">
                <a href="#">
                    <img src={ media_url + this.props.show.poster_path} alt="picture"
                         className="hover:opacity-75 transition ease-in-out duration-150" />
                </a>
                <div className="mt-2">
                    <a href="#"
                       className="text-lg mt-2 hover:text-gray-300">{this.props.show.title}</a>
                    <div className="flex items-center text-gray-400 text-sm mt-1">
                        <svg className="fill-current text-orange-500 w-4" viewBox="0 0 24 24">
                            <g data-name="Layer 2">
                                <path
                                    d="M17.56 21a1 1 0 01-.46-.11L12 18.22l-5.1 2.67a1 1 0 01-1.45-1.06l1-5.63-4.12-4a1 1 0 01-.25-1 1 1 0 01.81-.68l5.7-.83 2.51-5.13a1 1 0 011.8 0l2.54 5.12 5.7.83a1 1 0 01.81.68 1 1 0 01-.25 1l-4.12 4 1 5.63a1 1 0 01-.4 1 1 1 0 01-.62.18z"
                                    data-name="star"/>
                            </g>
                        </svg>
                        <span className="ml-1">{ this.props.show.vote_average} %</span>
                        <span className="mx-2">|</span>
                        <span>{ this.props.show.date} </span>
                    </div>
                    <div className="text-gray-400 text-sm">
                        <span className="ml-1">Action, Adventure</span>
                    </div>
                </div>
            </div>
        );
    }
}
