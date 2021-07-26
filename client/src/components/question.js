import React, { Component } from 'react';

export default class Question extends Component {

    constructor(props) {
        super(props);
       
        this.state = {
            ptmodels: [],
            levels: [],
            grammars: [],
        }
    }
    
    componentDidMount() {
        this.setState({ 
            ptmodels: ['Academic', 'Kids'],
            levels: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2' ],
            grammars: ['To be present tense', 'Personal and Adjective Pronoums', 'WH question - question words','Demonstrative and objective pronoums','Objective pronoums','Definite and indefinite articles','Present tense',
                'Prepositions','There be tenses and forms','Present continuous','Can/be able to - forms and tenses','Future tenses and forms','Countable and uncontable noums','How much/how many','Superlative of adjectives','Comparatives of adjectives','Modal verbs',
                'Imperatives','Past simple and past continuous','Prepositional phrases (place, time and movement)','Verb + infinitive','Conditionals tenses and forms','Use to and would - be used to - used to - get used to','Conjunctions','Passive voice tenses and forms',
                'Adverb clauses','Adverbs','Neither - either - so - nor - too - also','Verb + gerund','Past continous','Present perfect forms','Past perfect forms','Question tags','Relative clauses','Unreal conditionals','Reported speech','Phrasal verbs','Elipsis and elision','Subjunctive in noun cluases','Inversertions','Countable-uncontable noums and How much-how many','Comparatives of adjectives and Superlative of adjectives'],
                    
        });
    }

render() { 
    return (
        <div>
            <div className="row">
                <div className="col-sm">
                    <div className="form-group"> 
                        <label>Placement Test Model </label>
                        <select ref="userInput" name="ptmodel" required className="form-control" value={this.props.ptmodel} onChange={this.props.onChange} >
                            {this.state.ptmodels.map(function(ptmodel) { return <option key={ptmodel} value={ptmodel}>{ptmodel} </option>;})}
                        </select>
                    </div>
                </div>
                <div className="col-sm">
                    <div className="form-group"> 
                        <label>Grammar: </label>
                        <select ref="userInput2" name="grammar" required className="form-control" value={this.props.grammar} onChange={this.props.onChange} >
                            {this.state.grammars.map(function(grammar) { return <option key={grammar} value={grammar}>{grammar} </option>;})}
                        </select>
                    </div>
                </div>                                
            </div>
            <div className="row">
                
                <div className="col-md-6">
                    <div className="form-group"> 
                        <label>Name: </label>
                        <input type="text" name="name" required className="form-control" value={this.props.name} onChange={this.props.onChange} />
                    </div>
                </div>
                <div className="col-sm">
                    <div className="form-group"> 
                        <label>Order: </label>
                        <input type="text" name="order" required className="form-control" value={this.props.order} onChange={this.props.onChange} />
                    </div>
                </div>
                <div className="col-sm">
                    <div className="form-group"> 
                        <label>Level: </label>
                        <select ref="userInput3" name="level" required className="form-control" value={this.props.level} onChange={this.props.onChange} >
                                {this.state.levels.map(function(level) { return <option key={level} value={level}>{level} </option>;})}
                        </select>
                    </div>
                </div>
                <div className="col-sm">
                    <div className="form-group"> 
                        <label>Timer: </label>
                        <input type="text" name="timer" required className="form-control" value={this.props.timer} onChange={this.props.onChange} />
                    </div>
                </div>
            </div>                
            
        </div>
    )
  }
}

















