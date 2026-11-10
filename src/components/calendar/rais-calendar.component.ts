import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  forwardRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * Calendar — RAIS Inputs component
 *
 * A working month-view date picker. Mirrors the Figma `Calendar` component
 * set (file cCX0CnHdQeFNhZBkP12aWS, Selector Controls page): previous/next
 * chevrons, Month and Year selects, a Mo–Su weekday row and a 6 × 7 grid of
 * `Calendar/Day` cells.
 *
 * Day cell states (match the Figma `Calendar/Day` variants):
 *   default · hover · selected · today · other-month · disabled
 *
 * Features
 *   - Click a day to select it. `value` is a `Date`; `(valueChange)` emits it.
 *   - Previous / next chevrons, and the Month / Year selects, move the view.
 *     `(viewChange)` emits `{ month, year }` whenever the view moves.
 *   - `minDate` / `maxDate` disable days outside the range.
 *   - Works with Angular forms (`[(ngModel)]`, `formControlName`).
 *   - Keyboard: arrows move between days, Home/End jump to week edges,
 *     PageUp/PageDown change the month, Enter/Space selects.
 *   - A footer "Clear" link (`showClear`) removes the selected date and emits
 *     `valueChange(null)` and `cleared`: an optional Date Picker returns to
 *     its empty state; a required one shows its error until a date is chosen.
 *
 * Styling uses the RAIS design tokens in `src/index.css` only.
 *
 * Usage:
 *   <rais-calendar [(value)]="date" [minDate]="min" (valueChange)="onPick($event)"></rais-calendar>
 */
export type DateCellState = 'default' | 'selected' | 'today' | 'other-month' | 'disabled';

export interface DateCell {
  /** The date this cell represents. */
  date: Date;
  /** Day of month, for display. */
  num: number;
  state: DateCellState;
  /** True when the cell is in the month currently shown. */
  inMonth: boolean;
  /** ISO key (YYYY-MM-DD) used for tracking and focus. */
  key: string;
}

export interface CalendarView {
  /** 0 = January … 11 = December */
  month: number;
  year: number;
}

const MONTHS_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const MONTHS_LONG = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
const DAY_LABELS_MON = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
const DAY_LABELS_SUN = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

@Component({
  selector: 'rais-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rais-calendar.component.html',
  styleUrls: ['./rais-calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => RaisCalendarComponent), multi: true },
  ],
})
export class RaisCalendarComponent implements OnInit, OnChanges, ControlValueAccessor {
  /** Selected date. Accepts a Date, an ISO string, or null. */
  @Input() value: Date | string | null = null;
  /** Earliest selectable date (inclusive). */
  @Input() minDate: Date | string | null = null;
  /** Latest selectable date (inclusive). */
  @Input() maxDate: Date | string | null = null;
  /** Month shown when there is no value (0–11). Defaults to today's month. */
  @Input() month?: number;
  /** Year shown when there is no value. Defaults to today's year. */
  @Input() year?: number;
  /** First year offered in the Year select. Defaults to 10 years before the view year. */
  @Input() minYear?: number;
  /** Last year offered in the Year select. Defaults to 10 years after the view year. */
  @Input() maxYear?: number;
  /** Which day starts the week: 1 = Monday (default), 0 = Sunday. */
  @Input() firstDayOfWeek: 0 | 1 = 1;
  /** Show the days from adjacent months that fill the grid. */
  @Input() showOtherMonths: boolean = true;
  /** Highlight today's date. */
  @Input() showToday: boolean = true;
  /** Disables the whole calendar. */
  @Input() disabled: boolean = false;
  /** Show the footer "Clear" link that removes the selected date. */
  @Input() showClear: boolean = true;
  /** Label of the footer clear link. */
  @Input() clearLabel: string = 'Clear';

  /** Emits the newly selected date, or null when cleared. */
  @Output() valueChange = new EventEmitter<Date | null>();
  /** Emits when the footer "Clear" link removes the selected date. */
  @Output() cleared = new EventEmitter<void>();
  /** Emits when the displayed month or year changes. */
  @Output() viewChange = new EventEmitter<CalendarView>();

  readonly months = MONTHS_SHORT;
  readonly monthNames = MONTHS_LONG;

  viewMonth = 0;
  viewYear = 0;
  weeks: DateCell[][] = [];
  years: number[] = [];
  /** Key of the day that currently holds keyboard focus (roving tabindex). */
  focusKey = '';

