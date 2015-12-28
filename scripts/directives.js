angular.module('app')

.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });
                event.preventDefault();
            }
        });
    };
})

.directive('toggleDropDown', function(){
    return {
        restrict: 'A',
        scope: false,
        link:function(scope, element, attrs){
            var list = element.children('.drop-down-contents');
            var addHeight = function(type){
                for(var i = 0 ; i < list.length ; i++){
                    if(list[i].attributes['type']['value'] == type){
                        $(list[i]).css('display', 'block');
                        element.css('height' , $(list[i]).height()+'px');
                    } else {
                        $(list[i]).css('display', 'none');
                    }
                }
            }

            scope.$on('selectTab', function(obj, type){
                //closed to open
                if(element.height() == 0){
                    addHeight(type);
                } else {
                    if(type) {
                        //open to open
                        element.css('height' , 0);
                        setTimeout(function(){
                            addHeight(type)
                        }, 250);
                    } else {
                        //open to closed
                        element.css('height' , 0);
                    }
                }
            });
        }
    }
})

.directive('infiniteArtists', function(){
    return {
        restrict: 'E',
        require: 'ngModel',
        templateUrl: '../html/directive/infinite-list.html',
        link:function(scope, element, attrs, ngModel){
        
            console.log(ngModel)

        }
    }
})

 /**
 *
 * Adds custom validation to forms on broadcast 'updateForm' and reset-validation on 'resetForm'
 * Custom validation detected through attr 'TYPE' on inputs/selects/textboxes ect...
 * Adds validity to sibling labels of inputs
 *
 */
.directive('formAssist', function() {
    return {
        restrict: 'A',
        scope:false,
        link:function(scope, element, attrs){

            //form
            var form = scope[attrs['name']];

            scope.$on('updateForm', function(e){
                var formInputs = element.find('input, textarea, select');

                for(var i = 0 ; i < formInputs.length ; i++){
                    //determine validity of input, if false, give it an invalid validity state
                    if(formInputs[i].hasAttribute('ng-model')){
                        if(!validateInputs(formInputs[i].type, form[formInputs[i].name].$modelValue || null, formInputs[i].required)){
                            //set input as invalid
                            form[formInputs[i].name].$setValidity(attrs['appliedInvalidType'], false);
                            //add invalid class parent form element
                            $(formInputs[i]).closest('.form-element').addClass('form-element--invalid');
                        }
                    }
                }
            });

            scope.$on('resetForm', function(){
                var formInputs = element.find('input, textarea, select');
                for(var i = 0 ; i < formInputs.length ; i++){
                    //reset input validation
                    if(formInputs[i].hasAttribute('ng-model')) {
                        form[formInputs[i].name].$setValidity(attrs['appliedInvalidType'], true);
                        form[formInputs[i].name].$setPristine();
                        //reset input label validation class
                        $(formInputs[i]).closest('.form-element').removeClass('form-element--invalid');
                    }
                }
            });

            //validations
            function validateInputs(type, data, required){
                //required or not required but still need to make sure the data is valid
                if(required || data){
                    //validations
                    switch(type){
                        case 'numbers':
                            return Util.IsFalse(data) ? false : true;

                        case 'text':
                            return Util.IsFalse(data) ? false : true;

                        case 'textarea':
                            return Util.IsFalse(data) ? false : true;

                        case 'radio':
                            return Util.IsFalse(data) ? false : true;

                        case 'select-one':
                            return Util.IsFalse(data) ? false : true;

                        case 'date':
                            return (new Date(data)) ? true : false;

                        case 'time':
                            return new Date('01-01-2000 ' + data) ? true : false;

                        default:
                            console.log('no specific validation type given');
                            break;
                    }
                } else {
                    //empty and not required is ok
                    if(Util.IsNullOrUndefined(data)){
                        return true;
                    }
                }
            }
        }
    }
})

/**
 *
 * On model change, reset form validation
 * Applies to siblint labels too
 *
 */
.directive('updateResetValidation', ['$parse', function($parse) {
    return {
        restrict: 'A',
        scope:false,
        link:function(scope, element, attrs){

            //form
            var form = element.closest('form')[0].attributes.name.value;
            //name
            var name = attrs['name'];
            //model
            var ngModelStr = attrs['ngModel'];

            //set pristine on input update
            scope.$watch(ngModelStr, function(newValue, oldValue) {
                if(newValue != oldValue){
                    //remove validation classes on the input
                    scope[form][name].$setValidity('validity', true);
                    if(Util.IsFalse(newValue)){
                        scope[form][name].$setPristine();
                    }
                    //remove validation classes on the input label
                    element.closest('.form-element').removeClass('form-element--invalid');
                }
            });

        }
    }
}])