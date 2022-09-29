(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["shopify"],{

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/shopify.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/shopify.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  data: function data() {\n    return {\n      website: \"\"\n    };\n  },\n  methods: {\n    enterClick: function enterClick() {\n      var _this = this;\n\n      if (!this.website) {\n        this.$elementMessage(\"Please input website url\", \"error\");\n        return;\n      }\n\n      this.$apiCall(\"api.User.getInfoFromUrl\", {\n        url: \"\".concat(this.website, \".myourmall.com\")\n      }, function (r) {\n        if (r.ErrorCode == 9999) {\n          window.open(\"https://\" + _this.website + \".myourmall.com\");\n        } else {\n          _this.$elementMessage(r.Message, \"error\");\n        }\n      });\n    },\n    onCopy: function onCopy() {\n      this.$elementMessage(\"Successfully copied to the clipboard\", \"success\");\n    },\n    onError: function onError() {\n      this.$elementMessage(\"Failed to copy to cutting board, please copy manually\", \"error\");\n    }\n  }\n});\n\n//# sourceURL=webpack:///./src/views/shopify.vue?./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"ab060228-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/shopify.vue?vue&type=template&id=6ea56c1c&scoped=true&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"ab060228-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/shopify.vue?vue&type=template&id=6ea56c1c&scoped=true& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function() {\n  var _vm = this\n  var _h = _vm.$createElement\n  var _c = _vm._self._c || _h\n  return _c(\"div\", { staticClass: \"shopify-main\" }, [\n    _c(\"div\", { staticClass: \"main\" }, [\n      _vm._m(0),\n      _c(\"div\", { staticClass: \"body\" }, [\n        _c(\"div\", { staticClass: \"title\" }, [_vm._v(\"Quick Access\")]),\n        _c(\"div\", { staticClass: \"txt\" }, [\n          _vm._v(\"Do you have an OurMall supplier for you\")\n        ]),\n        _c(\"div\", { staticClass: \"row1\" }, [\n          _c(\"div\", { staticClass: \"tit\" }, [\n            _vm._v(\"Already have a supplier\")\n          ]),\n          _c(\"div\", { staticClass: \"input\" }, [\n            _c(\"div\", { staticClass: \"field\" }, [\n              _c(\"div\", { staticClass: \"field__body\" }, [\n                _c(\"input\", {\n                  directives: [\n                    {\n                      name: \"model\",\n                      rawName: \"v-model\",\n                      value: _vm.website,\n                      expression: \"website\"\n                    }\n                  ],\n                  attrs: {\n                    type: \"text\",\n                    placeholder: \"Please enter supplier store name\"\n                  },\n                  domProps: { value: _vm.website },\n                  on: {\n                    input: function($event) {\n                      if ($event.target.composing) {\n                        return\n                      }\n                      _vm.website = $event.target.value\n                    }\n                  }\n                })\n              ]),\n              _c(\"div\", { staticClass: \"field__txt\" }, [\n                _vm._v(\"myourmall.com\")\n              ])\n            ]),\n            _c(\n              \"button\",\n              { staticClass: \"btn\", on: { click: _vm.enterClick } },\n              [_vm._v(\"Enter\")]\n            )\n          ])\n        ]),\n        _c(\"div\", { staticClass: \"row2\" }, [\n          _c(\"div\", { staticClass: \"tit\" }, [\n            _vm._v(\"I don't have a supplier\")\n          ]),\n          _c(\"div\", { staticClass: \"txt\" }, [\n            _c(\"span\", [\n              _vm._v(\n                \"Let your supplier fulfill your order more systematically, copy the link and send it to your supplier, and immediately invite your supplier to settle in, \"\n              )\n            ]),\n            _c(\n              \"a\",\n              {\n                staticClass: \"url\",\n                attrs: { href: \"https://www.ourmall.com\" }\n              },\n              [_vm._v(\"https://www.ourmall.com\")]\n            ),\n            _c(\n              \"span\",\n              {\n                directives: [\n                  {\n                    name: \"clipboard\",\n                    rawName: \"v-clipboard:copy\",\n                    value: \"https://www.ourmall.com\",\n                    expression: \"'https://www.ourmall.com'\",\n                    arg: \"copy\"\n                  },\n                  {\n                    name: \"clipboard\",\n                    rawName: \"v-clipboard:success\",\n                    value: _vm.onCopy,\n                    expression: \"onCopy\",\n                    arg: \"success\"\n                  },\n                  {\n                    name: \"clipboard\",\n                    rawName: \"v-clipboard:error\",\n                    value: _vm.onError,\n                    expression: \"onError\",\n                    arg: \"error\"\n                  }\n                ],\n                staticClass: \"btn\"\n              },\n              [_vm._v(\"Copy Link\")]\n            )\n          ])\n        ])\n      ]),\n      _c(\"div\", { staticClass: \"footer\" }, [\n        _vm._v(\"© 2015-2021OurMall All Rights Reserved.\")\n      ])\n    ])\n  ])\n}\nvar staticRenderFns = [\n  function() {\n    var _vm = this\n    var _h = _vm.$createElement\n    var _c = _vm._self._c || _h\n    return _c(\"div\", { staticClass: \"header\" }, [\n      _c(\"div\", { staticClass: \"logo-row\" }, [\n        _c(\"img\", {\n          attrs: { src: __webpack_require__(/*! ../../public/images/shopify/logo.png */ \"./public/images/shopify/logo.png\") }\n        })\n      ]),\n      _c(\"div\", { staticClass: \"rows\" }, [\n        _c(\"div\", { staticClass: \"content\" }, [\n          _c(\"div\", { staticClass: \"title\" }, [\n            _vm._v(\n              \" THE BRIDGE CONNECTING SUPPLIERS AND YOU, MAKING DROPSHIPPING BUSINESS MORE CONVENIENT. \"\n            )\n          ]),\n          _c(\"div\", { staticClass: \"flex\" }, [\n            _c(\"img\", {\n              attrs: {\n                src: __webpack_require__(/*! ../../public/images/shopify/register.png */ \"./public/images/shopify/register.png\")\n              }\n            }),\n            _c(\"span\", [\n              _vm._v(\n                \"Your supplier only needs to register an account to quickly build the system\"\n              )\n            ])\n          ]),\n          _c(\"div\", { staticClass: \"flex\" }, [\n            _c(\"img\", {\n              attrs: { src: __webpack_require__(/*! ../../public/images/shopify/order.png */ \"./public/images/shopify/order.png\") }\n            }),\n            _c(\"span\", [\n              _vm._v(\n                \"One-click hosting of stores, fast synchronization of orders\"\n              )\n            ])\n          ]),\n          _c(\"div\", { staticClass: \"flex\" }, [\n            _c(\"img\", {\n              attrs: {\n                src: __webpack_require__(/*! ../../public/images/shopify/logistics.png */ \"./public/images/shopify/logistics.png\")\n              }\n            }),\n            _c(\"span\", [\n              _vm._v(\"Automatically synchronize logistics information\")\n            ])\n          ])\n        ]),\n        _c(\"div\", { staticClass: \"image\" }, [\n          _c(\"img\", {\n            attrs: { src: __webpack_require__(/*! ../../public/images/shopify/image.png */ \"./public/images/shopify/image.png\") }\n          })\n        ])\n      ])\n    ])\n  }\n]\nrender._withStripped = true\n\n\n\n//# sourceURL=webpack:///./src/views/shopify.vue?./node_modules/cache-loader/dist/cjs.js?%7B%22cacheDirectory%22:%22node_modules/.cache/vue-loader%22,%22cacheIdentifier%22:%22ab060228-vue-loader-template%22%7D!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/shopify.vue?vue&type=style&index=0&id=6ea56c1c&lang=scss&scoped=true&":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-oneOf-1-2!./node_modules/sass-loader/dist/cjs.js??ref--8-oneOf-1-3!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/shopify.vue?vue&type=style&index=0&id=6ea56c1c&lang=scss&scoped=true& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// Imports\nvar ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\nvar ___CSS_LOADER_GET_URL_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/getUrl.js */ \"./node_modules/css-loader/dist/runtime/getUrl.js\");\nvar ___CSS_LOADER_URL_IMPORT_0___ = __webpack_require__(/*! ../../public/images/shopify/bg.jpg */ \"./public/images/shopify/bg.jpg\");\nexports = ___CSS_LOADER_API_IMPORT___(false);\nvar ___CSS_LOADER_URL_REPLACEMENT_0___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_0___);\n// Module\nexports.push([module.i, \".shopify-main[data-v-6ea56c1c] {\\n  width: 100%;\\n  background-position: center;\\n  background-repeat: repeat-y;\\n  overflow-x: auto;\\n}\\n.shopify-main .main[data-v-6ea56c1c] {\\n  margin: 0 auto;\\n  min-width: 1420px;\\n  position: relative;\\n  background-color: #fcfcfc;\\n  background: url(\" + ___CSS_LOADER_URL_REPLACEMENT_0___ + \");\\n  background-position: top center;\\n  background-repeat: no-repeat;\\n  overflow: hidden;\\n}\\n.shopify-main .main .header[data-v-6ea56c1c] {\\n  margin: 0 auto;\\n  width: 1420px;\\n  height: 540px;\\n}\\n.shopify-main .main .header .logo-row[data-v-6ea56c1c] {\\n  padding-top: 30px;\\n}\\n.shopify-main .main .header .logo-row > img[data-v-6ea56c1c] {\\n  width: 134px;\\n  height: 27px;\\n  cursor: pointer;\\n}\\n.shopify-main .main .header .rows[data-v-6ea56c1c] {\\n  margin-top: 16px;\\n  display: flex;\\n  justify-content: space-between;\\n}\\n.shopify-main .main .header .rows .content[data-v-6ea56c1c] {\\n  margin-right: 25px;\\n  flex: 1;\\n}\\n.shopify-main .main .header .rows .content .title[data-v-6ea56c1c] {\\n  padding: 50px 0 4px;\\n  font-size: 40px;\\n  font-weight: 600;\\n  color: #ffffff;\\n  line-height: 50px;\\n}\\n.shopify-main .main .header .rows .content .flex[data-v-6ea56c1c] {\\n  padding-top: 18px;\\n  display: flex;\\n  align-items: center;\\n}\\n.shopify-main .main .header .rows .content .flex > img[data-v-6ea56c1c] {\\n  display: block;\\n  width: 22px;\\n}\\n.shopify-main .main .header .rows .content .flex > span[data-v-6ea56c1c] {\\n  padding-left: 14px;\\n  font-size: 18px;\\n  font-family: PingFangSC-Regular, PingFang SC;\\n  font-weight: 400;\\n  color: #cedeff;\\n  line-height: 28px;\\n}\\n.shopify-main .main .header .rows .image[data-v-6ea56c1c] {\\n  width: 680px;\\n}\\n.shopify-main .main .body[data-v-6ea56c1c] {\\n  margin: auto;\\n  width: 1200px;\\n  height: 508px;\\n  text-align: center;\\n}\\n.shopify-main .main .body .title[data-v-6ea56c1c] {\\n  font-size: 30px;\\n  font-family: PingFangSC-Semibold, PingFang SC;\\n  font-weight: 600;\\n  color: #808080;\\n  line-height: 42px;\\n}\\n.shopify-main .main .body .txt[data-v-6ea56c1c] {\\n  padding-top: 14px;\\n  font-size: 24px;\\n  font-weight: 600;\\n  color: #232323;\\n  line-height: 33px;\\n}\\n.shopify-main .main .body .row1[data-v-6ea56c1c] {\\n  padding: 40px 50px 0;\\n  text-align: left;\\n}\\n.shopify-main .main .body .row1 .tit[data-v-6ea56c1c] {\\n  font-size: 20px;\\n  font-family: PingFangSC-Semibold, PingFang SC;\\n  font-weight: 600;\\n  color: #5461b3;\\n  line-height: 28px;\\n}\\n.shopify-main .main .body .row1 .input[data-v-6ea56c1c] {\\n  padding-top: 15px;\\n  display: flex;\\n  justify-content: space-between;\\n  align-items: center;\\n}\\n.shopify-main .main .body .row1 .input .field[data-v-6ea56c1c] {\\n  width: 892px;\\n  height: 77px;\\n  background: #ffffff;\\n  border-radius: 4px;\\n  display: flex;\\n}\\n.shopify-main .main .body .row1 .input .field .field__body[data-v-6ea56c1c] {\\n  width: 700px;\\n  display: flex;\\n  align-items: center;\\n}\\n.shopify-main .main .body .row1 .input .field .field__body > input[data-v-6ea56c1c] {\\n  padding: 0 19px;\\n  width: 100%;\\n  height: 36px;\\n  font-size: 14px;\\n  font-family: PingFangSC-Regular, PingFang SC;\\n  font-weight: 400;\\n  color: #9c9b9f;\\n  line-height: 36px;\\n  border: none;\\n  outline: none;\\n}\\n.shopify-main .main .body .row1 .input .field .field__txt[data-v-6ea56c1c] {\\n  position: relative;\\n  flex: 1;\\n  font-size: 15px;\\n  font-family: PingFangSC-Semibold, PingFang SC;\\n  font-weight: 600;\\n  color: #5666ba;\\n  line-height: 21px;\\n  display: flex;\\n  justify-content: center;\\n  align-items: center;\\n}\\n.shopify-main .main .body .row1 .input .field .field__txt[data-v-6ea56c1c]::before {\\n  position: absolute;\\n  top: 11px;\\n  left: 0;\\n  bottom: 11px;\\n  content: \\\"\\\";\\n  border-left: 1px solid rgb(227, 227, 227);\\n}\\n.shopify-main .main .body .row1 .input .btn[data-v-6ea56c1c] {\\n  width: 189px;\\n  height: 54px;\\n  font-size: 20px;\\n  font-family: PingFangSC-Semibold, PingFang SC;\\n  font-weight: 600;\\n  color: #ffffff;\\n  line-height: 28px;\\n  background: linear-gradient(126deg, #525fb0 0%, #7597ff 100%);\\n  border-radius: 39px;\\n  border: none;\\n  cursor: pointer;\\n}\\n.shopify-main .main .body .row2[data-v-6ea56c1c] {\\n  padding: 40px 50px 0;\\n  text-align: left;\\n}\\n.shopify-main .main .body .row2 .tit[data-v-6ea56c1c] {\\n  font-size: 20px;\\n  font-family: PingFangSC-Semibold, PingFang SC;\\n  font-weight: 600;\\n  color: #5461b3;\\n  line-height: 28px;\\n}\\n.shopify-main .main .body .row2 .txt[data-v-6ea56c1c] {\\n  font-size: 16px;\\n  font-weight: 600;\\n  color: #808080;\\n  line-height: 22px;\\n}\\n.shopify-main .main .body .row2 .txt .url[data-v-6ea56c1c] {\\n  color: rgb(86, 102, 186);\\n  text-decoration: none;\\n  cursor: pointer;\\n}\\n.shopify-main .main .body .row2 .txt .btn[data-v-6ea56c1c] {\\n  margin-left: 36px;\\n  color: #006fff;\\n  cursor: pointer;\\n}\\n.shopify-main .main .footer[data-v-6ea56c1c] {\\n  min-width: 1200px;\\n  height: 50px;\\n  font-size: 15px;\\n  font-family: PingFangSC-Semibold, PingFang SC;\\n  font-weight: 600;\\n  color: #5666ba;\\n  line-height: 21px;\\n  background: #1e2a48;\\n  display: flex;\\n  justify-content: center;\\n  align-items: center;\\n}\", \"\"]);\n// Exports\nmodule.exports = exports;\n\n\n//# sourceURL=webpack:///./src/views/shopify.vue?./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-oneOf-1-2!./node_modules/sass-loader/dist/cjs.js??ref--8-oneOf-1-3!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/shopify.vue?vue&type=style&index=0&id=6ea56c1c&lang=scss&scoped=true&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-oneOf-1-2!./node_modules/sass-loader/dist/cjs.js??ref--8-oneOf-1-3!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/shopify.vue?vue&type=style&index=0&id=6ea56c1c&lang=scss&scoped=true& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// style-loader: Adds some css to the DOM by adding a <style> tag\n\n// load the styles\nvar content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/src??ref--8-oneOf-1-2!../../node_modules/sass-loader/dist/cjs.js??ref--8-oneOf-1-3!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./shopify.vue?vue&type=style&index=0&id=6ea56c1c&lang=scss&scoped=true& */ \"./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/shopify.vue?vue&type=style&index=0&id=6ea56c1c&lang=scss&scoped=true&\");\nif(typeof content === 'string') content = [[module.i, content, '']];\nif(content.locals) module.exports = content.locals;\n// add the styles to the DOM\nvar add = __webpack_require__(/*! ../../node_modules/vue-style-loader/lib/addStylesClient.js */ \"./node_modules/vue-style-loader/lib/addStylesClient.js\").default\nvar update = add(\"6daeebba\", content, false, {\"sourceMap\":false,\"shadowMode\":false});\n// Hot Module Replacement\nif(false) {}\n\n//# sourceURL=webpack:///./src/views/shopify.vue?./node_modules/vue-style-loader??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-oneOf-1-2!./node_modules/sass-loader/dist/cjs.js??ref--8-oneOf-1-3!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./public/images/shopify/bg.jpg":
/*!**************************************!*\
  !*** ./public/images/shopify/bg.jpg ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"img/bg.2c85a916.jpg\";\n\n//# sourceURL=webpack:///./public/images/shopify/bg.jpg?");

/***/ }),

/***/ "./public/images/shopify/image.png":
/*!*****************************************!*\
  !*** ./public/images/shopify/image.png ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"img/image.0d23eeda.png\";\n\n//# sourceURL=webpack:///./public/images/shopify/image.png?");

/***/ }),