  private selected: Date | null = null;
  private min: Date | null = null;
  private max: Date | null = null;
  private onChange: (v: Date | null) => void = () => {};
  private onTouched: () => void = () => {};

  // ── Lifecycle ──────────────────────────────────────────────────────

  ngOnInit(): void {
    this.selected = this.toDate(this.value);
    this.min = this.toDate(this.minDate);
    this.max = this.toDate(this.maxDate);
    const start = this.selected ?? this.today();
    this.viewMonth = this.month ?? start.getMonth();
    this.viewYear = this.year ?? start.getFullYear();
    this.rebuild();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['value'] && !changes['value'].firstChange) {
      this.selected = this.toDate(this.value);
      if (this.selected) {
        this.viewMonth = this.selected.getMonth();
        this.viewYear = this.selected.getFullYear();
      }
    }
    if (changes['minDate']) this.min = this.toDate(this.minDate);
    if (changes['maxDate']) this.max = this.toDate(this.maxDate);
    if ((changes['month'] || changes['year']) && !changes['month']?.firstChange) {
      if (this.month !== undefined) this.viewMonth = this.month;
      if (this.year !== undefined) this.viewYear = this.year;
    }
    if (!this.weeks.length) return;
    this.rebuild();
  }

  // ── Template API ───────────────────────────────────────────────────

  get dayLabels(): string[] {
    return this.firstDayOfWeek === 0 ? DAY_LABELS_SUN : DAY_LABELS_MON;
  }

  /** Accessible caption, e.g. "February 2013". */
  get viewLabel(): string {
    return `${this.monthNames[this.viewMonth]} ${this.viewYear}`;
  }

  get canGoPrev(): boolean {
    if (!this.min) return true;
    return new Date(this.viewYear, this.viewMonth, 1) > new Date(this.min.getFullYear(), this.min.getMonth(), 1);
  }

  get canGoNext(): boolean {
    if (!this.max) return true;
    return new Date(this.viewYear, this.viewMonth, 1) < new Date(this.max.getFullYear(), this.max.getMonth(), 1);
  }

  prevMonth(): void {
    if (this.disabled || !this.canGoPrev) return;
    this.setView(this.viewMonth - 1, this.viewYear);
  }

  nextMonth(): void {
    if (this.disabled || !this.canGoNext) return;
    this.setView(this.viewMonth + 1, this.viewYear);
  }

  onMonthSelect(event: Event): void {
    const m = Number((event.target as HTMLSelectElement).value);
    this.setView(m, this.viewYear);
  }

  onYearSelect(event: Event): void {
    const y = Number((event.target as HTMLSelectElement).value);
    this.setView(this.viewMonth, y);
  }

  select(cell: DateCell): void {
    if (this.disabled || cell.state === 'disabled') return;
    if (!cell.inMonth) this.setView(cell.date.getMonth(), cell.date.getFullYear(), false);
    this.selected = cell.date;
    this.focusKey = cell.key;
    this.rebuild();
    this.valueChange.emit(cell.date);
    this.onChange(cell.date);
    this.onTouched();
  }

  /** True while a date is selected (the Clear link is enabled). */
  get hasValue(): boolean {
    return this.selected !== null;
  }

  clear(): void {
    if (this.disabled || !this.selected) return;
    this.selected = null;
    this.rebuild();
    this.valueChange.emit(null);
    this.cleared.emit();
    this.onChange(null);
    this.onTouched();
  }

  onKeydown(event: KeyboardEvent, cell: DateCell): void {
    if (this.disabled) return;
    let next: Date | null = null;
    const d = cell.date;
    switch (event.key) {
      case 'ArrowLeft': next = this.addDays(d, -1); break;
      case 'ArrowRight': next = this.addDays(d, 1); break;
      case 'ArrowUp': next = this.addDays(d, -7); break;
      case 'ArrowDown': next = this.addDays(d, 7); break;
      case 'Home': next = this.addDays(d, -((7 + d.getDay() - this.firstDayOfWeek) % 7)); break;
      case 'End': next = this.addDays(d, 6 - ((7 + d.getDay() - this.firstDayOfWeek) % 7)); break;
      case 'PageUp': next = new Date(d.getFullYear(), d.getMonth() - 1, d.getDate()); break;
      case 'PageDown': next = new Date(d.getFullYear(), d.getMonth() + 1, d.getDate()); break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        this.select(cell);
        return;
      default:
        return;
    }
    event.preventDefault();
    if (!next) return;
    if (next.getMonth() !== this.viewMonth || next.getFullYear() !== this.viewYear) {
      this.setView(next.getMonth(), next.getFullYear(), false);
    }
    this.focusKey = this.key(next);
    this.rebuild();
    queueMicrotask(() => this.focusCell(this.focusKey));
  }

  trackWeek(index: number): number { return index; }
  trackCell(_: number, cell: DateCell): string { return cell.key; }

  // ── ControlValueAccessor ───────────────────────────────────────────

  writeValue(value: Date | string | null): void {
    this.selected = this.toDate(value);
    if (this.selected) {
      this.viewMonth = this.selected.getMonth();
      this.viewYear = this.selected.getFullYear();
    }
    this.rebuild();
  }
  registerOnChange(fn: (v: Date | null) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }
  setDisabledState(isDisabled: boolean): void { this.disabled = isDisabled; }

  // ── Internals ──────────────────────────────────────────────────────

  private setView(month: number, year: number, emit = true): void {
    const d = new Date(year, month, 1);
    this.viewMonth = d.getMonth();
    this.viewYear = d.getFullYear();
    this.rebuild();
    if (emit) this.viewChange.emit({ month: this.viewMonth, year: this.viewYear });
  }

  private rebuild(): void {
    const first = new Date(this.viewYear, this.viewMonth, 1);
    const lead = (7 + first.getDay() - this.firstDayOfWeek) % 7;
    const gridStart = this.addDays(first, -lead);
    const today = this.today();
    const weeks: DateCell[][] = [];
    for (let r = 0; r < 6; r++) {
      const row: DateCell[] = [];
      for (let c = 0; c < 7; c++) {
        const date = this.addDays(gridStart, r * 7 + c);
        const inMonth = date.getMonth() === this.viewMonth;
        row.push({
          date,
          num: date.getDate(),
          inMonth,
          key: this.key(date),
          state: this.stateFor(date, inMonth, today),
        });
      }
      weeks.push(row);
    }
    this.weeks = weeks;

    const base = this.viewYear;
    const from = this.minYear ?? (this.min ? this.min.getFullYear() : base - 10);
    const to = this.maxYear ?? (this.max ? this.max.getFullYear() : base + 10);
    const lo = Math.min(from, base);
    const hi = Math.max(to, base);
    this.years = Array.from({ length: hi - lo + 1 }, (_, i) => lo + i);

    const focusStillVisible = weeks.flat().some(c => c.key === this.focusKey && c.inMonth);
    if (!focusStillVisible) {
      const sel = this.selected && this.sameMonth(this.selected) ? this.key(this.selected) : null;
      const tod = this.sameMonth(today) ? this.key(today) : null;
      this.focusKey = sel ?? tod ?? this.key(first);
    }
  }

  private stateFor(date: Date, inMonth: boolean, today: Date): DateCellState {
    if (this.isOutOfRange(date)) return 'disabled';
    if (this.selected && this.sameDay(date, this.selected)) return 'selected';
    if (!inMonth) return 'other-month';
    if (this.showToday && this.sameDay(date, today)) return 'today';
    return 'default';
  }

  private isOutOfRange(date: Date): boolean {
    if (this.min && date < this.min) return true;
    if (this.max && date > this.max) return true;
    return false;
  }

  private focusCell(key: string): void {
    const el = document.querySelector<HTMLElement>(`[data-rais-day="${key}"]`);
    el?.focus();
  }

  private toDate(v: Date | string | null | undefined): Date | null {
    if (v === null || v === undefined || v === '') return null;
    const d = v instanceof Date ? new Date(v.getTime()) : new Date(v);
    if (isNaN(d.getTime())) return null;
    d.setHours(0, 0, 0, 0);
    return d;
  }

  private today(): Date {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }

  private addDays(d: Date, n: number): Date {
    return new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
  }

  private sameDay(a: Date, b: Date): boolean {
    return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
  }

  private sameMonth(d: Date): boolean {
    return d.getMonth() === this.viewMonth && d.getFullYear() === this.viewYear;
  }

  private key(d: Date): string {
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${d.getFullYear()}-${m}-${day}`;
  }
}
