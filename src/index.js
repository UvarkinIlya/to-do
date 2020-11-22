import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './main.scss';


class Item extends Component{
    render(){
        const key = this.props.key; 
        //const children_done = this.props.children_done;
        let className;

        if(this.props.done){
            className = 'done';
        }

        return(
            <li className="list-group-item">
                <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-justify drag" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M2 12.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>
                </svg>

                <input type='checkbox' className='business' onChange={() => this.props.onChange()}/>
                <p className={className}>{this.props.text} </p>

                <div class="close-container">
                    <div class="leftright"></div>
                    <div class="rightleft"></div>
                </div>
            </li>
        );
    }
}

class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            num_children: 0,
            children: [],
            children_done: [],
            children_text: [],
            input_value: '',
        }
    }

    upgradeInputValue(event){
        this.setState({
            input_value: event.target.value,
        });
    }

    done(key){
        const child_done = this.state.children_done;
        child_done[key] = !child_done[key];

        this.setState(state =>{
            return{
                children_done: child_done,
            }
        })
    }

    add_item = (event) => {
        if(event.key !== "Enter"){
            return;
        }

        this.setState(state => {
            const key = this.state.num_children;
            const list = state.children.concat(<Item 
                                                key={key}
                                                children_done={this.state.children_done}
                                                text={this.state.input_value} 
                                                onChange={() => this.done(key)}/>);
            const list_done = state.children_done.concat(false);
            const list_text = state.children_text.concat(this.state.input_value);
            return {
                //children: list,
                children_done: list_done,
                children_text: list_text,
                num_children: this.state.num_children + 1,
                input_value: '',
            }
        });
    }

    renderList(){
        const list = [];
        for(let i = 0; i < this.state.num_children; i++){
            list.push(<Item
                        key={i}
                        text={this.state.children_text[i]}
                        done={this.state.children_done[i]}
                        onChange={() => this.done(i)}/>);
        }

        return list;
    }

    render(){
        let children = this.state.children;

        return(
            <div className='main-container'>
                <input 
                    type="text" className="form-control" placeholder="Что нужно сделать?"
                    value={this.state.input_value} 
                    onKeyPress={this.add_item}
                    onChange={event => this.upgradeInputValue(event)}
                />
                {this.renderList()}
            </div>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById('root'));