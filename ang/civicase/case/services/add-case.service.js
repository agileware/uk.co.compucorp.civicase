(function (_, angular, checkPerm) {
  var module = angular.module('civicase');

  module.service('AddCase', AddCaseService);

  /**
   * Add Case Service
   *
   * @param {object} $window the window service.
   * @param {Function} civicaseCrmUrl crm url service.
   * @param {Function} civicaseCrmLoadForm service to load civicrm forms
   * @param {object} CaseTypeCategory case type category service
   */
  function AddCaseService ($window,  civicaseCrmUrl, civicaseCrmLoadForm, CaseTypeCategory) {
    this.clickHandler = clickHandler;
    this.isVisible = isVisible;

    /**
     * Displays a form to add a new case.
     *
     * @param {addCaseConfig} params parameters
     */
    function clickHandler (params) {
      openNewCaseForm(params);
    }

    /**
     * Will display the button if the user can add cases.
     *
     * @returns {boolean} returns true when the user can add cases.
     */
    function isVisible () {
      var canAddCases = checkPerm('add cases');

      return canAddCases;
    }

    /**
     * Opens a new CRM form popup to add new cases. If a case type category was defined we
     * use it to limit the type of cases that can be created by this category.
     *
     * @param {addCaseConfig} params parameters
     */
    function openNewCaseForm (params) {
      var formParams = {
        action: 'add',
        case_type_category: params.caseTypeCategoryId,
        context: 'standalone',
        reset: 1
      };

      if (params.contactId) {
        formParams.civicase_cid = params.contactId;
      }

      var formUrl = civicaseCrmUrl('civicrm/case/add', formParams);

      civicaseCrmLoadForm(formUrl)
        .on('crmFormSuccess crmPopupFormSuccess', params.callbackFn);
    }

    /**
     * @typedef {object} addCaseConfig
     * @property {string} caseTypeCategoryName the case category name
     * @property {number} contactId contact id
     * @property {number} callbackFn callback function
     */
  }
})(CRM._, angular, CRM.checkPerm);
