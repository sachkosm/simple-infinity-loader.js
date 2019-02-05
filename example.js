
import React, { Component } from 'react';
import inifityScrollLoader from "../infinity-scroll-loader";
export default class Parent extends React.Component {

    constructor(props) {
        super(props);
        let partObj = this.partitionArray(this.props.fields)
        this.partitionSugestions = partObj.newArray
        this.maxParts = partObj.maxParts
        this.lastLoadedPart = 0
    }

    partitionArray = (arr) => {
        let partSize = 500
        let currPartSize = partSize
        let newArray = []
        let tempArray = []
        let i, j
        for (i = 0, j = 0; i < arr.length; i++) {
            if (i > currPartSize) {
                newArray[j] = tempArray
                tempArray = []
                j++
                currPartSize = currPartSize + partSize
            }
            tempArray.push(arr[i])
        }
        newArray[j] = tempArray
        return { newArray, maxParts: j }
    }

    loadMoreSuggestions = () => {
        if (this.state.fieldValue !== '*') { return false }
        if (this.lastLoadedPart < this.maxParts) {
            this.lastLoadedPart++
            this.setState((prevState) => {
                let combinedArr = prevState.suggestions.concat(this.partitionSugestions[this.lastLoadedPart])
                return { suggestions: combinedArr }
            })
        }
    }

    render() {
        return (

            <FieldSelector loadMoreSuggestions={this.loadMoreSuggestions} />

        )
    }



}


class FieldSelector extends React.Component {

    constructor(props) {
        super(props)

        this.fieldSelectorRef = React.CreateRef()

    }

    componentDidMount() {
        let dropDownContainer = this.fieldSelectorRef
        this.iLoader = new inifityScrollLoader(dropDownContainer, this.props.loadMoreSuggestions)
    }

    componentWillUnmount() {
        this.iLoader.removeListener()
    }

    render() {
        return (
            <Field ref={this.fieldSelectorRef} />
        )
    }
}
