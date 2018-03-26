import { baseSkills } from '../drd'

export default {
    props: ['character'],
    data() { return {
        SKILLS: baseSkills,
        currentSkill: undefined,
    }},
    computed: {
        skillLevels() {
            return this.character.skillLevels
                .slice()
                .sort((a,b) => b.level - a.level)
                .map(x => { return { name: x.name, level: x.level,
                    sections: [
                        { class: "levels", count: x.level },
                        { class: "remaining", count: 5 - x.level },
                    ],
                }})
        }
    },
    methods: {
        setCurrentSkill(ev) {
            this.currentSkill = ev.target.value
        },
        addSkill() {
            this.character.addSkill(this.currentSkill,
                Math.floor(Math.random() * 5) + 1)
        }
    },
}
