(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["js/app"],{

/***/ "./assets/js/app.js":
/*!**************************!*\
  !*** ./assets/js/app.js ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var bootstrap_dist_js_bootstrap_min__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bootstrap/dist/js/bootstrap.min */ "./node_modules/bootstrap/dist/js/bootstrap.min.js");
/* harmony import */ var bootstrap_dist_js_bootstrap_min__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(bootstrap_dist_js_bootstrap_min__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _departements__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./departements */ "./assets/js/departements.js");
/* harmony import */ var _communes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./communes */ "./assets/js/communes.js");
window.$ = window.JQuery = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js"); // loads the Bootstrap jQuery plugins

/*import 'bootstrap-sass/assets/javascripts/bootstrap/transition.js';
import 'bootstrap-sass/assets/javascripts/bootstrap/alert.js';
import 'bootstrap-sass/assets/javascripts/bootstrap/collapse.js';
import 'bootstrap-sass/assets/javascripts/bootstrap/dropdown.js';
import 'bootstrap-sass/assets/javascripts/bootstrap/modal.js';*/
// import 'bootstrap'





/***/ }),

/***/ "./assets/js/communes.js":
/*!*******************************!*\
  !*** ./assets/js/communes.js ***!
  \*******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var core_js_modules_es_array_concat__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.concat */ "./node_modules/core-js/modules/es.array.concat.js");
/* harmony import */ var core_js_modules_es_array_concat__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_concat__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _routes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./routes */ "./assets/js/routes.js");



(function () {
  var $region = $('#contact_region');
  var $departement = $('#contact_departement');
  var $commune = $('#contact_commune'); //chargement de la liste des départements

  var $response = function $response(data, $select) {
    $.each(data, function (optVal, text) {
      $select.prepend("<option value='".concat(text["id"], "' >").concat(text["nom"], "</option>"));
    });
  }; //recherche des communes correspondant au département sélectionné


  $(document).on('change', ' #contact_departement', function () {
    var $field = $(this);
    var value = $field.val();
    $commune.empty();
    $.ajax({
      //  url: `http://127.0.0.1:8000/communes/${value}`,
      url: _routes__WEBPACK_IMPORTED_MODULE_1__["default"].generate('villes_d_un_departement', {
        departement: value
      }),
      type: 'GET',
      success: function success(data) {
        if (data.length == 0) alert("Il n'existe aucune ville pour ce département");
        console.log(data); //ajout des communes rétournées par AJAX dans la liste déroulante des communes

        $response(data, $commune);
      }
    });
  });
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./assets/js/departements.js":
/*!***********************************!*\
  !*** ./assets/js/departements.js ***!
  \***********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var core_js_modules_es_array_concat__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.concat */ "./node_modules/core-js/modules/es.array.concat.js");
/* harmony import */ var core_js_modules_es_array_concat__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_concat__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_array_find__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.array.find */ "./node_modules/core-js/modules/es.array.find.js");
/* harmony import */ var core_js_modules_es_array_find__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _routes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./routes */ "./assets/js/routes.js");



$(function () {
  var $region = $('#contact_region');
  var $departement = $('#contact_departement');
  var $commune = $('#contact_commune'); //peuplement des champs select (region, département)

  var $response = function $response(data, $select) {
    $.each(data, function (optVal, text) {
      $select.prepend("<option value='".concat(text["id"], "' >").concat(text["nom"], "</option>"));
    });
  }; //lorsqu'une région est sélectionnée par défaut(ex refresh de la page), on réaffiche ses départements


  if ($region.val()) {
    var value = $region.val();
    var departement_route = _routes__WEBPACK_IMPORTED_MODULE_2__["default"].generate("departements_d_une_region", {
      region: value
    }); // $.get(`http://127.0.0.1:8000/departements/${value}`).then( (data)=>{

    $.get(departement_route).then(function (data) {
      $response(data, $departement);
    });
  } // $region .change(function() {


  $(document).on('change', ' #contact_region', function () {
    var $field = $(this);
    $commune.empty();
    $departement.empty(); //  console.log("dep select")

    var $regionField = $('#contact_region');
    var $form = $field.closest('form'); // Données à envoyer via Ajax

    var data = {};
    data[$region.attr('name')] = $region.val();
    data[$departement.attr('name')] = $departement.val(); // soummission du form avec POST et envoie de la région en AJAX

    $.post($form.attr('action'), data).then(function (data) {
      //on récupère le champ select retourné dans la réponse AJAX
      var $newSelect = $(data).find('#contact_departement'); //on remplace le champ select du département par le nouveau champ renvoyé par AJAX

      $('#contact_departement').replaceWith($newSelect);
    });
  });
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./assets/js/routes.js":
/*!*****************************!*\
  !*** ./assets/js/routes.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _vendor_friendsofsymfony_jsrouting_bundle_Resources_public_js_router_min_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../vendor/friendsofsymfony/jsrouting-bundle/Resources/public/js/router.min.js */ "./vendor/friendsofsymfony/jsrouting-bundle/Resources/public/js/router.min.js");
/* harmony import */ var _vendor_friendsofsymfony_jsrouting_bundle_Resources_public_js_router_min_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_vendor_friendsofsymfony_jsrouting_bundle_Resources_public_js_router_min_js__WEBPACK_IMPORTED_MODULE_0__);
var routes = __webpack_require__(/*! ../../public/js/fos_js_routes.json */ "./public/js/fos_js_routes.json");


_vendor_friendsofsymfony_jsrouting_bundle_Resources_public_js_router_min_js__WEBPACK_IMPORTED_MODULE_0___default.a.setRoutingData(routes);
/* harmony default export */ __webpack_exports__["default"] = (_vendor_friendsofsymfony_jsrouting_bundle_Resources_public_js_router_min_js__WEBPACK_IMPORTED_MODULE_0___default.a);

/***/ }),

/***/ "./public/js/fos_js_routes.json":
/*!**************************************!*\
  !*** ./public/js/fos_js_routes.json ***!
  \**************************************/
