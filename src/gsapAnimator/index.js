import '../App.css';
import { Editor } from './Editor';
import EventDiv from './EventDiv';
import React, { Component } from 'react'
import { EventTriggerTemplate } from "./CodeTemplates/EventTriggerTemplate.js"

export class GsapAnimator extends Component {
    constructor(props) {
        super(props)

        this.state = {
            code: "",
            selectedTriggerEvent: "",
            targetElementValue: "",
            selectedOptions: { id: 1, timeLine: false },
            targetElements: new Map()
            // targetElementSelected:false
        }
    }
    eventHandler = (e, name) => {
        console.log(e.target.value, name)
        const { value } = e.target
        let selectedOptions = { ...this.state.selectedOptions }
        selectedOptions[name] = value
        this.setState({
            [name]: value,
            selectedOptions
        })
        // if (name === "selectedTriggerEvent") {
        selectedOptions.timeLine = true
        this.setState({
            code: EventTriggerTemplate(selectedOptions)
        })

        // }
        // console.log(selectedOptions)
    }
    render() {
        // console.log(this.state.selectedOptions)
        return (
            <div className="App">
                <div className='event-container'>
                    <EventDiv {...this.state} {...this.props}
                        eventHandler={this.eventHandler} />
                    <Editor {...this.state} {...this.props}
                        placeHolder="Your code will appear here"
                        eventHandler={this.eventHandler} />
                </div>
            </div>
        )
    }
}

export default GsapAnimator