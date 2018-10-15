(function (angular, $, _) {
  var module = angular.module('civicase');

  module.directive('civicaseActivityFilters', function ($timeout, crmUiHelp) {
    return {
      restrict: 'A',
      scope: {
        caseTimelines: '=',
        filters: '=civicaseActivityFilters',
        displayOptions: '=displayOptions'
      },
      replace: true,
      templateUrl: '~/civicase/ActivityFilters.html',
      link: activityFiltersLink,
      transclude: true
    };

    /**
     * Link function for civicaseActivityFilters
     *
     * @param {Object} $scope
     * @param {Object} element
     */
    function activityFiltersLink ($scope, element) {
      var ts = $scope.ts = CRM.ts('civicase');

      $scope.activityCategories = prepareActivityCategories();
      $scope.availableFilters = prepareAvailableFilters();
      // Default exposed filters
      $scope.exposedFilters = {
        activity_type_id: true,
        status_id: true,
        assignee_contact_id: true,
        tag_id: true,
        text: true
      };

      (function init () {
        // Ensure set filters are also exposed
        _.each($scope.filters, function (filter, key) {
          $scope.exposedFilters[key] = true;
        });
      }());

      /**
       * Exposes the selected filter in the UI
       *
       * @param {Object} field
       * @param {Object} $event
       */
      $scope.exposeFilter = function (field, $event) {
        var shown = !$scope.exposedFilters[field.name];
        if (shown) {
          // Focus search element when selecting
          $timeout(function () {
            var $span = $('[data-activity-filter=' + field.name + ']', element);

            if ($('[crm-entityref], [crm-ui-select]', $span).length) {
              $('[crm-entityref], [crm-ui-select]', $span).select2('open');
            } else {
              $('input:first', $span).focus();
            }
          }, 50);
        } else {
          // Keep menu open when deselecting
          $event.stopPropagation();
          delete $scope.filters[field.name];
        }
      };

      /**
       * Checks if any filter has been applied
       *
       * @return {Boolean}
       */
      $scope.hasFilters = function () {
        var result = false;

        _.each($scope.filters, function (value) {
          if (!_.isEmpty(value)) result = true;
        });

        return result;
      };

      /**
       * Clears all the filters
       */
      $scope.clearFilters = function () {
        _.each(_.keys($scope.filters), function (key) {
          delete $scope.filters[key];
        });
      };

      /**
       * Prepare Activity Filters
       *
       * @return {Array}
       */
      function prepareAvailableFilters () {
        var availableFilters = [
          {
            name: 'activity_type_id',
            label: ts('Activity type'),
            html_type: 'Select',
            options: _.map(CRM.civicase.activityTypes, mapSelectOptions)
          },
          {
            name: 'status_id',
            label: ts('Status'),
            html_type: 'Select',
            options: _.map(CRM.civicase.activityStatuses, mapSelectOptions)
          },
          {
            name: 'target_contact_id',
            label: ts('With'),
            html_type: 'Autocomplete-Select',
            entity: 'Contact'
          },
          {
            name: 'assignee_contact_id',
            label: ts('Assigned to'),
            html_type: 'Autocomplete-Select',
            entity: 'Contact'
          },
          {
            name: 'tag_id',
            label: ts('Tagged'),
            html_type: 'Autocomplete-Select',
            entity: 'Tag',
            api_params: {used_for: {LIKE: '%civicrm_activity%'}}
          },
          {
            name: 'text',
            label: ts('Contains text'),
            html_type: 'Text'
          }
        ];

        if (_.includes(CRM.config.enableComponents, 'CiviCampaign')) {
          availableFilters.push({
            name: 'campaign_id', label: ts('Campaign'), html_type: 'Autocomplete-Select', entity: 'Campaign'
          });
        }
        if (CRM.checkPerm('administer CiviCRM')) {
          availableFilters.push({
            name: 'is_deleted',
            label: ts('Deleted Activities'),
            html_type: 'Select',
            options: [{id: 1, text: ts('Deleted')}, {id: 0, text: ts('Normal')}]
          },
          {
            name: 'is_test',
            label: ts('Test Activities'),
            html_type: 'Select',
            options: [{id: 1, text: ts('Test')}, {id: 0, text: ts('Normal')}]
          });
        }

        availableFilters = availableFilters.concat(CRM.civicase.customActivityFields);

        return availableFilters;
      }

      /**
       * Prepare Activity Categories
       *
       * @return {Array}
       */
      function prepareActivityCategories () {
        return _.map(CRM.civicase.activityCategories, function (category, key) {
          category.id = key;
          category.text = category.label;

          return category;
        });
      }

      /**
       * Maps Options to be used in the dropdown
       *
       * @param {Object} option
       * @param {int/string} id
       * @return {Object}
       */
      function mapSelectOptions (option, id) {
        return {
          id: id,
          text: option.label,
          color: option.color,
          icon: option.icon
        };
      }
    }
  });

  module.directive('civicaseActivityFiltersAffix', function ($rootScope, $timeout) {
    return {
      link: civicaseActivityFiltersAffix
    };

    /**
     * Link function for civicaseActivityFiltersAffix
     *
     * @param {Object} scope
     * @param {Object} $el
     */
    function civicaseActivityFiltersAffix (scope, $el) {
      var $filter = $('.civicase__activity-filter');
      var $feedBodyPanel = $('.civicase__activity-filter + .panel-body');
      var $tabs = $('.civicase__dashboard').length > 0 ? $('.civicase__dashboard__tab-container ul.nav') : $('.civicase__case-body_tab');
      var $toolbarDrawer = $('#toolbar');

      $rootScope.$on('civicase::case-search::dropdown-toggle', function () {
        $timeout(function () {
          // Reset right case view tab header
          if ($filter.data('bs.affix')) {
            $filter.data('bs.affix').options.offset.top = $filter.offset().top - ($toolbarDrawer.height() + $tabs.height());
          }
        });
      });

      $timeout(function () {
        $filter.affix({
          offset: {
            top: $filter.offset().top - ($toolbarDrawer.height() + $tabs.height())
          }
        }).on('affixed.bs.affix', function () {
          $filter.css('top', $toolbarDrawer.height() + $tabs.height());
          $feedBodyPanel.css('padding-top', $filter.outerHeight() + 15);
        }).on('affixed-top.bs.affix', function () {
          $filter.css('top', 'auto');
          $feedBodyPanel.css('padding-top', '15px');
        });
      });
    }
  });
})(angular, CRM.$, CRM._);
