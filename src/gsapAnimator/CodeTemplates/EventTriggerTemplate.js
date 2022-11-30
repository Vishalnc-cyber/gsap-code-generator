
export const EventTriggerTemplate = (selectedOptions) => {
    // console.log(selectedOptions)
    let template = `window.addEventListener('${selectedOptions.selectedTriggerEvent}'), () => {
    var timeline1 = gsap.timeline({ 
        ${selectedOptions.targetElements && selectedOptions.targetElements.length > 0 ? targetElementTemplate(selectedOptions) : ""}
    })
    })`
    console.log(template)
    return template
}

export const targetElementTemplate = (ele) => {
    console.log(ele)
    let allgsap = ""
    ele.targetElements.forEach(e => {
        allgsap = `${e.selectedTween ? e.selectedTween : ""}` + `("${e.targetElementValue ? e.targetElementValue : ""}", 
        {${e.selectedAnimationProperty ? e.selectedAnimationProperty : ""} : ${e.animationValue ? e.animationValue : ""}})`
    })
    return allgsap

}