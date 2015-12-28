var Util = Util || {};
Util.Css = Util.Css || {};

//  ====================================================================================================================  */
//  ==================================================    String   =====================================================  */
//  ====================================================================================================================  */


Util.setLengthTwo = function(numb){
    numb = String(numb);
    numb = ('0' + numb).slice(-2);
    return numb;
};

//  ====================================================================================================================  */
//  ================================================    Type Checks   ==================================================  */
//  ====================================================================================================================  */


Util.IsNullOrUndefined = function (value, nested) {
    if (typeof(value) === 'undefined' || value == null) {
        return true;
    }
    if (nested) {
        var props = nested.split(".");

        for (var i = 0; i < props.length; i++) {
            value = value[props[i]];

            if (typeof(value) === 'undefined' || value == null) {
                return true;
            }
        }
    }
    return false;
};

Util.IsNullOrWhitespace = function (value) {
    var result = Util.IsNullOrUndefined(value);

    if (!result) {
        if (typeof(value) == 'string') {
            result = value.trim().length === 0;
        } else {
            result = false;
        }
    }

    return result;
};

Util.IsFalse = function (value, nested) {
    if (typeof(value) === 'undefined' || value == null || value == '') {
        return true;
    }
    if (nested) {
        var props = nested.split(".");

        for (var i = 0; i < props.length; i++) {
            value = value[props[i]];

            if (typeof(value) === 'undefined' || value == null || value == '') {
                return true;
            }
        }
    }
    return false;
};

Util.simpleObjectEquality = function(obj1, obj2){
    return JSON.stringify(obj1) === JSON.stringify(obj2)
};

//  ====================================================================================================================  */
//  ================================================    CSS EVENTS   ===================================================  */
//  ====================================================================================================================  */

/**
 * CSS3 Events/Properties
 */
Util.Css.transitionEnd = {
    'transition': 'transitionend',
    'OTransition': 'oTransitionEnd',
    'MozTransition': 'transitionend',
    'WebkitTransition': 'webkitTransitionEnd'
};
Util.Css.transition = ['transition', 'WebKitTransition', 'webkitTransition'];

Util.Css.animationEnd = {
    "animation"      : "animationend",
    "OAnimation"     : "oAnimationEnd",
    "MozAnimation"   : "animationend",
    "WebkitAnimation": "webkitAnimationEnd"
};
Util.Css.animation = ['animation', 'WebKitAnimation', 'webkitAnimation'];

/**
 * Gets the compatible CSS3 Property depending on the browser for the given properties.
 *
 * @param properties
 * @returns {*}
 */
Util.GetCompatibleCssProperty = function(properties) {
    var el = document.createElement('fakeelement');

    if(Array.isArray(properties)) {
        for (var i = 0; i < properties.length; i++) {
            var prop = properties[i];
            if (el.style[prop] !== undefined) {
                return prop;
            }
        }
    } else {
        for (var t in properties) {
            if (el.style[t] !== undefined) {
                return properties[t];
            }
        }
    }
    return "";
};
