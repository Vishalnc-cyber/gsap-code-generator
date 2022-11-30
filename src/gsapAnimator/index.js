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
            targetElements: [
                // {
                //     selectedTween: null, targetElementValue: null,
                //     selectedAnimationProperty: null, animationValue: null
                // }
            ]
            // targetElementSelected:false
        }
    }
    handleAddMoreTargetElementButtonClick = () => {
        // console.log("added")
        let targetElements = [...this.state.targetElements]
        targetElements.push({
            selectedTween: null, targetElementValue: null,
            selectedAnimationProperty: null, animationValue: null
        })
        // console.log(targetElements)
        this.setState({
            targetElements
        })
    }

    handleDeleteTargetElement = (e, index) => {
        let targetElements = [...this.state.targetElements]
        let selectedOptions = { ...this.state.selectedOptions }
        targetElements.splice(index, 1)
        selectedOptions.targetElements = targetElements
        this.setState({
            targetElements,
            selectedOptions,
            code: EventTriggerTemplate(selectedOptions)
        })
    }
    eventHandler = (e, name) => {
        // console.log(e.target.value, name)
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

    handleTargetElementEvents = (e, index, name) => {
        // console.log(e, index, name)
        let targetElements = [...this.state.targetElements]
        let selectedOptions = { ...this.state.selectedOptions }
        targetElements[index][name] = e.target.value
        selectedOptions.targetElements = targetElements
        // console.log(EventTriggerTemplate(selectedOptions))
        // console.log(strings)
        this.setState({
            targetElements,
            code: EventTriggerTemplate(selectedOptions)
        })
    }
    render() {
        // console.log(this.state.targetElements)
        return (
            <div className="App">
                <div className='event-container'>
                    <EventDiv {...this.state} {...this.props}
                        eventHandler={this.eventHandler}
                        handleAddMoreTargetElementButtonClick={this.handleAddMoreTargetElementButtonClick}
                        handleDeleteTargetElement={this.handleDeleteTargetElement}
                        handleTargetElementEvents={this.handleTargetElementEvents}
                    />
                    <Editor {...this.state} {...this.props}
                        placeHolder="Your code will appear here"
                        eventHandler={this.eventHandler} />
                </div>
            </div>
        )
    }
}

export default GsapAnimator