/*! exports provided: base_url, routes, prefix, host, port, scheme, locale, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"base_url\":\"\",\"routes\":{\"villes_d_un_departement\":{\"tokens\":[[\"variable\",\"/\",\"[^/]++\",\"departement\",true],[\"text\",\"/commune/departement\"]],\"defaults\":[],\"requirements\":[],\"hosttokens\":[],\"methods\":[],\"schemes\":[]},\"departements_d_une_region\":{\"tokens\":[[\"variable\",\"/\",\"[^/]++\",\"region\",true],[\"text\",\"/departement/region\"]],\"defaults\":[],\"requirements\":[],\"hosttokens\":[],\"methods\":[],\"schemes\":[]}},\"prefix\":\"\",\"host\":\"localhost\",\"port\":\"\",\"scheme\":\"http\",\"locale\":[]}");

/***/ }),

/***/ "./vendor/friendsofsymfony/jsrouting-bundle/Resources/public/js/router.min.js":
/*!************************************************************************************!*\
  !*** ./vendor/friendsofsymfony/jsrouting-bundle/Resources/public/js/router.min.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;__webpack_require__(/*! core-js/modules/es.symbol */ "./node_modules/core-js/modules/es.symbol.js");

__webpack_require__(/*! core-js/modules/es.symbol.description */ "./node_modules/core-js/modules/es.symbol.description.js");

__webpack_require__(/*! core-js/modules/es.symbol.iterator */ "./node_modules/core-js/modules/es.symbol.iterator.js");

__webpack_require__(/*! core-js/modules/es.array.for-each */ "./node_modules/core-js/modules/es.array.for-each.js");

__webpack_require__(/*! core-js/modules/es.array.iterator */ "./node_modules/core-js/modules/es.array.iterator.js");

__webpack_require__(/*! core-js/modules/es.array.join */ "./node_modules/core-js/modules/es.array.join.js");

__webpack_require__(/*! core-js/modules/es.object.assign */ "./node_modules/core-js/modules/es.object.assign.js");

__webpack_require__(/*! core-js/modules/es.object.define-property */ "./node_modules/core-js/modules/es.object.define-property.js");

__webpack_require__(/*! core-js/modules/es.object.freeze */ "./node_modules/core-js/modules/es.object.freeze.js");

__webpack_require__(/*! core-js/modules/es.object.keys */ "./node_modules/core-js/modules/es.object.keys.js");

__webpack_require__(/*! core-js/modules/es.object.to-string */ "./node_modules/core-js/modules/es.object.to-string.js");

__webpack_require__(/*! core-js/modules/es.regexp.constructor */ "./node_modules/core-js/modules/es.regexp.constructor.js");

__webpack_require__(/*! core-js/modules/es.regexp.exec */ "./node_modules/core-js/modules/es.regexp.exec.js");

__webpack_require__(/*! core-js/modules/es.regexp.to-string */ "./node_modules/core-js/modules/es.regexp.to-string.js");

__webpack_require__(/*! core-js/modules/es.string.iterator */ "./node_modules/core-js/modules/es.string.iterator.js");

__webpack_require__(/*! core-js/modules/es.string.replace */ "./node_modules/core-js/modules/es.string.replace.js");

__webpack_require__(/*! core-js/modules/web.dom-collections.for-each */ "./node_modules/core-js/modules/web.dom-collections.for-each.js");

__webpack_require__(/*! core-js/modules/web.dom-collections.iterator */ "./node_modules/core-js/modules/web.dom-collections.iterator.js");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

