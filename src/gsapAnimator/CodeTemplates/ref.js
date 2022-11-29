window.addEventListener("load", () => {
    // Register the ScrollTrigger plugin
    // gsap.registerPlugin(ScrollTrigger);

    // Split the text
    function toAndFromSplitHandler(tl, tween, element, animObj, delay, splitBy) {
        console.log(tween, splitBy, animObj, delay);
        if (tween === "from") {
            if (splitBy) {
                element.forEach((el) => {
                    const splitText = new SplitType(el);
                    gsap.set(el, { autoAlpha: 1 });
                    // if (delay) return tl.from(splitText[splitBy], animObj, delay);
                    // if(splitBy)
                    return tl.from(splitText[splitBy], animObj, delay);
                });
            } else return tl.from(element, animObj, delay);
        }
        if (tween === "to") {
            element.forEach((el) => {
                const splitText = new SplitType(el);
                gsap.set(el, { autoAlpha: 1 });
                if (delay) return tl.to(splitText[splitBy], animObj, delay);
                else return tl.to(splitText[splitBy], animObj);
            });
        }
        if (tween === "fromTo") {
            element.forEach((el) => {
                const splitText = new SplitType(el);
                gsap.set(el, { autoAlpha: 1 });
                if (delay)
                    return tl.fromTo(splitText[splitBy], animObj[0], animObj[1], delay);
                else return tl.fromTo(splitText[splitBy], animObj[0], animObj[1]);
            });
        }
    }
    function fromToSplitHandler(tl, tween, element, animObj, delay, splitBy) {
        console.log(animObj);
        if (splitBy) {
            element.forEach((el) => {
                const splitText = new SplitType(el);
                gsap.set(el, { autoAlpha: 1 });
                if (delay)
                    return tl.fromTo(splitText[splitBy], animObj[0], animObj[1], delay);
                else return tl.fromTo(splitText[splitBy], animObj[0], animObj[1]);
            });
        } else return tl.fromTo(element, animObj[0], animObj[1]);
    }

    // read me
    // Define text divisions
    // create animation object
    // create a gsap timeline
    // call function e.g. toAndFromSplitHandler(timeline, tween, target-Element, split-by, animation object);
    // types of parameters -->  timeline -> variable, tween -> string, target-Element -> variable,split-by -> string, animation object -> object variable
    const textElements = document.querySelectorAll('[data-wb="head"]');
    const textPara = document.querySelectorAll('[data-wb="para"]');
    const buttons = document.querySelectorAll('[data-wb="cta"]');
    const testimonyLogo = document.querySelectorAll('[data-wb="logo"]')

    let fromToObj = [{ y: "0%" }, { y: "100%" }];
    let animObj = {
        rotation: 6,
        transformOrigin: "left 50%"
    };
    let paraObj = {
        //Made Default//
    };

    let buttonObj = {
        //Made Default//
    };

    let testimonyObj = {
        //Made Default//
    };

    var tl = gsap.timeline({
        defaults: {
            ease: "expo.out",
            autoAlpha: 0,
            duration: 1,
            y: "100%",
            stagger: {
                each: 0.1
            }
        }
    });

    toAndFromSplitHandler(tl, "from", textElements, animObj, "", "chars");
    toAndFromSplitHandler(tl, "from", textPara, paraObj, "<1.2", "lines");
    toAndFromSplitHandler(tl, "from", buttons, buttonObj, "<0.5", "");
    toAndFromSplitHandler(tl, "from", testimonyLogo, testimonyObj, "<0.5", "");
});