/***/ "./public/images/shopify/logistics.png":
/*!*********************************************!*\
  !*** ./public/images/shopify/logistics.png ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAA29JREFUSEu1ll2Il2UQxX8nrUj72OoiJaOQIhMN86uwLsxq04pSKTcEC0VXLARBRTMrTSODSi8KzGyDWAkNzIRIxQ9QrLCELpQ0zEBJCzO1UjOribPMK49//y5d1Nzs7vvMM+eZmTNnVrRjEXErMBxoBG4GGoA/gO+BbcCHwCeSTkTE7cBCoG+ez5f0rurFj4g+wALg/vYekGf3AQeAL4FLavybzwGIiGkZvANwAlgJdAMGF5d/BxYBQ4BBwBJgHPALMA94AugN7DsLICLeApozUAswG7ge2AxcCMzKQDe6PJJG2jciPgIeBjZJGhIR9nvJDzwDEBEz8uWngbGSlkXEBcBX+ZqlkiZExC3A9izHCEmrImIm8LKxgM8Al7gTsKENICL6ZdMc0Om+n1ncCcwHXJLHgWP5/WngUWBXkuAn4BvgqpoeNFYAG7Ke/6Kn57gcAnoA9wDLgaoqSyRNVESYVk7Zr9yZ1+10OeBam5Y76iBfnf35DXhV0tyizKbvKEl/GuBF4DngPUlPVoEi4ingTWCNpGG1ABFxF7DFFJV0bXHvMWAV8ACw3gCfAx6SJkkrCse3gfHA85JMvbMsIi4CjgMdgS6SfizuNvnBwDADHM7mvADsL6JMATzJ7wBbz9Oc14ArgTnmfOEzGbjNlDeAaelX/B82wwC/ApcC6wD/XplrfE3St8ysfMhQoDOwEThSHNwBuC+TDWDm9ASGSlpb1HEZMBqYKun1Oj0w08wgD1R3Sd8Vd78A+gMjDFDJwwJJzxROz+aQtUoaUwfA3P86QRok/WWfiPCwHUxpuc4AptPHwA8pbFWs7s4KMAk8QLXmGbGMe9A+KA6tXQ9aXSUNMIDpthu44T/u8gRJSyupcK1dc5v569RtA13HLIPF7O/8bgL4lUeBV/KbY5meXVOXekk6XQH452rgoZyFwZL2RoQ32Lc5J5MkLY4IM87S4VLMkmRg194Lyops2vv+p/5eyvVlOVBeFD8DTnFlREwEFufyuRuwNDsrq6dl2YCe+kdSrsdL8i5ps9qFYwa4offmuSf4jVwyXo2ngItTGK1VZpJ/GsRnDt5a9rLeyvRUT890r0hnL5LSt/Zvl6NZUqXGZzDqLv2sqeXY5XHqHhovo9K8fNYALZKsAnXtvACldw7PTflvy8kcpD2SnEm79g8RtDk/p4cMTgAAAABJRU5ErkJggg==\"\n\n//# sourceURL=webpack:///./public/images/shopify/logistics.png?");

/***/ }),

