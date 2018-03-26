export function coerce(value, min, max) {
    if (value < min) return min
    if (value > max) return max
    return value
}

export const baseSkills = ["Bojovník", "Lovec", "Zaříkávač", "Mastičkář", "Kejklíř"]
export const advancedSkillsByName = {
    "Válečník":   ["Bojovník", "Kejklíř"],
    "Hraničář":   ["Bojovník", "Lovec"],
    "Vědmák":     ["Bojovník", "Mastičkář"],
    "Čaroděj":    ["Bojovník", "Zaříkávač"],
    "Šaman":      ["Lovec", "Mastičkář"],
    "Druid":      ["Lovec", "Zaříkávač"],
    "Zvěd":       ["Lovec", "Kejklíř"],
    "Alchymista": ["Zaříkávač", "Mastičkář"],
    "Mág":        ["Zaříkávač", "Kejklíř"],
}

export const advancedSkillsByBase = {}
for (let skill of baseSkills) advancedSkillsByBase[skill] = {}

for (let skill in advancedSkillsByName) {
    let [a, b] = advancedSkillsByName[skill]
    advancedSkillsByBase[a][b] = skill
    advancedSkillsByBase[b][a] = skill
}

export const RESOURCE_LABELS = {
    telo: "Tělo",
    duse: "Duše",
    vliv: "Vliv",
}

export class Resource {
    constructor(type, limit, available) {
        this.type = type
        this._limit = limit
        this._available = available || limit
        this.scars = []
    }

    get currentLimit() {
        let scarred = this.scars.reduce((x, y) => x + y.value, 0)
        return Math.max(0, this._limit - scarred)
    }

    get limit() { return this._limit }
    set limit(n) {
        n = Number(n)
        if (this._available == this._limit) {
            this._available = this._limit = n
        } else {
            this._limit = n
        }
        this._limit = coerce(this._limit, 0, 15)
        this._available = coerce(this._available, 0, this.currentLimit)
    }

    updateAvailable() {
        this._available = coerce(this._available, 0, this.currentLimit)
    }

    get available() { return this._available }
    set available(n) {
        n = Number(n)
        this._available = n
        this.updateAvailable()
    }

    addScar(value, description) {
        let scar = {value, description}
        // TODO není to moc velká jizva?
        this.scars.push(scar)
        this.updateAvailable()
    }
}

export class Character {
    constructor(name, role, level) {
        this.name = name || "Lancelot"
        this.role = role || "Knight of the Round Table"
        this.level = level || 3
        this.experience = 0
        this.resources = {
            telo: new Resource("telo", 5),
            duse: new Resource("duse", 5),
            vliv: new Resource("vliv", 5),
        }
        this.skillLevels = []
    }

    addSkill(name, level) {
        this.skillLevels.push({ name, level })
    }

    static fromJSON(string) {
        let obj = JSON.parse(string)
        let n = Object.assign(new Character(), obj)
        for (let rkey in n.resources) {
            let res = Object.assign(new Resource(), n.resources[rkey])
            n.resources[rkey] = res
        }
        return n
    }
}
