(function (angular, $, _) {
  var module = angular.module('civicase');

  module.directive('civicaseCaseDetailsHeader', function () {
    return {
      replace: true,
      restrict: 'E',
      templateUrl: '~/civicase/case/details/directives/case-details-header.directive.html',
      controller: 'civicaseCaseDetailsHeaderController'
    };
  });

  module.controller('civicaseCaseDetailsHeaderController', civicaseCaseDetailsHeaderController);

  /**
   * @param {object} $scope scope object of the controller
   * @param {object} CaseActions case action service
   */
  function civicaseCaseDetailsHeaderController ($scope, CaseActions) {
    (function init () {
    })();
  }
})(angular, CRM.$, CRM._);
