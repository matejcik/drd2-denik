import { coerce, RESOURCE_LABELS } from "../drd"

export default {
    props: ["sections"],
    methods: {
        click(type) {
            this.$emit(type)
        },
    },
}
