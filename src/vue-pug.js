import Vue from "vue"
import "pug-vdom/runtime"

function handleModel(elem, properties, ctx, model, attrs, data) {
    let value = eval(`ctx.${model}`)
    let type = properties.attributes.type
    if (elem == "input") {
        if (type == "checkbox") {
            attrs.checked = Boolean(value)
            let handler = ev => eval(`ctx.${model} = ev.target.checked`)
            data.on.input = handler
            data.on.change = handler
            return
        } else if (type == "select") {
            throw "TODO"
        } else if (type == "radio") {
            throw "TODO"
        }
    }

    attrs.value = value
    data.on.input = ev => {
        let val = ev
        if (ev instanceof Event)
            val = ev.target.value
        eval(`ctx.${model} = val`)
    }
}

function filterCreateElement(h, ctx) {
    return function(elem, properties, children) {
        let attrs = {}
        let data = {
            on: {},
            attrs: attrs,
            props: attrs,
        }

        for (let key in properties.attributes) {
            let val = properties.attributes[key]
            if (key.startsWith("@")) {
                let evkey = key.replace(/^@/, "")
                data.on[evkey] = val
            } else if (key == "$model") {
                handleModel(elem, properties, ctx, val, attrs, data)
            } else if (key == "$raw") {
                data.domProps = { innerHTML: val }
            } else if (key == "style") {
                data.style = val
            } else if (key == "class") {
                data.class = val
            } else {
                attrs[key] = val
            }
        }

        return h(elem, data, children)
    }
}

export function pugTemplate(tmpl) {
    return function(h) {
        h = filterCreateElement(h, this)
        let nodes = tmpl(this, h)
        if (nodes.length > 1) {
            throw "More than one root node for component"
        }
        return nodes[0]
    }
}

export default function(name) {
    let tmpl = require(`./components/${name}.pug`)
    let options = require(`./components/${name}.js`).default
    options.render = pugTemplate(tmpl)
    return Vue.component(name, options)
}
