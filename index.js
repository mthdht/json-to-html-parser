class JsonConverter {
    constructor() {
        this.selfClosingTags = ["area", "base", "br", "col", "command", "embed", "hr", "img", "input", "keygen", "link", "meta", "param", "source", "track", "wbr"],
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
        if (Object.keys(element).indexOf('tag') == -1) {
            return element.innerHtml
        }

        if (Object.keys(element).indexOf('innerHtml') !== -1) {
            return this.getStart(element) + element.innerHtml + this.getEnd(element)
        }

        if (Object.keys(element).indexOf('children') !== -1) {
            let string = ""
            element.children.forEach(subElement => {
                string += this.convertToElement(subElement)
            });
            return this.getStart(element) + string + this.getEnd(element)
        }
        return this.getStart(element) + this.selfClosingTags.indexOf(element.tag) == -1 ? this.getEnd(element) : '' 
    }
    attributesParser(attributes) {
        let attributesString = ""
        for (let attribute in attributes) {
            attributesString += " " + attribute + "=\"" + attributes[attribute] + "\""
        }
        return attributesString
    }
    getStart(element) {
        let start
        if (Object.keys(element).indexOf('attributes') !== -1) {
             return start = "<" + element.tag + this.attributesParser(element.attributes) + ">"
        } else {
             return start = "<" + element.tag + ">"
        }
    }
    getEnd(element) {
        return "</" + element.tag + ">"
    }

}

let test = new JsonConverter()
console.log(test.convertToElement(test.json))
//export default new JsonConverter()