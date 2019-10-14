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
  };

  if ($departement.val()) {
    // $commune.empty()
    var departementId = $departement.val();
    var routeCommune = _routes__WEBPACK_IMPORTED_MODULE_1__["default"].generate('villes_d_un_departement', {
      departement: departementId
    });
    $.get(routeCommune).then(function (data) {
      //console.log("==ajax dep===" + data )
      $departement.empty();
      $.each(data, function (optVal, text) {
        // console.log(text.nom + "," +text.id)
        //  $commune.prepend(`<option value='${text.id}' >${text.nom}</option>`);
        var o = new Option(text.nom, text.id); //  o.selected=true;

        $('#contact_commune').append(o); // $commune.append(o);
      }); // $departement.empty()
      //  $response(data, $commune)
    });
  } //recherche des communes correspondant au département sélectionné


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
        if (data.length == 0) alert("Il n'existe aucune ville pour ce département"); //  if( data ){
        //  $commune.empty()
        //ajout des communes rétournées par AJAX dans la liste déroulante des communes

        $response(data, $commune); // }
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
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var _routes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./routes */ "./assets/js/routes.js");

$(function () {
  var $region = $('#contact_region');
  var $departement = $('#contact_departement');
  var $commune = $('#contact_commune'); //peuplement des champs select (region, département)

  var $response = function $response(data, $select) {
    // $('#contact_departement').empty()

    /*
                $select.prepend(`<option value='${text["id"]}' >${text["nom"]}</option>`);
      */
    $.each(data, function (optVal, text) {
      var o = new Option(text.nom, text.id); // o.selected=true;

      $($select).append(o);
    });
  }; //lorsqu'une région est sélectionnée par défaut(ex refresh de la page), on réaffiche ses départements


  if ($region.val()) {
    var value = $region.val(); // if(!value)
    // console.log("=========non null=========");

    var departement_route = _routes__WEBPACK_IMPORTED_MODULE_0__["default"].generate("departements_d_une_region", {
      region: value
    }); // $.get(`http://127.0.0.1:8000/departements/${value}`).then( (data)=>{

    $.get(departement_route).then(function (data) {
      // $departement.empty()
      $response(data, $departement);
    }); // ========================chargement villes
    // if($departement.val() ){
    // $commune.empty()
    //======================
  }

  $(document).on('change', ' #contact_region', function () {
    var $field = $(this);
    $commune.empty(); // $departement.empty()

    var value = $region.val();
    var $regionField = $('#contact_region');
    var $form = $field.closest('form');
    var departement_route = _routes__WEBPACK_IMPORTED_MODULE_0__["default"].generate("departements_d_une_region", {
      region: value
    }); // $.get(`http://127.0.0.1:8000/departements/${value}`).then( (data)=>{

    $.get(departement_route).then(function (data) {
      console.log("region select =" + $departement.val());
      $departement.empty();
      $departement.append(new Option("Sélectionnez votre département", ""));
      $response(data, $departement);
      console.log(data);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvYXBwLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy9jb21tdW5lcy5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvZGVwYXJ0ZW1lbnRzLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy9yb3V0ZXMuanMiLCJ3ZWJwYWNrOi8vLy4vdmVuZG9yL2ZyaWVuZHNvZnN5bWZvbnkvanNyb3V0aW5nLWJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2pzL3JvdXRlci5taW4uanMiXSwibmFtZXMiOlsid2luZG93IiwiJCIsIkpRdWVyeSIsInJlcXVpcmUiLCIkcmVnaW9uIiwiJGRlcGFydGVtZW50IiwiJGNvbW11bmUiLCIkcmVzcG9uc2UiLCJkYXRhIiwiJHNlbGVjdCIsImVhY2giLCJvcHRWYWwiLCJ0ZXh0IiwicHJlcGVuZCIsInZhbCIsImRlcGFydGVtZW50SWQiLCJyb3V0ZUNvbW11bmUiLCJSb3V0aW5nIiwiZ2VuZXJhdGUiLCJkZXBhcnRlbWVudCIsImdldCIsInRoZW4iLCJlbXB0eSIsIm8iLCJPcHRpb24iLCJub20iLCJpZCIsImFwcGVuZCIsImRvY3VtZW50Iiwib24iLCIkZmllbGQiLCJ2YWx1ZSIsImFqYXgiLCJ1cmwiLCJ0eXBlIiwic3VjY2VzcyIsImxlbmd0aCIsImFsZXJ0IiwiZGVwYXJ0ZW1lbnRfcm91dGUiLCJyZWdpb24iLCIkcmVnaW9uRmllbGQiLCIkZm9ybSIsImNsb3Nlc3QiLCJjb25zb2xlIiwibG9nIiwicm91dGVzIiwic2V0Um91dGluZ0RhdGEiLCJlIiwidCIsIm4iLCJkZWZpbmUiLCJUeXBlRXJyb3IiLCJPYmplY3QiLCJhc3NpZ24iLCJhcmd1bWVudHMiLCJwcm90b3R5cGUiLCJoYXNPd25Qcm9wZXJ0eSIsImNhbGwiLCJTeW1ib2wiLCJpdGVyYXRvciIsImNvbnN0cnVjdG9yIiwiZW51bWVyYWJsZSIsImNvbmZpZ3VyYWJsZSIsIndyaXRhYmxlIiwiZGVmaW5lUHJvcGVydHkiLCJrZXkiLCJpIiwiY29udGV4dF8iLCJiYXNlX3VybCIsInByZWZpeCIsImhvc3QiLCJwb3J0Iiwic2NoZW1lIiwibG9jYWxlIiwic2V0Um91dGVzIiwic2V0QmFzZVVybCIsInNldFByZWZpeCIsInNldFBvcnQiLCJzZXRMb2NhbGUiLCJzZXRIb3N0Iiwic2V0U2NoZW1lIiwicm91dGVzXyIsImZyZWV6ZSIsInIiLCJzIiwiUmVnRXhwIiwiQXJyYXkiLCJmb3JFYWNoIiwidGVzdCIsImJ1aWxkUXVlcnlQYXJhbXMiLCJFcnJvciIsImdldFJvdXRlIiwidSIsImMiLCJhIiwiZiIsImdldFBvcnQiLCJ0b2tlbnMiLCJkZWZhdWx0cyIsImVuY29kZVVSSUNvbXBvbmVudCIsInJlcGxhY2UiLCJob3N0dG9rZW5zIiwicmVxdWlyZW1lbnRzIiwiZ2V0U2NoZW1lIiwiX3NjaGVtZSIsImdldEhvc3QiLCJzY2hlbWVzIiwia2V5cyIsImwiLCJoIiwieSIsInB1c2giLCJqb2luIiwiZ2V0SW5zdGFuY2UiLCJSb3V0ZSIsIkNvbnRleHQiLCJSb3V0ZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFFQUE7QUFBQUE7QUFBQUE7QUFBQUE7QUFBQUE7QUFBQUEsTUFBTSxDQUFDQyxDQUFQLEdBQVdELE1BQU0sQ0FBQ0UsTUFBUCxHQUFnQkMsbUJBQU8sQ0FBQyxvREFBRCxDQUFsQyxDLENBRUE7O0FBQ0E7Ozs7O0FBTUE7O0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDYkE7O0FBR0EsQ0FBQyxZQUFZO0FBR1QsTUFBSUMsT0FBTyxHQUFHSCxDQUFDLENBQUMsaUJBQUQsQ0FBZjtBQUNBLE1BQUlJLFlBQVksR0FBR0osQ0FBQyxDQUFDLHNCQUFELENBQXBCO0FBQ0EsTUFBSUssUUFBUSxHQUFHTCxDQUFDLENBQUMsa0JBQUQsQ0FBaEIsQ0FMUyxDQU9UOztBQUNBLE1BQUlNLFNBQVMsR0FBRyxTQUFaQSxTQUFZLENBQUVDLElBQUYsRUFBUUMsT0FBUixFQUFxQjtBQUNqQ1IsS0FBQyxDQUFDUyxJQUFGLENBQU9G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QUFKLElBQVN4QixDQUFUO0FBQVcsaUJBQUtLLGdCQUFMLENBQXNCbUIsQ0FBdEIsRUFBd0J4QixDQUFDLENBQUN3QixDQUFELENBQXpCLEVBQTZCRSxDQUE3QjtBQUFYOztBQUEyQ2xCLFdBQUMsR0FBQ0EsQ0FBQyxHQUFDLEdBQUYsR0FBTWlCLENBQUMsQ0FBQ0csSUFBRixDQUFPLEdBQVAsRUFBWVosT0FBWixDQUFvQixNQUFwQixFQUEyQixHQUEzQixDQUFSO0FBQXdDOztBQUFBLGVBQU9SLENBQVA7QUFBUztBQUFyc0QsS0FBNXBELENBQUgsRUFBdTJHLENBQUM7QUFBQzNCLFNBQUcsRUFBQyxhQUFMO0FBQW1CbEMsV0FBSyxFQUFDLGlCQUFVO0FBQUMsZUFBT29ELENBQVA7QUFBUztBQUE3QyxLQUFELEVBQWdEO0FBQUNsQixTQUFHLEVBQUMsU0FBTDtBQUFlbEMsV0FBSyxFQUFDLGVBQVNnQixDQUFULEVBQVc7QUFBQyxZQUFJQyxDQUFDLEdBQUNrQixDQUFDLENBQUMrQyxXQUFGLEVBQU47QUFBc0JqRSxTQUFDLENBQUNGLGNBQUYsQ0FBaUJDLENBQWpCO0FBQW9CO0FBQTNFLEtBQWhELENBQXYyRyxDQUFELEVBQXUrR21CLENBQTkrRztBQUFnL0csR0FBeG5ILEVBQTNtQjs7QUFBc3VJQSxHQUFDLENBQUNnRCxLQUFGLEVBQVFoRCxDQUFDLENBQUNpRCxPQUFWO0FBQWtCLE1BQUloQyxDQUFDLEdBQUMsSUFBSWpCLENBQUosRUFBTjtBQUFZLFNBQU07QUFBQ2tELFVBQU0sRUFBQ2xELENBQVI7QUFBVWpELFdBQU8sRUFBQ2tFO0FBQWxCLEdBQU47QUFBMkIsQ0FBN2xKLENBQUQsQyIsImZpbGUiOiJqcy9hcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcblxud2luZG93LiQgPSB3aW5kb3cuSlF1ZXJ5ID0gcmVxdWlyZSgnanF1ZXJ5Jyk7XG5cbi8vIGxvYWRzIHRoZSBCb290c3RyYXAgalF1ZXJ5IHBsdWdpbnNcbi8qaW1wb3J0ICdib290c3RyYXAtc2Fzcy9hc3NldHMvamF2YXNjcmlwdHMvYm9vdHN0cmFwL3RyYW5zaXRpb24uanMnO1xuaW1wb3J0ICdib290c3RyYXAtc2Fzcy9hc3NldHMvamF2YXNjcmlwdHMvYm9vdHN0cmFwL2FsZXJ0LmpzJztcbmltcG9ydCAnYm9vdHN0cmFwLXNhc3MvYXNzZXRzL2phdmFzY3JpcHRzL2Jvb3RzdHJhcC9jb2xsYXBzZS5qcyc7XG5pbXBvcnQgJ2Jvb3RzdHJhcC1zYXNzL2Fzc2V0cy9qYXZhc2NyaXB0cy9ib290c3RyYXAvZHJvcGRvd24uanMnO1xuaW1wb3J0ICdib290c3RyYXAtc2Fzcy9hc3NldHMvamF2YXNjcmlwdHMvYm9vdHN0cmFwL21vZGFsLmpzJzsqL1xuXG4vLyBpbXBvcnQgJ2Jvb3RzdHJhcCdcbmltcG9ydCAnYm9vdHN0cmFwL2Rpc3QvanMvYm9vdHN0cmFwLm1pbidcbmltcG9ydCAnLi9kZXBhcnRlbWVudHMnXG5pbXBvcnQgJy4vY29tbXVuZXMnIiwiaW1wb3J0IFJvdXRpbmcgZnJvbSAnLi9yb3V0ZXMnXG5cblxuKGZ1bmN0aW9uICgpIHtcblxuXG4gICAgbGV0ICRyZWdpb24gPSAkKCcjY29udGFjdF9yZWdpb24nKTtcbiAgICBsZXQgJGRlcGFydGVtZW50ID0gJCgnI2NvbnRhY3RfZGVwYXJ0ZW1lbnQnKTtcbiAgICBsZXQgJGNvbW11bmUgPSAkKCcjY29udGFjdF9jb21tdW5lJyk7XG5cbiAgICAvL2NoYXJnZW1lbnQgZGUgbGEgbGlzdGUgZGVzIGTDqXBhcnRlbWVudHNcbiAgICBsZXQgJHJlc3BvbnNlID0gKCBkYXRhLCAkc2VsZWN0ICkgPT4ge1xuICAgICAgICAkLmVhY2goZGF0YSwgZnVuY3Rpb24ob3B0VmFsLCB0ZXh0KSB7XG4gICAgICAgICAgICAkc2VsZWN0LnByZXBlbmQoYDxvcHRpb24gdmFsdWU9JyR7dGV4dFtcImlkXCJdfScgPiR7dGV4dFtcIm5vbVwiXX08L29wdGlvbj5gKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYoJGRlcGFydGVtZW50LnZhbCgpICl7XG4gICAgICAgLy8gJGNvbW11bmUuZW1wdHkoKVxuXG4gICAgICAgIGNvbnN0IGRlcGFydGVtZW50SWQgPSAkZGVwYXJ0ZW1lbnQudmFsKClcbiAgICAgICAgbGV0IHJvdXRlQ29tbXVuZSA9IFJvdXRpbmcuZ2VuZXJhdGUoJ3ZpbGxlc19kX3VuX2RlcGFydGVtZW50Jyx7IGRlcGFydGVtZW50OiBkZXBhcnRlbWVudElkIH0pXG4gICAgICAgICQuZ2V0KHJvdXRlQ29tbXVuZSkudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIj09YWpheCBkZXA9PT1cIiArIGRhdGEgKVxuXG4gICAgICAgICAgJGRlcGFydGVtZW50LmVtcHR5KClcblxuICAgICAgICAgICAgJC5lYWNoKGRhdGEsIGZ1bmN0aW9uKG9wdFZhbCwgdGV4dCkge1xuICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2codGV4dC5ub20gKyBcIixcIiArdGV4dC5pZClcbiAgICAgICAgICAgICAgLy8gICRjb21tdW5lLnByZXBlbmQoYDxvcHRpb24gdmFsdWU9JyR7dGV4dC5pZH0nID4ke3RleHQubm9tfTwvb3B0aW9uPmApO1xuXG4gICAgICAgICAgICAgICAgbGV0IG8gPSBuZXcgT3B0aW9uKHRleHQubm9tLCB0ZXh0LmlkICk7XG4gICAgICAgICAgICAgIC8vICBvLnNlbGVjdGVkPXRydWU7XG4gICAgICAgICAgICAgICAgJCgnI2NvbnRhY3RfY29tbXVuZScpLmFwcGVuZChvKTtcbiAgICAgICAgICAgICAgICAvLyAkY29tbXVuZS5hcHBlbmQobyk7XG4gICAgICAgICAgICB9KTtcblxuXG4gICAgICAgICAgICAvLyAkZGVwYXJ0ZW1lbnQuZW1wdHkoKVxuICAgICAgICAgIC8vICAkcmVzcG9uc2UoZGF0YSwgJGNvbW11bmUpXG4gICAgICAgIH0pXG5cbiAgICB9XG5cblxuXG4vL3JlY2hlcmNoZSBkZXMgY29tbXVuZXMgY29ycmVzcG9uZGFudCBhdSBkw6lwYXJ0ZW1lbnQgc8OpbGVjdGlvbm7DqVxuICAgICQoZG9jdW1lbnQpLm9uKCdjaGFuZ2UnLCAnICNjb250YWN0X2RlcGFydGVtZW50JywgZnVuY3Rpb24gKCkge1xuICAgICAgICBsZXQgJGZpZWxkID0gJCh0aGlzKVxuICAgICAgICBsZXQgdmFsdWU9JGZpZWxkLnZhbCgpXG4gICAgICAgICRjb21tdW5lLmVtcHR5KClcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgIC8vICB1cmw6IGBodHRwOi8vMTI3LjAuMC4xOjgwMDAvY29tbXVuZXMvJHt2YWx1ZX1gLFxuXG4gICAgICAgICAgICB1cmw6ICBSb3V0aW5nLmdlbmVyYXRlKCd2aWxsZXNfZF91bl9kZXBhcnRlbWVudCcseyBkZXBhcnRlbWVudDogdmFsdWUgfSksXG4gICAgICAgICAgICB0eXBlOiAnR0VUJyxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgaWYoZGF0YS5sZW5ndGggPT0wICkgYWxlcnQoXCJJbCBuJ2V4aXN0ZSBhdWN1bmUgdmlsbGUgcG91ciBjZSBkw6lwYXJ0ZW1lbnRcIilcblxuICAgICAgICAgICAgICAvLyAgaWYoIGRhdGEgKXtcbiAgICAgICAgICAgICAgICAgIC8vICAkY29tbXVuZS5lbXB0eSgpXG4gICAgICAgICAgICAgICAgICAgIC8vYWpvdXQgZGVzIGNvbW11bmVzIHLDqXRvdXJuw6llcyBwYXIgQUpBWCBkYW5zIGxhIGxpc3RlIGTDqXJvdWxhbnRlIGRlcyBjb21tdW5lc1xuICAgICAgICAgICAgICAgICAgICAkcmVzcG9uc2UoIGRhdGEsICRjb21tdW5lIClcbiAgICAgICAgICAgICAgIC8vIH1cblxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgIH0pO1xuXG59KSgpIiwiaW1wb3J0IFJvdXRpbmcgZnJvbSAnLi9yb3V0ZXMnXG5cblxuJChmdW5jdGlvbiAoKSB7XG5cbiAgICBsZXQgJHJlZ2lvbiA9ICQoJyNjb250YWN0X3JlZ2lvbicpO1xuICAgIGxldCAkZGVwYXJ0ZW1lbnQgPSAkKCcjY29udGFjdF9kZXBhcnRlbWVudCcpO1xuICAgIGxldCAkY29tbXVuZSA9ICQoJyNjb250YWN0X2NvbW11bmUnKTtcblxuXG4gICAgLy9wZXVwbGVtZW50IGRlcyBjaGFtcHMgc2VsZWN0IChyZWdpb24sIGTDqXBhcnRlbWVudClcbiAgICBsZXQgJHJlc3BvbnNlID0gKGRhdGEsICRzZWxlY3QpID0+IHtcbiAgICAgICAgLy8gJCgnI2NvbnRhY3RfZGVwYXJ0ZW1lbnQnKS5lbXB0eSgpXG4gICAgICAgIC8qXG4gICAgICAgICAgICAgICAgICAgICRzZWxlY3QucHJlcGVuZChgPG9wdGlvbiB2YWx1ZT0nJHt0ZXh0W1wiaWRcIl19JyA+JHt0ZXh0W1wibm9tXCJdfTwvb3B0aW9uPmApO1xuXG4gICAgICAgICAqL1xuXG5cbiAgICAgICAgJC5lYWNoKGRhdGEsIGZ1bmN0aW9uIChvcHRWYWwsIHRleHQpIHtcbiAgICAgICAgICAgIGxldCBvID0gbmV3IE9wdGlvbih0ZXh0Lm5vbSwgdGV4dC5pZCk7XG4gICAgICAgICAgICAvLyBvLnNlbGVjdGVkPXRydWU7XG4gICAgICAgICAgICAkKCRzZWxlY3QpLmFwcGVuZChvKTtcblxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvL2xvcnNxdSd1bmUgcsOpZ2lvbiBlc3Qgc8OpbGVjdGlvbm7DqWUgcGFyIGTDqWZhdXQoZXggcmVmcmVzaCBkZSBsYSBwYWdlKSwgb24gcsOpYWZmaWNoZSBzZXMgZMOpcGFydGVtZW50c1xuICAgIGlmICgkcmVnaW9uLnZhbCgpKSB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gJHJlZ2lvbi52YWwoKVxuICAgICAgICAvLyBpZighdmFsdWUpXG5cbiAgICAgICAgLy8gY29uc29sZS5sb2coXCI9PT09PT09PT1ub24gbnVsbD09PT09PT09PVwiKTtcblxuICAgICAgICBsZXQgZGVwYXJ0ZW1lbnRfcm91dGUgPSBSb3V0aW5nLmdlbmVyYXRlKFwiZGVwYXJ0ZW1lbnRzX2RfdW5lX3JlZ2lvblwiLCB7cmVnaW9uOiB2YWx1ZX0pO1xuXG5cbiAgICAgICAgLy8gJC5nZXQoYGh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9kZXBhcnRlbWVudHMvJHt2YWx1ZX1gKS50aGVuKCAoZGF0YSk9PntcbiAgICAgICAgJC5nZXQoZGVwYXJ0ZW1lbnRfcm91dGUpLnRoZW4oKGRhdGEpID0+IHtcblxuICAgICAgICAgICAgLy8gJGRlcGFydGVtZW50LmVtcHR5KClcbiAgICAgICAgICAgICRyZXNwb25zZShkYXRhLCAkZGVwYXJ0ZW1lbnQpXG4gICAgICAgIH0pXG5cblxuICAgICAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT1jaGFyZ2VtZW50IHZpbGxlc1xuICAgICAgICAvLyBpZigkZGVwYXJ0ZW1lbnQudmFsKCkgKXtcbiAgICAgICAgLy8gJGNvbW11bmUuZW1wdHkoKVxuXG5cbiAgICAgICAgLy89PT09PT09PT09PT09PT09PT09PT09XG5cbiAgICB9XG5cblxuICAgICQoZG9jdW1lbnQpLm9uKCdjaGFuZ2UnLCAnICNjb250YWN0X3JlZ2lvbicsIGZ1bmN0aW9uICgpIHtcblxuICAgICAgICBsZXQgJGZpZWxkID0gJCh0aGlzKVxuICAgICAgICAkY29tbXVuZS5lbXB0eSgpXG4gICAgICAgIC8vICRkZXBhcnRlbWVudC5lbXB0eSgpXG5cbiAgICAgICAgY29uc3QgdmFsdWUgPSAkcmVnaW9uLnZhbCgpXG5cblxuICAgICAgICBsZXQgJHJlZ2lvbkZpZWxkID0gJCgnI2NvbnRhY3RfcmVnaW9uJylcbiAgICAgICAgbGV0ICRmb3JtID0gJGZpZWxkLmNsb3Nlc3QoJ2Zvcm0nKVxuXG4gICAgICAgIGxldCBkZXBhcnRlbWVudF9yb3V0ZSA9IFJvdXRpbmcuZ2VuZXJhdGUoXCJkZXBhcnRlbWVudHNfZF91bmVfcmVnaW9uXCIsIHtyZWdpb246IHZhbHVlfSk7XG5cblxuICAgICAgICAvLyAkLmdldChgaHR0cDovLzEyNy4wLjAuMTo4MDAwL2RlcGFydGVtZW50cy8ke3ZhbHVlfWApLnRoZW4oIChkYXRhKT0+e1xuICAgICAgICAkLmdldChkZXBhcnRlbWVudF9yb3V0ZSkudGhlbigoZGF0YSkgPT4ge1xuXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInJlZ2lvbiBzZWxlY3QgPVwiICsgJGRlcGFydGVtZW50LnZhbCgpKVxuICAgICAgICAgICAgJGRlcGFydGVtZW50LmVtcHR5KClcbiAgICAgICAgICAgICRkZXBhcnRlbWVudC5hcHBlbmQobmV3IE9wdGlvbihcIlPDqWxlY3Rpb25uZXogdm90cmUgZMOpcGFydGVtZW50XCIsIFwiXCIpKTtcblxuXG4gICAgICAgICAgICAkcmVzcG9uc2UoZGF0YSwgJGRlcGFydGVtZW50KTtcblxuXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKVxuICAgICAgICB9KVxuXG5cbiAgICB9KTtcblxuXG4gICBcblxufSkiLCJcblxuY29uc3Qgcm91dGVzID0gcmVxdWlyZSgnLi4vLi4vcHVibGljL2pzL2Zvc19qc19yb3V0ZXMuanNvbicpO1xuaW1wb3J0IFJvdXRpbmcgZnJvbSAnLi4vLi4vdmVuZG9yL2ZyaWVuZHNvZnN5bWZvbnkvanNyb3V0aW5nLWJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2pzL3JvdXRlci5taW4uanMnO1xuUm91dGluZy5zZXRSb3V0aW5nRGF0YShyb3V0ZXMpO1xuXG5cblxuZXhwb3J0IGRlZmF1bHQgUm91dGluZ1xuIiwiIWZ1bmN0aW9uKGUsdCl7dmFyIG49dCgpO1wiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZD9kZWZpbmUoW10sbi5Sb3V0aW5nKTpcIm9iamVjdFwiPT10eXBlb2YgbW9kdWxlJiZtb2R1bGUuZXhwb3J0cz9tb2R1bGUuZXhwb3J0cz1uLlJvdXRpbmc6KGUuUm91dGluZz1uLlJvdXRpbmcsZS5mb3M9e1JvdXRlcjpuLlJvdXRlcn0pfSh0aGlzLGZ1bmN0aW9uKCl7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gZShlLHQpe2lmKCEoZSBpbnN0YW5jZW9mIHQpKXRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIil9dmFyIHQ9T2JqZWN0LmFzc2lnbnx8ZnVuY3Rpb24oZSl7Zm9yKHZhciB0PTE7dDxhcmd1bWVudHMubGVuZ3RoO3QrKyl7dmFyIG49YXJndW1lbnRzW3RdO2Zvcih2YXIgbyBpbiBuKU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChuLG8pJiYoZVtvXT1uW29dKX1yZXR1cm4gZX0sbj1cImZ1bmN0aW9uXCI9PXR5cGVvZiBTeW1ib2wmJlwic3ltYm9sXCI9PXR5cGVvZiBTeW1ib2wuaXRlcmF0b3I/ZnVuY3Rpb24oZSl7cmV0dXJuIHR5cGVvZiBlfTpmdW5jdGlvbihlKXtyZXR1cm4gZSYmXCJmdW5jdGlvblwiPT10eXBlb2YgU3ltYm9sJiZlLmNvbnN0cnVjdG9yPT09U3ltYm9sJiZlIT09U3ltYm9sLnByb3RvdHlwZT9cInN5bWJvbFwiOnR5cGVvZiBlfSxvPWZ1bmN0aW9uKCl7ZnVuY3Rpb24gZShlLHQpe2Zvcih2YXIgbj0wO248dC5sZW5ndGg7bisrKXt2YXIgbz10W25dO28uZW51bWVyYWJsZT1vLmVudW1lcmFibGV8fCExLG8uY29uZmlndXJhYmxlPSEwLFwidmFsdWVcImluIG8mJihvLndyaXRhYmxlPSEwKSxPYmplY3QuZGVmaW5lUHJvcGVydHkoZSxvLmtleSxvKX19cmV0dXJuIGZ1bmN0aW9uKHQsbixvKXtyZXR1cm4gbiYmZSh0LnByb3RvdHlwZSxuKSxvJiZlKHQsbyksdH19KCksaT1mdW5jdGlvbigpe2Z1bmN0aW9uIGkodCxuKXtlKHRoaXMsaSksdGhpcy5jb250ZXh0Xz10fHx7YmFzZV91cmw6XCJcIixwcmVmaXg6XCJcIixob3N0OlwiXCIscG9ydDpcIlwiLHNjaGVtZTpcIlwiLGxvY2FsZTpcIlwifSx0aGlzLnNldFJvdXRlcyhufHx7fSl9cmV0dXJuIG8oaSxbe2tleTpcInNldFJvdXRpbmdEYXRhXCIsdmFsdWU6ZnVuY3Rpb24oZSl7dGhpcy5zZXRCYXNlVXJsKGUuYmFzZV91cmwpLHRoaXMuc2V0Um91dGVzKGUucm91dGVzKSxcInByZWZpeFwiaW4gZSYmdGhpcy5zZXRQcmVmaXgoZS5wcmVmaXgpLFwicG9ydFwiaW4gZSYmdGhpcy5zZXRQb3J0KGUucG9ydCksXCJsb2NhbGVcImluIGUmJnRoaXMuc2V0TG9jYWxlKGUubG9jYWxlKSx0aGlzLnNldEhvc3QoZS5ob3N0KSx0aGlzLnNldFNjaGVtZShlLnNjaGVtZSl9fSx7a2V5Olwic2V0Um91dGVzXCIsdmFsdWU6ZnVuY3Rpb24oZSl7dGhpcy5yb3V0ZXNfPU9iamVjdC5mcmVlemUoZSl9fSx7a2V5OlwiZ2V0Um91dGVzXCIsdmFsdWU6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5yb3V0ZXNffX0se2tleTpcInNldEJhc2VVcmxcIix2YWx1ZTpmdW5jdGlvbihlKXt0aGlzLmNvbnRleHRfLmJhc2VfdXJsPWV9fSx7a2V5OlwiZ2V0QmFzZVVybFwiLHZhbHVlOmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuY29udGV4dF8uYmFzZV91cmx9fSx7a2V5Olwic2V0UHJlZml4XCIsdmFsdWU6ZnVuY3Rpb24oZSl7dGhpcy5jb250ZXh0Xy5wcmVmaXg9ZX19LHtrZXk6XCJzZXRTY2hlbWVcIix2YWx1ZTpmdW5jdGlvbihlKXt0aGlzLmNvbnRleHRfLnNjaGVtZT1lfX0se2tleTpcImdldFNjaGVtZVwiLHZhbHVlOmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuY29udGV4dF8uc2NoZW1lfX0se2tleTpcInNldEhvc3RcIix2YWx1ZTpmdW5jdGlvbihlKXt0aGlzLmNvbnRleHRfLmhvc3Q9ZX19LHtrZXk6XCJnZXRIb3N0XCIsdmFsdWU6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5jb250ZXh0Xy5ob3N0fX0se2tleTpcInNldFBvcnRcIix2YWx1ZTpmdW5jdGlvbihlKXt0aGlzLmNvbnRleHRfLnBvcnQ9ZX19LHtrZXk6XCJnZXRQb3J0XCIsdmFsdWU6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5jb250ZXh0Xy5wb3J0fX0se2tleTpcInNldExvY2FsZVwiLHZhbHVlOmZ1bmN0aW9uKGUpe3RoaXMuY29udGV4dF8ubG9jYWxlPWV9fSx7a2V5OlwiZ2V0TG9jYWxlXCIsdmFsdWU6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5jb250ZXh0Xy5sb2NhbGV9fSx7a2V5OlwiYnVpbGRRdWVyeVBhcmFtc1wiLHZhbHVlOmZ1bmN0aW9uKGUsdCxvKXt2YXIgaT10aGlzLHI9dm9pZCAwLHM9bmV3IFJlZ0V4cCgvXFxbXFxdJC8pO2lmKHQgaW5zdGFuY2VvZiBBcnJheSl0LmZvckVhY2goZnVuY3Rpb24odCxyKXtzLnRlc3QoZSk/byhlLHQpOmkuYnVpbGRRdWVyeVBhcmFtcyhlK1wiW1wiKyhcIm9iamVjdFwiPT09KFwidW5kZWZpbmVkXCI9PXR5cGVvZiB0P1widW5kZWZpbmVkXCI6bih0KSk/cjpcIlwiKStcIl1cIix0LG8pfSk7ZWxzZSBpZihcIm9iamVjdFwiPT09KFwidW5kZWZpbmVkXCI9PXR5cGVvZiB0P1widW5kZWZpbmVkXCI6bih0KSkpZm9yKHIgaW4gdCl0aGlzLmJ1aWxkUXVlcnlQYXJhbXMoZStcIltcIityK1wiXVwiLHRbcl0sbyk7ZWxzZSBvKGUsdCl9fSx7a2V5OlwiZ2V0Um91dGVcIix2YWx1ZTpmdW5jdGlvbihlKXt2YXIgdD10aGlzLmNvbnRleHRfLnByZWZpeCtlLG49ZStcIi5cIit0aGlzLmNvbnRleHRfLmxvY2FsZSxvPXRoaXMuY29udGV4dF8ucHJlZml4K2UrXCIuXCIrdGhpcy5jb250ZXh0Xy5sb2NhbGUsaT1bdCxuLG8sZV07Zm9yKHZhciByIGluIGkpaWYoaVtyXWluIHRoaXMucm91dGVzXylyZXR1cm4gdGhpcy5yb3V0ZXNfW2lbcl1dO3Rocm93IG5ldyBFcnJvcignVGhlIHJvdXRlIFwiJytlKydcIiBkb2VzIG5vdCBleGlzdC4nKX19LHtrZXk6XCJnZW5lcmF0ZVwiLHZhbHVlOmZ1bmN0aW9uKGUsbil7dmFyIG89YXJndW1lbnRzLmxlbmd0aD4yJiZ2b2lkIDAhPT1hcmd1bWVudHNbMl0mJmFyZ3VtZW50c1syXSxpPXRoaXMuZ2V0Um91dGUoZSkscj1ufHx7fSxzPXQoe30sciksdT1cIlwiLGM9ITAsYT1cIlwiLGY9XCJ1bmRlZmluZWRcIj09dHlwZW9mIHRoaXMuZ2V0UG9ydCgpfHxudWxsPT09dGhpcy5nZXRQb3J0KCk/XCJcIjp0aGlzLmdldFBvcnQoKTtpZihpLnRva2Vucy5mb3JFYWNoKGZ1bmN0aW9uKHQpe2lmKFwidGV4dFwiPT09dFswXSlyZXR1cm4gdT10WzFdK3Usdm9pZChjPSExKTt7aWYoXCJ2YXJpYWJsZVwiIT09dFswXSl0aHJvdyBuZXcgRXJyb3IoJ1RoZSB0b2tlbiB0eXBlIFwiJyt0WzBdKydcIiBpcyBub3Qgc3VwcG9ydGVkLicpO3ZhciBuPWkuZGVmYXVsdHMmJnRbM11pbiBpLmRlZmF1bHRzO2lmKCExPT09Y3x8IW58fHRbM11pbiByJiZyW3RbM11dIT1pLmRlZmF1bHRzW3RbM11dKXt2YXIgbz12b2lkIDA7aWYodFszXWluIHIpbz1yW3RbM11dLGRlbGV0ZSBzW3RbM11dO2Vsc2V7aWYoIW4pe2lmKGMpcmV0dXJuO3Rocm93IG5ldyBFcnJvcignVGhlIHJvdXRlIFwiJytlKydcIiByZXF1aXJlcyB0aGUgcGFyYW1ldGVyIFwiJyt0WzNdKydcIi4nKX1vPWkuZGVmYXVsdHNbdFszXV19dmFyIGE9ITA9PT1vfHwhMT09PW98fFwiXCI9PT1vO2lmKCFhfHwhYyl7dmFyIGY9ZW5jb2RlVVJJQ29tcG9uZW50KG8pLnJlcGxhY2UoLyUyRi9nLFwiL1wiKTtcIm51bGxcIj09PWYmJm51bGw9PT1vJiYoZj1cIlwiKSx1PXRbMV0rZit1fWM9ITF9ZWxzZSBuJiZ0WzNdaW4gcyYmZGVsZXRlIHNbdFszXV19fSksXCJcIj09PXUmJih1PVwiL1wiKSxpLmhvc3R0b2tlbnMuZm9yRWFjaChmdW5jdGlvbihlKXt2YXIgdD12b2lkIDA7cmV0dXJuXCJ0ZXh0XCI9PT1lWzBdP3ZvaWQoYT1lWzFdK2EpOnZvaWQoXCJ2YXJpYWJsZVwiPT09ZVswXSYmKGVbM11pbiByPyh0PXJbZVszXV0sZGVsZXRlIHNbZVszXV0pOmkuZGVmYXVsdHMmJmVbM11pbiBpLmRlZmF1bHRzJiYodD1pLmRlZmF1bHRzW2VbM11dKSxhPWVbMV0rdCthKSl9KSx1PXRoaXMuY29udGV4dF8uYmFzZV91cmwrdSxpLnJlcXVpcmVtZW50cyYmXCJfc2NoZW1lXCJpbiBpLnJlcXVpcmVtZW50cyYmdGhpcy5nZXRTY2hlbWUoKSE9aS5yZXF1aXJlbWVudHMuX3NjaGVtZT91PWkucmVxdWlyZW1lbnRzLl9zY2hlbWUrXCI6Ly9cIisoYXx8dGhpcy5nZXRIb3N0KCkpK3U6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIGkuc2NoZW1lcyYmXCJ1bmRlZmluZWRcIiE9dHlwZW9mIGkuc2NoZW1lc1swXSYmdGhpcy5nZXRTY2hlbWUoKSE9PWkuc2NoZW1lc1swXT91PWkuc2NoZW1lc1swXStcIjovL1wiKyhhfHx0aGlzLmdldEhvc3QoKSkrdTphJiZ0aGlzLmdldEhvc3QoKSE9PWErKFwiXCI9PT1mP1wiXCI6XCI6XCIrZik/dT10aGlzLmdldFNjaGVtZSgpK1wiOi8vXCIrYSsoXCJcIj09PWY/XCJcIjpcIjpcIitmKSt1Om89PT0hMCYmKHU9dGhpcy5nZXRTY2hlbWUoKStcIjovL1wiK3RoaXMuZ2V0SG9zdCgpK3UpLE9iamVjdC5rZXlzKHMpLmxlbmd0aD4wKXt2YXIgbD12b2lkIDAsaD1bXSx5PWZ1bmN0aW9uKGUsdCl7dD1cImZ1bmN0aW9uXCI9PXR5cGVvZiB0P3QoKTp0LHQ9bnVsbD09PXQ/XCJcIjp0LGgucHVzaChlbmNvZGVVUklDb21wb25lbnQoZSkrXCI9XCIrZW5jb2RlVVJJQ29tcG9uZW50KHQpKX07Zm9yKGwgaW4gcyl0aGlzLmJ1aWxkUXVlcnlQYXJhbXMobCxzW2xdLHkpO3U9dStcIj9cIitoLmpvaW4oXCImXCIpLnJlcGxhY2UoLyUyMC9nLFwiK1wiKX1yZXR1cm4gdX19XSxbe2tleTpcImdldEluc3RhbmNlXCIsdmFsdWU6ZnVuY3Rpb24oKXtyZXR1cm4gcn19LHtrZXk6XCJzZXREYXRhXCIsdmFsdWU6ZnVuY3Rpb24oZSl7dmFyIHQ9aS5nZXRJbnN0YW5jZSgpO3Quc2V0Um91dGluZ0RhdGEoZSl9fV0pLGl9KCk7aS5Sb3V0ZSxpLkNvbnRleHQ7dmFyIHI9bmV3IGk7cmV0dXJue1JvdXRlcjppLFJvdXRpbmc6cn19KTsiXSwic291cmNlUm9vdCI6IiJ9