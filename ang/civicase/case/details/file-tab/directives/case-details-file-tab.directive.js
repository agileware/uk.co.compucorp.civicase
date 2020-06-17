(function (angular, $, _) {
  var module = angular.module('civicase');

  module.directive('civicaseCaseDetailsFileTab', function () {
    return {
      restrict: 'AE',
      templateUrl: '~/civicase/case/details/file-tab/directives/case-details-file-tab.directive.html',
      scope: {
        item: '=civicaseCaseDetailsFileTab',
        refresh: '=?refreshCallback'
      },
      controller: civicaseCaseDetailsFileTabController
    };
  });

  module.controller('civicaseCaseDetailsFileTab', civicaseCaseDetailsFileTabController);

  /**
   * Controller function for the directive
   *
   * @param {object} $scope controllers scope object
   * @param {object} BulkActions bulk actions service
   * @param {object} crmApi service to call civicrm backend
   * @param {Function} formatActivity format activity service
   */
  function civicaseCaseDetailsFileTabController ($scope, BulkActions, crmApi, formatActivity) {
    $scope.ts = CRM.ts('civicase');
    $scope.bulkAllowed = BulkActions.isAllowed();
    $scope.isSelectAll = false;
    $scope.isLoading = true;
    $scope.selectedActivities = [];
    $scope.totalCount = 0;
    $scope.fileFilterParams = {
      case_id: $scope.item.id,
      text: '',
      options: { xref: 1, limit: 0 }
    };

    $scope.findActivityById = findActivityById;
    $scope.toggleSelected = toggleSelected;
    $scope.refresh = refresh;

    (function init () {
      getActivities();
      $scope.$watchCollection('fileFilterParams', getActivities);
      $scope.$on('civicase::bulk-actions::bulk-selections', bulkSelectionsListener);
    }());

    /**
     * Bulk Selection Event Listener
     *
     * @param {object} event event
     * @param {string} condition condition
     */
    function bulkSelectionsListener (event, condition) {
      if (condition === 'none') {
        deselectAllActivities();
      } else if (condition === 'visible') {
        selectDisplayedActivities();
      } else if (condition === 'all') {
        selectEveryActivity();
      }
    }

    /**
     * Deselection of all activities
     */
    function deselectAllActivities () {
      $scope.isSelectAll = false;
      $scope.selectedActivities = [];
    }

    /**
     * Find activity by given ID
     *
     * @param {Array} searchIn - array of activities to search into
     * @param {number/string} activityID activityID
     * @returns {object} activity
     */
    function findActivityById (searchIn, activityID) {
      return _.find(searchIn, { id: activityID });
    }

    /**
     * Get List of Activities
     */
    function getActivities () {
      $scope.isLoading = true;

      crmApi('Case', 'getfiles', $scope.fileFilterParams)
        .then(function (result) {
          $scope.activities = result.xref
            ? _.chain(result.xref.activity)
              .each(formatActivity)
              .sortBy('activity_date_time')
              .reverse()
              .value()
            : [];

          $scope.totalCount = $scope.activities.length;
          $scope.filesByAct = {};

          _.each(result.values, function (match) {
            if (!$scope.filesByAct[match.activity_id]) {
              $scope.filesByAct[match.activity_id] = [];
            }
            $scope.filesByAct[match.activity_id].push(result.xref.file[match.id]);
          });
        })
        .finally(function () {
          $scope.isLoading = false;
        });
    }

    /**
     * Refreshes the UI state after updating the db from the api calls
     *
     * @param {Array} apiCalls list of api calls
     */
    function refresh (apiCalls) {
      if (!_.isArray(apiCalls)) apiCalls = [];

      crmApi(apiCalls, true).then(function (result) {
        $scope.fileLists.refresh();
      });
    }

    /**
     * Select All visible data.
     */
    function selectDisplayedActivities () {
      $scope.isSelectAll = false;
      var isCurrentActivityInSelectedCases;

      _.each($scope.activities, function (activity) {
        isCurrentActivityInSelectedCases = $scope.findActivityById($scope.selectedActivities, activity.id);

        if (!isCurrentActivityInSelectedCases) {
          $scope.selectedActivities.push($scope.findActivityById($scope.activities, activity.id));
        }
      });
    }

    /**
     * Select all Activity
     */
    function selectEveryActivity () {
      deselectAllActivities();
      $scope.isSelectAll = true;
    }

    /**
     * Toggle Bulk Actions checkbox of the given activity
     *
     * @param {object} activity activity
     */
    function toggleSelected (activity) {
      if ($scope.isSelectAll) {
        deselectAllActivities();
      }

      if (!$scope.findActivityById($scope.selectedActivities, activity.id)) {
        $scope.selectedActivities.push($scope.findActivityById($scope.activities, activity.id));
      } else {
        _.remove($scope.selectedActivities, { id: activity.id });
      }
    }
  }
})(angular, CRM.$, CRM._);
