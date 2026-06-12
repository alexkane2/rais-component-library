import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RaisMainNavigationExternalComponent } from '../main-navigation-external/rais-main-navigation-external.component';
import { RaisMemberCentralHeaderComponent } from '../member-central-header/rais-member-central-header.component';
import { RaisButtonComponent } from '../button/rais-button.component';
import { RaisPageFilterDropdownComponent } from '../page-filter-dropdown/rais-page-filter-dropdown.component';
import { RaisSearchBarComponent } from '../search-bar/rais-search-bar.component';
import { RaisTableColumnComponent } from '../table-column/rais-table-column.component';

@Component({
  selector: 'insured-payments',
  standalone: true,
  imports: [
    CommonModule,
    RaisMainNavigationExternalComponent,
    RaisMemberCentralHeaderComponent,
    RaisButtonComponent,
    RaisPageFilterDropdownComponent,
    RaisSearchBarComponent,
    RaisTableColumnComponent,
  ],
  templateUrl: './insured-payments.component.html',
  styleUrls: ['./insured-payments.component.scss'],
})
export class InsuredPaymentsComponent {
  showFilters = false;

  toggleFilters() {
    this.showFilters = !this.showFilters;
  }

  // ── Unapplied Payments ──────────────────────────────────────────
  unappliedReceivedDates = [
    '06/09/2026', '06/09/2026', '06/09/2026', '06/09/2026', '06/09/2026',
  ];
  unappliedDescriptions = [
    'U06626CK754.18INSEFT',
    'U06626DK034.48IPPEFT',
    'U06626CK927.48INSEFT',
    'U06626CK1228.80INSEFT',
    'U06626CK535.92INSEFT',
  ];
  unappliedAmounts = ['$754.16', '$9.48', '$927.48', '$1,229.80', '$635.92'];
  unappliedInsuredNames = [
    'AURA DENTISTRY PLLC',
    'Jamestown Locii LLC',
    'Brian P. Ganley DMD PC',
    'South Hook Holdings LLC',
    'Ishrat Rangsala DMD LLC',
  ];
  unappliedPolicies = ['N/A', 'N/A', 'N/A', 'N/A', 'N/A'];
  unappliedAgencies = [
    'ClickInsurance', 'ClickInsurance', 'ClickInsurance', 'ClickInsurance', 'ClickInsurance',
  ];

  // ── Applied Payments ────────────────────────────────────────────
  appliedPostedDates = [
    '06/09/2026', '06/09/2026', '06/09/2026', '06/09/2026', '06/09/2026',
  ];
  appliedDescriptions = [
    'EFT payment - HC',
    'EFT payment - HC',
    'EFT payment - CONNECTICUT VALLEY ORTHODONTIC',
    'EFT payment - Royal Tents and Events LLC',
    'Check payment - Check# 1536',
  ];
  appliedAmounts = ['$1,177.78', '$2,145.72', '$350.00', '$723.04', '$388.98'];
  appliedInsuredNames = [
    'Brothers SSG Construction',
    'P. Pellegrino Trucking Co., Inc.',
    'Connecticut Valley Orthodontics PC',
    'Royal Tents and Events LLC',
    'Clark, Stephen',
  ];

  // ── Open Balances ────────────────────────────────────────────────
  openInvoices = ['07/22/2026', '07/22/2026', '07/19/2026', '07/18/2026'];
  openPolicyEffectiveDates = ['-40', '-29', '-36', '-36'];
  openEffectiveDates = ['4', '0', '1', '3'];
  openInvoicedAged = ['$7,400.00', '$35.00', '$3,036.08', '$648.26'];
  openTotalAmountDue = ['$7,400.00', '$35.00', '$3,036.08', '$648.26'];
  openCurrentBalance = [
    '194 Boston St Condo',
    'Gloucester Insurance Agency Inc.',
    'Alastair D. Taylor',
    'Kawier, Russell',
  ];
}
