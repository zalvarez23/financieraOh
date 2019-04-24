import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { persona } from './modelo/persona/persona';
var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.title = 'my-app';
    }
    AppComponent.prototype.ngOnInit = function () {
        console.log('hola mundo');
        var myPerson = new persona('kevin', 26);
    };
    AppComponent = tslib_1.__decorate([
        Component({
            selector: 'app-root',
            templateUrl: './app.component.html',
            styleUrls: ['./app.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], AppComponent);
    return AppComponent;
}());
export { AppComponent };
//# sourceMappingURL=app.component.js.map