/***/ "./public/images/shopify/logo.png":
/*!****************************************!*\
  !*** ./public/images/shopify/logo.png ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"img/logo.ff1b898f.png\";\n\n//# sourceURL=webpack:///./public/images/shopify/logo.png?");

/***/ }),

/***/ "./public/images/shopify/order.png":
/*!*****************************************!*\
  !*** ./public/images/shopify/order.png ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAW9JREFUSEvtlb8uBGEUxX/nAawVDRJKCg9AQqlR2pZoSDzDPoGOWiuR2IRVSkRJoqAUf0rbY1eJXLljyJh8u7NjVihMMpni3nvOPee7812R8ZjZPLAFjKZSG8CapMNOEOqC4C4A/lHWkDSWSWBm48A6MAeU4oKSpCczyyQwsz6gFdf59xioSrpVDH4GDKQ6qUg66MYiM1sA6qn6B2DaCfaBSkDmTZQgPXaywMzKgDc4EcirO0EzYUs6x0mqLtntSgZjW9xStzYE7uktJ7Csgy4S/3WCF2A1nopzYCivmpCCHeAZWPJXUs3M+oHrXhEMSro3s0lJl2bm/8URMBV3PyvpNKTEzGaAk2QspKAGLEp6DYB7bWECB9kDNoGNROd57Y/y/8QUrcRncAGM5JURUrAN+Hgup6boChjuBUFZUvMnp2g37vx/ij7HtNN1nfdM0/nRdd1u4RQF9/po4fg+Dq3MogTvK9NR2iz97xJ8WfpvVjfaV2dWpbwAAAAASUVORK5CYII=\"\n\n//# sourceURL=webpack:///./public/images/shopify/order.png?");

/***/ }),

