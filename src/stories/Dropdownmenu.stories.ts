import type { Meta, StoryObj } from '@storybook/html';

const RAIS_STYLES = `
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Figtree:wght@400;500&display=swap');
    :root {
      --color-text: #4D586A;
      --color-option-hover-bg: #EDF6FC;
      --color-option-selected-bg: #EDF6FC;
      --color-option-selected-text: #007CBD;
      --color-border: #CCCCCC;
      --color-scrollbar: #EFEFEF;
      --color-bg-white: #FFFFFF;
      --font-family: 'Figtree', sans-serif;
      --border-radius-sm: 4px;
    }

    /* ── Menu container ──
       width: 350px fixed
       padding: T16 R12 B16 L12
       gap: 12px between Options Container and Scrollbar
       layout: HORIZONTAL, SPACE_BETWEEN, crossAxis MIN
    ── */
    .rais-menu {
      width: 350px;
      background: var(--color-bg-white);
      border: 1px solid var(--color-border);
      border-radius: var(--border-radius-sm);
      padding: 16px 12px;
      box-sizing: border-box;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: flex-start;
      gap: 12px;
      font-family: var(--font-family);
      box-shadow: 0 4px 10px rgba(0,0,0,0.08);
    }

    /* ── Options Container ──
       flex:1, height hugs content (AUTO)
       layout: HORIZONTAL, SPACE_BETWEEN
       Contains: Options frame + Scrollbar
    ── */
    .rais-menu__container {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: flex-start;
      flex: 1;
      min-width: 0;
    }

    /* ── Options frame ──
       layout: VERTICAL, gap 6px, hugs height
       counterSizing: AUTO
    ── */
    .rais-menu__options {
      display: flex;
      flex-direction: column;
      gap: 6px;
      flex: 1;
      min-width: 0;
    }

    /* ── Each option ──
       20px height, 14px Regular #4D586A
    ── */
    .rais-menu__option {
      height: 20px;
      display: flex;
      align-items: center;
      font-size: 14px;
      font-weight: 400;
      color: var(--color-text);
      padding: 0 4px;
      border-radius: 2px;
      cursor: pointer;
      white-space: nowrap;
    }

    .rais-menu__option:hover {
      background: var(--color-option-hover-bg);
    }

    .rais-menu__option--selected {
      background: var(--color-option-selected-bg);
      color: var(--color-option-selected-text);
      font-weight: 500;
    }

    /* ── Scrollbar ──
       5px wide, padding T8, contains 5x125 thumb radius 8 #EFEFEF
    ── */
    .rais-menu__scrollbar {
      width: 5px;
      padding-top: 8px;
      flex-shrink: 0;
      display: flex;
      flex-direction: column;
    }

    .rais-menu__scrollbar-thumb {
      width: 5px;
      height: 125px;
      background: var(--color-scrollbar);
      border-radius: 8px;
    }
  </style>
`;

const DEFAULT_OPTIONS = [
  'Option', 'Option', 'Option', 'Option', 'Option',
  'Option', 'Option', 'Option', 'Option',
];

function renderDropdownMenu({ options, selectedIndex, showScrollbar }: any) {
  const opts = options ?? DEFAULT_OPTIONS;

  return `
    ${RAIS_STYLES}
    <div class="rais-menu">
      <div class="rais-menu__container">
        <div class="rais-menu__options">
          ${opts.map((o: string, i: number) => `
            <div class="rais-menu__option ${i === selectedIndex ? 'rais-menu__option--selected' : ''}">
              ${o}
            </div>
          `).join('')}
        </div>
        ${showScrollbar !== false ? `
          <div class="rais-menu__scrollbar">
            <div class="rais-menu__scrollbar-thumb"></div>
          </div>
        ` : ''}
      </div>
    </div>
  `;
}

const meta: Meta = {
  title: 'RAIS/Inputs/Dropdown Menu',
  tags: ['autodocs'],
  argTypes: {
    selectedIndex: {
      control: 'number',
      description: 'Index of selected option (-1 for none)'
    },
    showScrollbar: {
      control: 'boolean',
      description: 'Show scrollbar indicator'
    },
  },
  render: (args) => renderDropdownMenu(args),
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: { selectedIndex: -1, showScrollbar: true },
};

export const WithSelection: Story = {
  args: { selectedIndex: 2, showScrollbar: true },
};

export const NoScrollbar: Story = {
  args: {
    selectedIndex: -1,
    showScrollbar: false,
    options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
  },
};

export const WithRealOptions: Story = {
  args: {
    options: [
      'Agency House Account',
      'Johnson, Olivia',
      'Nicola, Sarah',
      'Wentz, Douglas',
      'Thornberg, Jeffery',
      'Tersa, Pamela',
      'Slater, Mary',
      'Anderson, Mike',
      'Roberts, James',
    ],
    selectedIndex: -1,
    showScrollbar: true,
  },
};