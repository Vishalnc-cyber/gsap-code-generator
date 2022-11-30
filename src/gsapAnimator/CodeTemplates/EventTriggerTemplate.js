import { useState } from "react"

export const EventTriggerTemplate = (selectedOptions) => {
    // const [state, setState] = useState({
    //     EventSelectTemplate: `window.addEventListener('${selectedOptions.selectedTriggerEvent}', () => {`,
    //     EventSelectTemplateEnd: `})`,
    //     TimelineTemplate: `var timeline1 = gsap.timeline({ `,
    //     TimelineTemplateEnd: `})`,
    //     gsaptweenLines: ``,
    //     tweenArray: [],

    // })

    let EventSelectTemplate = `window.addEventListener('${selectedOptions.selectedTriggerEvent}', () => {`
    let EventSelectTemplateEnd = `})`
    let TimelineTemplate = `var timeline1 = gsap.timeline({ `
    let TimelineTemplateEnd = `})`
    let tweenArray = []
    let gsaptweenLines = ""

    if (selectedOptions.targetElements) {
        tweenArray = targetElementTemplate(selectedOptions.targetElements)

        gsaptweenLines = tweenArray.join("\n")

    }
    let template = `${selectedOptions.selectedTriggerEvent
        ? EventSelectTemplate + "\n" + gsaptweenLines + "\n" + EventSelectTemplateEnd : ""}`
    // console.log(template)
    return template
}

export const targetElementTemplate = (elements) => {
    // console.log(elements)
    let elementArray = []

    elements.forEach((element, i) => {
        if (element.selectedTween && element.targetElementValue
            && element.selectedAnimationProperty && element.animationValue) {
            console.log("1")
            elementArray[i] = (`${i === 0 ? "timeline1" : ""}.${element.selectedTween}("${element.targetElementValue}", { ${element.selectedAnimationProperty} : ${element.animationValue} })`)
        } else
            if (element.selectedTween && element.targetElementValue && element.selectedAnimationProperty) {
                console.log("2")
                elementArray[i] = (`${i === 0 ? "timeline1" : ""}.${element.selectedTween}("${element.targetElementValue}", { ${element.selectedAnimationProperty} : })`)
            } else
                if (element.selectedTween && element.targetElementValue) {
                    console.log("3")
                    elementArray[i] = (`${i === 0 ? "timeline1" : ""}.${element.selectedTween}("${element.targetElementValue}", { })`)
                } else
                    if (element.selectedTween) {
                        console.log("4")
                        elementArray[i] = (`${i === 0 ? "timeline1" : ""}.${element.selectedTween}()`)
                    }


    });
    // console.log(elementArray)
    return elementArray

}