/***/ "./public/images/shopify/register.png":
/*!********************************************!*\
  !*** ./public/images/shopify/register.png ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAZCAYAAAArK+5dAAAAAXNSR0IArs4c6QAAAnZJREFUSEuVlkuITmEYx39/uRu5LMalZCg7ynVFyr2UlXJJCUOJHTUZZrAwYzEiRVJGlOSSUCJsFElKRpJLIhY2LAZpEP566v30zTjfnPM9m6/zvs/z/s55Lv/3ExXM9nigCVgMjAY+AneAQ5IeVYrrua4sR9sLgSvAkIz938B2SYeLQP4D2K4FXgAjejngDzBb0oM8SBZgJ9CSFwhckLQyzy8LcDPlPS/2E1Aryb05ZgE+AGPyTk/7dZLeVQv4AfQvCJgmqaMwwPZk4GnBw8Nti6Rj1QC2AkeqAJyVtKYawBQghqhfQch6SacKA8LRdj1wogDguKTNeX5ZXTQUeB0t2EvwL2BWXoEjvpJUTAduAyMrQPZJak5fvARYllo79Crm6KqkmPZsQApsBRozAN+BScBP4BwwL8Mn6rg8ZiTzCxJgD7A3IzigB4H7wIy0/wRYC1wDxqW1l8DMSikKqb5b5lzidKZURCOUt3O7pI22bwGLyl5qdzeA7anABmAdEMXuaeclrbId8DnAFyA0KYSv0fbptD481e+ZbPcFNgENQF1O27VK2mU79GpUXESSorDdzPYg4D1QE4ADcYHk9XPab5PUYPtVKnQ78AbokHTd9mpgAjAM2AZ0BuBtgTcv8W9IWmo7Do5UlqxSDS4HoAsYWPALwje6JOT8MRDpDbsoaYXte3HTpbW4J+YG4BswuCAg3E5KqrcdMnEU6JNmIgo/v2y2miS1BOBhjH0VgHBtA3YAC4D9ZfMQe8+BZkmX4iEA0Q3Ru6GkE4GYgUhBaFGli+crcCb9u+iyPbYkFZKie/5ZxUkOD9s1aR4GxCMQMvFZUvwWsr+hb90ugSluPgAAAABJRU5ErkJggg==\"\n\n//# sourceURL=webpack:///./public/images/shopify/register.png?");

/***/ }),

