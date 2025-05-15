<?php

/**
 * Class CRM_Civicase_Hook_PageRun_AddCaseAngularPageResources.
 */
class CRM_Civicase_Hook_PageRun_AddCaseAngularPageResources {

  /**
   * Add resources (CSS and JS) for this Page.
   *
   * @param object $page
   *   Page Object.
   */
  public function run(&$page) {
    if (!$this->shouldRun($page)) {
      return;
    }

    $this->addResources();
  }

  /**
   * Add resources (CSS and JS) for this Page.
   */
  private function addResources() {
    // Adds Moment.js file.
    Civi::resources()
      ->addScriptFile('uk.co.compucorp.civicase', 'packages/moment-with-locales.min.js');
    // Adds simplescrollbarjs.
    Civi::resources()
      ->addScriptFile('uk.co.compucorp.civicase', 'packages/simplebar.min.js');
    Civi::resources()
      ->addStyleFile('uk.co.compucorp.civicase', 'packages/simplebar.min.css', 1000, 'html-header');
    Civi::resources()
        ->addScriptFile('org.civicrm.shoreditch', 'base/js/affix.js', 1000, 'html-header')
        ->addSetting([
          'config' => [
            'enableComponents' => CRM_Core_Config::singleton()->enableComponents,
            'user_contact_id'  => (int) CRM_Core_Session::getLoggedInContactID(),
          ],
        ]);
    Civi::resources()
        ->addStyleFile('org.civicrm.shoreditch', 'css/custom-civicrm.css', 99, 'html-header');
  }

  /**
   * Determines if the hook will run.
   *
   * @param object $page
   *   Page Object.
   *
   * @return bool
   *   returns a boolean to determine if hook will run or not.
   */
  private function shouldRun($page) {
    return $page instanceof CRM_Civicase_Page_CaseAngular;
  }

}
