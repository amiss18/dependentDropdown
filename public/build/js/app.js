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
      });
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
    $.each(data, function (optVal, text) {
      var o = new Option(text.nom, text.id); // o.selected=true;

      $($select).append(o);
    });
  }; //lorsqu'une région est sélectionnée par défaut(ex refresh de la page), on réaffiche ses départements


  if ($region.val()) {
    var value = $region.val();
    var departement_route = _routes__WEBPACK_IMPORTED_MODULE_0__["default"].generate("departements_d_une_region", {
      region: value
    }); // $.get(`http://127.0.0.1:8000/departements/${value}`).then( (data)=>{

    $.get(departement_route).then(function (data) {
      // $departement.empty()
      $response(data, $departement);
    });
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

__webpack_require__(/*! core-js/modules/es.array.index-of */ "./node_modules/core-js/modules/es.array.index-of.js");

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
      r = function () {
    function r(t, n) {
      e(this, r), this.context_ = t || {
        base_url: "",
        prefix: "",
        host: "",
        port: "",
        scheme: "",
        locale: ""
      }, this.setRoutes(n || {});
    }

    return o(r, [{
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
        var r = this,
            i = void 0,
            u = new RegExp(/\[\]$/);
        if (t instanceof Array) t.forEach(function (t, i) {
          u.test(e) ? o(e, t) : r.buildQueryParams(e + "[" + ("object" === ("undefined" == typeof t ? "undefined" : n(t)) ? i : "") + "]", t, o);
        });else if ("object" === ("undefined" == typeof t ? "undefined" : n(t))) for (i in t) {
          this.buildQueryParams(e + "[" + i + "]", t[i], o);
        } else o(e, t);
      }
    }, {
      key: "getRoute",
      value: function value(e) {
        var t = this.context_.prefix + e,
            n = e + "." + this.context_.locale,
            o = this.context_.prefix + e + "." + this.context_.locale,
            r = [t, n, o, e];

        for (var i in r) {
          if (r[i] in this.routes_) return this.routes_[r[i]];
        }

        throw new Error('The route "' + e + '" does not exist.');
      }
    }, {
      key: "generate",
      value: function value(e, n) {
        var o = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
            i = this.getRoute(e),
            u = n || {},
            s = t({}, u),
            c = "",
            a = !0,
            l = "",
            f = "undefined" == typeof this.getPort() || null === this.getPort() ? "" : this.getPort();

        if (i.tokens.forEach(function (t) {
          if ("text" === t[0]) return c = r.encodePathComponent(t[1]) + c, void (a = !1);
          {
            if ("variable" !== t[0]) throw new Error('The token type "' + t[0] + '" is not supported.');
            var n = i.defaults && t[3] in i.defaults;

            if (!1 === a || !n || t[3] in u && u[t[3]] != i.defaults[t[3]]) {
              var o = void 0;
              if (t[3] in u) o = u[t[3]], delete s[t[3]];else {
                if (!n) {
                  if (a) return;
                  throw new Error('The route "' + e + '" requires the parameter "' + t[3] + '".');
                }

                o = i.defaults[t[3]];
              }
              var l = !0 === o || !1 === o || "" === o;

              if (!l || !a) {
                var f = r.encodePathComponent(o);
                "null" === f && null === o && (f = ""), c = t[1] + f + c;
              }

              a = !1;
            } else n && t[3] in s && delete s[t[3]];
          }
        }), "" === c && (c = "/"), i.hosttokens.forEach(function (e) {
          var t = void 0;
          return "text" === e[0] ? void (l = e[1] + l) : void ("variable" === e[0] && (e[3] in u ? (t = u[e[3]], delete s[e[3]]) : i.defaults && e[3] in i.defaults && (t = i.defaults[e[3]]), l = e[1] + t + l));
        }), c = this.context_.base_url + c, i.requirements && "_scheme" in i.requirements && this.getScheme() != i.requirements._scheme) {
          var h = l || this.getHost();
          c = i.requirements._scheme + "://" + h + (h.indexOf(":" + f) > -1 || "" === f ? "" : ":" + f) + c;
        } else if ("undefined" != typeof i.schemes && "undefined" != typeof i.schemes[0] && this.getScheme() !== i.schemes[0]) {
          var p = l || this.getHost();
          c = i.schemes[0] + "://" + p + (p.indexOf(":" + f) > -1 || "" === f ? "" : ":" + f) + c;
        } else l && this.getHost() !== l + (l.indexOf(":" + f) > -1 || "" === f ? "" : ":" + f) ? c = this.getScheme() + "://" + l + (l.indexOf(":" + f) > -1 || "" === f ? "" : ":" + f) + c : o === !0 && (c = this.getScheme() + "://" + this.getHost() + (this.getHost().indexOf(":" + f) > -1 || "" === f ? "" : ":" + f) + c);

        if (Object.keys(s).length > 0) {
          var d = void 0,
              y = [],
              v = function v(e, t) {
            t = "function" == typeof t ? t() : t, t = null === t ? "" : t, y.push(r.encodeQueryComponent(e) + "=" + r.encodeQueryComponent(t));
          };

          for (d in s) {
            this.buildQueryParams(d, s[d], v);
          }

          c = c + "?" + y.join("&");
        }

        return c;
      }
    }], [{
      key: "getInstance",
      value: function value() {
        return i;
      }
    }, {
      key: "setData",
      value: function value(e) {
        var t = r.getInstance();
        t.setRoutingData(e);
      }
    }, {
      key: "customEncodeURIComponent",
      value: function value(e) {
        return encodeURIComponent(e).replace(/%2F/g, "/").replace(/%40/g, "@").replace(/%3A/g, ":").replace(/%21/g, "!").replace(/%3B/g, ";").replace(/%2C/g, ",").replace(/%2A/g, "*").replace(/\(/g, "%28").replace(/\)/g, "%29").replace(/'/g, "%27");
      }
    }, {
      key: "encodePathComponent",
      value: function value(e) {
        return r.customEncodeURIComponent(e).replace(/%3D/g, "=").replace(/%2B/g, "+").replace(/%21/g, "!").replace(/%7C/g, "|");
      }
    }, {
      key: "encodeQueryComponent",
      value: function value(e) {
        return r.customEncodeURIComponent(e).replace(/%3F/g, "?");
      }
    }]), r;
  }();

  r.Route, r.Context;
  var i = new r();
  return {
    Router: r,
    Routing: i
  };
});

