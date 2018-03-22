import Vue from 'vue'

import pugIndex from '../pug/index.pug'

function filterCreateElement(h) {
    return function(elem, attrs, children) {
        let data = {
            style: attrs.style,
            class: attrs.class,
            attrs,
            on: {},
            props: {},
        }

        for (let key in attrs) {
            if (key.startsWith("on")) {
                let evkey = key.replace(/^on/, "")
                data.on[evkey] = attrs[key]
                delete attrs[key]
            }
        }
        return h(elem, data, children)
    }
}

function pugTemplate(tmpl) {
    return function(h) {
        h = filterCreateElement(h)
        let nodes = tmpl(this, h)
        if (nodes.length > 1) {
            throw "More than one root node for component"
        }
        return nodes[0]
    }
}

new Vue({
    el: '#app',
    render: pugTemplate(pugIndex),
    data() { return { hello: "ahoj babi" }},
    methods: {
        click() {
            console.log("jak se máš")
            this.hello = "jak se máš"
        },
    },
})
