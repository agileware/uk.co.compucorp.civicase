<?php

use CRM_Civicase_Helper_CaseCategory as CaseCategoryHelper;

/**
 * Civicase settings class.
 *
 * This class is a generic setting class that contains functions to
 * fetch civicase setting related to any other setting that may be added.
 */
class CRM_Civicase_Service_CaseCategorySetting {

  /**
   * Returns the appropriate string after proper word replacements.
   *
   * @param string $stringToReplace
   *   String for word replacements.
   * @param string $caseCategoryName
   *   Case category name.
   *
   * @return string
   *   Word replaced string.
   */
  public function replaceWords($stringToReplace, $caseCategoryName) {
    if ($caseCategoryName == CaseCategoryHelper::CASE_TYPE_CATEGORY_NAME) {
      return $stringToReplace;
    }

    return str_replace(
      ['Cases', 'Case'],
      [
        ucfirst($caseCategoryName),
        ucfirst($caseCategoryName),
      ],
      $stringToReplace
    );
  }

}
