# civicase-search

The `civicase-search` directive defines an embedded search form.

Note: This form includes an explicit search button.

## Usage

```html
  <div
    civicase-search="defaultFiltersExpr"
    expanded="boolExpr"
    on-search="actionExpr">
  </div>
```

## Example

```js
$scope.defaults = {case_type_id: []};
$scope.runSearch = function(selectedFilters) {
  // Issue AJAX request with "selectedFilters".
};
```

```html
  <div
    civicase-search="defaults"
    on-search="runSearch(selectedFilters)">
  </div>
```