// Custom elements (Angular Elements) entry point.
// `npm run build:elements` bundles this file — with zone.js and the Angular
// runtime — into dist/elements/rais-elements.js. Every component in
// src/components/* is registered under its selector; the build fails if one is
// missing here. See dist/elements/ELEMENTS.md for each element's API.
import { defineRaisElements } from './elements/bootstrap';
import { RaisAccordionLinkComponent } from './components/accordion-link/rais-accordion-link.component';
import { RaisAppliedFilterChipComponent } from './components/applied-filter-chip/rais-applied-filter-chip.component';
import { RaisBadgeComponent } from './components/badge/rais-badge.component';
import { RaisButtonTabSetComponent } from './components/button-tab-set/rais-button-tab-set.component';
import { RaisButtonComponent } from './components/button/rais-button.component';
import { RaisCalendarComponent } from './components/calendar/rais-calendar.component';
import { RaisCircularProgressIndicatorComponent } from './components/circular-progress-indicator/rais-circular-progress-indicator.component';
import { RaisColorfulLabelChipsComponent } from './components/colorful-label-chips/rais-colorful-label-chips.component';
import { RaisContentCardComponent } from './components/content-card/rais-content-card.component';
import { RaisDatatableFooterComponent } from './components/datatable-footer/rais-datatable-footer.component';
import { RaisDatePickerComponent } from './components/date-picker/rais-date-picker.component';
import { RaisDrawerComponent } from './components/drawer/rais-drawer.component';
import { RaisDropdownMenuSearchableComponent } from './components/dropdown-menu-searchable/rais-dropdown-menu-searchable.component';
import { RaisDropdownMenuComponent } from './components/dropdown-menu/rais-dropdown-menu.component';
import { RaisDropdownMultiselectComponent } from './components/dropdown-multiselect/rais-dropdown-multiselect.component';
import { RaisDropdownSearchableComponent } from './components/dropdown-searchable/rais-dropdown-searchable.component';
import { RaisDropdownComponent } from './components/dropdown/rais-dropdown.component';
import { RaisEllipseButtonComponent } from './components/ellipse-button/rais-ellipse-button.component';
import { RaisFieldDisplayComponent } from './components/field-display/rais-field-display.component';
import { RaisFileUploadStatesComponent } from './components/file-upload-states/rais-file-upload-states.component';
import { InsuredPaymentsComponent } from './components/insured-payments/insured-payments.component';
import { RaisLinkComponent } from './components/link/rais-link.component';
import { RaisMainNavigationExternalComponent } from './components/main-navigation-external/rais-main-navigation-external.component';
import { RaisMemberCentralFooterComponent } from './components/member-central-footer/rais-member-central-footer.component';
import { RaisMemberCentralHeaderComponent } from './components/member-central-header/rais-member-central-header.component';
import { RaisModalComponent } from './components/modal/rais-modal.component';
import { RaisPageFilterDropdownComponent } from './components/page-filter-dropdown/rais-page-filter-dropdown.component';
import { RaisPageFilterSearchbarComponent } from './components/page-filter-searchbar/rais-page-filter-searchbar.component';
import { RaisRadioOrCheckboxComponent } from './components/radio-or-checkbox/rais-radio-or-checkbox.component';
import { RaisSearchBarComponent } from './components/search-bar/rais-search-bar.component';
import { RaisSelectionLabelComponent } from './components/selection-label/rais-selection-label.component';
import { RaisSlimTabsComponent } from './components/slim-tabs/rais-slim-tabs.component';
import { RaisSystemCardComponent } from './components/system-card/rais-system-card.component';
import { RaisTableCellComponent } from './components/table-cell/rais-table-cell.component';
import { RaisTableColumnComponent } from './components/table-column/rais-table-column.component';
import { RaisTableHeaderComponent } from './components/table-header/rais-table-header.component';
import { RaisTableComponent } from './components/table/rais-table.component';
import { RaisTextFieldComponent } from './components/text-field/rais-text-field.component';
import { RaisToggleComponent } from './components/toggle/rais-toggle.component';
import { RaisTooltipComponent } from './components/tooltip/rais-tooltip.component';
import { RaisVisibilityToggleComponent } from './components/visibility-toggle/rais-visibility-toggle.component';

defineRaisElements([
  ['rais-accordion-link', RaisAccordionLinkComponent],
  ['rais-applied-filter-chip', RaisAppliedFilterChipComponent],
  ['rais-badge', RaisBadgeComponent],
  ['rais-button-tab-set', RaisButtonTabSetComponent],
  ['rais-button', RaisButtonComponent],
  ['rais-calendar', RaisCalendarComponent],
  ['rais-circular-progress-indicator', RaisCircularProgressIndicatorComponent],
  ['rais-colorful-label-chips', RaisColorfulLabelChipsComponent],
  ['rais-content-card', RaisContentCardComponent],
  ['rais-datatable-footer', RaisDatatableFooterComponent],
  ['rais-date-picker', RaisDatePickerComponent],
  ['rais-drawer', RaisDrawerComponent],
  ['rais-dropdown-menu-searchable', RaisDropdownMenuSearchableComponent],
  ['rais-dropdown-menu', RaisDropdownMenuComponent],
  ['rais-dropdown-multiselect', RaisDropdownMultiselectComponent],
  ['rais-dropdown-searchable', RaisDropdownSearchableComponent],
  ['rais-dropdown', RaisDropdownComponent],
  ['rais-ellipse-button', RaisEllipseButtonComponent],
  ['rais-field-display', RaisFieldDisplayComponent],
  ['rais-file-upload-states', RaisFileUploadStatesComponent],
  // Its selector is `insured-payments`; custom element tags all carry the rais- prefix.
  ['rais-insured-payments', InsuredPaymentsComponent],
  ['rais-link', RaisLinkComponent],
  ['rais-main-navigation-external', RaisMainNavigationExternalComponent],
  ['rais-member-central-footer', RaisMemberCentralFooterComponent],
  ['rais-member-central-header', RaisMemberCentralHeaderComponent],
  ['rais-modal', RaisModalComponent],
  ['rais-page-filter-dropdown', RaisPageFilterDropdownComponent],
  ['rais-page-filter-searchbar', RaisPageFilterSearchbarComponent],
  ['rais-radio-or-checkbox', RaisRadioOrCheckboxComponent],
  ['rais-search-bar', RaisSearchBarComponent],
  ['rais-selection-label', RaisSelectionLabelComponent],
  ['rais-slim-tabs', RaisSlimTabsComponent],
  ['rais-system-card', RaisSystemCardComponent],
  ['rais-table-cell', RaisTableCellComponent],
  ['rais-table-column', RaisTableColumnComponent],
  ['rais-table-header', RaisTableHeaderComponent],
  ['rais-table', RaisTableComponent],
  ['rais-text-field', RaisTextFieldComponent],
  ['rais-toggle', RaisToggleComponent],
  ['rais-tooltip', RaisTooltipComponent],
  ['rais-visibility-toggle', RaisVisibilityToggleComponent],
]);