!function (e, t) {
  var n = t();
   true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (n.Routing),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : undefined;
}(this, function () {
  "use strict";

  function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
  }

  var t = Object.assign || function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];

      for (var o in n) {
        Object.prototype.hasOwnProperty.call(n, o) && (e[o] = n[o]);
      }
    }

    return e;
  },
      n = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (e) {
    return _typeof(e);
  } : function (e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : _typeof(e);
  },
      o = function () {
    function e(e, t) {
      for (var n = 0; n < t.length; n++) {
        var o = t[n];
        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o);
      }
    }

    return function (t, n, o) {
      return n && e(t.prototype, n), o && e(t, o), t;
    };
  }(),
      i = function () {
    function i(t, n) {
      e(this, i), this.context_ = t || {
        base_url: "",
        prefix: "",
        host: "",
        port: "",
        scheme: "",
        locale: ""
      }, this.setRoutes(n || {});
    }

    return o(i, [{
      key: "setRoutingData",
      value: function value(e) {
        this.setBaseUrl(e.base_url), this.setRoutes(e.routes), "prefix" in e && this.setPrefix(e.prefix), "port" in e && this.setPort(e.port), "locale" in e && this.setLocale(e.locale), this.setHost(e.host), this.setScheme(e.scheme);
      }
    }, {
      key: "setRoutes",
      value: function value(e) {
        this.routes_ = Object.freeze(e);
      }
    }, {
      key: "getRoutes",
      value: function value() {
        return this.routes_;
      }
    }, {
      key: "setBaseUrl",
      value: function value(e) {
        this.context_.base_url = e;
      }
    }, {
      key: "getBaseUrl",
      value: function value() {
        return this.context_.base_url;
      }
    }, {
      key: "setPrefix",
      value: function value(e) {
        this.context_.prefix = e;
      }
    }, {
      key: "setScheme",
      value: function value(e) {
        this.context_.scheme = e;
      }
    }, {
      key: "getScheme",
      value: function value() {
        return this.context_.scheme;
      }
    }, {
      key: "setHost",
      value: function value(e) {
        this.context_.host = e;
      }
    }, {
      key: "getHost",
      value: function value() {
        return this.context_.host;
      }
    }, {
      key: "setPort",
      value: function value(e) {
        this.context_.port = e;
      }
    }, {
      key: "getPort",
      value: function value() {
        return this.context_.port;
      }
    }, {
      key: "setLocale",
      value: function value(e) {
        this.context_.locale = e;
      }
    }, {
      key: "getLocale",
      value: function value() {
        return this.context_.locale;
      }
    }, {
      key: "buildQueryParams",
      value: function value(e, t, o) {
        var i = this,
            r = void 0,
            s = new RegExp(/\[\]$/);
        if (t instanceof Array) t.forEach(function (t, r) {
          s.test(e) ? o(e, t) : i.buildQueryParams(e + "[" + ("object" === ("undefined" == typeof t ? "undefined" : n(t)) ? r : "") + "]", t, o);
        });else if ("object" === ("undefined" == typeof t ? "undefined" : n(t))) for (r in t) {
          this.buildQueryParams(e + "[" + r + "]", t[r], o);
        } else o(e, t);
      }
    }, {
      key: "getRoute",
      value: function value(e) {
        var t = this.context_.prefix + e,
            n = e + "." + this.context_.locale,
            o = this.context_.prefix + e + "." + this.context_.locale,
            i = [t, n, o, e];

        for (var r in i) {
          if (i[r] in this.routes_) return this.routes_[i[r]];
        }

        throw new Error('The route "' + e + '" does not exist.');
      }
    }, {
      key: "generate",
      value: function value(e, n) {
        var o = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
            i = this.getRoute(e),
            r = n || {},
            s = t({}, r),
            u = "",
            c = !0,
            a = "",
            f = "undefined" == typeof this.getPort() || null === this.getPort() ? "" : this.getPort();

        if (i.tokens.forEach(function (t) {
          if ("text" === t[0]) return u = t[1] + u, void (c = !1);
          {
            if ("variable" !== t[0]) throw new Error('The token type "' + t[0] + '" is not supported.');
            var n = i.defaults && t[3] in i.defaults;

            if (!1 === c || !n || t[3] in r && r[t[3]] != i.defaults[t[3]]) {
              var o = void 0;
              if (t[3] in r) o = r[t[3]], delete s[t[3]];else {
                if (!n) {
                  if (c) return;
                  throw new Error('The route "' + e + '" requires the parameter "' + t[3] + '".');
                }

                o = i.defaults[t[3]];
              }
              var a = !0 === o || !1 === o || "" === o;

              if (!a || !c) {
                var f = encodeURIComponent(o).replace(/%2F/g, "/");
                "null" === f && null === o && (f = ""), u = t[1] + f + u;
              }

              c = !1;
            } else n && t[3] in s && delete s[t[3]];
          }
        }), "" === u && (u = "/"), i.hosttokens.forEach(function (e) {
          var t = void 0;
          return "text" === e[0] ? void (a = e[1] + a) : void ("variable" === e[0] && (e[3] in r ? (t = r[e[3]], delete s[e[3]]) : i.defaults && e[3] in i.defaults && (t = i.defaults[e[3]]), a = e[1] + t + a));
        }), u = this.context_.base_url + u, i.requirements && "_scheme" in i.requirements && this.getScheme() != i.requirements._scheme ? u = i.requirements._scheme + "://" + (a || this.getHost()) + u : "undefined" != typeof i.schemes && "undefined" != typeof i.schemes[0] && this.getScheme() !== i.schemes[0] ? u = i.schemes[0] + "://" + (a || this.getHost()) + u : a && this.getHost() !== a + ("" === f ? "" : ":" + f) ? u = this.getScheme() + "://" + a + ("" === f ? "" : ":" + f) + u : o === !0 && (u = this.getScheme() + "://" + this.getHost() + u), Object.keys(s).length > 0) {
          var l = void 0,
              h = [],
              y = function y(e, t) {
            t = "function" == typeof t ? t() : t, t = null === t ? "" : t, h.push(encodeURIComponent(e) + "=" + encodeURIComponent(t));
          };

          for (l in s) {
            this.buildQueryParams(l, s[l], y);
          }

          u = u + "?" + h.join("&").replace(/%20/g, "+");
        }

        return u;
      }
    }], [{
      key: "getInstance",
      value: function value() {
        return r;
      }
    }, {
      key: "setData",
      value: function value(e) {
        var t = i.getInstance();
        t.setRoutingData(e);
      }
    }]), i;
  }();

  i.Route, i.Context;
  var r = new i();
  return {
    Router: i,
    Routing: r
  };
});