/***/ "./src/views/shopify.vue":
/*!*******************************!*\
  !*** ./src/views/shopify.vue ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _shopify_vue_vue_type_template_id_6ea56c1c_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./shopify.vue?vue&type=template&id=6ea56c1c&scoped=true& */ \"./src/views/shopify.vue?vue&type=template&id=6ea56c1c&scoped=true&\");\n/* harmony import */ var _shopify_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./shopify.vue?vue&type=script&lang=js& */ \"./src/views/shopify.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport *//* harmony import */ var _shopify_vue_vue_type_style_index_0_id_6ea56c1c_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./shopify.vue?vue&type=style&index=0&id=6ea56c1c&lang=scss&scoped=true& */ \"./src/views/shopify.vue?vue&type=style&index=0&id=6ea56c1c&lang=scss&scoped=true&\");\n/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"./node_modules/vue-loader/lib/runtime/componentNormalizer.js\");\n\n\n\n\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(\n  _shopify_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  _shopify_vue_vue_type_template_id_6ea56c1c_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _shopify_vue_vue_type_template_id_6ea56c1c_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  \"6ea56c1c\",\n  null\n  \n)\n\n/* hot reload */\nif (false) { var api; }\ncomponent.options.__file = \"src/views/shopify.vue\"\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=webpack:///./src/views/shopify.vue?");

