/*
 * Project Kimchi
 *
 * Copyright IBM, Corp. 2013
 *
 * Authors:
 *  Hongliang Wang <hlwang@linux.vnet.ibm.com>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * To check whether a given DOM node is entirely within the viewport
 * of a browser.
 * @param {DOMObject} el The given DOM node to check.
 *
 * @returns {true|false|undefined}
 *     true if the node is within viewport, or
 *     false if the node is not entirely visible, or
 *     undefined if the given parameter is invalid.
 */
kimchi.isElementInViewport = function(el) {
    if (!el || !el.getBoundingClientRect) {
        return undefined;
    }

    var rect = el.getBoundingClientRect();

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
};

/**
 * To change the byte to proper unit.
 * @param number needed to change unit.
 * @param digits after the decimal point.
 * @returns str with unit.
 */
kimchi.changetoProperUnit = function(numOrg, digits) {
    var suffixes = [ 'K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y', 'B' ];
    var base = 1024;
    var numTemp = numOrg;
    var result = numOrg + 'B';
    if (numOrg === undefined) {
        return "";
    }
    for ( var i = 0; i < suffixes.length; i++) {
        var numTemp = numTemp / base;
        if (numTemp < 1)
            break;
        result = numTemp.toFixed(digits) + suffixes[i]
    }
    return result;
}
