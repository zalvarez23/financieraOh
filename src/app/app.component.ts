import { Component ,OnInit} from '@angular/core';
import { persona } from './modelo/persona/persona';
import { objPersona } from './modelo/persona/persona';
import * as firebase from 'firebase';
import * as jsPDF from 'jspdf'

const settings = {timestampsInSnapshots: true};
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
  listPerson:Array<persona> = [];
  objPersona = new persona('','',0,'');
  loader:boolean = false;

  constructor() { }

  ngOnInit() {
    firebase.initializeApp(config);
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