/***/ })

},[["./assets/js/app.js","runtime","vendors~js/app"]]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvYXBwLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy9jb21tdW5lcy5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvZGVwYXJ0ZW1lbnRzLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy9yb3V0ZXMuanMiLCJ3ZWJwYWNrOi8vLy4vdmVuZG9yL2ZyaWVuZHNvZnN5bWZvbnkvanNyb3V0aW5nLWJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2pzL3JvdXRlci5taW4uanMiXSwibmFtZXMiOlsid2luZG93IiwiJCIsIkpRdWVyeSIsInJlcXVpcmUiLCIkcmVnaW9uIiwiJGRlcGFydGVtZW50IiwiJGNvbW11bmUiLCIkcmVzcG9uc2UiLCJkYXRhIiwiJHNlbGVjdCIsImVhY2giLCJvcHRWYWwiLCJ0ZXh0IiwicHJlcGVuZCIsInZhbCIsImRlcGFydGVtZW50SWQiLCJyb3V0ZUNvbW11bmUiLCJSb3V0aW5nIiwiZ2VuZXJhdGUiLCJkZXBhcnRlbWVudCIsImdldCIsInRoZW4iLCJlbXB0eSIsIm8iLCJPcHRpb24iLCJub20iLCJpZCIsImFwcGVuZCIsImRvY3VtZW50Iiwib24iLCIkZmllbGQiLCJ2YWx1ZSIsImFqYXgiLCJ1cmwiLCJ0eXBlIiwic3VjY2VzcyIsImxlbmd0aCIsImFsZXJ0IiwiZGVwYXJ0ZW1lbnRfcm91dGUiLCJyZWdpb24iLCIkcmVnaW9uRmllbGQiLCIkZm9ybSIsImNsb3Nlc3QiLCJjb25zb2xlIiwibG9nIiwicm91dGVzIiwic2V0Um91dGluZ0RhdGEiLCJlIiwidCIsIm4iLCJkZWZpbmUiLCJUeXBlRXJyb3IiLCJPYmplY3QiLCJhc3NpZ24iLCJhcmd1bWVudHMiLCJwcm90b3R5cGUiLCJoYXNPd25Qcm9wZXJ0eSIsImNhbGwiLCJTeW1ib2wiLCJpdGVyYXRvciIsImNvbnN0cnVjdG9yIiwiZW51bWVyYWJsZSIsImNvbmZpZ3VyYWJsZSIsIndyaXRhYmxlIiwiZGVmaW5lUHJvcGVydHkiLCJrZXkiLCJyIiwiY29udGV4dF8iLCJiYXNlX3VybCIsInByZWZpeCIsImhvc3QiLCJwb3J0Iiwic2NoZW1lIiwibG9jYWxlIiwic2V0Um91dGVzIiwic2V0QmFzZVVybCIsInNldFByZWZpeCIsInNldFBvcnQiLCJzZXRMb2NhbGUiLCJzZXRIb3N0Iiwic2V0U2NoZW1lIiwicm91dGVzXyIsImZyZWV6ZSIsImkiLCJ1IiwiUmVnRXhwIiwiQXJyYXkiLCJmb3JFYWNoIiwidGVzdCIsImJ1aWxkUXVlcnlQYXJhbXMiLCJFcnJvciIsImdldFJvdXRlIiwicyIsImMiLCJhIiwibCIsImYiLCJnZXRQb3J0IiwidG9rZW5zIiwiZW5jb2RlUGF0aENvbXBvbmVudCIsImRlZmF1bHRzIiwiaG9zdHRva2VucyIsInJlcXVpcmVtZW50cyIsImdldFNjaGVtZSIsIl9zY2hlbWUiLCJoIiwiZ2V0SG9zdCIsImluZGV4T2YiLCJzY2hlbWVzIiwicCIsImtleXMiLCJkIiwieSIsInYiLCJwdXNoIiwiZW5jb2RlUXVlcnlDb21wb25lbnQiLCJqb2luIiwiZ2V0SW5zdGFuY2UiLCJlbmNvZGVVUklDb21wb25lbnQiLCJyZXBsYWNlIiwiY3VzdG9tRW5jb2RlVVJJQ29tcG9uZW50IiwiUm91dGUiLCJDb250ZXh0IiwiUm91dGVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBRUFBO0FBQUFBO0FBQUFBO0FBQUFBO0FBQUFBO0FBQUFBLE1BQU0sQ0FBQ0MsQ0FBUCxHQUFXRCxNQUFNLENBQUNFLE1BQVAsR0FBZ0JDLG1CQUFPLENBQUMsb0RBQUQsQ0FBbEMsQyxDQUVBOztBQUNBOzs7OztBQU1BOztBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2JBOztBQUdBLENBQUMsWUFBWTtBQUdULE1BQUlDLE9BQU8sR0FBR0gsQ0FBQyxDQUFDLGlCQUFELENBQWY7QUFDQSxNQUFJSSxZQUFZLEdBQUdKLENBQUMsQ0FBQyxzQkFBRCxDQUFwQjtBQUNBLE1BQUlLLFFBQVEsR0FBR0wsQ0FBQyxDQUFDLGtCQUFELENBQWhCLENBTFMsQ0FPVDs7QUFDQSxNQUFJTSxTQUFTLEdBQUcsU0FBWkEsU0FBWSxDQUFFQyxJQUFGLEVBQVFDLE9BQVIsRUFBcUI7QUFDakNSLEtBQUMsQ0FBQ1MsSUFBRixDQUFPRixJQUFQLEVBQWEsVUFBU0csTUFBVCxFQUFpQkMsSUFBakIsRUFBdUI7QUFDaENILGFBQU8sQ0FBQ0ksT0FBUiwwQkFBa0NELElBQUksQ0FBQyxJQUFELENBQXRDLGdCQUFrREEsSUFBSSxDQUFDLEtBQUQsQ0FBdEQ7QUFDSCxLQUZEO0FBR0gsR0FKRDs7QUFNQSxNQUFHUCxZQUFZLENBQUNTLEdBQWIsRUFBSCxFQUF1QjtBQUNwQjtBQUVDLFFBQU1DLGFBQWEsR0FBR1YsWUFBWSxDQUFDUyxHQUFiLEVBQXRCO0FBQ0EsUUFBSUUsWUFBWSxHQUFHQywrQ0FBTyxDQUFDQyxRQUFSLENBQWlCLHlCQUFqQixFQUEyQztBQUFFQyxpQkFBVyxFQUFFSjtBQUFmLEtBQTNDLENBQW5CO0FBQ0FkLEtBQUMsQ0FBQ21CLEdBQUYsQ0FBTUosWUFBTixFQUFvQkssSUFBcEIsQ0FBeUIsVUFBQ2IsSUFBRCxFQUFVO0FBQy9CO0FBRUZILGtCQUFZLENBQUNpQixLQUFiO0FBRUVyQixPQUFDLENBQUNTLElBQUYsQ0FBT0YsSUFBUCxFQUFhLFVBQVNHLE1BQVQsRUFBaUJDLElBQWpCLEVBQXVCO0FBQ2pDO0FBQ0Q7QUFFRSxZQUFJVyxDQUFDLEdBQUcsSUFBSUMsTUFBSixDQUFXWixJQUFJLENBQUNhLEdBQWhCLEVBQXFCYixJQUFJLENBQUNjLEVBQTFCLENBQVIsQ0FKZ0MsQ0FLbEM7O0FBQ0V6QixTQUFDLENBQUMsa0JBQUQsQ0FBRCxDQUFzQjBCLE1BQXRCLENBQTZCSixDQUE3QixFQU5nQyxDQU9oQztBQUNILE9BUkQ7QUFXSCxLQWhCRDtBQWtCSCxHQXJDUSxDQXlDYjs7O0FBQ0l0QixHQUFDLENBQUMyQixRQUFELENBQUQsQ0FBWUMsRUFBWixDQUFlLFFBQWYsRUFBeUIsdUJBQXpCLEVBQWtELFlBQVk7QUFDMUQsUUFBSUMsTUFBTSxHQUFHN0IsQ0FBQyxDQUFDLElBQUQsQ0FBZDtBQUNBLFFBQUk4QixLQUFLLEdBQUNELE1BQU0sQ0FBQ2hCLEdBQVAsRUFBVjtBQUNBUixZQUFRLENBQUNnQixLQUFUO0FBRUFyQixLQUFDLENBQUMrQixJQUFGLENBQU87QUFDTDtBQUVFQyxTQUFHLEVBQUdoQiwrQ0FBTyxDQUFDQyxRQUFSLENBQWlCLHlCQUFqQixFQUEyQztBQUFFQyxtQkFBVyxFQUFFWTtBQUFmLE9BQTNDLENBSEg7QUFJSEcsVUFBSSxFQUFFLEtBSkg7QUFLSEMsYUFBTyxFQUFFLGlCQUFVM0IsSUFBVixFQUFnQjtBQUNyQixZQUFHQSxJQUFJLENBQUM0QixNQUFMLElBQWMsQ0FBakIsRUFBcUJDLEtBQUssQ0FBQyw4Q0FBRCxDQUFMLENBREEsQ0FHdkI7QUFDSTtBQUNFOztBQUNBOUIsaUJBQVMsQ0FBRUMsSUFBRixFQUFRRixRQUFSLENBQVQsQ0FOaUIsQ0FPdEI7QUFFRjtBQWRFLEtBQVA7QUFpQkgsR0F0QkQ7QUF3QkgsQ0FsRUQsSTs7Ozs7Ozs7Ozs7OztBQ0hBO0FBQUE7QUFBQTtBQUdBTCxDQUFDLENBQUMsWUFBWTtBQUVWLE1BQUlHLE9BQU8sR0FBR0gsQ0FBQyxDQUFDLGlCQUFELENBQWY7QUFDQSxNQUFJSSxZQUFZLEdBQUdKLENBQUMsQ0FBQyxzQkFBRCxDQUFwQjtBQUNBLE1BQUlLLFFBQVEsR0FBR0wsQ0FBQyxDQUFDLGtCQUFELENBQWhCLENBSlUsQ0FPVjs7QUFDQSxNQUFJTSxTQUFTLEdBQUcsU0FBWkEsU0FBWSxDQUFDQyxJQUFELEVBQU9DLE9BQVAsRUFBbUI7QUFFL0JSLEtBQUMsQ0FBQ1MsSUFBRixDQUFPRixJQUFQLEVBQWEsVUFBVUcsTUFBVixFQUFrQkMsSUFBbEIsRUFBd0I7QUFDakMsVUFBSVcsQ0FBQyxHQUFHLElBQUlDLE1BQUosQ0FBV1osSUFBSSxDQUFDYSxHQUFoQixFQUFxQmIsSUFBSSxDQUFDYyxFQUExQixDQUFSLENBRGlDLENBRWpDOztBQUNBekIsT0FBQyxDQUFDUSxPQUFELENBQUQsQ0FBV2tCLE1BQVgsQ0FBa0JKLENBQWxCO0FBRUgsS0FMRDtBQU1ILEdBUkQsQ0FSVSxDQWtCVjs7O0FBQ0EsTUFBSW5CLE9BQU8sQ0FBQ1UsR0FBUixFQUFKLEVBQW1CO0FBQ2YsUUFBTWlCLEtBQUssR0FBRzNCLE9BQU8sQ0FBQ1UsR0FBUixFQUFkO0FBR0EsUUFBSXdCLGlCQUFpQixHQUFHckIsK0NBQU8sQ0FBQ0MsUUFBUixDQUFpQiwyQkFBakIsRUFBOEM7QUFBQ3FCLFlBQU0sRUFBRVI7QUFBVCxLQUE5QyxDQUF4QixDQUplLENBT2Y7O0FBQ0E5QixLQUFDLENBQUNtQixHQUFGLENBQU1rQixpQkFBTixFQUF5QmpCLElBQXpCLENBQThCLFVBQUNiLElBQUQsRUFBVTtBQUVwQztBQUNBRCxlQUFTLENBQUNDLElBQUQsRUFBT0gsWUFBUCxDQUFUO0FBQ0gsS0FKRDtBQVFIOztBQUdESixHQUFDLENBQUMyQixRQUFELENBQUQsQ0FBWUMsRUFBWixDQUFlLFFBQWYsRUFBeUIsa0JBQXpCLEVBQTZDLFlBQVk7QUFFckQsUUFBSUMsTUFBTSxHQUFHN0IsQ0FBQyxDQUFDLElBQUQsQ0FBZDtBQUNBSyxZQUFRLENBQUNnQixLQUFULEdBSHFELENBSXJEOztBQUVBLFFBQU1TLEtBQUssR0FBRzNCLE9BQU8sQ0FBQ1UsR0FBUixFQUFkO0FBR0EsUUFBSTBCLFlBQVksR0FBR3ZDLENBQUMsQ0FBQyxpQkFBRCxDQUFwQjtBQUNBLFFBQUl3QyxLQUFLLEdBQUdYLE1BQU0sQ0FBQ1ksT0FBUCxDQUFlLE1BQWYsQ0FBWjtBQUVBLFFBQUlKLGlCQUFpQixHQUFHckIsK0NBQU8sQ0FBQ0MsUUFBUixDQUFpQiwyQkFBakIsRUFBOEM7QUFBQ3FCLFlBQU0sRUFBRVI7QUFBVCxLQUE5QyxDQUF4QixDQVpxRCxDQWVyRDs7QUFDQTlCLEtBQUMsQ0FBQ21CLEdBQUYsQ0FBTWtCLGlCQUFOLEVBQXlCakIsSUFBekIsQ0FBOEIsVUFBQ2IsSUFBRCxFQUFVO0FBRXBDbUMsYUFBTyxDQUFDQyxHQUFSLENBQVksb0JBQW9CdkMsWUFBWSxDQUFDUyxHQUFiLEVBQWhDO0FBQ0FULGtCQUFZLENBQUNpQixLQUFiO0FBQ0FqQixrQkFBWSxDQUFDc0IsTUFBYixDQUFvQixJQUFJSCxNQUFKLENBQVcsZ0NBQVgsRUFBNkMsRUFBN0MsQ0FBcEI7QUFHQWpCLGVBQVMsQ0FBQ0MsSUFBRCxFQUFPSCxZQUFQLENBQVQ7QUFHQXNDLGFBQU8sQ0FBQ0MsR0FBUixDQUFZcEMsSUFBWjtBQUNILEtBWEQ7QUFjSCxHQTlCRDtBQW1DSCxDQXpFQSxDQUFELEM7Ozs7Ozs7Ozs7Ozs7QUNEQTtBQUFBO0FBQUE7QUFBQSxJQUFNcUMsTUFBTSxHQUFHMUMsbUJBQU8sQ0FBQywwRUFBRCxDQUF0Qjs7QUFDQTtBQUNBYyxrSEFBTyxDQUFDNkIsY0FBUixDQUF1QkQsTUFBdkI7QUFJZTVCLGlMQUFmLEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDUkEsQ0FBQyxVQUFTOEIsQ0FBVCxFQUFXQyxDQUFYLEVBQWE7QUFBQyxNQUFJQyxDQUFDLEdBQUNELENBQUMsRUFBUDtBQUFVLFVBQXNDRSxpQ0FBTyxFQUFELG9DQUFJRCxDQUFDLENBQUNoQyxPQUFOO0FBQUE7QUFBQTtBQUFBLG9HQUE1QyxHQUEyRCxTQUEzRDtBQUEwSyxDQUFsTSxDQUFtTSxJQUFuTSxFQUF3TSxZQUFVO0FBQUM7O0FBQWEsV0FBUzhCLENBQVQsQ0FBV0EsQ0FBWCxFQUFhQyxDQUFiLEVBQWU7QUFBQyxRQUFHLEVBQUVELENBQUMsWUFBWUMsQ0FBZixDQUFILEVBQXFCLE1BQU0sSUFBSUcsU0FBSixDQUFjLG1DQUFkLENBQU47QUFBeUQ7O0FBQUEsTUFBSUgsQ0FBQyxHQUFDSSxNQUFNLENBQUNDLE1BQVAsSUFBZSxVQUFTTixDQUFULEVBQVc7QUFBQyxTQUFJLElBQUlDLENBQUMsR0FBQyxDQUFWLEVBQVlBLENBQUMsR0FBQ00sU0FBUyxDQUFDbEIsTUFBeEIsRUFBK0JZLENBQUMsRUFBaEMsRUFBbUM7QUFBQyxVQUFJQyxDQUFDLEdBQUNLLFNBQVMsQ0FBQ04sQ0FBRCxDQUFmOztBQUFtQixXQUFJLElBQUl6QixDQUFSLElBQWEwQixDQUFiO0FBQWVHLGNBQU0sQ0FBQ0csU0FBUCxDQUFpQkMsY0FBakIsQ0FBZ0NDLElBQWhDLENBQXFDUixDQUFyQyxFQUF1QzFCLENBQXZDLE1BQTRDd0IsQ0FBQyxDQUFDeEIsQ0FBRCxDQUFELEdBQUswQixDQUFDLENBQUMxQixDQUFELENBQWxEO0FBQWY7QUFBc0U7O0FBQUEsV0FBT3dCLENBQVA7QUFBUyxHQUF2SztBQUFBLE1BQXdLRSxDQUFDLEdBQUMsY0FBWSxPQUFPUyxNQUFuQixJQUEyQixvQkFBaUJBLE1BQU0sQ0FBQ0MsUUFBeEIsQ0FBM0IsR0FBNEQsVUFBU1osQ0FBVCxFQUFXO0FBQUMsbUJBQWNBLENBQWQ7QUFBZ0IsR0FBeEYsR0FBeUYsVUFBU0EsQ0FBVCxFQUFXO0FBQUMsV0FBT0EsQ0FBQyxJQUFFLGNBQVksT0FBT1csTUFBdEIsSUFBOEJYLENBQUMsQ0FBQ2EsV0FBRixLQUFnQkYsTUFBOUMsSUFBc0RYLENBQUMsS0FBR1csTUFBTSxDQUFDSCxTQUFqRSxHQUEyRSxRQUEzRSxXQUEyRlIsQ0FBM0YsQ0FBUDtBQUFvRyxHQUFuWDtBQUFBLE1BQW9YeEIsQ0FBQyxHQUFDLFlBQVU7QUFBQyxhQUFTd0IsQ0FBVCxDQUFXQSxDQUFYLEVBQWFDLENBQWIsRUFBZTtBQUFDLFdBQUksSUFBSUMsQ0FBQyxHQUFDLENBQVYsRUFBWUEsQ0FBQyxHQUFDRCxDQUFDLENBQUNaLE1BQWhCLEVBQXVCYSxDQUFDLEVBQXhCLEVBQTJCO0FBQUMsWUFBSTFCLENBQUMsR0FBQ3lCLENBQUMsQ0FBQ0MsQ0FBRCxDQUFQO0FBQVcxQixTQUFDLENBQUNzQyxVQUFGLEdBQWF0QyxDQUFDLENBQUNzQyxVQUFGLElBQWMsQ0FBQyxDQUE1QixFQUE4QnRDLENBQUMsQ0FBQ3VDLFlBQUYsR0FBZSxDQUFDLENBQTlDLEVBQWdELFdBQVV2QyxDQUFWLEtBQWNBLENBQUMsQ0FBQ3dDLFFBQUYsR0FBVyxDQUFDLENBQTFCLENBQWhELEVBQTZFWCxNQUFNLENBQUNZLGNBQVAsQ0FBc0JqQixDQUF0QixFQUF3QnhCLENBQUMsQ0FBQzBDLEdBQTFCLEVBQThCMUMsQ0FBOUIsQ0FBN0U7QUFBOEc7QUFBQzs7QUFBQSxXQUFPLFVBQVN5QixDQUFULEVBQVdDLENBQVgsRUFBYTFCLENBQWIsRUFBZTtBQUFDLGFBQU8wQixDQUFDLElBQUVGLENBQUMsQ0FBQ0MsQ0FBQyxDQUFDTyxTQUFILEVBQWFOLENBQWIsQ0FBSixFQUFvQjFCLENBQUMsSUFBRXdCLENBQUMsQ0FBQ0MsQ0FBRCxFQUFHekIsQ0FBSCxDQUF4QixFQUE4QnlCLENBQXJDO0FBQXVDLEtBQTlEO0FBQStELEdBQWhQLEVBQXRYO0FBQUEsTUFBeW1Ca0IsQ0FBQyxHQUFDLFlBQVU7QUFBQyxhQUFTQSxDQUFULENBQVdsQixDQUFYLEVBQWFDLENBQWIsRUFBZTtBQUFDRixPQUFDLENBQUMsSUFBRCxFQUFNbUIsQ0FBTixDQUFELEVBQVUsS0FBS0MsUUFBTCxHQUFjbkIsQ0FBQyxJQUFFO0FBQUNvQixnQkFBUSxFQUFDLEVBQVY7QUFBYUMsY0FBTSxFQUFDLEVBQXBCO0FBQXVCQyxZQUFJLEVBQUMsRUFBNUI7QUFBK0JDLFlBQUksRUFBQyxFQUFwQztBQUF1Q0MsY0FBTSxFQUFDLEVBQTlDO0FBQWlEQyxjQUFNLEVBQUM7QUFBeEQsT0FBM0IsRUFBdUYsS0FBS0MsU0FBTCxDQUFlekIsQ0FBQyxJQUFFLEVBQWxCLENBQXZGO0FBQTZHOztBQUFBLFdBQU8xQixDQUFDLENBQUMyQyxDQUFELEVBQUcsQ0FBQztBQUFDRCxTQUFHLEVBQUMsZ0JBQUw7QUFBc0JsQyxXQUFLLEVBQUMsZUFBU2dCLENBQVQsRUFBVztBQUFDLGFBQUs0QixVQUFMLENBQWdCNUIsQ0FBQyxDQUFDcUIsUUFBbEIsR0FBNEIsS0FBS00sU0FBTCxDQUFlM0IsQ0FBQyxDQUFDRixNQUFqQixDQUE1QixFQUFxRCxZQUFXRSxDQUFYLElBQWMsS0FBSzZCLFNBQUwsQ0FBZTdCLENBQUMsQ0FBQ3NCLE1BQWpCLENBQW5FLEVBQTRGLFVBQVN0QixDQUFULElBQVksS0FBSzhCLE9BQUwsQ0FBYTlCLENBQUMsQ0FBQ3dCLElBQWYsQ0FBeEcsRUFBNkgsWUFBV3hCLENBQVgsSUFBYyxLQUFLK0IsU0FBTCxDQUFlL0IsQ0FBQyxDQUFDMEIsTUFBakIsQ0FBM0ksRUFBb0ssS0FBS00sT0FBTCxDQUFhaEMsQ0FBQyxDQUFDdUIsSUFBZixDQUFwSyxFQUF5TCxLQUFLVSxTQUFMLENBQWVqQyxDQUFDLENBQUN5QixNQUFqQixDQUF6TDtBQUFrTjtBQUExUCxLQUFELEVBQTZQO0FBQUNQLFNBQUcsRUFBQyxXQUFMO0FBQWlCbEMsV0FBSyxFQUFDLGVBQVNnQixDQUFULEVBQVc7QUFBQyxhQUFLa0MsT0FBTCxHQUFhN0IsTUFBTSxDQUFDOEIsTUFBUCxDQUFjbkMsQ0FBZCxDQUFiO0FBQThCO0FBQWpFLEtBQTdQLEVBQWdVO0FBQUNrQixTQUFHLEVBQUMsV0FBTDtBQUFpQmxDLFdBQUssRUFBQyxpQkFBVTtBQUFDLGVBQU8sS0FBS2tELE9BQVo7QUFBb0I7QUFBdEQsS0FBaFUsRUFBd1g7QUFBQ2hCLFNBQUcsRUFBQyxZQUFMO0FBQWtCbEMsV0FBSyxFQUFDLGVBQVNnQixDQUFULEVBQVc7QUFBQyxhQUFLb0IsUUFBTCxDQUFjQyxRQUFkLEdBQXVCckIsQ0FBdkI7QUFBeUI7QUFBN0QsS0FBeFgsRUFBdWI7QUFBQ2tCLFNBQUcsRUFBQyxZQUFMO0FBQWtCbEMsV0FBSyxFQUFDLGlCQUFVO0FBQUMsZUFBTyxLQUFLb0MsUUFBTCxDQUFjQyxRQUFyQjtBQUE4QjtBQUFqRSxLQUF2YixFQUEwZjtBQUFDSCxTQUFHLEVBQUMsV0FBTDtBQUFpQmxDLFdBQUssRUFBQyxlQUFTZ0IsQ0FBVCxFQUFXO0FBQUMsYUFBS29CLFFBQUwsQ0FBY0UsTUFBZCxHQUFxQnRCLENBQXJCO0FBQXVCO0FBQTFELEtBQTFmLEVBQXNqQjtBQUFDa0IsU0FBRyxFQUFDLFdBQUw7QUFBaUJsQyxXQUFLLEVBQUMsZUFBU2dCLENBQVQsRUFBVztBQUFDLGFBQUtvQixRQUFMLENBQWNLLE1BQWQsR0FBcUJ6QixDQUFyQjtBQUF1QjtBQUExRCxLQUF0akIsRUFBa25CO0FBQUNrQixTQUFHLEVBQUMsV0FBTDtBQUFpQmxDLFdBQUssRUFBQyxpQkFBVTtBQUFDLGVBQU8sS0FBS29DLFFBQUwsQ0FBY0ssTUFBckI7QUFBNEI7QUFBOUQsS0FBbG5CLEVBQWtyQjtBQUFDUCxTQUFHLEVBQUMsU0FBTDtBQUFlbEMsV0FBSyxFQUFDLGVBQVNnQixDQUFULEVBQVc7QUFBQyxhQUFLb0IsUUFBTCxDQUFjRyxJQUFkLEdBQW1CdkIsQ0FBbkI7QUFBcUI7QUFBdEQsS0FBbHJCLEVBQTB1QjtBQUFDa0IsU0FBRyxFQUFDLFNBQUw7QUFBZWxDLFdBQUssRUFBQyxpQkFBVTtBQUFDLGVBQU8sS0FBS29DLFFBQUwsQ0FBY0csSUFBckI7QUFBMEI7QUFBMUQsS0FBMXVCLEVBQXN5QjtBQUFDTCxTQUFHLEVBQUMsU0FBTDtBQUFlbEMsV0FBSyxFQUFDLGVBQVNnQixDQUFULEVBQVc7QUFBQyxhQUFLb0IsUUFBTCxDQUFjSSxJQUFkLEdBQW1CeEIsQ0FBbkI7QUFBcUI7QUFBdEQsS0FBdHlCLEVBQTgxQjtBQUFDa0IsU0FBRyxFQUFDLFNBQUw7QUFBZWxDLFdBQUssRUFBQyxpQkFBVTtBQUFDLGVBQU8sS0FBS29DLFFBQUwsQ0FBY0ksSUFBckI7QUFBMEI7QUFBMUQsS0FBOTFCLEVBQTA1QjtBQUFDTixTQUFHLEVBQUMsV0FBTDtBQUFpQmxDLFdBQUssRUFBQyxlQUFTZ0IsQ0FBVCxFQUFXO0FBQUMsYUFBS29CLFFBQUwsQ0FBY00sTUFBZCxHQUFxQjFCLENBQXJCO0FBQXVCO0FBQTFELEtBQTE1QixFQUFzOUI7QUFBQ2tCLFNBQUcsRUFBQyxXQUFMO0FBQWlCbEMsV0FBSyxFQUFDLGlCQUFVO0FBQUMsZUFBTyxLQUFLb0MsUUFBTCxDQUFjTSxNQUFyQjtBQUE0QjtBQUE5RCxLQUF0OUIsRUFBc2hDO0FBQUNSLFNBQUcsRUFBQyxrQkFBTDtBQUF3QmxDLFdBQUssRUFBQyxlQUFTZ0IsQ0FBVCxFQUFXQyxDQUFYLEVBQWF6QixDQUFiLEVBQWU7QUFBQyxZQUFJMkMsQ0FBQyxHQUFDLElBQU47QUFBQSxZQUFXaUIsQ0FBQyxHQUFDLEtBQUssQ0FBbEI7QUFBQSxZQUFvQkMsQ0FBQyxHQUFDLElBQUlDLE1BQUosQ0FBVyxPQUFYLENBQXRCO0FBQTBDLFlBQUdyQyxDQUFDLFlBQVlzQyxLQUFoQixFQUFzQnRDLENBQUMsQ0FBQ3VDLE9BQUYsQ0FBVSxVQUFTdkMsQ0FBVCxFQUFXbUMsQ0FBWCxFQUFhO0FBQUNDLFdBQUMsQ0FBQ0ksSUFBRixDQUFPekMsQ0FBUCxJQUFVeEIsQ0FBQyxDQUFDd0IsQ0FBRCxFQUFHQyxDQUFILENBQVgsR0FBaUJrQixDQUFDLENBQUN1QixnQkFBRixDQUFtQjFDLENBQUMsR0FBQyxHQUFGLElBQU8sY0FBWSxlQUFhLE9BQU9DLENBQXBCLEdBQXNCLFdBQXRCLEdBQWtDQyxDQUFDLENBQUNELENBQUQsQ0FBL0MsSUFBb0RtQyxDQUFwRCxHQUFzRCxFQUE3RCxJQUFpRSxHQUFwRixFQUF3Rm5DLENBQXhGLEVBQTBGekIsQ0FBMUYsQ0FBakI7QUFBOEcsU0FBdEksRUFBdEIsS0FBbUssSUFBRyxjQUFZLGVBQWEsT0FBT3lCLENBQXBCLEdBQXNCLFdBQXRCLEdBQWtDQyxDQUFDLENBQUNELENBQUQsQ0FBL0MsQ0FBSCxFQUF1RCxLQUFJbUMsQ0FBSixJQUFTbkMsQ0FBVDtBQUFXLGVBQUt5QyxnQkFBTCxDQUFzQjFDLENBQUMsR0FBQyxHQUFGLEdBQU1vQyxDQUFOLEdBQVEsR0FBOUIsRUFBa0NuQyxDQUFDLENBQUNtQyxDQUFELENBQW5DLEVBQXVDNUQsQ0FBdkM7QUFBWCxTQUF2RCxNQUFpSEEsQ0FBQyxDQUFDd0IsQ0FBRCxFQUFHQyxDQUFILENBQUQ7QUFBTztBQUFuWCxLQUF0aEMsRUFBMjRDO0FBQUNpQixTQUFHLEVBQUMsVUFBTDtBQUFnQmxDLFdBQUssRUFBQyxlQUFTZ0IsQ0FBVCxFQUFXO0FBQUMsWUFBSUMsQ0FBQyxHQUFDLEtBQUttQixRQUFMLENBQWNFLE1BQWQsR0FBcUJ0QixDQUEzQjtBQUFBLFlBQTZCRSxDQUFDLEdBQUNGLENBQUMsR0FBQyxHQUFGLEdBQU0sS0FBS29CLFFBQUwsQ0FBY00sTUFBbkQ7QUFBQSxZQUEwRGxELENBQUMsR0FBQyxLQUFLNEMsUUFBTCxDQUFjRSxNQUFkLEdBQXFCdEIsQ0FBckIsR0FBdUIsR0FBdkIsR0FBMkIsS0FBS29CLFFBQUwsQ0FBY00sTUFBckc7QUFBQSxZQUE0R1AsQ0FBQyxHQUFDLENBQUNsQixDQUFELEVBQUdDLENBQUgsRUFBSzFCLENBQUwsRUFBT3dCLENBQVAsQ0FBOUc7O0FBQXdILGFBQUksSUFBSW9DLENBQVIsSUFBYWpCLENBQWI7QUFBZSxjQUFHQSxDQUFDLENBQUNpQixDQUFELENBQUQsSUFBTyxLQUFLRixPQUFmLEVBQXVCLE9BQU8sS0FBS0EsT0FBTCxDQUFhZixDQUFDLENBQUNpQixDQUFELENBQWQsQ0FBUDtBQUF0Qzs7QUFBZ0UsY0FBTSxJQUFJTyxLQUFKLENBQVUsZ0JBQWMzQyxDQUFkLEdBQWdCLG1CQUExQixDQUFOO0FBQXFEO0FBQS9RLEtBQTM0QyxFQUE0cEQ7QUFBQ2tCLFNBQUcsRUFBQyxVQUFMO0FBQWdCbEMsV0FBSyxFQUFDLGVBQVNnQixDQUFULEVBQVdFLENBQVgsRUFBYTtBQUFDLFlBQUkxQixDQUFDLEdBQUMrQixTQUFTLENBQUNsQixNQUFWLEdBQWlCLENBQWpCLElBQW9CLEtBQUssQ0FBTCxLQUFTa0IsU0FBUyxDQUFDLENBQUQsQ0FBdEMsSUFBMkNBLFNBQVMsQ0FBQyxDQUFELENBQTFEO0FBQUEsWUFBOEQ2QixDQUFDLEdBQUMsS0FBS1EsUUFBTCxDQUFjNUMsQ0FBZCxDQUFoRTtBQUFBLFlBQWlGcUMsQ0FBQyxHQUFDbkMsQ0FBQyxJQUFFLEVBQXRGO0FBQUEsWUFBeUYyQyxDQUFDLEdBQUM1QyxDQUFDLENBQUMsRUFBRCxFQUFJb0MsQ0FBSixDQUE1RjtBQUFBLFlBQW1HUyxDQUFDLEdBQUMsRUFBckc7QUFBQSxZQUF3R0MsQ0FBQyxHQUFDLENBQUMsQ0FBM0c7QUFBQSxZQUE2R0MsQ0FBQyxHQUFDLEVBQS9HO0FBQUEsWUFBa0hDLENBQUMsR0FBQyxlQUFhLE9BQU8sS0FBS0MsT0FBTCxFQUFwQixJQUFvQyxTQUFPLEtBQUtBLE9BQUwsRUFBM0MsR0FBMEQsRUFBMUQsR0FBNkQsS0FBS0EsT0FBTCxFQUFqTDs7QUFBZ00sWUFBR2QsQ0FBQyxDQUFDZSxNQUFGLENBQVNYLE9BQVQsQ0FBaUIsVUFBU3ZDLENBQVQsRUFBVztBQUFDLGNBQUcsV0FBU0EsQ0FBQyxDQUFDLENBQUQsQ0FBYixFQUFpQixPQUFPNkMsQ0FBQyxHQUFDM0IsQ0FBQyxDQUFDaUMsbUJBQUYsQ0FBc0JuRCxDQUFDLENBQUMsQ0FBRCxDQUF2QixJQUE0QjZDLENBQTlCLEVBQWdDLE1BQUtDLENBQUMsR0FBQyxDQUFDLENBQVIsQ0FBdkM7QUFBa0Q7QUFBQyxnQkFBRyxlQUFhOUMsQ0FBQyxDQUFDLENBQUQsQ0FBakIsRUFBcUIsTUFBTSxJQUFJMEMsS0FBSixDQUFVLHFCQUFtQjFDLENBQUMsQ0FBQyxDQUFELENBQXBCLEdBQXdCLHFCQUFsQyxDQUFOO0FBQStELGdCQUFJQyxDQUFDLEdBQUNrQyxDQUFDLENBQUNpQixRQUFGLElBQVlwRCxDQUFDLENBQUMsQ0FBRCxDQUFELElBQU9tQyxDQUFDLENBQUNpQixRQUEzQjs7QUFBb0MsZ0JBQUcsQ0FBQyxDQUFELEtBQUtOLENBQUwsSUFBUSxDQUFDN0MsQ0FBVCxJQUFZRCxDQUFDLENBQUMsQ0FBRCxDQUFELElBQU9vQyxDQUFQLElBQVVBLENBQUMsQ0FBQ3BDLENBQUMsQ0FBQyxDQUFELENBQUYsQ0FBRCxJQUFTbUMsQ0FBQyxDQUFDaUIsUUFBRixDQUFXcEQsQ0FBQyxDQUFDLENBQUQsQ0FBWixDQUFsQyxFQUFtRDtBQUFDLGtCQUFJekIsQ0FBQyxHQUFDLEtBQUssQ0FBWDtBQUFhLGtCQUFHeUIsQ0FBQyxDQUFDLENBQUQsQ0FBRCxJQUFPb0MsQ0FBVixFQUFZN0QsQ0FBQyxHQUFDNkQsQ0FBQyxDQUFDcEMsQ0FBQyxDQUFDLENBQUQsQ0FBRixDQUFILEVBQVUsT0FBTzRDLENBQUMsQ0FBQzVDLENBQUMsQ0FBQyxDQUFELENBQUYsQ0FBbEIsQ0FBWixLQUF5QztBQUFDLG9CQUFHLENBQUNDLENBQUosRUFBTTtBQUFDLHNCQUFHNkMsQ0FBSCxFQUFLO0FBQU8sd0JBQU0sSUFBSUosS0FBSixDQUFVLGdCQUFjM0MsQ0FBZCxHQUFnQiw0QkFBaEIsR0FBNkNDLENBQUMsQ0FBQyxDQUFELENBQTlDLEdBQWtELElBQTVELENBQU47QUFBd0U7O0FBQUF6QixpQkFBQyxHQUFDNEQsQ0FBQyxDQUFDaUIsUUFBRixDQUFXcEQsQ0FBQyxDQUFDLENBQUQsQ0FBWixDQUFGO0FBQW1CO0FBQUEsa0JBQUkrQyxDQUFDLEdBQUMsQ0FBQyxDQUFELEtBQUt4RSxDQUFMLElBQVEsQ0FBQyxDQUFELEtBQUtBLENBQWIsSUFBZ0IsT0FBS0EsQ0FBM0I7O0FBQTZCLGtCQUFHLENBQUN3RSxDQUFELElBQUksQ0FBQ0QsQ0FBUixFQUFVO0FBQUMsb0JBQUlFLENBQUMsR0FBQzlCLENBQUMsQ0FBQ2lDLG1CQUFGLENBQXNCNUUsQ0FBdEIsQ0FBTjtBQUErQiwyQkFBU3lFLENBQVQsSUFBWSxTQUFPekUsQ0FBbkIsS0FBdUJ5RSxDQUFDLEdBQUMsRUFBekIsR0FBNkJILENBQUMsR0FBQzdDLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBS2dELENBQUwsR0FBT0gsQ0FBdEM7QUFBd0M7O0FBQUFDLGVBQUMsR0FBQyxDQUFDLENBQUg7QUFBSyxhQUE3VSxNQUFrVjdDLENBQUMsSUFBRUQsQ0FBQyxDQUFDLENBQUQsQ0FBRCxJQUFPNEMsQ0FBVixJQUFhLE9BQU9BLENBQUMsQ0FBQzVDLENBQUMsQ0FBQyxDQUFELENBQUYsQ0FBckI7QUFBNEI7QUFBQyxTQUF4a0IsR0FBMGtCLE9BQUs2QyxDQUFMLEtBQVNBLENBQUMsR0FBQyxHQUFYLENBQTFrQixFQUEwbEJWLENBQUMsQ0FBQ2tCLFVBQUYsQ0FBYWQsT0FBYixDQUFxQixVQUFTeEMsQ0FBVCxFQUFXO0FBQUMsY0FBSUMsQ0FBQyxHQUFDLEtBQUssQ0FBWDtBQUFhLGlCQUFNLFdBQVNELENBQUMsQ0FBQyxDQUFELENBQVYsR0FBYyxNQUFLZ0QsQ0FBQyxHQUFDaEQsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLZ0QsQ0FBWixDQUFkLEdBQTZCLE1BQUssZUFBYWhELENBQUMsQ0FBQyxDQUFELENBQWQsS0FBb0JBLENBQUMsQ0FBQyxDQUFELENBQUQsSUFBT3FDLENBQVAsSUFBVXBDLENBQUMsR0FBQ29DLENBQUMsQ0FBQ3JDLENBQUMsQ0FBQyxDQUFELENBQUYsQ0FBSCxFQUFVLE9BQU82QyxDQUFDLENBQUM3QyxDQUFDLENBQUMsQ0FBRCxDQUFGLENBQTVCLElBQW9Db0MsQ0FBQyxDQUFDaUIsUUFBRixJQUFZckQsQ0FBQyxDQUFDLENBQUQsQ0FBRCxJQUFPb0MsQ0FBQyxDQUFDaUIsUUFBckIsS0FBZ0NwRCxDQUFDLEdBQUNtQyxDQUFDLENBQUNpQixRQUFGLENBQVdyRCxDQUFDLENBQUMsQ0FBRCxDQUFaLENBQWxDLENBQXBDLEVBQXdGZ0QsQ0FBQyxHQUFDaEQsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFLQyxDQUFMLEdBQU8rQyxDQUFySCxDQUFMLENBQW5DO0FBQWlLLFNBQS9NLENBQTFsQixFQUEyeUJGLENBQUMsR0FBQyxLQUFLMUIsUUFBTCxDQUFjQyxRQUFkLEdBQXVCeUIsQ0FBcDBCLEVBQXMwQlYsQ0FBQyxDQUFDbUIsWUFBRixJQUFnQixhQUFZbkIsQ0FBQyxDQUFDbUIsWUFBOUIsSUFBNEMsS0FBS0MsU0FBTCxNQUFrQnBCLENBQUMsQ0FBQ21CLFlBQUYsQ0FBZUUsT0FBdDVCLEVBQTg1QjtBQUFDLGNBQUlDLENBQUMsR0FBQ1YsQ0FBQyxJQUFFLEtBQUtXLE9BQUwsRUFBVDtBQUF3QmIsV0FBQyxHQUFDVixDQUFDLENBQUNtQixZQUFGLENBQWVFLE9BQWYsR0FBdUIsS0FBdkIsR0FBNkJDLENBQTdCLElBQWdDQSxDQUFDLENBQUNFLE9BQUYsQ0FBVSxNQUFJWCxDQUFkLElBQWlCLENBQUMsQ0FBbEIsSUFBcUIsT0FBS0EsQ0FBMUIsR0FBNEIsRUFBNUIsR0FBK0IsTUFBSUEsQ0FBbkUsSUFBc0VILENBQXhFO0FBQTBFLFNBQWpnQyxNQUFzZ0MsSUFBRyxlQUFhLE9BQU9WLENBQUMsQ0FBQ3lCLE9BQXRCLElBQStCLGVBQWEsT0FBT3pCLENBQUMsQ0FBQ3lCLE9BQUYsQ0FBVSxDQUFWLENBQW5ELElBQWlFLEtBQUtMLFNBQUwsT0FBbUJwQixDQUFDLENBQUN5QixPQUFGLENBQVUsQ0FBVixDQUF2RixFQUFvRztBQUFDLGNBQUlDLENBQUMsR0FBQ2QsQ0FBQyxJQUFFLEtBQUtXLE9BQUwsRUFBVDtBQUF3QmIsV0FBQyxHQUFDVixDQUFDLENBQUN5QixPQUFGLENBQVUsQ0FBVixJQUFhLEtBQWIsR0FBbUJDLENBQW5CLElBQXNCQSxDQUFDLENBQUNGLE9BQUYsQ0FBVSxNQUFJWCxDQUFkLElBQWlCLENBQUMsQ0FBbEIsSUFBcUIsT0FBS0EsQ0FBMUIsR0FBNEIsRUFBNUIsR0FBK0IsTUFBSUEsQ0FBekQsSUFBNERILENBQTlEO0FBQWdFLFNBQTdMLE1BQWtNRSxDQUFDLElBQUUsS0FBS1csT0FBTCxPQUFpQlgsQ0FBQyxJQUFFQSxDQUFDLENBQUNZLE9BQUYsQ0FBVSxNQUFJWCxDQUFkLElBQWlCLENBQUMsQ0FBbEIsSUFBcUIsT0FBS0EsQ0FBMUIsR0FBNEIsRUFBNUIsR0FBK0IsTUFBSUEsQ0FBckMsQ0FBckIsR0FBNkRILENBQUMsR0FBQyxLQUFLVSxTQUFMLEtBQWlCLEtBQWpCLEdBQXVCUixDQUF2QixJQUEwQkEsQ0FBQyxDQUFDWSxPQUFGLENBQVUsTUFBSVgsQ0FBZCxJQUFpQixDQUFDLENBQWxCLElBQXFCLE9BQUtBLENBQTFCLEdBQTRCLEVBQTVCLEdBQStCLE1BQUlBLENBQTdELElBQWdFSCxDQUEvSCxHQUFpSXRFLENBQUMsS0FBRyxDQUFDLENBQUwsS0FBU3NFLENBQUMsR0FBQyxLQUFLVSxTQUFMLEtBQWlCLEtBQWpCLEdBQXVCLEtBQUtHLE9BQUwsRUFBdkIsSUFBdUMsS0FBS0EsT0FBTCxHQUFlQyxPQUFmLENBQXVCLE1BQUlYLENBQTNCLElBQThCLENBQUMsQ0FBL0IsSUFBa0MsT0FBS0EsQ0FBdkMsR0FBeUMsRUFBekMsR0FBNEMsTUFBSUEsQ0FBdkYsSUFBMEZILENBQXJHLENBQWpJOztBQUF5TyxZQUFHekMsTUFBTSxDQUFDMEQsSUFBUCxDQUFZbEIsQ0FBWixFQUFleEQsTUFBZixHQUFzQixDQUF6QixFQUEyQjtBQUFDLGNBQUkyRSxDQUFDLEdBQUMsS0FBSyxDQUFYO0FBQUEsY0FBYUMsQ0FBQyxHQUFDLEVBQWY7QUFBQSxjQUFrQkMsQ0FBQyxHQUFDLFNBQUZBLENBQUUsQ0FBU2xFLENBQVQsRUFBV0MsQ0FBWCxFQUFhO0FBQUNBLGFBQUMsR0FBQyxjQUFZLE9BQU9BLENBQW5CLEdBQXFCQSxDQUFDLEVBQXRCLEdBQXlCQSxDQUEzQixFQUE2QkEsQ0FBQyxHQUFDLFNBQU9BLENBQVAsR0FBUyxFQUFULEdBQVlBLENBQTNDLEVBQTZDZ0UsQ0FBQyxDQUFDRSxJQUFGLENBQU9oRCxDQUFDLENBQUNpRCxvQkFBRixDQUF1QnBFLENBQXZCLElBQTBCLEdBQTFCLEdBQThCbUIsQ0FBQyxDQUFDaUQsb0JBQUYsQ0FBdUJuRSxDQUF2QixDQUFyQyxDQUE3QztBQUE2RyxXQUEvSTs7QUFBZ0osZUFBSStELENBQUosSUFBU25CLENBQVQ7QUFBVyxpQkFBS0gsZ0JBQUwsQ0FBc0JzQixDQUF0QixFQUF3Qm5CLENBQUMsQ0FBQ21CLENBQUQsQ0FBekIsRUFBNkJFLENBQTdCO0FBQVg7O0FBQTJDcEIsV0FBQyxHQUFDQSxDQUFDLEdBQUMsR0FBRixHQUFNbUIsQ0FBQyxDQUFDSSxJQUFGLENBQU8sR0FBUCxDQUFSO0FBQW9COztBQUFBLGVBQU92QixDQUFQO0FBQVM7QUFBejRELEtBQTVwRCxDQUFILEVBQTJpSCxDQUFDO0FBQUM1QixTQUFHLEVBQUMsYUFBTDtBQUFtQmxDLFdBQUssRUFBQyxpQkFBVTtBQUFDLGVBQU9vRCxDQUFQO0FBQVM7QUFBN0MsS0FBRCxFQUFnRDtBQUFDbEIsU0FBRyxFQUFDLFNBQUw7QUFBZWxDLFdBQUssRUFBQyxlQUFTZ0IsQ0FBVCxFQUFXO0FBQUMsWUFBSUMsQ0FBQyxHQUFDa0IsQ0FBQyxDQUFDbUQsV0FBRixFQUFOO0FBQXNCckUsU0FBQyxDQUFDRixjQUFGLENBQWlCQyxDQUFqQjtBQUFvQjtBQUEzRSxLQUFoRCxFQUE2SDtBQUFDa0IsU0FBRyxFQUFDLDBCQUFMO0FBQWdDbEMsV0FBSyxFQUFDLGVBQVNnQixDQUFULEVBQVc7QUFBQyxlQUFPdUUsa0JBQWtCLENBQUN2RSxDQUFELENBQWxCLENBQXNCd0UsT0FBdEIsQ0FBOEIsTUFBOUIsRUFBcUMsR0FBckMsRUFBMENBLE9BQTFDLENBQWtELE1BQWxELEVBQXlELEdBQXpELEVBQThEQSxPQUE5RCxDQUFzRSxNQUF0RSxFQUE2RSxHQUE3RSxFQUFrRkEsT0FBbEYsQ0FBMEYsTUFBMUYsRUFBaUcsR0FBakcsRUFBc0dBLE9BQXRHLENBQThHLE1BQTlHLEVBQXFILEdBQXJILEVBQTBIQSxPQUExSCxDQUFrSSxNQUFsSSxFQUF5SSxHQUF6SSxFQUE4SUEsT0FBOUksQ0FBc0osTUFBdEosRUFBNkosR0FBN0osRUFBa0tBLE9BQWxLLENBQTBLLEtBQTFLLEVBQWdMLEtBQWhMLEVBQXVMQSxPQUF2TCxDQUErTCxLQUEvTCxFQUFxTSxLQUFyTSxFQUE0TUEsT0FBNU0sQ0FBb04sSUFBcE4sRUFBeU4sS0FBek4sQ0FBUDtBQUF1TztBQUF6UixLQUE3SCxFQUF3WjtBQUFDdEQsU0FBRyxFQUFDLHFCQUFMO0FBQTJCbEMsV0FBSyxFQUFDLGVBQVNnQixDQUFULEVBQVc7QUFBQyxlQUFPbUIsQ0FBQyxDQUFDc0Qsd0JBQUYsQ0FBMkJ6RSxDQUEzQixFQUE4QndFLE9BQTlCLENBQXNDLE1BQXRDLEVBQTZDLEdBQTdDLEVBQWtEQSxPQUFsRCxDQUEwRCxNQUExRCxFQUFpRSxHQUFqRSxFQUFzRUEsT0FBdEUsQ0FBOEUsTUFBOUUsRUFBcUYsR0FBckYsRUFBMEZBLE9BQTFGLENBQWtHLE1BQWxHLEVBQXlHLEdBQXpHLENBQVA7QUFBcUg7QUFBbEssS0FBeFosRUFBNGpCO0FBQUN0RCxTQUFHLEVBQUMsc0JBQUw7QUFBNEJsQyxXQUFLLEVBQUMsZUFBU2dCLENBQVQsRUFBVztBQUFDLGVBQU9tQixDQUFDLENBQUNzRCx3QkFBRixDQUEyQnpFLENBQTNCLEVBQThCd0UsT0FBOUIsQ0FBc0MsTUFBdEMsRUFBNkMsR0FBN0MsQ0FBUDtBQUF5RDtBQUF2RyxLQUE1akIsQ0FBM2lILENBQUQsRUFBbXRJckQsQ0FBMXRJO0FBQTR0SSxHQUFwMkksRUFBM21COztBQUFrOUpBLEdBQUMsQ0FBQ3VELEtBQUYsRUFBUXZELENBQUMsQ0FBQ3dELE9BQVY7QUFBa0IsTUFBSXZDLENBQUMsR0FBQyxJQUFJakIsQ0FBSixFQUFOO0FBQVksU0FBTTtBQUFDeUQsVUFBTSxFQUFDekQsQ0FBUjtBQUFVakQsV0FBTyxFQUFDa0U7QUFBbEIsR0FBTjtBQUEyQixDQUF6MEssQ0FBRCxDIiwiZmlsZSI6ImpzL2FwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuXG53aW5kb3cuJCA9IHdpbmRvdy5KUXVlcnkgPSByZXF1aXJlKCdqcXVlcnknKTtcblxuLy8gbG9hZHMgdGhlIEJvb3RzdHJhcCBqUXVlcnkgcGx1Z2luc1xuLyppbXBvcnQgJ2Jvb3RzdHJhcC1zYXNzL2Fzc2V0cy9qYXZhc2NyaXB0cy9ib290c3RyYXAvdHJhbnNpdGlvbi5qcyc7XG5pbXBvcnQgJ2Jvb3RzdHJhcC1zYXNzL2Fzc2V0cy9qYXZhc2NyaXB0cy9ib290c3RyYXAvYWxlcnQuanMnO1xuaW1wb3J0ICdib290c3RyYXAtc2Fzcy9hc3NldHMvamF2YXNjcmlwdHMvYm9vdHN0cmFwL2NvbGxhcHNlLmpzJztcbmltcG9ydCAnYm9vdHN0cmFwLXNhc3MvYXNzZXRzL2phdmFzY3JpcHRzL2Jvb3RzdHJhcC9kcm9wZG93bi5qcyc7XG5pbXBvcnQgJ2Jvb3RzdHJhcC1zYXNzL2Fzc2V0cy9qYXZhc2NyaXB0cy9ib290c3RyYXAvbW9kYWwuanMnOyovXG5cbi8vIGltcG9ydCAnYm9vdHN0cmFwJ1xuaW1wb3J0ICdib290c3RyYXAvZGlzdC9qcy9ib290c3RyYXAubWluJ1xuaW1wb3J0ICcuL2RlcGFydGVtZW50cydcbmltcG9ydCAnLi9jb21tdW5lcyciLCJpbXBvcnQgUm91dGluZyBmcm9tICcuL3JvdXRlcydcblxuXG4oZnVuY3Rpb24gKCkge1xuXG5cbiAgICBsZXQgJHJlZ2lvbiA9ICQoJyNjb250YWN0X3JlZ2lvbicpO1xuICAgIGxldCAkZGVwYXJ0ZW1lbnQgPSAkKCcjY29udGFjdF9kZXBhcnRlbWVudCcpO1xuICAgIGxldCAkY29tbXVuZSA9ICQoJyNjb250YWN0X2NvbW11bmUnKTtcblxuICAgIC8vY2hhcmdlbWVudCBkZSBsYSBsaXN0ZSBkZXMgZMOpcGFydGVtZW50c1xuICAgIGxldCAkcmVzcG9uc2UgPSAoIGRhdGEsICRzZWxlY3QgKSA9PiB7XG4gICAgICAgICQuZWFjaChkYXRhLCBmdW5jdGlvbihvcHRWYWwsIHRleHQpIHtcbiAgICAgICAgICAgICRzZWxlY3QucHJlcGVuZChgPG9wdGlvbiB2YWx1ZT0nJHt0ZXh0W1wiaWRcIl19JyA+JHt0ZXh0W1wibm9tXCJdfTwvb3B0aW9uPmApO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBpZigkZGVwYXJ0ZW1lbnQudmFsKCkgKXtcbiAgICAgICAvLyAkY29tbXVuZS5lbXB0eSgpXG5cbiAgICAgICAgY29uc3QgZGVwYXJ0ZW1lbnRJZCA9ICRkZXBhcnRlbWVudC52YWwoKVxuICAgICAgICBsZXQgcm91dGVDb21tdW5lID0gUm91dGluZy5nZW5lcmF0ZSgndmlsbGVzX2RfdW5fZGVwYXJ0ZW1lbnQnLHsgZGVwYXJ0ZW1lbnQ6IGRlcGFydGVtZW50SWQgfSlcbiAgICAgICAgJC5nZXQocm91dGVDb21tdW5lKS50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiPT1hamF4IGRlcD09PVwiICsgZGF0YSApXG5cbiAgICAgICAgICAkZGVwYXJ0ZW1lbnQuZW1wdHkoKVxuXG4gICAgICAgICAgICAkLmVhY2goZGF0YSwgZnVuY3Rpb24ob3B0VmFsLCB0ZXh0KSB7XG4gICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh0ZXh0Lm5vbSArIFwiLFwiICt0ZXh0LmlkKVxuICAgICAgICAgICAgICAvLyAgJGNvbW11bmUucHJlcGVuZChgPG9wdGlvbiB2YWx1ZT0nJHt0ZXh0LmlkfScgPiR7dGV4dC5ub219PC9vcHRpb24+YCk7XG5cbiAgICAgICAgICAgICAgICBsZXQgbyA9IG5ldyBPcHRpb24odGV4dC5ub20sIHRleHQuaWQgKTtcbiAgICAgICAgICAgICAgLy8gIG8uc2VsZWN0ZWQ9dHJ1ZTtcbiAgICAgICAgICAgICAgICAkKCcjY29udGFjdF9jb21tdW5lJykuYXBwZW5kKG8pO1xuICAgICAgICAgICAgICAgIC8vICRjb21tdW5lLmFwcGVuZChvKTtcbiAgICAgICAgICAgIH0pO1xuXG5cbiAgICAgICAgfSlcblxuICAgIH1cblxuXG5cbi8vcmVjaGVyY2hlIGRlcyBjb21tdW5lcyBjb3JyZXNwb25kYW50IGF1IGTDqXBhcnRlbWVudCBzw6lsZWN0aW9ubsOpXG4gICAgJChkb2N1bWVudCkub24oJ2NoYW5nZScsICcgI2NvbnRhY3RfZGVwYXJ0ZW1lbnQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxldCAkZmllbGQgPSAkKHRoaXMpXG4gICAgICAgIGxldCB2YWx1ZT0kZmllbGQudmFsKClcbiAgICAgICAgJGNvbW11bmUuZW1wdHkoKVxuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgLy8gIHVybDogYGh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9jb21tdW5lcy8ke3ZhbHVlfWAsXG5cbiAgICAgICAgICAgIHVybDogIFJvdXRpbmcuZ2VuZXJhdGUoJ3ZpbGxlc19kX3VuX2RlcGFydGVtZW50Jyx7IGRlcGFydGVtZW50OiB2YWx1ZSB9KSxcbiAgICAgICAgICAgIHR5cGU6ICdHRVQnLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgICAgICBpZihkYXRhLmxlbmd0aCA9PTAgKSBhbGVydChcIklsIG4nZXhpc3RlIGF1Y3VuZSB2aWxsZSBwb3VyIGNlIGTDqXBhcnRlbWVudFwiKVxuXG4gICAgICAgICAgICAgIC8vICBpZiggZGF0YSApe1xuICAgICAgICAgICAgICAgICAgLy8gICRjb21tdW5lLmVtcHR5KClcbiAgICAgICAgICAgICAgICAgICAgLy9ham91dCBkZXMgY29tbXVuZXMgcsOpdG91cm7DqWVzIHBhciBBSkFYIGRhbnMgbGEgbGlzdGUgZMOpcm91bGFudGUgZGVzIGNvbW11bmVzXG4gICAgICAgICAgICAgICAgICAgICRyZXNwb25zZSggZGF0YSwgJGNvbW11bmUgKVxuICAgICAgICAgICAgICAgLy8gfVxuXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgfSk7XG5cbn0pKCkiLCJpbXBvcnQgUm91dGluZyBmcm9tICcuL3JvdXRlcydcblxuXG4kKGZ1bmN0aW9uICgpIHtcblxuICAgIGxldCAkcmVnaW9uID0gJCgnI2NvbnRhY3RfcmVnaW9uJyk7XG4gICAgbGV0ICRkZXBhcnRlbWVudCA9ICQoJyNjb250YWN0X2RlcGFydGVtZW50Jyk7XG4gICAgbGV0ICRjb21tdW5lID0gJCgnI2NvbnRhY3RfY29tbXVuZScpO1xuXG5cbiAgICAvL3BldXBsZW1lbnQgZGVzIGNoYW1wcyBzZWxlY3QgKHJlZ2lvbiwgZMOpcGFydGVtZW50KVxuICAgIGxldCAkcmVzcG9uc2UgPSAoZGF0YSwgJHNlbGVjdCkgPT4ge1xuXG4gICAgICAgICQuZWFjaChkYXRhLCBmdW5jdGlvbiAob3B0VmFsLCB0ZXh0KSB7XG4gICAgICAgICAgICBsZXQgbyA9IG5ldyBPcHRpb24odGV4dC5ub20sIHRleHQuaWQpO1xuICAgICAgICAgICAgLy8gby5zZWxlY3RlZD10cnVlO1xuICAgICAgICAgICAgJCgkc2VsZWN0KS5hcHBlbmQobyk7XG5cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy9sb3JzcXUndW5lIHLDqWdpb24gZXN0IHPDqWxlY3Rpb25uw6llIHBhciBkw6lmYXV0KGV4IHJlZnJlc2ggZGUgbGEgcGFnZSksIG9uIHLDqWFmZmljaGUgc2VzIGTDqXBhcnRlbWVudHNcbiAgICBpZiAoJHJlZ2lvbi52YWwoKSkge1xuICAgICAgICBjb25zdCB2YWx1ZSA9ICRyZWdpb24udmFsKClcblxuXG4gICAgICAgIGxldCBkZXBhcnRlbWVudF9yb3V0ZSA9IFJvdXRpbmcuZ2VuZXJhdGUoXCJkZXBhcnRlbWVudHNfZF91bmVfcmVnaW9uXCIsIHtyZWdpb246IHZhbHVlfSk7XG5cblxuICAgICAgICAvLyAkLmdldChgaHR0cDovLzEyNy4wLjAuMTo4MDAwL2RlcGFydGVtZW50cy8ke3ZhbHVlfWApLnRoZW4oIChkYXRhKT0+e1xuICAgICAgICAkLmdldChkZXBhcnRlbWVudF9yb3V0ZSkudGhlbigoZGF0YSkgPT4ge1xuXG4gICAgICAgICAgICAvLyAkZGVwYXJ0ZW1lbnQuZW1wdHkoKVxuICAgICAgICAgICAgJHJlc3BvbnNlKGRhdGEsICRkZXBhcnRlbWVudClcbiAgICAgICAgfSlcblxuXG5cbiAgICB9XG5cblxuICAgICQoZG9jdW1lbnQpLm9uKCdjaGFuZ2UnLCAnICNjb250YWN0X3JlZ2lvbicsIGZ1bmN0aW9uICgpIHtcblxuICAgICAgICBsZXQgJGZpZWxkID0gJCh0aGlzKVxuICAgICAgICAkY29tbXVuZS5lbXB0eSgpXG4gICAgICAgIC8vICRkZXBhcnRlbWVudC5lbXB0eSgpXG5cbiAgICAgICAgY29uc3QgdmFsdWUgPSAkcmVnaW9uLnZhbCgpXG5cblxuICAgICAgICBsZXQgJHJlZ2lvbkZpZWxkID0gJCgnI2NvbnRhY3RfcmVnaW9uJylcbiAgICAgICAgbGV0ICRmb3JtID0gJGZpZWxkLmNsb3Nlc3QoJ2Zvcm0nKVxuXG4gICAgICAgIGxldCBkZXBhcnRlbWVudF9yb3V0ZSA9IFJvdXRpbmcuZ2VuZXJhdGUoXCJkZXBhcnRlbWVudHNfZF91bmVfcmVnaW9uXCIsIHtyZWdpb246IHZhbHVlfSk7XG5cblxuICAgICAgICAvLyAkLmdldChgaHR0cDovLzEyNy4wLjAuMTo4MDAwL2RlcGFydGVtZW50cy8ke3ZhbHVlfWApLnRoZW4oIChkYXRhKT0+e1xuICAgICAgICAkLmdldChkZXBhcnRlbWVudF9yb3V0ZSkudGhlbigoZGF0YSkgPT4ge1xuXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInJlZ2lvbiBzZWxlY3QgPVwiICsgJGRlcGFydGVtZW50LnZhbCgpKVxuICAgICAgICAgICAgJGRlcGFydGVtZW50LmVtcHR5KClcbiAgICAgICAgICAgICRkZXBhcnRlbWVudC5hcHBlbmQobmV3IE9wdGlvbihcIlPDqWxlY3Rpb25uZXogdm90cmUgZMOpcGFydGVtZW50XCIsIFwiXCIpKTtcblxuXG4gICAgICAgICAgICAkcmVzcG9uc2UoZGF0YSwgJGRlcGFydGVtZW50KTtcblxuXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKVxuICAgICAgICB9KVxuXG5cbiAgICB9KTtcblxuXG5cblxufSkiLCJcblxuY29uc3Qgcm91dGVzID0gcmVxdWlyZSgnLi4vLi4vcHVibGljL2pzL2Zvc19qc19yb3V0ZXMuanNvbicpO1xuaW1wb3J0IFJvdXRpbmcgZnJvbSAnLi4vLi4vdmVuZG9yL2ZyaWVuZHNvZnN5bWZvbnkvanNyb3V0aW5nLWJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2pzL3JvdXRlci5taW4uanMnO1xuUm91dGluZy5zZXRSb3V0aW5nRGF0YShyb3V0ZXMpO1xuXG5cblxuZXhwb3J0IGRlZmF1bHQgUm91dGluZ1xuIiwiIWZ1bmN0aW9uKGUsdCl7dmFyIG49dCgpO1wiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZD9kZWZpbmUoW10sbi5Sb3V0aW5nKTpcIm9iamVjdFwiPT10eXBlb2YgbW9kdWxlJiZtb2R1bGUuZXhwb3J0cz9tb2R1bGUuZXhwb3J0cz1uLlJvdXRpbmc6KGUuUm91dGluZz1uLlJvdXRpbmcsZS5mb3M9e1JvdXRlcjpuLlJvdXRlcn0pfSh0aGlzLGZ1bmN0aW9uKCl7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gZShlLHQpe2lmKCEoZSBpbnN0YW5jZW9mIHQpKXRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIil9dmFyIHQ9T2JqZWN0LmFzc2lnbnx8ZnVuY3Rpb24oZSl7Zm9yKHZhciB0PTE7dDxhcmd1bWVudHMubGVuZ3RoO3QrKyl7dmFyIG49YXJndW1lbnRzW3RdO2Zvcih2YXIgbyBpbiBuKU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChuLG8pJiYoZVtvXT1uW29dKX1yZXR1cm4gZX0sbj1cImZ1bmN0aW9uXCI9PXR5cGVvZiBTeW1ib2wmJlwic3ltYm9sXCI9PXR5cGVvZiBTeW1ib2wuaXRlcmF0b3I/ZnVuY3Rpb24oZSl7cmV0dXJuIHR5cGVvZiBlfTpmdW5jdGlvbihlKXtyZXR1cm4gZSYmXCJmdW5jdGlvblwiPT10eXBlb2YgU3ltYm9sJiZlLmNvbnN0cnVjdG9yPT09U3ltYm9sJiZlIT09U3ltYm9sLnByb3RvdHlwZT9cInN5bWJvbFwiOnR5cGVvZiBlfSxvPWZ1bmN0aW9uKCl7ZnVuY3Rpb24gZShlLHQpe2Zvcih2YXIgbj0wO248dC5sZW5ndGg7bisrKXt2YXIgbz10W25dO28uZW51bWVyYWJsZT1vLmVudW1lcmFibGV8fCExLG8uY29uZmlndXJhYmxlPSEwLFwidmFsdWVcImluIG8mJihvLndyaXRhYmxlPSEwKSxPYmplY3QuZGVmaW5lUHJvcGVydHkoZSxvLmtleSxvKX19cmV0dXJuIGZ1bmN0aW9uKHQsbixvKXtyZXR1cm4gbiYmZSh0LnByb3RvdHlwZSxuKSxvJiZlKHQsbyksdH19KCkscj1mdW5jdGlvbigpe2Z1bmN0aW9uIHIodCxuKXtlKHRoaXMsciksdGhpcy5jb250ZXh0Xz10fHx7YmFzZV91cmw6XCJcIixwcmVmaXg6XCJcIixob3N0OlwiXCIscG9ydDpcIlwiLHNjaGVtZTpcIlwiLGxvY2FsZTpcIlwifSx0aGlzLnNldFJvdXRlcyhufHx7fSl9cmV0dXJuIG8ocixbe2tleTpcInNldFJvdXRpbmdEYXRhXCIsdmFsdWU6ZnVuY3Rpb24oZSl7dGhpcy5zZXRCYXNlVXJsKGUuYmFzZV91cmwpLHRoaXMuc2V0Um91dGVzKGUucm91dGVzKSxcInByZWZpeFwiaW4gZSYmdGhpcy5zZXRQcmVmaXgoZS5wcmVmaXgpLFwicG9ydFwiaW4gZSYmdGhpcy5zZXRQb3J0KGUucG9ydCksXCJsb2NhbGVcImluIGUmJnRoaXMuc2V0TG9jYWxlKGUubG9jYWxlKSx0aGlzLnNldEhvc3QoZS5ob3N0KSx0aGlzLnNldFNjaGVtZShlLnNjaGVtZSl9fSx7a2V5Olwic2V0Um91dGVzXCIsdmFsdWU6ZnVuY3Rpb24oZSl7dGhpcy5yb3V0ZXNfPU9iamVjdC5mcmVlemUoZSl9fSx7a2V5OlwiZ2V0Um91dGVzXCIsdmFsdWU6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5yb3V0ZXNffX0se2tleTpcInNldEJhc2VVcmxcIix2YWx1ZTpmdW5jdGlvbihlKXt0aGlzLmNvbnRleHRfLmJhc2VfdXJsPWV9fSx7a2V5OlwiZ2V0QmFzZVVybFwiLHZhbHVlOmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuY29udGV4dF8uYmFzZV91cmx9fSx7a2V5Olwic2V0UHJlZml4XCIsdmFsdWU6ZnVuY3Rpb24oZSl7dGhpcy5jb250ZXh0Xy5wcmVmaXg9ZX19LHtrZXk6XCJzZXRTY2hlbWVcIix2YWx1ZTpmdW5jdGlvbihlKXt0aGlzLmNvbnRleHRfLnNjaGVtZT1lfX0se2tleTpcImdldFNjaGVtZVwiLHZhbHVlOmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuY29udGV4dF8uc2NoZW1lfX0se2tleTpcInNldEhvc3RcIix2YWx1ZTpmdW5jdGlvbihlKXt0aGlzLmNvbnRleHRfLmhvc3Q9ZX19LHtrZXk6XCJnZXRIb3N0XCIsdmFsdWU6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5jb250ZXh0Xy5ob3N0fX0se2tleTpcInNldFBvcnRcIix2YWx1ZTpmdW5jdGlvbihlKXt0aGlzLmNvbnRleHRfLnBvcnQ9ZX19LHtrZXk6XCJnZXRQb3J0XCIsdmFsdWU6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5jb250ZXh0Xy5wb3J0fX0se2tleTpcInNldExvY2FsZVwiLHZhbHVlOmZ1bmN0aW9uKGUpe3RoaXMuY29udGV4dF8ubG9jYWxlPWV9fSx7a2V5OlwiZ2V0TG9jYWxlXCIsdmFsdWU6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5jb250ZXh0Xy5sb2NhbGV9fSx7a2V5OlwiYnVpbGRRdWVyeVBhcmFtc1wiLHZhbHVlOmZ1bmN0aW9uKGUsdCxvKXt2YXIgcj10aGlzLGk9dm9pZCAwLHU9bmV3IFJlZ0V4cCgvXFxbXFxdJC8pO2lmKHQgaW5zdGFuY2VvZiBBcnJheSl0LmZvckVhY2goZnVuY3Rpb24odCxpKXt1LnRlc3QoZSk/byhlLHQpOnIuYnVpbGRRdWVyeVBhcmFtcyhlK1wiW1wiKyhcIm9iamVjdFwiPT09KFwidW5kZWZpbmVkXCI9PXR5cGVvZiB0P1widW5kZWZpbmVkXCI6bih0KSk/aTpcIlwiKStcIl1cIix0LG8pfSk7ZWxzZSBpZihcIm9iamVjdFwiPT09KFwidW5kZWZpbmVkXCI9PXR5cGVvZiB0P1widW5kZWZpbmVkXCI6bih0KSkpZm9yKGkgaW4gdCl0aGlzLmJ1aWxkUXVlcnlQYXJhbXMoZStcIltcIitpK1wiXVwiLHRbaV0sbyk7ZWxzZSBvKGUsdCl9fSx7a2V5OlwiZ2V0Um91dGVcIix2YWx1ZTpmdW5jdGlvbihlKXt2YXIgdD10aGlzLmNvbnRleHRfLnByZWZpeCtlLG49ZStcIi5cIit0aGlzLmNvbnRleHRfLmxvY2FsZSxvPXRoaXMuY29udGV4dF8ucHJlZml4K2UrXCIuXCIrdGhpcy5jb250ZXh0Xy5sb2NhbGUscj1bdCxuLG8sZV07Zm9yKHZhciBpIGluIHIpaWYocltpXWluIHRoaXMucm91dGVzXylyZXR1cm4gdGhpcy5yb3V0ZXNfW3JbaV1dO3Rocm93IG5ldyBFcnJvcignVGhlIHJvdXRlIFwiJytlKydcIiBkb2VzIG5vdCBleGlzdC4nKX19LHtrZXk6XCJnZW5lcmF0ZVwiLHZhbHVlOmZ1bmN0aW9uKGUsbil7dmFyIG89YXJndW1lbnRzLmxlbmd0aD4yJiZ2b2lkIDAhPT1hcmd1bWVudHNbMl0mJmFyZ3VtZW50c1syXSxpPXRoaXMuZ2V0Um91dGUoZSksdT1ufHx7fSxzPXQoe30sdSksYz1cIlwiLGE9ITAsbD1cIlwiLGY9XCJ1bmRlZmluZWRcIj09dHlwZW9mIHRoaXMuZ2V0UG9ydCgpfHxudWxsPT09dGhpcy5nZXRQb3J0KCk/XCJcIjp0aGlzLmdldFBvcnQoKTtpZihpLnRva2Vucy5mb3JFYWNoKGZ1bmN0aW9uKHQpe2lmKFwidGV4dFwiPT09dFswXSlyZXR1cm4gYz1yLmVuY29kZVBhdGhDb21wb25lbnQodFsxXSkrYyx2b2lkKGE9ITEpO3tpZihcInZhcmlhYmxlXCIhPT10WzBdKXRocm93IG5ldyBFcnJvcignVGhlIHRva2VuIHR5cGUgXCInK3RbMF0rJ1wiIGlzIG5vdCBzdXBwb3J0ZWQuJyk7dmFyIG49aS5kZWZhdWx0cyYmdFszXWluIGkuZGVmYXVsdHM7aWYoITE9PT1hfHwhbnx8dFszXWluIHUmJnVbdFszXV0hPWkuZGVmYXVsdHNbdFszXV0pe3ZhciBvPXZvaWQgMDtpZih0WzNdaW4gdSlvPXVbdFszXV0sZGVsZXRlIHNbdFszXV07ZWxzZXtpZighbil7aWYoYSlyZXR1cm47dGhyb3cgbmV3IEVycm9yKCdUaGUgcm91dGUgXCInK2UrJ1wiIHJlcXVpcmVzIHRoZSBwYXJhbWV0ZXIgXCInK3RbM10rJ1wiLicpfW89aS5kZWZhdWx0c1t0WzNdXX12YXIgbD0hMD09PW98fCExPT09b3x8XCJcIj09PW87aWYoIWx8fCFhKXt2YXIgZj1yLmVuY29kZVBhdGhDb21wb25lbnQobyk7XCJudWxsXCI9PT1mJiZudWxsPT09byYmKGY9XCJcIiksYz10WzFdK2YrY31hPSExfWVsc2UgbiYmdFszXWluIHMmJmRlbGV0ZSBzW3RbM11dfX0pLFwiXCI9PT1jJiYoYz1cIi9cIiksaS5ob3N0dG9rZW5zLmZvckVhY2goZnVuY3Rpb24oZSl7dmFyIHQ9dm9pZCAwO3JldHVyblwidGV4dFwiPT09ZVswXT92b2lkKGw9ZVsxXStsKTp2b2lkKFwidmFyaWFibGVcIj09PWVbMF0mJihlWzNdaW4gdT8odD11W2VbM11dLGRlbGV0ZSBzW2VbM11dKTppLmRlZmF1bHRzJiZlWzNdaW4gaS5kZWZhdWx0cyYmKHQ9aS5kZWZhdWx0c1tlWzNdXSksbD1lWzFdK3QrbCkpfSksYz10aGlzLmNvbnRleHRfLmJhc2VfdXJsK2MsaS5yZXF1aXJlbWVudHMmJlwiX3NjaGVtZVwiaW4gaS5yZXF1aXJlbWVudHMmJnRoaXMuZ2V0U2NoZW1lKCkhPWkucmVxdWlyZW1lbnRzLl9zY2hlbWUpe3ZhciBoPWx8fHRoaXMuZ2V0SG9zdCgpO2M9aS5yZXF1aXJlbWVudHMuX3NjaGVtZStcIjovL1wiK2grKGguaW5kZXhPZihcIjpcIitmKT4tMXx8XCJcIj09PWY/XCJcIjpcIjpcIitmKStjfWVsc2UgaWYoXCJ1bmRlZmluZWRcIiE9dHlwZW9mIGkuc2NoZW1lcyYmXCJ1bmRlZmluZWRcIiE9dHlwZW9mIGkuc2NoZW1lc1swXSYmdGhpcy5nZXRTY2hlbWUoKSE9PWkuc2NoZW1lc1swXSl7dmFyIHA9bHx8dGhpcy5nZXRIb3N0KCk7Yz1pLnNjaGVtZXNbMF0rXCI6Ly9cIitwKyhwLmluZGV4T2YoXCI6XCIrZik+LTF8fFwiXCI9PT1mP1wiXCI6XCI6XCIrZikrY31lbHNlIGwmJnRoaXMuZ2V0SG9zdCgpIT09bCsobC5pbmRleE9mKFwiOlwiK2YpPi0xfHxcIlwiPT09Zj9cIlwiOlwiOlwiK2YpP2M9dGhpcy5nZXRTY2hlbWUoKStcIjovL1wiK2wrKGwuaW5kZXhPZihcIjpcIitmKT4tMXx8XCJcIj09PWY/XCJcIjpcIjpcIitmKStjOm89PT0hMCYmKGM9dGhpcy5nZXRTY2hlbWUoKStcIjovL1wiK3RoaXMuZ2V0SG9zdCgpKyh0aGlzLmdldEhvc3QoKS5pbmRleE9mKFwiOlwiK2YpPi0xfHxcIlwiPT09Zj9cIlwiOlwiOlwiK2YpK2MpO2lmKE9iamVjdC5rZXlzKHMpLmxlbmd0aD4wKXt2YXIgZD12b2lkIDAseT1bXSx2PWZ1bmN0aW9uKGUsdCl7dD1cImZ1bmN0aW9uXCI9PXR5cGVvZiB0P3QoKTp0LHQ9bnVsbD09PXQ/XCJcIjp0LHkucHVzaChyLmVuY29kZVF1ZXJ5Q29tcG9uZW50KGUpK1wiPVwiK3IuZW5jb2RlUXVlcnlDb21wb25lbnQodCkpfTtmb3IoZCBpbiBzKXRoaXMuYnVpbGRRdWVyeVBhcmFtcyhkLHNbZF0sdik7Yz1jK1wiP1wiK3kuam9pbihcIiZcIil9cmV0dXJuIGN9fV0sW3trZXk6XCJnZXRJbnN0YW5jZVwiLHZhbHVlOmZ1bmN0aW9uKCl7cmV0dXJuIGl9fSx7a2V5Olwic2V0RGF0YVwiLHZhbHVlOmZ1bmN0aW9uKGUpe3ZhciB0PXIuZ2V0SW5zdGFuY2UoKTt0LnNldFJvdXRpbmdEYXRhKGUpfX0se2tleTpcImN1c3RvbUVuY29kZVVSSUNvbXBvbmVudFwiLHZhbHVlOmZ1bmN0aW9uKGUpe3JldHVybiBlbmNvZGVVUklDb21wb25lbnQoZSkucmVwbGFjZSgvJTJGL2csXCIvXCIpLnJlcGxhY2UoLyU0MC9nLFwiQFwiKS5yZXBsYWNlKC8lM0EvZyxcIjpcIikucmVwbGFjZSgvJTIxL2csXCIhXCIpLnJlcGxhY2UoLyUzQi9nLFwiO1wiKS5yZXBsYWNlKC8lMkMvZyxcIixcIikucmVwbGFjZSgvJTJBL2csXCIqXCIpLnJlcGxhY2UoL1xcKC9nLFwiJTI4XCIpLnJlcGxhY2UoL1xcKS9nLFwiJTI5XCIpLnJlcGxhY2UoLycvZyxcIiUyN1wiKX19LHtrZXk6XCJlbmNvZGVQYXRoQ29tcG9uZW50XCIsdmFsdWU6ZnVuY3Rpb24oZSl7cmV0dXJuIHIuY3VzdG9tRW5jb2RlVVJJQ29tcG9uZW50KGUpLnJlcGxhY2UoLyUzRC9nLFwiPVwiKS5yZXBsYWNlKC8lMkIvZyxcIitcIikucmVwbGFjZSgvJTIxL2csXCIhXCIpLnJlcGxhY2UoLyU3Qy9nLFwifFwiKX19LHtrZXk6XCJlbmNvZGVRdWVyeUNvbXBvbmVudFwiLHZhbHVlOmZ1bmN0aW9uKGUpe3JldHVybiByLmN1c3RvbUVuY29kZVVSSUNvbXBvbmVudChlKS5yZXBsYWNlKC8lM0YvZyxcIj9cIil9fV0pLHJ9KCk7ci5Sb3V0ZSxyLkNvbnRleHQ7dmFyIGk9bmV3IHI7cmV0dXJue1JvdXRlcjpyLFJvdXRpbmc6aX19KTsiXSwic291cmNlUm9vdCI6IiJ9