/***/ })

},[["./assets/js/app.js","runtime","vendors~js/app"]]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvYXBwLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy9jb21tdW5lcy5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvZGVwYXJ0ZW1lbnRzLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy9yb3V0ZXMuanMiLCJ3ZWJwYWNrOi8vLy4vdmVuZG9yL2ZyaWVuZHNvZnN5bWZvbnkvanNyb3V0aW5nLWJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2pzL3JvdXRlci5taW4uanMiXSwibmFtZXMiOlsid2luZG93IiwiJCIsIkpRdWVyeSIsInJlcXVpcmUiLCIkcmVnaW9uIiwiJGRlcGFydGVtZW50IiwiJGNvbW11bmUiLCIkcmVzcG9uc2UiLCJkYXRhIiwiJHNlbGVjdCIsImVhY2giLCJvcHRWYWwiLCJ0ZXh0IiwicHJlcGVuZCIsImRvY3VtZW50Iiwib24iLCIkZmllbGQiLCJ2YWx1ZSIsInZhbCIsImVtcHR5IiwiYWpheCIsInVybCIsIlJvdXRpbmciLCJnZW5lcmF0ZSIsImRlcGFydGVtZW50IiwidHlwZSIsInN1Y2Nlc3MiLCJsZW5ndGgiLCJhbGVydCIsImNvbnNvbGUiLCJsb2ciLCJkZXBhcnRlbWVudF9yb3V0ZSIsInJlZ2lvbiIsImdldCIsInRoZW4iLCIkcmVnaW9uRmllbGQiLCIkZm9ybSIsImNsb3Nlc3QiLCJhdHRyIiwicG9zdCIsIiRuZXdTZWxlY3QiLCJmaW5kIiwicmVwbGFjZVdpdGgiLCJyb3V0ZXMiLCJzZXRSb3V0aW5nRGF0YSIsImUiLCJ0IiwibiIsImRlZmluZSIsIlR5cGVFcnJvciIsIk9iamVjdCIsImFzc2lnbiIsImFyZ3VtZW50cyIsIm8iLCJwcm90b3R5cGUiLCJoYXNPd25Qcm9wZXJ0eSIsImNhbGwiLCJTeW1ib2wiLCJpdGVyYXRvciIsImNvbnN0cnVjdG9yIiwiZW51bWVyYWJsZSIsImNvbmZpZ3VyYWJsZSIsIndyaXRhYmxlIiwiZGVmaW5lUHJvcGVydHkiLCJrZXkiLCJpIiwiY29udGV4dF8iLCJiYXNlX3VybCIsInByZWZpeCIsImhvc3QiLCJwb3J0Iiwic2NoZW1lIiwibG9jYWxlIiwic2V0Um91dGVzIiwic2V0QmFzZVVybCIsInNldFByZWZpeCIsInNldFBvcnQiLCJzZXRMb2NhbGUiLCJzZXRIb3N0Iiwic2V0U2NoZW1lIiwicm91dGVzXyIsImZyZWV6ZSIsInIiLCJzIiwiUmVnRXhwIiwiQXJyYXkiLCJmb3JFYWNoIiwidGVzdCIsImJ1aWxkUXVlcnlQYXJhbXMiLCJFcnJvciIsImdldFJvdXRlIiwidSIsImMiLCJhIiwiZiIsImdldFBvcnQiLCJ0b2tlbnMiLCJkZWZhdWx0cyIsImVuY29kZVVSSUNvbXBvbmVudCIsInJlcGxhY2UiLCJob3N0dG9rZW5zIiwicmVxdWlyZW1lbnRzIiwiZ2V0U2NoZW1lIiwiX3NjaGVtZSIsImdldEhvc3QiLCJzY2hlbWVzIiwia2V5cyIsImwiLCJoIiwieSIsInB1c2giLCJqb2luIiwiZ2V0SW5zdGFuY2UiLCJSb3V0ZSIsIkNvbnRleHQiLCJSb3V0ZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFFQUE7QUFBQUE7QUFBQUE7QUFBQUE7QUFBQUE7QUFBQUEsTUFBTSxDQUFDQyxDQUFQLEdBQVdELE1BQU0sQ0FBQ0UsTUFBUCxHQUFnQkMsbUJBQU8sQ0FBQyxvREFBRCxDQUFsQyxDLENBRUE7O0FBQ0E7Ozs7O0FBTUE7O0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDYkE7O0FBR0EsQ0FBQyxZQUFZO0FBR1QsTUFBSUMsT0FBTyxHQUFHSCxDQUFDLENBQUMsaUJBQUQsQ0FBZjtBQUNBLE1BQUlJLFlBQVksR0FBR0osQ0FBQyxDQUFDLHNCQUFELENBQXBCO0FBQ0EsTUFBSUssUUFBUSxHQUFHTCxDQUFDLENBQUMsa0JBQUQsQ0FBaEIsQ0FMUyxDQU9UOztBQUNBLE1BQUlNLFNBQVMsR0FBRyxTQUFaQSxTQUFZLENBQUVDLElBQUYsRUFBUUMsT0FBUixFQUFxQjtBQUNqQ1IsS0FBQyxDQUFDUyxJQUFGLENBQU9GLElBQVAsRUFBYSxV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QUFsQixHQUFOO0FBQTJCLENBQTdsSixDQUFELEMiLCJmaWxlIjoianMvYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5cbndpbmRvdy4kID0gd2luZG93LkpRdWVyeSA9IHJlcXVpcmUoJ2pxdWVyeScpO1xuXG4vLyBsb2FkcyB0aGUgQm9vdHN0cmFwIGpRdWVyeSBwbHVnaW5zXG4vKmltcG9ydCAnYm9vdHN0cmFwLXNhc3MvYXNzZXRzL2phdmFzY3JpcHRzL2Jvb3RzdHJhcC90cmFuc2l0aW9uLmpzJztcbmltcG9ydCAnYm9vdHN0cmFwLXNhc3MvYXNzZXRzL2phdmFzY3JpcHRzL2Jvb3RzdHJhcC9hbGVydC5qcyc7XG5pbXBvcnQgJ2Jvb3RzdHJhcC1zYXNzL2Fzc2V0cy9qYXZhc2NyaXB0cy9ib290c3RyYXAvY29sbGFwc2UuanMnO1xuaW1wb3J0ICdib290c3RyYXAtc2Fzcy9hc3NldHMvamF2YXNjcmlwdHMvYm9vdHN0cmFwL2Ryb3Bkb3duLmpzJztcbmltcG9ydCAnYm9vdHN0cmFwLXNhc3MvYXNzZXRzL2phdmFzY3JpcHRzL2Jvb3RzdHJhcC9tb2RhbC5qcyc7Ki9cblxuLy8gaW1wb3J0ICdib290c3RyYXAnXG5pbXBvcnQgJ2Jvb3RzdHJhcC9kaXN0L2pzL2Jvb3RzdHJhcC5taW4nXG5pbXBvcnQgJy4vZGVwYXJ0ZW1lbnRzJ1xuaW1wb3J0ICcuL2NvbW11bmVzJyIsImltcG9ydCBSb3V0aW5nIGZyb20gJy4vcm91dGVzJ1xuXG5cbihmdW5jdGlvbiAoKSB7XG5cblxuICAgIGxldCAkcmVnaW9uID0gJCgnI2NvbnRhY3RfcmVnaW9uJyk7XG4gICAgbGV0ICRkZXBhcnRlbWVudCA9ICQoJyNjb250YWN0X2RlcGFydGVtZW50Jyk7XG4gICAgbGV0ICRjb21tdW5lID0gJCgnI2NvbnRhY3RfY29tbXVuZScpO1xuXG4gICAgLy9jaGFyZ2VtZW50IGRlIGxhIGxpc3RlIGRlcyBkw6lwYXJ0ZW1lbnRzXG4gICAgbGV0ICRyZXNwb25zZSA9ICggZGF0YSwgJHNlbGVjdCApID0+IHtcbiAgICAgICAgJC5lYWNoKGRhdGEsIGZ1bmN0aW9uKG9wdFZhbCwgdGV4dCkge1xuICAgICAgICAgICAgJHNlbGVjdC5wcmVwZW5kKGA8b3B0aW9uIHZhbHVlPScke3RleHRbXCJpZFwiXX0nID4ke3RleHRbXCJub21cIl19PC9vcHRpb24+YCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG5cbi8vcmVjaGVyY2hlIGRlcyBjb21tdW5lcyBjb3JyZXNwb25kYW50IGF1IGTDqXBhcnRlbWVudCBzw6lsZWN0aW9ubsOpXG4gICAgJChkb2N1bWVudCkub24oJ2NoYW5nZScsICcgI2NvbnRhY3RfZGVwYXJ0ZW1lbnQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxldCAkZmllbGQgPSAkKHRoaXMpXG4gICAgICAgIGxldCB2YWx1ZT0kZmllbGQudmFsKClcbiAgICAgICAgJGNvbW11bmUuZW1wdHkoKVxuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgLy8gIHVybDogYGh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9jb21tdW5lcy8ke3ZhbHVlfWAsXG5cbiAgICAgICAgICAgIHVybDogIFJvdXRpbmcuZ2VuZXJhdGUoJ3ZpbGxlc19kX3VuX2RlcGFydGVtZW50Jyx7IGRlcGFydGVtZW50OiB2YWx1ZSB9KSxcbiAgICAgICAgICAgIHR5cGU6ICdHRVQnLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgICAgICBpZihkYXRhLmxlbmd0aCA9PTAgKSBhbGVydChcIklsIG4nZXhpc3RlIGF1Y3VuZSB2aWxsZSBwb3VyIGNlIGTDqXBhcnRlbWVudFwiKVxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpXG5cbiAgICAgICAgICAgICAgICAvL2Fqb3V0IGRlcyBjb21tdW5lcyByw6l0b3VybsOpZXMgcGFyIEFKQVggZGFucyBsYSBsaXN0ZSBkw6lyb3VsYW50ZSBkZXMgY29tbXVuZXNcbiAgICAgICAgICAgICAgICAkcmVzcG9uc2UoIGRhdGEsICRjb21tdW5lIClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbn0pKCkiLCJpbXBvcnQgUm91dGluZyBmcm9tICcuL3JvdXRlcydcblxuXG4kKGZ1bmN0aW9uICgpIHtcblxuICAgIGxldCAkcmVnaW9uID0gJCgnI2NvbnRhY3RfcmVnaW9uJyk7XG4gICAgbGV0ICRkZXBhcnRlbWVudCA9ICQoJyNjb250YWN0X2RlcGFydGVtZW50Jyk7XG4gICAgbGV0ICRjb21tdW5lID0gJCgnI2NvbnRhY3RfY29tbXVuZScpO1xuXG5cbiAgICAvL3BldXBsZW1lbnQgZGVzIGNoYW1wcyBzZWxlY3QgKHJlZ2lvbiwgZMOpcGFydGVtZW50KVxuICAgIGxldCAkcmVzcG9uc2UgPSAoZGF0YSwgJHNlbGVjdCkgPT4ge1xuICAgICAgICAkLmVhY2goZGF0YSwgZnVuY3Rpb24gKG9wdFZhbCwgdGV4dCkge1xuICAgICAgICAgICAgJHNlbGVjdC5wcmVwZW5kKGA8b3B0aW9uIHZhbHVlPScke3RleHRbXCJpZFwiXX0nID4ke3RleHRbXCJub21cIl19PC9vcHRpb24+YCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vbG9yc3F1J3VuZSByw6lnaW9uIGVzdCBzw6lsZWN0aW9ubsOpZSBwYXIgZMOpZmF1dChleCByZWZyZXNoIGRlIGxhIHBhZ2UpLCBvbiByw6lhZmZpY2hlIHNlcyBkw6lwYXJ0ZW1lbnRzXG4gICAgaWYgKCRyZWdpb24udmFsKCkpIHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSAkcmVnaW9uLnZhbCgpXG5cbiAgICAgICAgbGV0IGRlcGFydGVtZW50X3JvdXRlID0gUm91dGluZy5nZW5lcmF0ZShcImRlcGFydGVtZW50c19kX3VuZV9yZWdpb25cIiwge3JlZ2lvbjogdmFsdWV9KTtcblxuICAgICAgICAvLyAkLmdldChgaHR0cDovLzEyNy4wLjAuMTo4MDAwL2RlcGFydGVtZW50cy8ke3ZhbHVlfWApLnRoZW4oIChkYXRhKT0+e1xuICAgICAgICAkLmdldChkZXBhcnRlbWVudF9yb3V0ZSkudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgICAgJHJlc3BvbnNlKGRhdGEsICRkZXBhcnRlbWVudClcbiAgICAgICAgfSlcblxuICAgIH1cblxuXG4gICAgLy8gJHJlZ2lvbiAuY2hhbmdlKGZ1bmN0aW9uKCkge1xuICAgICQoZG9jdW1lbnQpLm9uKCdjaGFuZ2UnLCAnICNjb250YWN0X3JlZ2lvbicsIGZ1bmN0aW9uICgpIHtcblxuICAgICAgICBsZXQgJGZpZWxkID0gJCh0aGlzKVxuICAgICAgICAkY29tbXVuZS5lbXB0eSgpXG4gICAgICAgICRkZXBhcnRlbWVudC5lbXB0eSgpXG5cblxuICAgICAgICAvLyAgY29uc29sZS5sb2coXCJkZXAgc2VsZWN0XCIpXG4gICAgICAgIGxldCAkcmVnaW9uRmllbGQgPSAkKCcjY29udGFjdF9yZWdpb24nKVxuICAgICAgICBsZXQgJGZvcm0gPSAkZmllbGQuY2xvc2VzdCgnZm9ybScpXG5cbiAgICAgICAgLy8gRG9ubsOpZXMgw6AgZW52b3llciB2aWEgQWpheFxuICAgICAgICBsZXQgZGF0YSA9IHt9XG4gICAgICAgIGRhdGFbJHJlZ2lvbi5hdHRyKCduYW1lJyldID0gJHJlZ2lvbi52YWwoKTtcbiAgICAgICAgZGF0YVskZGVwYXJ0ZW1lbnQuYXR0cignbmFtZScpXSA9ICRkZXBhcnRlbWVudC52YWwoKTtcbiAgICAgICAgLy8gc291bW1pc3Npb24gZHUgZm9ybSBhdmVjIFBPU1QgZXQgZW52b2llIGRlIGxhIHLDqWdpb24gZW4gQUpBWFxuICAgICAgICAkLnBvc3QoJGZvcm0uYXR0cignYWN0aW9uJyksIGRhdGEpLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcblxuXG4gICAgICAgICAgICAvL29uIHLDqWN1cMOocmUgbGUgY2hhbXAgc2VsZWN0IHJldG91cm7DqSBkYW5zIGxhIHLDqXBvbnNlIEFKQVhcbiAgICAgICAgICAgIGxldCAkbmV3U2VsZWN0ID0gJChkYXRhKS5maW5kKCcjY29udGFjdF9kZXBhcnRlbWVudCcpXG5cbiAgICAgICAgICAgIC8vb24gcmVtcGxhY2UgbGUgY2hhbXAgc2VsZWN0IGR1IGTDqXBhcnRlbWVudCBwYXIgbGUgbm91dmVhdSBjaGFtcCByZW52b3nDqSBwYXIgQUpBWFxuICAgICAgICAgICAgJCgnI2NvbnRhY3RfZGVwYXJ0ZW1lbnQnKS5yZXBsYWNlV2l0aCgkbmV3U2VsZWN0KVxuXG5cbiAgICAgICAgfSlcbiAgICB9KTtcblxufSkiLCJcblxuY29uc3Qgcm91dGVzID0gcmVxdWlyZSgnLi4vLi4vcHVibGljL2pzL2Zvc19qc19yb3V0ZXMuanNvbicpO1xuaW1wb3J0IFJvdXRpbmcgZnJvbSAnLi4vLi4vdmVuZG9yL2ZyaWVuZHNvZnN5bWZvbnkvanNyb3V0aW5nLWJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2pzL3JvdXRlci5taW4uanMnO1xuUm91dGluZy5zZXRSb3V0aW5nRGF0YShyb3V0ZXMpO1xuXG5cblxuZXhwb3J0IGRlZmF1bHQgUm91dGluZ1xuIiwiIWZ1bmN0aW9uKGUsdCl7dmFyIG49dCgpO1wiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZD9kZWZpbmUoW10sbi5Sb3V0aW5nKTpcIm9iamVjdFwiPT10eXBlb2YgbW9kdWxlJiZtb2R1bGUuZXhwb3J0cz9tb2R1bGUuZXhwb3J0cz1uLlJvdXRpbmc6KGUuUm91dGluZz1uLlJvdXRpbmcsZS5mb3M9e1JvdXRlcjpuLlJvdXRlcn0pfSh0aGlzLGZ1bmN0aW9uKCl7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gZShlLHQpe2lmKCEoZSBpbnN0YW5jZW9mIHQpKXRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIil9dmFyIHQ9T2JqZWN0LmFzc2lnbnx8ZnVuY3Rpb24oZSl7Zm9yKHZhciB0PTE7dDxhcmd1bWVudHMubGVuZ3RoO3QrKyl7dmFyIG49YXJndW1lbnRzW3RdO2Zvcih2YXIgbyBpbiBuKU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChuLG8pJiYoZVtvXT1uW29dKX1yZXR1cm4gZX0sbj1cImZ1bmN0aW9uXCI9PXR5cGVvZiBTeW1ib2wmJlwic3ltYm9sXCI9PXR5cGVvZiBTeW1ib2wuaXRlcmF0b3I/ZnVuY3Rpb24oZSl7cmV0dXJuIHR5cGVvZiBlfTpmdW5jdGlvbihlKXtyZXR1cm4gZSYmXCJmdW5jdGlvblwiPT10eXBlb2YgU3ltYm9sJiZlLmNvbnN0cnVjdG9yPT09U3ltYm9sJiZlIT09U3ltYm9sLnByb3RvdHlwZT9cInN5bWJvbFwiOnR5cGVvZiBlfSxvPWZ1bmN0aW9uKCl7ZnVuY3Rpb24gZShlLHQpe2Zvcih2YXIgbj0wO248dC5sZW5ndGg7bisrKXt2YXIgbz10W25dO28uZW51bWVyYWJsZT1vLmVudW1lcmFibGV8fCExLG8uY29uZmlndXJhYmxlPSEwLFwidmFsdWVcImluIG8mJihvLndyaXRhYmxlPSEwKSxPYmplY3QuZGVmaW5lUHJvcGVydHkoZSxvLmtleSxvKX19cmV0dXJuIGZ1bmN0aW9uKHQsbixvKXtyZXR1cm4gbiYmZSh0LnByb3RvdHlwZSxuKSxvJiZlKHQsbyksdH19KCksaT1mdW5jdGlvbigpe2Z1bmN0aW9uIGkodCxuKXtlKHRoaXMsaSksdGhpcy5jb250ZXh0Xz10fHx7YmFzZV91cmw6XCJcIixwcmVmaXg6XCJcIixob3N0OlwiXCIscG9ydDpcIlwiLHNjaGVtZTpcIlwiLGxvY2FsZTpcIlwifSx0aGlzLnNldFJvdXRlcyhufHx7fSl9cmV0dXJuIG8oaSxbe2tleTpcInNldFJvdXRpbmdEYXRhXCIsdmFsdWU6ZnVuY3Rpb24oZSl7dGhpcy5zZXRCYXNlVXJsKGUuYmFzZV91cmwpLHRoaXMuc2V0Um91dGVzKGUucm91dGVzKSxcInByZWZpeFwiaW4gZSYmdGhpcy5zZXRQcmVmaXgoZS5wcmVmaXgpLFwicG9ydFwiaW4gZSYmdGhpcy5zZXRQb3J0KGUucG9ydCksXCJsb2NhbGVcImluIGUmJnRoaXMuc2V0TG9jYWxlKGUubG9jYWxlKSx0aGlzLnNldEhvc3QoZS5ob3N0KSx0aGlzLnNldFNjaGVtZShlLnNjaGVtZSl9fSx7a2V5Olwic2V0Um91dGVzXCIsdmFsdWU6ZnVuY3Rpb24oZSl7dGhpcy5yb3V0ZXNfPU9iamVjdC5mcmVlemUoZSl9fSx7a2V5OlwiZ2V0Um91dGVzXCIsdmFsdWU6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5yb3V0ZXNffX0se2tleTpcInNldEJhc2VVcmxcIix2YWx1ZTpmdW5jdGlvbihlKXt0aGlzLmNvbnRleHRfLmJhc2VfdXJsPWV9fSx7a2V5OlwiZ2V0QmFzZVVybFwiLHZhbHVlOmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuY29udGV4dF8uYmFzZV91cmx9fSx7a2V5Olwic2V0UHJlZml4XCIsdmFsdWU6ZnVuY3Rpb24oZSl7dGhpcy5jb250ZXh0Xy5wcmVmaXg9ZX19LHtrZXk6XCJzZXRTY2hlbWVcIix2YWx1ZTpmdW5jdGlvbihlKXt0aGlzLmNvbnRleHRfLnNjaGVtZT1lfX0se2tleTpcImdldFNjaGVtZVwiLHZhbHVlOmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuY29udGV4dF8uc2NoZW1lfX0se2tleTpcInNldEhvc3RcIix2YWx1ZTpmdW5jdGlvbihlKXt0aGlzLmNvbnRleHRfLmhvc3Q9ZX19LHtrZXk6XCJnZXRIb3N0XCIsdmFsdWU6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5jb250ZXh0Xy5ob3N0fX0se2tleTpcInNldFBvcnRcIix2YWx1ZTpmdW5jdGlvbihlKXt0aGlzLmNvbnRleHRfLnBvcnQ9ZX19LHtrZXk6XCJnZXRQb3J0XCIsdmFsdWU6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5jb250ZXh0Xy5wb3J0fX0se2tleTpcInNldExvY2FsZVwiLHZhbHVlOmZ1bmN0aW9uKGUpe3RoaXMuY29udGV4dF8ubG9jYWxlPWV9fSx7a2V5OlwiZ2V0TG9jYWxlXCIsdmFsdWU6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5jb250ZXh0Xy5sb2NhbGV9fSx7a2V5OlwiYnVpbGRRdWVyeVBhcmFtc1wiLHZhbHVlOmZ1bmN0aW9uKGUsdCxvKXt2YXIgaT10aGlzLHI9dm9pZCAwLHM9bmV3IFJlZ0V4cCgvXFxbXFxdJC8pO2lmKHQgaW5zdGFuY2VvZiBBcnJheSl0LmZvckVhY2goZnVuY3Rpb24odCxyKXtzLnRlc3QoZSk/byhlLHQpOmkuYnVpbGRRdWVyeVBhcmFtcyhlK1wiW1wiKyhcIm9iamVjdFwiPT09KFwidW5kZWZpbmVkXCI9PXR5cGVvZiB0P1widW5kZWZpbmVkXCI6bih0KSk/cjpcIlwiKStcIl1cIix0LG8pfSk7ZWxzZSBpZihcIm9iamVjdFwiPT09KFwidW5kZWZpbmVkXCI9PXR5cGVvZiB0P1widW5kZWZpbmVkXCI6bih0KSkpZm9yKHIgaW4gdCl0aGlzLmJ1aWxkUXVlcnlQYXJhbXMoZStcIltcIityK1wiXVwiLHRbcl0sbyk7ZWxzZSBvKGUsdCl9fSx7a2V5OlwiZ2V0Um91dGVcIix2YWx1ZTpmdW5jdGlvbihlKXt2YXIgdD10aGlzLmNvbnRleHRfLnByZWZpeCtlLG49ZStcIi5cIit0aGlzLmNvbnRleHRfLmxvY2FsZSxvPXRoaXMuY29udGV4dF8ucHJlZml4K2UrXCIuXCIrdGhpcy5jb250ZXh0Xy5sb2NhbGUsaT1bdCxuLG8sZV07Zm9yKHZhciByIGluIGkpaWYoaVtyXWluIHRoaXMucm91dGVzXylyZXR1cm4gdGhpcy5yb3V0ZXNfW2lbcl1dO3Rocm93IG5ldyBFcnJvcignVGhlIHJvdXRlIFwiJytlKydcIiBkb2VzIG5vdCBleGlzdC4nKX19LHtrZXk6XCJnZW5lcmF0ZVwiLHZhbHVlOmZ1bmN0aW9uKGUsbil7dmFyIG89YXJndW1lbnRzLmxlbmd0aD4yJiZ2b2lkIDAhPT1hcmd1bWVudHNbMl0mJmFyZ3VtZW50c1syXSxpPXRoaXMuZ2V0Um91dGUoZSkscj1ufHx7fSxzPXQoe30sciksdT1cIlwiLGM9ITAsYT1cIlwiLGY9XCJ1bmRlZmluZWRcIj09dHlwZW9mIHRoaXMuZ2V0UG9ydCgpfHxudWxsPT09dGhpcy5nZXRQb3J0KCk/XCJcIjp0aGlzLmdldFBvcnQoKTtpZihpLnRva2Vucy5mb3JFYWNoKGZ1bmN0aW9uKHQpe2lmKFwidGV4dFwiPT09dFswXSlyZXR1cm4gdT10WzFdK3Usdm9pZChjPSExKTt7aWYoXCJ2YXJpYWJsZVwiIT09dFswXSl0aHJvdyBuZXcgRXJyb3IoJ1RoZSB0b2tlbiB0eXBlIFwiJyt0WzBdKydcIiBpcyBub3Qgc3VwcG9ydGVkLicpO3ZhciBuPWkuZGVmYXVsdHMmJnRbM11pbiBpLmRlZmF1bHRzO2lmKCExPT09Y3x8IW58fHRbM11pbiByJiZyW3RbM11dIT1pLmRlZmF1bHRzW3RbM11dKXt2YXIgbz12b2lkIDA7aWYodFszXWluIHIpbz1yW3RbM11dLGRlbGV0ZSBzW3RbM11dO2Vsc2V7aWYoIW4pe2lmKGMpcmV0dXJuO3Rocm93IG5ldyBFcnJvcignVGhlIHJvdXRlIFwiJytlKydcIiByZXF1aXJlcyB0aGUgcGFyYW1ldGVyIFwiJyt0WzNdKydcIi4nKX1vPWkuZGVmYXVsdHNbdFszXV19dmFyIGE9ITA9PT1vfHwhMT09PW98fFwiXCI9PT1vO2lmKCFhfHwhYyl7dmFyIGY9ZW5jb2RlVVJJQ29tcG9uZW50KG8pLnJlcGxhY2UoLyUyRi9nLFwiL1wiKTtcIm51bGxcIj09PWYmJm51bGw9PT1vJiYoZj1cIlwiKSx1PXRbMV0rZit1fWM9ITF9ZWxzZSBuJiZ0WzNdaW4gcyYmZGVsZXRlIHNbdFszXV19fSksXCJcIj09PXUmJih1PVwiL1wiKSxpLmhvc3R0b2tlbnMuZm9yRWFjaChmdW5jdGlvbihlKXt2YXIgdD12b2lkIDA7cmV0dXJuXCJ0ZXh0XCI9PT1lWzBdP3ZvaWQoYT1lWzFdK2EpOnZvaWQoXCJ2YXJpYWJsZVwiPT09ZVswXSYmKGVbM11pbiByPyh0PXJbZVszXV0sZGVsZXRlIHNbZVszXV0pOmkuZGVmYXVsdHMmJmVbM11pbiBpLmRlZmF1bHRzJiYodD1pLmRlZmF1bHRzW2VbM11dKSxhPWVbMV0rdCthKSl9KSx1PXRoaXMuY29udGV4dF8uYmFzZV91cmwrdSxpLnJlcXVpcmVtZW50cyYmXCJfc2NoZW1lXCJpbiBpLnJlcXVpcmVtZW50cyYmdGhpcy5nZXRTY2hlbWUoKSE9aS5yZXF1aXJlbWVudHMuX3NjaGVtZT91PWkucmVxdWlyZW1lbnRzLl9zY2hlbWUrXCI6Ly9cIisoYXx8dGhpcy5nZXRIb3N0KCkpK3U6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIGkuc2NoZW1lcyYmXCJ1bmRlZmluZWRcIiE9dHlwZW9mIGkuc2NoZW1lc1swXSYmdGhpcy5nZXRTY2hlbWUoKSE9PWkuc2NoZW1lc1swXT91PWkuc2NoZW1lc1swXStcIjovL1wiKyhhfHx0aGlzLmdldEhvc3QoKSkrdTphJiZ0aGlzLmdldEhvc3QoKSE9PWErKFwiXCI9PT1mP1wiXCI6XCI6XCIrZik/dT10aGlzLmdldFNjaGVtZSgpK1wiOi8vXCIrYSsoXCJcIj09PWY/XCJcIjpcIjpcIitmKSt1Om89PT0hMCYmKHU9dGhpcy5nZXRTY2hlbWUoKStcIjovL1wiK3RoaXMuZ2V0SG9zdCgpK3UpLE9iamVjdC5rZXlzKHMpLmxlbmd0aD4wKXt2YXIgbD12b2lkIDAsaD1bXSx5PWZ1bmN0aW9uKGUsdCl7dD1cImZ1bmN0aW9uXCI9PXR5cGVvZiB0P3QoKTp0LHQ9bnVsbD09PXQ/XCJcIjp0LGgucHVzaChlbmNvZGVVUklDb21wb25lbnQoZSkrXCI9XCIrZW5jb2RlVVJJQ29tcG9uZW50KHQpKX07Zm9yKGwgaW4gcyl0aGlzLmJ1aWxkUXVlcnlQYXJhbXMobCxzW2xdLHkpO3U9dStcIj9cIitoLmpvaW4oXCImXCIpLnJlcGxhY2UoLyUyMC9nLFwiK1wiKX1yZXR1cm4gdX19XSxbe2tleTpcImdldEluc3RhbmNlXCIsdmFsdWU6ZnVuY3Rpb24oKXtyZXR1cm4gcn19LHtrZXk6XCJzZXREYXRhXCIsdmFsdWU6ZnVuY3Rpb24oZSl7dmFyIHQ9aS5nZXRJbnN0YW5jZSgpO3Quc2V0Um91dGluZ0RhdGEoZSl9fV0pLGl9KCk7aS5Sb3V0ZSxpLkNvbnRleHQ7dmFyIHI9bmV3IGk7cmV0dXJue1JvdXRlcjppLFJvdXRpbmc6cn19KTsiXSwic291cmNlUm9vdCI6IiJ9