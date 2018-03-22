const lexer = require("pug-lexer")
const parser = require("pug-parser")
const linker = require("pug-linker")
const load = require("pug-load")
const pugVDOM = require("pug-vdom")

function loader(source) {
    let filename = this.resource
    let addDependency = (name, source, options) => {
        let resolved = load.resolve(name, source, options)
        this.addDependency(resolved)
        return resolved
    }

    let ast = load.string(source, {
        lex: lexer,
        parse: parser,
        resolve: addDependency,
    })

    let compiler = new pugVDOM.Compiler(linker(ast))
    let code = compiler.compile()
    return code + "\nmodule.exports = render\n"
}

module.exports = loader
