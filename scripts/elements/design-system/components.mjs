// What scripts/elements/design-system.mjs cannot read from the component
// sources: each component's one-line summary, a usage example, guidelines for
// using it in a design, and which Storybook stories its preview shows.
//
//   summary  first sentence of the README: the component's summary in Claude Design
//   example  JSX for the docs (checked against the component's props)
//   notes    guidelines: what the consumer provides, when to use it
//   preview  layout  row (wrapping) · grid (min column px) · stack (full width) · stage (one container)
//            stories Storybook story names, in order (system-card: "<file title> — <story>")
//            items   extra variants: { caption, props, children }
//            args    overrides for every story (e.g. fewer table rows)
//            page    gray page background instead of white
//            height  card height in px (the card grows to fit)
//            startingPoint  marks the preview as a starting point for new designs in Claude Design
//   startingPoint  the same, in the component's .d.ts

const UNAPPLIED = {
  receivedDates: ['06/09/2026', '06/09/2026', '06/09/2026', '06/09/2026', '06/09/2026'],
  descriptions: ['U06626CK754.18INSEFT', 'U06626DK034.48IPPEFT', 'U06626CK927.48INSEFT', 'U06626CK1228.80INSEFT', 'U06626CK535.92INSEFT'],
  amounts: ['$754.16', '$9.48', '$927.48', '$1,229.80', '$635.92'],
};

export const ICON = {
  name: 'Icon',
  group: 'Core',
  summary: 'A Boxicons glyph drawn as a CSS mask, so it takes any color — the icon set the components use.',
  example: '<Icon name="bx-search" size={16} color="#454545" />',
  notes: [
    '`name` is a Boxicons file name without `.svg`: `bx-*` outline, `bxs-*` solid. `IconName` lists all of them; components take the same names in their `icon` props.',
    'The glyph is a mask over `color` (default `currentColor`), so it takes any tint exactly.',
    '`raisIconUrl(name)` returns the glyph as a `data:` URI, for an `<img>` or a CSS `mask`.',
  ],
  preview: {
    layout: 'row',
    height: 150,
    subtitle: 'Outline and solid glyphs from the components, at 20px',
    icons: [
      'bx-search', 'bx-filter', 'bx-table', 'bx-download', 'bx-caret-down', 'bx-x-large-spacing',
      'bx-dots-horizontal-rounded', 'bx-info-circle', 'bxs-calendar', 'bxs-info-circle', 'bxs-check-circle',
      'bxs-error', 'bxs-error-alt', 'bxs-filter-alt', 'bxs-inbox', 'bxs-plus-circle',
    ],
  },
};

