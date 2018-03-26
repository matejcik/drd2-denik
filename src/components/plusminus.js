export default {
    props: ['value'],
    methods: {
        increase() { this.$emit('input', this.value + 1) },
        decrease() { this.$emit('input', this.value - 1) },
        set(ev) { this.$emit('input', ev.target.value) },
    }
}
