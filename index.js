//Simple library to call a function as callback when the scroll bar reaches the bottom of the scroll space of the container
//No dependencies
//Input params:
//  dropDownContainer: Dom Container that will have a VerticalScroll BAr
//  callback: function that will be called when the scroll bar reaches the bottom of the scrolling space 
//Return: undefined
//Usage:  let iLoader = new inifityScrollLoader(dropDownContainer, callback)

class inifityScrollLoader {

    constructor(dropDownContainer, callback) {
        this.callback = callback
        this.lastScrollTop = 0
        this.dropDownContainer = dropDownContainer
        this.dropDownContainer.scrollTop = 0;
        this.pixBeforeBottom = 20
        this.addListener()
    }

    shouldLoadNext = (domElements) => {

        //If this is a horizontal scroll return false
        if (this.lastScrollTop === domElements.scrollTop) { return false }

        //Remember last scroll position
        this.lastScrollTop = domElements.scrollTop

        let scrollHeight = domElements.scrollHeight
        let scrollTop = domElements.scrollTop
        let clientHeight = domElements.clientHeight
        if ((scrollHeight - scrollTop) - this.pixBeforeBottom <= clientHeight) {
            return true
        } else {
            return false
        }
    }

    addListener = () => {
        this.dropDownContainer.addEventListener('scroll', (event) => {
            if (this.shouldLoadNext(this.dropDownContainer)) {
                this.callback()
            }
        })
    }
}

export default inifityScrollLoader;