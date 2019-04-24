var persona = /** @class */ (function () {
    function persona(nombre, edad, curso) {
        this.nombre = nombre;
        this.edad = edad;
        this.curso = curso;
    }
    persona.prototype.getNombre = function () {
        return this.nombre;
    };
    return persona;
}());
export { persona };
//# sourceMappingURL=persona.js.map