"use strict";

angular
  .module("portalApp", [
    "ui.router",
    "ngMaterial",
    "ngSanitize",
    "portalApp.portal",
    "portalApp.home",
    "portalApp.dash"
  ])
  /* CONFIGS -------------------------------------------------------------------*/
  .config([
    "$urlRouterProvider",
    "$stateProvider",
    function($urlRouterProvider, $stateProvider) {
      $urlRouterProvider.otherwise("/home");
    }
  ])
  .config(function($mdAriaProvider) {
    $mdAriaProvider.disableWarnings();
  })
  .config(function($mdThemingProvider) {

    //BEGIN PALETE GENERATED CODE ----------------------------------------------
    // http://mcg.mbitson.com/#!?burtonverde=%2336ba81&burtonazul=%23255398&themename=burton

    $mdThemingProvider.definePalette('burtonverde', {
      '50': 'e7f7f0', '100': 'c3ead9', '200': '9bddc0', '300': '72cfa7',
      '400': '54c494', '500': '36ba81', '600': '30b379', '700': '29ab6e',
      '800': '22a364', '900': '169451', 'A100': 'c9ffe0', 'A200': '96ffc3',
      'A400': '63ffa7', 'A700': '49ff98',
      'contrastDefaultColor': 'light',
      'contrastDarkColors': [
        '50', '100', '200', '300', '400', 'A100', 'A200', 'A400', 'A700'
      ],
      'contrastLightColors': [
        '500', '600', '700', '800', '900'
      ]
    });
    
    $mdThemingProvider.definePalette('burtonazul', {
      '50': 'e5eaf3', '100': 'becbe0', '200': '92a9cc', '300': '6687b7',
      '400': '466da7', '500': '255398', '600': '214c90', '700': '1b4285',
      '800': '16397b', '900': '0d296a', 'A100': '9db7ff', 'A200': '6a91ff',
      'A400': '376bff', 'A700': '1e58ff',
      'contrastDefaultColor': 'light',
      'contrastDarkColors': [
        '50', '100', '200', 'A100', 'A200'
      ],
      'contrastLightColors': [
        '300', '400', '500', '600', '700', '800', '900', 'A400', 'A700'
      ]
    });
    $mdThemingProvider.theme('default')
      .primaryPalette('burtonverde')
      .accentPalette('amber');

    //END PALETE GENERATED CODE ------------------------------------------------
  })


  /* CONSTANTS ---------------------------------------------------------------*/
  .constant("config", {
    BASE_URL: "../../../",
    API_BASE: "../../../plugin/burton/api/"
  });
