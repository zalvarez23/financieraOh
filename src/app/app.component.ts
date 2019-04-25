import { Component, OnInit } from '@angular/core';
import { persona } from './modelo/persona/persona';
import { objPersona } from './modelo/persona/persona';
import * as firebase from 'firebase';
import * as jsPDF from 'jspdf'
import 'jspdf-autotable';
import { Observable } from 'rxjs';


const settings = { timestampsInSnapshots: true };
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
  objPersona = new persona('', '', 0, '');
  listPerson: Array<persona> = [];
  loader: boolean = false;
  promedioEdad: number = 0;
  desviacionEstandar: number = 0;

  objMessageAlert: any = {
    showAlertErr: false,
    showAlertSuccess : false,
    messageErr: '',
    messageSuccess: ''
  }
  constructor() {

  }
  ngOnInit() {
    firebase.initializeApp(config);
    firebase.database().ref().on('value', res => {
      this.listPerson = [];
      this.promedioEdad = 0;
      res.forEach(item => {
        this.promedioEdad += item.val().edad;
        this.listPerson.push(item.val());
      });
      this.promedioEdad = this.promedioEdad / this.listPerson.length;
      this.desviacionEstandar = 0;
      this.listPerson.forEach(res => {
        // FUNCION PARA GENERAR LA DESVIACION ESTANDAR
        this.desviacionEstandar += (Math.pow(res.edad - this.promedioEdad, 2));
        // calculamos fecha promedio de vida
        var fechaPromedioMuerte;
        var fechaEdad = res.fechaNacimiento.split('-');
        fechaPromedioMuerte = (parseFloat(fechaEdad[0]) + anioPromedioVida) + '-' + fechaEdad[1] + '-' + fechaEdad[2];
        res['fechaMuerte'] = fechaPromedioMuerte;
        //
      });
      //
      this.desviacionEstandar = Math.sqrt(this.desviacionEstandar / this.listPerson.length)

    });
  }

  validation() : boolean{
      // VALIDACI[ON DDE DATOS
      if (this.objPersona.nombre.length == 0) {
        this.objMessageAlert.showAlertErr = true;
        this.objMessageAlert.messageErr = "Ingresar un nombre . . ";
        setTimeout(() => {
          this.objMessageAlert.showAlertErr = false;
        }, 1500);
        return false;
      } else if (this.objPersona.apellido.length == 0) {
        this.objMessageAlert.showAlertErr = true;
        this.objMessageAlert.messageErr = "Ingresar un apellido . . ";
        setTimeout(() => {
          this.objMessageAlert.showAlertErr = false;
        }, 1500);
        return false;
      }else if (this.objPersona.edad == 0) {
        this.objMessageAlert.showAlertErr = true;
        this.objMessageAlert.messageErr = "Ingresar edad . . ";
        setTimeout(() => {
          this.objMessageAlert.showAlertErr = false;
        }, 1500);
        return false;
      } else if (this.objPersona.fechaNacimiento.length == 0) {
        this.objMessageAlert.showAlertErr = true;
        this.objMessageAlert.messageErr = "Ingresar un fecha de nacimiento . . ";
        setTimeout(() => {
          this.objMessageAlert.showAlertErr = false;
        }, 1500);
        return false;
      }
      return true;
      //
  }
  savePersonal() {
    if (!this.validation()) {
      return;
    }
    this.loader = true;
    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    }
    firebase.database().ref('idKey_' + getRandomInt(100000, 999999)).set(this.objPersona);
    setTimeout(() => {
      this.clearObjPersonal();
      this.loader = false;
      this.objMessageAlert.showAlertSuccess = true;
      this.objMessageAlert.messageSuccess = "Se ha registrado un nuevo cliente !! ";
      setTimeout(() => {
        this.objMessageAlert.showAlertSuccess = false;
      }, 1500);
    }, 1000);
  }

  clearObjPersonal() {
    this.objPersona.apellido = '';
    this.objPersona.nombre = '';
    this.objPersona.edad = 0;
    this.objPersona.fechaNacimiento = '';
  }

  getPdf() {
    const doc = new jsPDF();
    doc.autoTable({ html: '#tblClientes' });
    doc.save('report.pdf');
  }
}

