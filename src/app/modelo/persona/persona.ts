export class persona implements objPersona{

    constructor(public nombre:string,public apellido: string,public edad:number,public fechaNacimiento : string){
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.fechaNacimiento + fechaNacimiento
    }
    deletePersona(_nombre:string){
        return `delete success user ${_nombre}`
    }
}

export interface objPersona{
    nombre ?:string,
    apellido ?: string,
    edad ?:number,
    fechaNacimiento ?:string
}

