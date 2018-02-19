"use strict";

angular
  .module("portalApp.dash", ["ui.router"])
  /* CONFIGS -------------------------------------------------------------------*/
  .config([
    "$stateProvider",
    function ($stateProvider) {
      $stateProvider.state("dash", {
        url: "/dash/:dashID",
        templateUrl: "dash/dash.html",
        controller: "DashCtrl",
        controllerAs: "ctrl",
        data: {
          title: "Dash"
        }
      });
    }
  ])

  /* CONTROLLER ----------------------------------------------------------------*/
  .controller("DashCtrl", [
    'dashService', '$state', '$scope', 'config', '$stateParams', 'menuItemsService', 
    function (dashService, $state, $scope, config, $stateParams, menuItemsService) {
      var _self = this;
      var _item = menuItemsService.getMenuItem($stateParams.dashID);

      var _cdeEndpoint = config.BASE_URL +
        'plugin/pentaho-cdf-dd/api/renderer/getDashboard';
      var _url = _cdeEndpoint +
        '?path=/system/portalboilerplate/dashboards/'+ _item.dashName +'.wcdf';
        
      dashService.loadDash(_url, $scope, menuItemsService.encodeExtras(_item));

      $scope.heading = _item.label;
      $scope.subheading = _item.subheading;
    }
  ])

  /* SERVICE ----------------------------------------------------------------*/
  .service("dashService", [
    '$http', 'config', '$compile', 'menuItemsService',
    function ($http, config, $compile, menuItemsService) {

      var _currCDE = {};
      var _params = {};

      function _loadDash(url, scope, extras) {
        
        /**
         * Before attempting to load a new dashboard, saves the 
         * params of the previous dashboard - if exists
         */
        if (!angular.equals(_currCDE, {}))
          _saveParams(_currCDE);

        /**
         * Loads the menu items params
         */
        _params = angular.extend(_params, {extraParams: extras});

        /**
         * Loads the dashboard after requiring it
         */
        require([url],
          function (Dashboard) {

            var dashContentID = "dashPlaceHolder";
            var sampleDash = new Dashboard(dashContentID);

            sampleDash.setupDOM();

            _currCDE = sampleDash;

            //Applies parameters previously saved
            _applyParams();
            var elm = angular.element(document.getElementById(dashContentID));
            var x = $compile(elm)(scope);
            _currCDE.renderDashboard();

          }
        );

      }

      function _applyParams() {
        for (var key in _params) _currCDE.setParam(key, _params[key]);
      }

      function _saveParams(dash) {
        var dashParams = dash.parameters;
        for (var key in dashParams) {
          if (dashParams.hasOwnProperty(key)) {
            _params[key] = dashParams[key];
          }
        }
      }

      function _getDashboard(){
        return _currCDE;
      }

      return {
        loadDash : _loadDash,
        getDashboard : _getDashboard
      };
    }
  ]);
