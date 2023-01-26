"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Skip = exports.SkipConstraint = void 0;
var common_1 = require("@nestjs/common");
var class_validator_1 = require("class-validator");
var SkipConstraint = /** @class */ (function () {
    function SkipConstraint() {
    }
    SkipConstraint.prototype.validate = function () {
        return true;
    };
    SkipConstraint = __decorate([
        (0, class_validator_1.ValidatorConstraint)({ async: true }),
        (0, common_1.Injectable)()
    ], SkipConstraint);
    return SkipConstraint;
}());
exports.SkipConstraint = SkipConstraint;
function Skip() {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: 'Skip',
            target: object.constructor,
            propertyName: propertyName,
            validator: SkipConstraint,
        });
    };
}
exports.Skip = Skip;
//# sourceMappingURL=request.skip.validation.js.map