/***/ }),

/***/ "./src/views/shopify.vue?vue&type=script&lang=js&":
/*!********************************************************!*\
  !*** ./src/views/shopify.vue?vue&type=script&lang=js& ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_shopify_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js??ref--12-0!../../node_modules/babel-loader/lib!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./shopify.vue?vue&type=script&lang=js& */ \"./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/shopify.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_shopify_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./src/views/shopify.vue?");

/***/ }),

/***/ "./src/views/shopify.vue?vue&type=style&index=0&id=6ea56c1c&lang=scss&scoped=true&":
/*!*****************************************************************************************!*\
  !*** ./src/views/shopify.vue?vue&type=style&index=0&id=6ea56c1c&lang=scss&scoped=true& ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_shopify_vue_vue_type_style_index_0_id_6ea56c1c_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-style-loader??ref--8-oneOf-1-0!../../node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/src??ref--8-oneOf-1-2!../../node_modules/sass-loader/dist/cjs.js??ref--8-oneOf-1-3!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./shopify.vue?vue&type=style&index=0&id=6ea56c1c&lang=scss&scoped=true& */ \"./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/shopify.vue?vue&type=style&index=0&id=6ea56c1c&lang=scss&scoped=true&\");\n/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_shopify_vue_vue_type_style_index_0_id_6ea56c1c_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_shopify_vue_vue_type_style_index_0_id_6ea56c1c_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);\n/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_shopify_vue_vue_type_style_index_0_id_6ea56c1c_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if([\"default\"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_shopify_vue_vue_type_style_index_0_id_6ea56c1c_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));\n\n\n//# sourceURL=webpack:///./src/views/shopify.vue?");

/***/ }),

/***/ "./src/views/shopify.vue?vue&type=template&id=6ea56c1c&scoped=true&":
/*!**************************************************************************!*\
  !*** ./src/views/shopify.vue?vue&type=template&id=6ea56c1c&scoped=true& ***!
  \**************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_ab060228_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_shopify_vue_vue_type_template_id_6ea56c1c_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"ab060228-vue-loader-template\"}!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./shopify.vue?vue&type=template&id=6ea56c1c&scoped=true& */ \"./node_modules/cache-loader/dist/cjs.js?{\\\"cacheDirectory\\\":\\\"node_modules/.cache/vue-loader\\\",\\\"cacheIdentifier\\\":\\\"ab060228-vue-loader-template\\\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/shopify.vue?vue&type=template&id=6ea56c1c&scoped=true&\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_ab060228_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_shopify_vue_vue_type_template_id_6ea56c1c_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"render\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_ab060228_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_shopify_vue_vue_type_template_id_6ea56c1c_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]; });\n\n\n\n//# sourceURL=webpack:///./src/views/shopify.vue?");

/***/ })

}]);