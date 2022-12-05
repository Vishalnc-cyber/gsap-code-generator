import '../App.css';
import { Editor } from './Editor';
import EventDiv from './EventDiv';
import React, { Component } from 'react'
// import { EventTriggerTemplate } from "./CodeTemplates/EventTriggerTemplate.js"

export class GsapAnimator extends Component {
    constructor(props) {
        super(props)

        this.state = {
            code: "",
            tweenCode: "",
            selectedTriggerEvent: "",
            targetElementValue: "",
            selectedOptions: { id: 1, timeLine: false },
            targetElements: [],
        }
    }

    EventTriggerTemplate = (selectedOptions) => {
        console.log("called")
        let EventSelectTemplate = `window.addEventListener('${selectedOptions.selectedTriggerEvent}', () => {`
        let EventSelectTemplateEnd = `})`
        let TimelineTemplate = `var timeline1 = gsap.timeline({ `
        let TimelineTemplateEnd = `})`
        let tweenArray = []
        let gsaptweenLines = ""
        let gsaptweenLinesEnd = ")"
        let animationArray = []
        let animationObjects = ""

        if (selectedOptions.targetElements) {
            tweenArray = this.targetElementTemplate(selectedOptions.targetElements)
            gsaptweenLines = tweenArray.join("\n")
            // console.log(gsaptweenLines)
            // if (selectedOptions.targetElements.animations.length > 0) {
            // for (let i = 0; i < selectedOptions.targetElements.length; i++)
            animationArray = this.generateAnimationsObject(selectedOptions.targetElements)
            // animationObjects = animationArray.join("\n")
            // console.log(animationArray)
            // }
        }
        // let template = `${selectedOptions.selectedTriggerEvent
        //     ? EventSelectTemplate + "\n" +
        //     TimelineTemplate + "\n" + gsaptweenLines + "\n" + TimelineTemplateEnd + "\n" +
        //     EventSelectTemplateEnd : ""}`
        console.log()
        return {
            EventSelectTemplate, animationArray, TimelineTemplate, gsaptweenLines
        }
    }

    targetElementTemplate = (elements) => {
        console.log(elements)
        let elementArray = []
        elements.forEach((element, i) => {
            if (element.selectedTween && element.targetElementValue) {
                console.log("1")
                elementArray[i] = (`${i === 0 ? "timeline1" : ""}.${element.selectedTween}("${element.targetElementTypeValue === "class"
                    ? "." : element.targetElementTypeValue === "ID" ? "#"
                        : ""}${element.targetElementValue}",\n )`)
            } else
                if (element.selectedTween) {
                    console.log("2")
                    elementArray[i] = (`${i === 0 ? "timeline1" : ""}.${element.selectedTween}("${element.targetElementTypeValue === "class"
                        ? "." : element.targetElementTypeValue === "ID" ? "#"
                            : ""}",\n )`)
                }

        });
        // console.log(elementArray)
        return elementArray

    }

    generateAnimationsObject = (targets) => {
        // console.log("called!!!!!!!!!!!!", targets)
        let animationArray = []
        if (targets && targets.length > 0)
            targets.forEach((target, i) => {
                target.animations.forEach((animation, j) => {
                    if (animation.selectedAnimationProperty && animation.animationValue) {
                        animation.animationObject = `${animation.selectedAnimationProperty} : ${animation.animationValue}`

                    } else if (animation.selectedAnimationProperty) {
                        animation.animationObject = `${animation.selectedAnimationProperty} : `
                    }
                })
                // ${ j === target.animations.length - 1 ? ")" : "," }
                // console.log(target.animations)
                target.animationObjectFull = ""


            })
        if (targets && targets.length > 0)
            targets.forEach((target, i) => {
                target.animationObjectFull = ""
                target.animations.forEach((animation, j) => {

                    target.animationObjectFull = target.animationObjectFull.concat(animation.animationObject, "\n")
                    target.animationObjectFull = target.animationObjectFull.split("\n").join("\n")
                    // console.log(target.animationObjectFull)
                })
            })
        // console.log(targets)
        return targets
        // return targets
    }


    generateCode = (selectedOptions, target) => {
        let codeObject = this.EventTriggerTemplate(selectedOptions)
        console.log()

        let code = ""
        code = `${codeObject.EventSelectTemplate}
        ${codeObject.TimelineTemplate}
        ${this.state.tweenCode} 
        })
    })
        `
        // console.log(code)
        this.setState({
            code
        })
    }

