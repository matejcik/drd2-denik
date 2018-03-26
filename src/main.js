import Vue from 'vue'

import appTmpl from './components/app.pug'
import vuePug, { pugTemplate } from './vue-pug'
import { Character, Resource } from "./drd"

import './styles/drd.styl'

vuePug("blocks")
vuePug("editable")
vuePug("plusminus")
vuePug("resource")
vuePug("skills")
vuePug("character")

let Storage = window.localStorage
let charJSON = Storage.getItem("character")
let character
if (charJSON) {
    character = Character.fromJSON(charJSON)
} else {
    character = new Character()
}

window.character = character

let App = Vue.component('App', {
    render: pugTemplate(appTmpl),
    data() { return { character }},
    computed: {
        serial() { return JSON.stringify(this.character) }
    },
    watch: {
        serial(val) {
            Storage.setItem("character", val)
        },
    },
})

new Vue({
    el: '#app',
    render: h => h(App),
})
