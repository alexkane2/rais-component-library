import type { Meta, StoryObj } from '@storybook/html';

/**
 * Dropdown Menu - Searchable — RAIS Inputs component
 * Icons: public/assets/boxicons/bx-search.svg
 * Angular: <img src="assets/boxicons/bx-search.svg" width="12" height="12" />
 */

const RAIS_STYLES = `
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Figtree:wght@400;700&display=swap');
    :root {
      --color-option-name: #101928;
      --color-option-detail: #4D586A;
      --color-option-hover-bg: #EDF6FC;
      --color-border: #CCCCCC;
      --color-scrollbar: #EFEFEF;
      --color-bg-white: #FFFFFF;
      --font-family: 'Figtree', sans-serif;
      --border-radius-sm: 4px;
    }

    .rais-menu-search {
      width:350px; background:var(--color-bg-white);
      border:1px solid var(--color-border);
      border-radius:var(--border-radius-sm);
      padding:16px 12px; box-sizing:border-box;
      display:flex; flex-direction:row; justify-content:space-between;
      align-items:flex-start; gap:12px;
      font-family:var(--font-family);
      box-shadow:0 4px 10px rgba(0,0,0,0.08);
    }
    .rais-menu-search__container { display:flex; flex-direction:row; justify-content:space-between; align-items:flex-start; flex:1; min-width:0; }
    .rais-menu-search__options { display:flex; flex-direction:column; gap:8px; flex:1; min-width:0; }
    .rais-menu-search__option { padding:4px; cursor:pointer; border-radius:2px; }
    .rais-menu-search__option:hover { background:var(--color-option-hover-bg); }
    .rais-menu-search__option-name { font-size:14px; font-weight:700; color:var(--color-option-name); height:20px; display:flex; align-items:center; }
    .rais-menu-search__option-detail { font-size:14px; color:var(--color-option-detail); height:20px; display:flex; align-items:center; }
    .rais-menu-search__scrollbar { width:5px; padding-top:8px; flex-shrink:0; display:flex; flex-direction:column; }
    .rais-menu-search__scrollbar-thumb { width:5px; height:125px; background:var(--color-scrollbar); border-radius:8px; }
  </style>
`;

const DEFAULT_OPTIONS = [
  { name: '128 Plumbing Heating Inc', detail: '78 Foundry Street, Wakefield, MA 01880' },
  { name: '3D Plumbing Heating Inc',  detail: '140 Grove St Apt 1, Clinton, MA 01510' },
  { name: '4 H Plumbing Inc',         detail: '' },
  { name: 'A Advantage Plumbing',     detail: '34625 Cedar Avenue, Yucaipa, CA 92399' },
  { name: 'A Plus Plumbing LLC',      detail: '25 Sycamore Avenue, Gustine, CA 92794' },
];

function renderDropdownMenuSearchable({ options, selectedIndex, showScrollbar }: any) {
  const opts = options ?? DEFAULT_OPTIONS;
  return `
    ${RAIS_STYLES}
    <div class="rais-menu-search">
      <div class="rais-menu-search__container">
        <div class="rais-menu-search__options">
          ${opts.map((o: any, i: number) => `
            <div class="rais-menu-search__option">
              <div class="rais-menu-search__option-name">${o.name}</div>
              ${o.detail ? `<div class="rais-menu-search__option-detail">${o.detail}</div>` : ''}
            </div>
          `).join('')}
        </div>
        ${showScrollbar !== false ? `
          <div class="rais-menu-search__scrollbar">
            <div class="rais-menu-search__scrollbar-thumb"></div>
          </div>
        ` : ''}
      </div>
    </div>
  `;
}

const meta: Meta = {
  title: 'RAIS/Inputs/Dropdowns/Dropdown Menu - Searchable',
  tags: ['autodocs'],
  argTypes: {
    selectedIndex: { control: 'number' },
    showScrollbar: { control: 'boolean' },
  },
  render: (args) => renderDropdownMenuSearchable(args),
};

export default meta;
type Story = StoryObj;

export const Default: Story       = { args: { selectedIndex: -1, showScrollbar: true } };
export const WithSelection: Story = { args: { selectedIndex: 1,  showScrollbar: true } };
export const FilteredResults: Story = {
  args: {
    selectedIndex: -1, showScrollbar: false,
    options: [
      { name: '3D Plumbing Heating Inc', detail: '140 Grove St Apt 1, Clinton, MA 01510' },
      { name: '3D Mechanical Services',  detail: '88 Millbrook Ave, Randolph, NJ 07869' },
    ],
  },
};
