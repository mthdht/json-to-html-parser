class JsonConverter {
    constructor() {
        this.json = {
            tag: "div",
            attributes: {
                class: "container"
            },
            children: [
                {
                    tag: "p",
                    attributes: {
                        id: "first"
                    },
                    children: [
                        {
                            tag: "span",
                            innerHtml: "bold"
                        },
                        {
                            innerHtml: "welcome"
                        },
                        {
                            tag:"span",
                            innerHtml: "italic"
                        }
                    ]
                },
                {
                    tag: "p",
                    innerHtml: "second"
                }
            ]
        }
    }
    convertToElement(element) {
        let stringStart, stringEnd

        if (Object.keys(element).indexOf('tag') == -1) {
            return element.innerHtml
        }

        if (Object.keys(element).indexOf('attributes') !== -1) {
            stringStart = "<" + element.tag + this.attributesParser(element.attributes) + ">"
        } else {
            stringStart = "<" + element.tag + ">"
        }
         
        stringEnd = "</" + element.tag + ">"

        if (Object.keys(element).indexOf('innerHtml') !== -1) {
            return stringStart + element.innerHtml + stringEnd
        }
        if (Object.keys(element).indexOf('children') !== -1) {
            element.children.forEach(subElement => {
                stringStart += this.convertToElement(subElement)
            });
        }
        return stringStart + stringEnd
    }
    attributesParser(attributes) {
        let attributesString = ""
        for (let attribute in attributes) {
            attributesString += " " + attribute + "=\"" + attributes[attribute] + "\""
        }
        return attributesString
    }

}

let test = new JsonConverter()
console.log(test.convertToElement(test.json))
//export default new JsonConverter()