import { Component ,OnInit} from '@angular/core';
import { persona } from './modelo/persona/persona';
import { objPersona } from './modelo/persona/persona';
import * as firebase from 'firebase';
import * as jsPDF from 'jspdf'
import { Observable } from 'rxjs';


const settings = {timestampsInSnapshots: true};
const anioPromedioVida = 72;
var config = {
  apiKey: "AIzaSyDWukyU_zxdoSdAmR8AmvMOQJBVQeqNARw",
  authDomain: "financieraoh-5a7d8.firebaseapp.com",
  databaseURL: "https://financieraoh-5a7d8.firebaseio.com",
  projectId: "financieraoh-5a7d8",
  storageBucket: "financieraoh-5a7d8.appspot.com",
  messagingSenderId: "1007436212663"
};


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'my-app';
  objPersona = new persona('','',0,'');
  listPerson:Array<persona> = []; 
  loader:boolean = false;
  promedioEdad:number = 0;
  desviacionEstandar:number = 0;

  constructor() { 
    
  }
  ngOnInit() {
    firebase.initializeApp(config);
    firebase.database().ref().on('value',res =>{
      this.listPerson = [];
      this.promedioEdad = 0;
      res.forEach(item => {
        this.promedioEdad += item.val().edad;
        this.listPerson.push(item.val());
      });
      this.promedioEdad = this.promedioEdad / this.listPerson.length;
      // FUNCION PARA GENERAR LA DESVIACION ESTANDAR

      this.listPerson.forEach(res=>{
        this.desviacionEstandar += (Math.pow(res.edad - this.promedioEdad,2));
        // calculamos fecha promedio de vida
        var fechaPromedioMuerte;
        var fechaEdad = res.fechaNacimiento.split('-');
        fechaPromedioMuerte = (parseFloat(fechaEdad[0]) + anioPromedioVida) + '-' + fechaEdad [1] + '-' + fechaEdad [2];
        res['fechaMuerte'] = fechaPromedioMuerte;
      });
      this.desviacionEstandar = Math.sqrt(this.desviacionEstandar / this.listPerson.length)
      
    });
  }

  savePersonal(){
    
    this.loader = true;
    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    }
    firebase.database().ref('idKey_'+ getRandomInt(100000,999999)).set(this.objPersona);
    setTimeout(() => {
      this.clearObjPersonal();
      this.loader = false;
    }, 1500);
  }

  clearObjPersonal(){
    this.objPersona.apellido = '';
    this.objPersona.nombre = '';
    this.objPersona.edad = 0;
    this.objPersona.fechaNacimiento = '';
  }

  getPdf(){
    var doc = new jsPDF({
      orientation: 'landscape'
    })
     
    doc.text('Hello world!', 1, 10)
    doc.output('dataurlnewwindow');
  }
}