    handleTargetElementCode = (selectedOptions, target, i) => {
        // console.log(selectedOptions, target)
        let tweenCode = ""
        if (target.selectedTween && target.targetElementValue) {
            console.log("1")
            tweenCode = (`${i === 0 ? "timeline1" : ""}.${target.selectedTween}("${target.targetElementTypeValue === "class"
                ? "." : target.targetElementTypeValue === "ID" ? "#"
                    : ""}${target.targetElementValue}",  `)
        } else if (target.selectedTween) {
            console.log("2")
            tweenCode = (`${i === 0 ? "timeline1" : ""}.${target.selectedTween}("${target.targetElementTypeValue === "class"
                ? "." : target.targetElementTypeValue === "ID" ? "#"
                    : ""}",  `)
        }

        // });
        target.animations.forEach((animation, j) => {
            if (animation.selectedAnimationProperty && animation.animationValue) {
                animation.animationObject = `${animation.selectedAnimationProperty} : ${animation.animationValue}`

            } else if (animation.selectedAnimationProperty) {
                animation.animationObject = `${animation.selectedAnimationProperty} : `
            }
        })
        target.animationObjectFull = ""
        target.animations.forEach((animation, j) => {

            target.animationObjectFull = target.animationObjectFull.concat(j === 0 ? "{" : "", animation.animationObject, j === target.animations.length - 1 ? "})" : ",", "\n")
            target.animationObjectFull = target.animationObjectFull.split("\n").join("\n")
            // console.log(target.animationObjectFull)
            // console.log(target.animationObjectFull)
        })
        // ${ j === target.animations.length - 1 ? ")" : "," }

        target.tweenCode = tweenCode + target.animationObjectFull
        // console.log(target.tweenCode)
        // target.animationObjectFull = ""
        this.handleTweenCode()
    }
    handleTweenCode = () => {
        console.log(this.state.selectedOptions.targetElements)
        let tweenCodeArray = []
        let tweenCode = ""
        this.state.selectedOptions.targetElements.forEach((target, i) => {
            tweenCodeArray[i] = target.tweenCode
        })
        console.log(tweenCodeArray)
        console.log(tweenCodeArray.join("\n"))
        tweenCode = tweenCodeArray.join("\n")
        console.log(tweenCode)
        this.setState({
            tweenCode
        }, () => this.generateCode(this.state.selectedOptions))
    }
    handleAddMoreTargetElementButtonClick = () => {
        // console.log("added")
        let targetElements = [...this.state.targetElements]
        let selectedOptions = { ...this.state.selectedOptions }
        // targetElements.splice(index, 1)

        targetElements.push({
            selectedTween: null, targetElementValue: null,
            animations: [{ selectedAnimationProperty: null, animationValue: null, animationObject: "" }],
            targetElementTypeValue: null,
            animationObjectFull: "",
            tweenCode: []
        })
        selectedOptions.targetElements = targetElements
        // console.log(targetElements)
        this.setState({
            targetElements,
            selectedOptions
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
        }, () => console.log("here"))
        this.generateCode(selectedOptions)
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
        // this.setState({
        this.generateCode(selectedOptions)
        // }, () => console.log("here"))

        // }
        // console.log(selectedOptions)
    }

    handleTargetElementEvents = (e, index, name, j) => {
        // console.log(e.target.value, index, name)
        let targetElements = [...this.state.targetElements]
        let selectedOptions = { ...this.state.selectedOptions }
        targetElements[index][name] = e.target.value
        selectedOptions.targetElements = targetElements
        // console.log(EventTriggerTemplate(selectedOptions))
        // console.log(targetElements[index][name])
        this.setState({
            targetElements,
            selectedOptions,
        }, () => console.log("here"))
        selectedOptions.targetElements.forEach((target, i) => {
            this.handleTargetElementCode(selectedOptions, target, i)
        })
        // this.generateCode(selectedOptions)
    }

    handleAnimationObjectValueChange = (e, index, name, j) => {
        // console.log(e.target.value, index, name)
        let targetElements = [...this.state.targetElements]
        let selectedOptions = { ...this.state.selectedOptions }
        console.log(selectedOptions)
        targetElements[index].animations[j][name] = e.target.value
        selectedOptions.targetElements = targetElements
        this.setState({
            targetElements,
            selectedOptions,
        }, () => console.log("here"))
        selectedOptions.targetElements.forEach((target, i) => {
            this.handleTargetElementCode(selectedOptions, target, i)
        })
    }
    handleAddMoreAnimationObject = (e, index) => {
        // console.log(e.target.value, index)
        let targetElements = [...this.state.targetElements]
        // console.log(targetElements)
        targetElements[index].animations.push({ selectedAnimationProperty: null, animationValue: null, animationObject: "" })
        this.setState({
            targetElements,
            // code: EventTriggerTemplate(selectedOptions)
        })
        this.state.selectedOptions.targetElements.forEach((target, i) => {
            this.handleTargetElementCode(this.state.selectedOptions, target, i)
        })
    }

    handleDeleteAnimationObject = (e, index, j) => {
        // console.log(e.target.value, index, j)
        let targetElements = [...this.state.targetElements]
        targetElements[index]?.animations.splice(j, 1)
        // console.log(newArray)
        // let animationArray = [...this.state.targetElements]
        // animationArray.animations = newArray
        // console.log(animationArray)
        this.setState({
            targetElements,
            // code: EventTriggerTemplate(selectedOptions)
        })
    }
    render() {
        // console.log(this.state)
        return (
            <div className="App">
                <div className='event-container'>
                    <EventDiv {...this.state} {...this.props}
                        eventHandler={this.eventHandler}
                        handleAddMoreTargetElementButtonClick={this.handleAddMoreTargetElementButtonClick}
                        handleDeleteTargetElement={this.handleDeleteTargetElement}
                        handleTargetElementEvents={this.handleTargetElementEvents}
                        handleAddMoreAnimationObject={this.handleAddMoreAnimationObject}
                        handleDeleteAnimationObject={this.handleDeleteAnimationObject}
                        handleAnimationObjectValueChange={this.handleAnimationObjectValueChange}
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