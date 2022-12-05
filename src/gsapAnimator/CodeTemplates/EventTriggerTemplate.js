export const EventTriggerTemplate = (selectedOptions) => {

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
        tweenArray = targetElementTemplate(selectedOptions.targetElements)
        gsaptweenLines = tweenArray.join("\n")
        // console.log(gsaptweenLines)
        // if (selectedOptions.targetElements.animations.length > 0) {
        // for (let i = 0; i < selectedOptions.targetElements.length; i++)
        animationArray = generateAnimationsObject(selectedOptions.targetElements)
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

export const targetElementTemplate = (elements) => {
    // console.log(elements)
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

export const generateAnimationsObject = (targets) => {
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
            console.log(target.animationObjectFull)
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