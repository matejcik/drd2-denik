import { coerce, RESOURCE_LABELS } from "../drd"

export default {
    props: ["resource", "editable"],
    computed: {
        sections() {
            let consumedCnt = this.resource.currentLimit - this.resource.available
            let scarredCnt = this.resource.limit - this.resource.currentLimit
            return [
                { class: "available", count: this.resource.available },
                { class: "consumed", count: consumedCnt },
                { class: "scarred", count: scarredCnt },
            ]
        },
        label() {
            return RESOURCE_LABELS[this.resource.type]
        },
    },
    methods: {
        consume() { this.resource.available-- },
        replenish() { this.resource.available++ },
        updateLimit(n) { this.resource.limit = n },
        addscar() { this.resource.addScar(1,"bla") },
    },
}
