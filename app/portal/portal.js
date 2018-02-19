"use strict";

angular
  .module("portalApp.portal", ["ui.router"])
  .controller("PortalController", [
    "sidecolToggleService", "$scope", "$timeout", "$window", '$mdDialog', 'dashService', '$state','menuItemsService',
    function (sidecolToggleService, $scope, $timeout, $window, $mdDialog, dashService, $state, menuItemsService) {

      var _self = this;
      var _icons = ["fa-angle-left", "fa-angle-right"]
      this.icon = "fa-angle-left";

      /* Menu items -------------- */

      _self.menuItems = menuItemsService.getParsedItems();

      /* Menu toggle -------------- */

      function _toggleIcon(){
        _self.icon = _icons[(_icons.indexOf( _self.icon ) + 1) % 2];
      }

      this.toggleSideMenu = function(){
        _toggleIcon();
        sidecolToggleService.toggle();
      }

      function _forceResize(){
        $scope.$broadcast('rzSliderForceRender');
      }
      
      sidecolToggleService.pushPostToggle(_forceResize);

    }])


  /* ESC directive -----------------------------------------------------------*/

  .directive("keypressEvents", [
    "$document",
    "$rootScope",
    function ($document, $rootScope) {
      return {
        restrict: "A",
        link: function () {
          $document.bind("keydown", function (e) {
            $rootScope.$broadcast("keydown:" + e.which, e);
          });
        }
      };
    }
  ])
  .directive("sidecolWidth", [
    "sidecolToggleService",
    function (sidecolToggleService) {
      return {
        restrict: "A",
        link: function (scope, element, attr){
          sidecolToggleService.pushElement(element);
        }
    };
    }
  ])


  /* Sidecol Toggle Service -------------------------------------------------------*/

  .service("sidecolToggleService", [
    "$timeout", '$window',
  function ($timeout, $window) {
    var _elements = [];
    var _postToggle = [];

    function _addToSet(item, arr) {

      if (!Array.isArray(arr))
        return arr;

      if (arr.indexOf(item) > -1)
        return arr;

      arr.push(item);
      return arr;

    }

    function _pushElement(elm) {
      _elements = _addToSet(elm, _elements)
    }

    function _pushPostToggle(elm) {
      _postToggle = _addToSet(elm, _postToggle)
    }

    function _getElements(){
      return _elements;
    }

    function _toggle(){
      for( var x = 0 ; x < _elements.length ; x++  ){
        angular.element(_elements[x]).toggleClass("brtn-hidden");
      }
      $timeout(_triggerPostToggle, 250);
    }

    function _triggerPostToggle(){
      for( var x = 0 ; x < _postToggle.length ; x++  ){
        try{
          _postToggle[x]();
        }catch(e){
          console.error("Error executing post Toggle callback", e);
        }
      }
      $window.dispatchEvent(new Event('resize'));
    }

    return {
      addToSet: _addToSet,
      pushElement: _pushElement,
      getElements : _getElements,
      toggle : _toggle,
      pushPostToggle: _pushPostToggle
    };
  }

])


  /* Menuitems Service -------------------------------------------------------*/

.service('menuItemsService', [
  function(){

    var _menuItems = [
      {
        id: 'c6dfffb7-571c-4e60-acd4-c728dcb379bc',
        dashName: 'historical',
        icon: 'fa-pencil',
        label: 'Despesas'
      },{
        id: '275abcb4-930d-4a98-b319-d29ccfb329fb',
        dashName: 'iframe',
        icon: 'fa-map-marker',
        label: "GEO",
        subheading: "Analise per capita",
        extraParams: {
          type: 'pentaho',
          url: ':public:Steel Wheels:Widget Library:Analysis Views:Geomap.xanalyzer/viewer'
        }
      },{
        id: '475abcb4-930d-4a98-b319-d29ccfb329fb',
        dashName: 'iframe',
        icon: 'fa-address-book',
        label: "Vendas",
        subheading: "Análise de vendas",
        extraParams: {
          type: 'pentaho',
          url: ':public:Steel Wheels:Sales Performance (dashboard).xdash/viewer'
        }
      }
    ];

    function _encodeExtras (item){
      var _extras = item.extraParams;
      if(!_extras) _extras = {type: 'cde'};
      
      return btoa( JSON.stringify(item.extraParams) );
    }

    function _getParsedItems(){
      return _menuItems.map(function(item){
        return {
          "id" : item.id,
          "dashName" : item.dashName,
          "icon": item.icon,
          "label" : item.label,
          "subheading" : item.subheading,
          "extraParams" : _encodeExtras(item)
        }
      });
    }

    function _decodeExtras( extraParams ){
      return JSON.parse( atob( extraParams ) );
    }

    function _getMenuItem( id ){
      return _menuItems.filter(function( item ){
        return item.id === id;
      })[0];
    }

    return {
      getParsedItems : _getParsedItems,
      decodeExtras : _decodeExtras,
      getMenuItem : _getMenuItem,
      encodeExtras  : _encodeExtras
    };
  }
]);
