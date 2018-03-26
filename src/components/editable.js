export default {
    props: ['value', 'textarea', 'editable'],
    computed: {
        isTextarea() {
            return this.textarea != undefined
        },
    },
    methods: {
        update(ev) {
            this.$emit('input', ev.target.value)
        },
    }
}
