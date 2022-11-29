
export const EventTriggerTemplate = (selectedOptions) => {
    return `window.addEventListener('${selectedOptions.selectedTriggerEvent}'), () => {
    ${selectedOptions.timeLine ? TimeLineGenerator(selectedOptions) : ""}
    })`
}

const TimeLineGenerator = (selectedOptions) => {
    console.log(selectedOptions)
    return `var timeline1 = gsap.timeline({ 
        ${selectedOptions.targetElementValue
            && selectedOptions.selectedTween
            && selectedOptions.selectedAnimationProperty
            && selectedOptions.animationValue ? targetElementTemplate(selectedOptions) : ""}
     })`
}

export const targetElementTemplate = (selectedOptions) => {
    console.log(selectedOptions)
    return `.${selectedOptions.selectedTween}("${selectedOptions.targetElementValue}",{${selectedOptions.selectedAnimationProperty} : ${selectedOptions.animationValue}})`
}