export const COMPONENTS = {
  'rais-accordion-link': {
    summary: 'A text link that expands or collapses a section, with a caret on the right or a plus/minus on the left.',
    example: '<AccordionLink label="Policy Details" iconStyle="plus" />',
    notes: [
      '`iconStyle` is the glyph: `caret` (chevron on the right) or `plus` (plus/minus on the left). It is the Angular input named `style`, renamed so `style` stays the inline style; `styleVariant` works too.',
      '`open` only swaps the glyph. Show or hide the section yourself and flip `open` with it, from `onClick`.',
      '`state="hover"` draws the hover look for static mockups.',
    ],
    preview: { layout: 'row', height: 110, stories: ['Caret — Closed', 'Caret — Open', 'Plus — Closed', 'Plus — Open', 'Large', 'Small'] },
  },
  'rais-applied-filter-chip': {
    summary: 'A compact pill showing one applied filter as a bold category and its value, with an optional filter icon and dismiss X.',
    example: '<AppliedFilterChip category="Policy Producer:" value="Spencer, Dana" />',
    notes: [
      'Write the colon into `category` (`"Region:"`); the chip prints it as given.',
      '`dismissible={false}` marks a must-have filter (no X). `showIcon` adds the filter glyph.',
      'The X has no event of its own: remove the chip from your state in `onClick`.',
    ],
    preview: {
      layout: 'row',
      height: 170,
      stories: ['Single Selection', 'Multiple Selections', 'Must Have (no dismiss)', 'With Icon', 'Must Have + Icon'],
    },
  },
  'rais-badge': {
    summary: 'An 8×8px status dot: green for success, blue for focus, red for error.',
    example: '<Badge variant="error" />',
    notes: ['It has no label: put it next to text that says what the status is.'],
    preview: { layout: 'row', height: 100, stories: ['Success', 'Focus', 'Error'] },
  },
  'rais-button-tab-set': {
    summary: 'A segmented button group for picking one option from a short list, or several in multiple mode.',
    example: '<ButtonTabSet options={["Day", "Week", "Month"]} selectedIndex={0} onSelectionChange={(index) => setPeriod(index)} />',
    notes: [
      'Clicking an option selects it and calls `onSelectionChange` with its index — with `multiple`, the array of selected indices. To control it, keep that value in state and pass it back as `selectedIndex` / `selectedIndices`.',
      'Figma defines two to four options; any number renders.',
    ],
    preview: { layout: 'row', height: 190, stories: ['Two Options', 'Three Options', 'Four Options', 'Second Selected', 'Multiple'] },
  },
  'rais-button': {
    summary: 'The RAIS action button — a text label with an optional Boxicons icon, in four variants and three sizes.',
    example: '<Button label="Export Table to Excel" variant="secondary" size="small" icon="bx-table" />',
    notes: [
      'Labels are verb + object in Title Case ("Export Table to Excel", "Add Filters").',
      '`variant="disabled"` is the disabled look; there is no `disabled` prop.',
      '`icon` takes any Boxicons name (`IconName`); `iconPos` puts it before or after the label. Leave it empty for text only.',
      'Handle clicks with `onClick`.',
    ],
    startingPoint: 'section="Actions" subtitle="Primary, secondary, danger and disabled buttons in three sizes" viewport="700x200"',
    preview: {
      layout: 'row',
      height: 190,
      stories: ['Primary', 'Secondary', 'Danger', 'Disabled', 'Small', 'Large', 'With Icon Left', 'With Icon Right'],
    },
  },
  'rais-calendar': {
    summary: 'A 299px month view with previous/next chevrons, month and year dropdowns and a seven-column day grid.',
    example: '<Calendar month="Feb" year="2024" />',
    notes: [
      '`month` and `year` are the labels in the two dropdowns. The day grid comes from `weeks`: 6 rows of 7 `DateCell`s, each a `num` and a `state` (`unselected`, `selected`, `hover`, `other-month`). Without `weeks` it draws its sample month, February 2024.',
      'It is the open calendar only; `DatePicker` is the field.',
    ],
    preview: { layout: 'row', height: 420, stories: ['Default'] },
  },
  'rais-circular-progress-indicator': {
    summary: 'A circular progress ring that fills to a percentage, or spins as an indeterminate loader.',
    example: '<CircularProgressIndicator progress={75} />',
    notes: [
      '`progress` is 0–100. `indeterminate` makes it a spinner instead; `spinnerFraction` is the length of its arc.',
      '`size` and `strokeWidth` are px; `showLabel` prints the percentage inside the ring.',
    ],
    preview: {
      layout: 'row',
      height: 180,
      stories: ['25%', '50%', '75%', '100%', 'Custom (Spinner)', 'With Label', 'Large Size'],
    },
  },
  'rais-colorful-label-chips': {
    summary: 'A colored label chip — 12 color themes in three sizes, with an optional Boxicons icon.',
    example: '<ColorfulLabelChip label="Label" color="teal" size="small" />',
    notes: [
      'Each `color` pairs the -600 shade (text and icon) with the -100 shade (fill) of one palette.',
      '`icon` is `bxs-inbox` unless you set it; `icon=""` gives a text-only chip.',
    ],
    preview: {
      layout: 'row',
      height: 220,
      stories: [
        'Small', 'Medium', 'Large', 'Periwinkle', 'Teal', 'Forest Green', 'Pea Green', 'Yellow', 'Orange', 'Pink', 'Magenta',
        'Warm Gray', 'Standard Blue', 'Standard Gray', 'No Icon',
      ],
    },
  },
  'rais-content-card': {
    summary: 'A 358px info card with a heading, supporting copy and an optional call to action, in seven layouts.',
    example:
      '<ContentCard type="list" color="blue" header="Policy Summary" listItems={[{ label: "Policy#", value: "N/A" }, { label: "Agency", value: "ClickInsurance" }]} />',
    notes: [
      '`type` is the layout: `standard`, `standard-no-cta`, `standard-link`, `with-link`, `small-link`, `small-no-link`, or `list` (label/value rows from `listItems`).',
      '`color="blue"` applies to `list` only; `showCta` to `standard` with `alignment="left"`.',
      'The call to action has no event of its own: use `onClick`.',
    ],
    startingPoint: 'section="Content" subtitle="Seven content-card layouts" viewport="700x340"',
    preview: {
      layout: 'grid',
      min: 370,
      page: true,
      height: 830,
      stories: ['Standard Left', 'Standard Centered', 'List White', 'List Blue', 'Standard Link (Centered)', 'Small Link (Left)'],
    },
  },
  'rais-datatable-footer': {
    summary: 'The pagination footer for data tables: first/previous/next/last arrows, a window of page numbers and a page-size dropdown.',
    example: '<DatatableFooter currentPage={3} totalPages={10} pageSize={25} />',
    notes: [
      'It draws the pager for `currentPage` of `totalPages` (`visiblePageCount` numbers around the current page); change `currentPage` yourself.',
      'Put it directly under the table, at the table\'s width. `showScrollbar` adds the slim scrollbar bar above it.',
    ],
    preview: { layout: 'stack', height: 330, stories: ['Default', 'Middle Page', 'No Scrollbar'] },
  },
  'rais-date-picker': {
    summary: 'A 350px date field showing a MM/DD/YYYY value or a placeholder, with a trailing calendar icon.',
    example: '<DatePicker label="Effective Date" state="filled" value="12/21/2024" />',
    notes: [
      '`state` is the look — `empty`, `filled`, `focus` or `error` (with `errorMessage`); match it to `value`.',
      '`optional` adds "(Optional)" after the label; `instructions` the helper line.',
      'It does not open a calendar: show `Calendar` next to it when a design needs the open picker.',
    ],
    preview: { layout: 'grid', min: 360, height: 420, stories: ['Empty', 'Filled', 'On Focus', 'Error', 'Optional'] },
  },
  'rais-drawer': {
    summary: 'A right-side slide-over panel with a heading, a close X, a scrolling body for your content and a full-width call to action at the bottom.',
    example:
      '<Drawer heading="Start from a template" ctaLabel="Use this template" onCtaClicked={() => apply()} onClosed={() => setOpen(false)}><div style={{ padding: 24 }}>Template A</div></Drawer>',
    notes: [
      'Children go in the scrolling body; give them their own padding (the stories use 24px).',
      'It is 556px wide and fills its container\'s height: place it at the right of a full-height flex row (`justify-content: flex-end`).',
      '`onClosed` fires from the X and `onCtaClicked` from the bottom button; opening and closing it is up to you.',
    ],
    preview: {
      layout: 'stage',
      height: 650,
      stage: 'height:600px;display:flex;justify-content:flex-end;background:#F0F2F5',
      stories: ['With Body Content'],
      children: [
        'div',
        { style: { padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' } },
        ['div', { style: { border: '1px solid #CCCCCC', borderRadius: '8px', padding: '16px' } }, 'Template A'],
        ['div', { style: { border: '1px solid #CCCCCC', borderRadius: '8px', padding: '16px' } }, 'Template B'],
        ['div', { style: { border: '1px solid #CCCCCC', borderRadius: '8px', padding: '16px' } }, 'Template C'],
      ],
    },
  },
  'rais-dropdown-menu-searchable': {
    summary: 'A results panel of two-line options — a bold name over a lighter detail line — shown under the searchable dropdown.',
    example:
      '<DropdownMenuSearchable options={[{ name: "A Plus Plumbing LLC", detail: "25 Sycamore Avenue, Gustine, CA 92794" }]} selectedIndex={0} />',
    notes: [
      '`selectedIndex` highlights one option (`-1` for none); `detail` is optional for each option.',
      'It is the panel alone: place it under the field it belongs to.',
    ],
    preview: { layout: 'row', height: 360, stories: ['Default', 'With Selection'] },
  },
  'rais-dropdown-menu': {
    summary: 'A standalone option list with an optional selected highlight and a decorative scrollbar.',
    example: '<DropdownMenu options={["Johnson, Olivia", "Nicola, Sarah", "Wentz, Douglas"]} selectedIndex={1} />',
    notes: [
      'Use it for menus and popovers that have no field; the form dropdowns draw their own menu.',
      '`showScrollbar` draws a decorative scrollbar.',
    ],
    preview: { layout: 'row', height: 510, stories: ['Default', 'With Selection', 'No Scrollbar'] },
  },
  'rais-dropdown-multiselect': {
    summary: 'A multi-select field that shows selections as removable chips, with focus, error and max-selected summary states.',
    example: '<DropdownMultiselect label="Producers" state="selection" chipLabels={["Johnson, Olivia", "Nicola, Sarah"]} />',
    notes: [
      '`state` is the look: `default`, `mouse-enter`, `selection` (chips from `chipLabels`), `max-selected` (the `maxSelectedText` summary) or `error`.',
      'The chips are squared `SelectionLabel`s.',
    ],
    preview: { layout: 'grid', min: 360, height: 310, stories: ['Default', 'Selection', 'Max Selected', 'Error'] },
  },
  'rais-dropdown-searchable': {
    summary: 'A type-ahead search field that shows a panel of two-line results while active.',
    example: '<DropdownSearchable label="Agency" state="active" />',
    notes: ['`state` is the look: `default`, `active` (with the `options` results panel), `selection` or `error`.'],
    preview: { layout: 'grid', min: 360, height: 500, stories: ['Default', 'Active', 'Selection', 'Error'] },
  },
  'rais-dropdown': {
    summary: 'The standard select field: a label, optional helper text, focus, error and open states, and an options menu.',
    example: '<Dropdown label="Division" value="All" state="filled" />',
    notes: [
      '`state="open"` draws the `options` menu under the field; `filled` shows `value`; `default` the empty field.',
      'For the compact pill filters above tables use `PageFilterDropdown`.',
    ],
    preview: { layout: 'grid', min: 360, height: 600, stories: ['Default', 'Filled', 'On Focus', 'Error', 'Open'] },
  },
  'rais-ellipse-button': {
    summary: 'A square icon-only button with a horizontal ellipsis, for row-level "more actions" in tables and lists.',
    example: '<EllipseButton type="tertiary" size="small" onClicked={(event) => openMenu(event)} />',
    notes: [
      '`onClicked` receives the native `MouseEvent` as its first argument.',
      '`ariaLabel` names it for screen readers ("More actions" by default).',
    ],
    preview: {
      layout: 'row',
      height: 110,
      stories: ['Primary — Large', 'Secondary — Large', 'Tertiary — Large', 'Primary — Medium', 'Primary — Small', 'Disabled'],
    },
  },
  'rais-field-display': {
    summary: 'A read-only label and value pair, stacked or inline, for detail panels and review screens.',
    example: '<FieldDisplay label="Expected by" value="11/15/2024" orientation="inline" />',
    notes: [
      '`stacked` (label above) suits summary grids, `inline` (label left) detail panels. Long values wrap.',
      'Show an empty value as an em dash: `value="—"`.',
    ],
    preview: { layout: 'grid', min: 260, height: 220, stories: ['Stacked', 'Inline', 'Long Value Wraps', 'Empty State'] },
  },
  'rais-file-upload-states': {
    summary: 'A 400×264px file-upload dropzone in default, uploading, success and error states.',
    example: '<FileUploadStates state="uploading" progress={65} documentName="invoice-Q4-2026.pdf" />',
    notes: [
      'In the default state its button opens the native file picker, and `onFilesSelected` receives the `FileList`.',
      '`onClearClicked` (success) and `onTryAgain` (error) fire from their links; switching `state` is up to you.',
    ],
    preview: { layout: 'grid', min: 410, height: 650, stories: ['Default', 'Uploading', 'Success', 'Error'] },
  },
  'rais-insured-payments': {
    summary:
      'The Insured Payments page — navigation rail, page header, filters and three payment tables composed from RAIS components.',
    example: '<InsuredPayments />',
    notes: [
      'A whole page with its own sample data and no props; it is 100% of the viewport tall and was designed at 1440×900. Its "Add Filters" button opens the filter panel.',
      'To make another Member Central page, follow its structure: `MainNavigationExternal` on the left; then `MemberCentralHeader` over a body padded 24px 32px 40px on #F0F2F5, with table sections 32px apart, each a toolbar (`SearchBar` left, `Button` right), a #1565A0 section banner and the `TableColumn`s in a `rais-data-table` row.',
    ],
    preview: {
      layout: 'page',
      height: 900,
      width: 1440,
      stories: ['Default (Filters Hidden)'],
      subtitle: 'The full page at 1440×900',
      startingPoint: 'section="Screens" subtitle="Member Central portal shell with sidebar, header and data tables" viewport="1440x900"',
    },
  },
  'rais-link': {
    summary: 'A text link in three sizes and three colors, with optional Boxicons icons on either side.',
    example: '<Link label="Open in new tab" href="#" icon="bx-link-external" iconLeft={false} />',
    notes: [
      'Both icons show unless you turn them off (`iconLeft`, `iconRight`); they use the same `icon`, `bxs-plus-circle` by default.',
      '`state="hover"` draws the hover look for static mockups.',
    ],
    preview: { layout: 'row', height: 100, stories: ['Blue Default', 'Black Default', 'Gray Default', 'Large', 'Small', 'Text Only'] },
  },
  'rais-main-navigation-external': {
    summary: 'The Member Central side navigation: a 90px section rail that expands a 224px panel of the active section\'s pages.',
    example: '<MainNavigationExternal activeSection="servicing" />',
    notes: [
      '`activeSection` opens that section\'s panel: `agency-planning`, `revenue-docs`, `placement`, `servicing`, `account-insights` or `digital-marketing`. `null` shows the rail alone.',
      'It is a fixed 1024px tall: put it first in a full-height flex row with `overflow: hidden`, before the page\'s main column, as Insured Payments does.',
    ],
    preview: {
      layout: 'stage',
      height: 650,
      stage: 'height:600px;overflow:hidden;display:flex;gap:32px',
      stories: ['Side Nav Default - External', 'Servicing'],
    },
  },
  'rais-member-central-footer': {
    summary: 'The 40px Member Central footer bar: the copyright line, then Legal Notice and Privacy Policy links.',
    example: '<MemberCentralFooter legalNoticeUrl="/legal" privacyPolicyUrl="/privacy" />',
    notes: ['It spans the page width at the bottom of the main column.'],
    preview: { layout: 'stack', height: 200, stories: ['Default', 'Custom Copyright'] },
  },
  'rais-member-central-header': {
    summary:
      'The Member Central page header: agency picker, notifications and user, page title with optional description, and optional tabs.',
    example:
      '<MemberCentralHeader agencyDisplay="searchable" userName="Ryan Nichols" pageTitle="Insured Payments" showPageDescription={false} showTabs={false} />',
    notes: [
      '`agencyDisplay` shows a static `agencyName` or a searchable agency field.',
      'The description and tab rows are optional (`showPageDescription`, `showTabs`); `tabs` lists the tab labels and `selectedTabIndex` marks the current one.',
    ],
    preview: { layout: 'stack', page: true, height: 740, stories: ['Default', 'Agency Searchable', 'Minimal'] },
  },
  'rais-modal': {
    summary: 'A confirmation dialog with a headline, optional body copy and info icon, and primary and secondary buttons.',
    example:
      '<Modal headline="Headline" primaryCtaLabel="Confirm" secondaryCtaLabel="Cancel" onConfirmed={() => save()} onCancelled={() => close()} />',
    notes: [
      '`size` is 500px (`default`) or 300px (`small`); `buttonLayout="stacked"` is for the small size.',
      'It is the dialog panel; place it yourself (usually centered over the page). `showBackdrop` adds a fixed full-window dimmed overlay.',
      '`onConfirmed`, `onCancelled` and `onClosed` fire from the two buttons and the X.',
    ],
    preview: {
      layout: 'grid',
      min: 520,
      page: true,
      height: 1260,
      stories: [
        'Default — Centered + Side by Side',
        'Default — Left Aligned + Side by Side',
        'Small — Stacked + Centered',
        'With Icon',
      ],
    },
  },
  'rais-page-filter-dropdown': {
    summary: 'A compact pill-shaped dropdown for the filter bars above tables, with its label beside or above it.',
    example: '<PageFilterDropdown label="Agency" placeholder="-- Select --" labelPlacement="vertical" width={180} />',
    notes: ['`width` is the pill\'s width in px. For form fields use `Dropdown`.'],
    preview: {
      layout: 'row',
      height: 230,
      stories: ['Horizontal — With Value', 'Horizontal — Placeholder', 'Vertical — With Value', 'Vertical — Placeholder'],
    },
  },
  'rais-page-filter-searchbar': {
    summary: 'A compact pill-shaped search input for the filter bars above tables.',
    example: '<PageFilterSearchbar placeholder="Search..." width={343} />',
    notes: ['`width` is in px; `value` shows typed text.'],
    preview: { layout: 'stack', height: 250, stories: ['Default', 'With Value', 'Narrow'] },
  },
  'rais-radio-or-checkbox': {
    summary: 'A single radio button, checkbox or circle checkbox with its label.',
    example: '<RadioOrCheckbox label="Label" type="checkbox" state="selected" />',
    notes: [
      '`state` is the look: `unselected`, `selected`, `hover`, `indeterminate` or `disabled`. Clicking does not change it: keep the value in state and flip it from `onClick`.',
      'Stack several in a column for a radio group or checklist.',
    ],
    preview: {
      layout: 'row',
      height: 170,
      stories: [
        'Checkbox — Unselected', 'Checkbox — Selected', 'Checkbox — Indeterminate', 'Checkbox — Disabled', 'Radio — Unselected',
        'Radio — Selected', 'Circle Checkbox — Selected',
      ],
    },
  },
  'rais-search-bar': {
    summary: 'A 40px search input with an optional label and instructions line.',
    example: '<SearchBar label="" instructions={false} state="empty" />',
    notes: [
      '`label=""` (or `label={false}`) hides the label, as in the toolbar above each Insured Payments table.',
      '`state` is the look: `empty`, `mouse-enter` or `entered` (with `value`).',
    ],
    preview: { layout: 'grid', min: 360, height: 290, stories: ['Empty', 'Entered', 'Mouse Enter', 'No Label'] },
  },
  'rais-selection-label': {
    summary: 'A removable selection chip — squared for multiselect dropdowns, rounded for filter bars.',
    example: '<SelectionLabel label="Johnson, Olivia" shape="rounded" />',
    notes: [
      '`shape` is the Angular input named `style`, renamed so `style` stays the inline style; `styleVariant` works too.',
      'The X has no event of its own: remove the chip from your state in `onClick`.',
    ],
    preview: { layout: 'row', height: 100, stories: ['Squared', 'Rounded'] },
  },
  'rais-slim-tabs': {
    summary: 'A single slim tab label with an underline when selected, optional dropdown caret and AI sparkle.',
    example: '<SlimTabs label="Insured Payments" state="selected" />',
    notes: [
      'Each one is a single tab: lay several out in a flex row and set `state="selected"` on the current one.',
      '`extras="ai"` adds the sparkle; `dropdown` adds a caret.',
    ],
    preview: {
      layout: 'row',
      height: 120,
      stories: ['Large Selected', 'Large Unselected', 'Small Selected', 'Large + AI (Selected)', 'Large With Dropdown'],
    },
  },
  'rais-system-card': {
    summary: 'The RAIS notification surface — banners, toasts and page-wide info bars for success, error, info and warning messages.',
    example: '<SystemCard format="toast" messageType="success" message="RAIS received your payment and has applied it to the policy." />',
    notes: [
      '`format`: `banner` (header, message, up to two buttons), `toast` (one line) or `long-banner` (page-wide, info only).',
      '`background` is `white` or `color` (the message type\'s tint); `gray` is for `long-banner` only.',
      'Its buttons and close X have no events of their own: use `onClick`.',
    ],
    preview: {
      layout: 'stack',
      page: true,
      height: 750,
      width: 1548,
      stories: [
        'Banner — Info / White', 'Banner — Error / Color', 'Toast — Success / White', 'Toast — Warning / Color',
        'Long Banner — Info / Gray',
      ],
    },
  },
  'rais-table-cell': {
    summary: 'One data-table cell: text, a checkbox, an inline dropdown selector or a skeleton loader.',
    example: '<TableCell content="06/09/2026" />',
    notes: [
      'Each cell paints its own 1px #CCCCCC border, so neighbouring cells collapse into one grid line.',
      'Tables are usually built from `TableColumn`, which renders its cells.',
    ],
    preview: { layout: 'row', height: 130, stories: ['Default', 'Input Field Selector', 'Skeleton Loader', 'Checkbox'] },
  },
  'rais-table-column': {
    summary: 'One table column — a header over a stack of cells — the building block RAIS tables are composed from.',
    example: '<TableColumn columnName="Amount" cellValues={["$754.16", "$9.48", "$927.48"]} width="90px" />',
    notes: [
      'Build a table column by column: put the TableColumns side by side in an element with the class `rais-data-table` (from bundle.css). It lays them out as the Insured Payments tables do, and lets headers and cells shrink to `width`s under their 134px minimum.',
      '`cellValues` sets the cells\' text and how many there are; without it, `cellCount` placeholder cells render.',
      '`variant="checkboxes"` is a select column (Insured Payments gives it `width="50px"`).',
    ],
    preview: {
      layout: 'table',
      height: 380,
      subtitle: 'Columns side by side, with Unapplied Payments data from Insured Payments',
      items: [
        { props: { variant: 'checkboxes', cellCount: 5, width: '50px' } },
        { props: { columnName: 'Received Date', cellValues: UNAPPLIED.receivedDates, width: '130px' } },
        { props: { columnName: 'Description', cellValues: UNAPPLIED.descriptions, width: '240px' } },
        { props: { columnName: 'Amount', cellValues: UNAPPLIED.amounts, width: '90px' } },
      ],
    },
  },
  'rais-table-header': {
    summary: 'A data-table column header: a sortable label on the slate header color, a select-all checkbox, or a skeleton loader.',
    example: '<TableHeader columnName="Payment Posted Date" />',
    notes: ['`sortable` shows the sort glyph (on by default).'],
    preview: { layout: 'row', height: 110, stories: ['Default', 'Skeleton Loader', 'Checkbox'] },
  },
  'rais-table': {
    summary: 'A data table of placeholder rows — plain, loading skeleton, or with a pagination footer — for loading states and wireframes.',
    example: '<Table variant="loading" columnCount={6} rowCount={8} />',
    notes: [
      'Its cells hold placeholder text; `columnNames` labels the headers. For real data compose `TableColumn`s.',
      '`variant="pagination-footer"` adds a `DatatableFooter` for `currentPage`, `totalPages` and `pageSize`.',
    ],
    preview: {
      layout: 'stack',
      height: 1010,
      args: { columnCount: 6, rowCount: 4 },
      stories: ['Default', 'Loading', 'With Pagination Footer'],
    },
  },
  'rais-text-field': {
    summary: 'A labelled text input or multi-line textarea, with focus, error, disabled and filled states.',
    example: '<TextField label="Insured Name" value="AURA DENTISTRY PLLC" state="filled" />',
    notes: [
      '`state` is the look: `default`, `focus`, `filled`, `error` (with `errorMessage`) or `disabled`; use `filled` when there is a `value`.',
      '`size="multi-line"` makes it an 80px textarea.',
    ],
    preview: {
      layout: 'grid',
      min: 360,
      height: 470,
      stories: ['Default', 'Filled', 'On Focus', 'Error', 'Disabled', 'Multi Line'],
    },
  },
  'rais-toggle': {
    summary: 'An on/off switch with its label on either side, in three sizes.',
    example: '<Toggle label="Label" state="selected" size="small" />',
    notes: ['`state` (`unselected` or `selected`) is the look; clicking does not change it, so flip it from `onClick`.'],
    preview: {
      layout: 'row',
      height: 100,
      stories: ['Large — Unselected', 'Large — Selected', 'Small — Selected', 'X-Large — Selected', 'Label Left — Selected'],
    },
  },
  'rais-tooltip': {
    summary: 'A dark tooltip bubble with a bold label and description, its caret on any edge.',
    example: '<Tooltip size="medium" caretPosition="bottom" label="Label" description="Description" />',
    notes: [
      'It is the bubble only: place it beside its anchor yourself, with `caretPosition` on the edge that faces it.',
      '`small` shows the label only; `showLabel={false}` drops the label on the larger sizes.',
    ],
    preview: { layout: 'row', height: 250, stories: ['Large Top', 'Large Right', 'Medium Bottom', 'Medium (no label)', 'Small Left'] },
  },
  'rais-visibility-toggle': {
    summary: 'A pill button with an eye icon that shows or hides a column, panel or section.',
    example: '<VisibilityToggle label="Label" toggleState="hide" />',
    notes: ['`toggleState` `show` draws the open eye, `hide` the closed one; flip it from `onClick`.'],
    preview: { layout: 'row', height: 100, stories: ['Show — Default', 'Show — Hover', 'Hide — Default', 'Hide — Hover'] },
  },
};
