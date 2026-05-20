import type { Meta, StoryObj } from '@storybook/html';

/**
 * Radio or Checkbox — RAIS Selectors component
 *
 * 3 Types × multiple states × 4 sizes = 35 Figma variants.
 *
 * VISUAL STATES (verified against Figma render):
 *   Checkbox Unselected:    white box, gray border
 *   Checkbox Selected:      FILLED BLUE box with WHITE check inside
 *   Checkbox Hover:         white box, blue border
 *   Checkbox Indeterminate: FILLED BLUE box with WHITE dash inside (no border)
 *   Checkbox Disabled:      gray bg, light gray border, gray label
 *   Radio Unselected:       white circle, gray border
 *   Radio Selected:         white circle, blue border, blue dot inside
 *   Radio Hover:            white circle, blue border
 *   Circle Checkbox Sel:    filled blue circle, white check (x-large only)
 *
 * Tokens (from Figma variables):
 *   --surface-primary    #FFFFFF  → unselected box fill, check/dash color (when on blue)
 *   --surface-disabled   #EFEFEF  → disabled box fill
 *   --border-dark        #8D9091  → default unselected border (= text-disabled token)
 *   --border-default     #CCCCCC  → disabled border
 *   --border-focus       #007CBD  → hover border, selected fill (radio dot + checkbox bg)
 *   --text-primary       #4D586A  → label text
 *   --text-disabled      #8D9091  → disabled label
 *   --spacing-02         6        → gap (small/medium/large checkbox, small/medium radio)
 *   --spacing-03         8        → gap (x-large checkbox, large/x-large radio)
 *   --spacing-05         12       → gap (circle checkbox x-large)
 */

const RAIS_STYLES = `
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Figtree:wght@400;500&display=swap');

    /* Tokens — names match Figma variables */
    :root {
      --surface-primary: #FFFFFF;
      --surface-disabled: #EFEFEF;
      --border-dark: #8D9091;
      --border-default: #CCCCCC;
      --border-focus: #007CBD;
      --text-primary: #4D586A;
      --text-disabled: #8D9091;
      --spacing-02: 6px;
      --spacing-03: 8px;
      --spacing-05: 12px;
      --font-family: 'Figtree', sans-serif;
    }

    .rais-rc {
      display: inline-flex;
      flex-direction: row;
      align-items: center;
      font-family: var(--font-family);
    }

    /* ── Gap rules per type+size ── */
    .rais-rc--checkbox.rais-rc--small,
    .rais-rc--checkbox.rais-rc--medium,
    .rais-rc--checkbox.rais-rc--large,
    .rais-rc--radio.rais-rc--small,
    .rais-rc--radio.rais-rc--medium { gap: var(--spacing-02); }

    .rais-rc--checkbox.rais-rc--x-large,
    .rais-rc--radio.rais-rc--large,
    .rais-rc--radio.rais-rc--x-large { gap: var(--spacing-03); }

    .rais-rc--circle-checkbox { gap: var(--spacing-05); }

    /* ── Box ──
       Default state: white bg, gray border
    ── */
    .rais-rc__box {
      position: relative;
      flex-shrink: 0;
      background: var(--surface-primary);
      border: 1px solid var(--border-dark);
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }

    /* Checkbox sizes — radius 2 */
    .rais-rc--checkbox.rais-rc--small   .rais-rc__box { width: 12px; height: 12px; border-radius: 2px; }
    .rais-rc--checkbox.rais-rc--medium  .rais-rc__box { width: 13px; height: 13px; border-radius: 2px; }
    .rais-rc--checkbox.rais-rc--large   .rais-rc__box { width: 14px; height: 14px; border-radius: 2px; }
    .rais-rc--checkbox.rais-rc--x-large .rais-rc__box { width: 16px; height: 16px; border-radius: 2px; }

    /* Radio sizes — round */
    .rais-rc--radio.rais-rc--small   .rais-rc__box { width: 12px; height: 12px; border-radius: 50%; }
    .rais-rc--radio.rais-rc--medium  .rais-rc__box { width: 12px; height: 12px; border-radius: 50%; }
    .rais-rc--radio.rais-rc--large   .rais-rc__box { width: 16px; height: 16px; border-radius: 50%; }
    .rais-rc--radio.rais-rc--x-large .rais-rc__box { width: 16px; height: 16px; border-radius: 50%; }

    /* Circle Checkbox — round, 18×18 */
    .rais-rc--circle-checkbox.rais-rc--x-large .rais-rc__box { width: 18px; height: 18px; border-radius: 50%; }

    /* ── STATE: Hover ── */
    .rais-rc--hover .rais-rc__box {
      border-color: var(--border-focus);
    }

    /* ── STATE: Selected (Checkbox) ──
       FILLED BLUE box with WHITE check
    ── */
    .rais-rc--checkbox.rais-rc--selected .rais-rc__box {
      background: var(--border-focus);
      border-color: var(--border-focus);
    }

    /* ── STATE: Indeterminate (Checkbox) ──
       FILLED BLUE box with WHITE dash, no border
    ── */
    .rais-rc--checkbox.rais-rc--indeterminate .rais-rc__box {
      background: var(--border-focus);
      border-color: var(--border-focus);
    }

    /* ── STATE: Disabled (Checkbox) ──
       gray bg, light border
    ── */
    .rais-rc--disabled .rais-rc__box {
      background: var(--surface-disabled);
      border-color: var(--border-default);
      cursor: not-allowed;
    }
    .rais-rc--disabled .rais-rc__label { color: var(--text-disabled); }

    /* ── STATE: Selected (Radio) ──
       White circle, BLUE border, blue dot inside
    ── */
    .rais-rc--radio.rais-rc--selected .rais-rc__box {
      border-color: var(--border-focus);
    }

    /* ── STATE: Selected (Circle Checkbox) ──
       Filled blue circle with white check
    ── */
    .rais-rc--circle-checkbox.rais-rc--selected .rais-rc__box {
      background: var(--border-focus);
      border-color: var(--border-focus);
    }

    /* ── Radio dot ── */
    .rais-rc__dot {
      background: var(--border-focus);
      border-radius: 50%;
      display: none;
    }
    .rais-rc--radio.rais-rc--selected .rais-rc__dot { display: block; }
    /* Radio dot at ~57% of box size per Figma (inset 21.43%) */
    .rais-rc--radio.rais-rc--small   .rais-rc__dot { width: 7px;  height: 7px;  }
    .rais-rc--radio.rais-rc--medium  .rais-rc__dot { width: 7px;  height: 7px;  }
    .rais-rc--radio.rais-rc--large   .rais-rc__dot { width: 9px;  height: 9px;  }
    .rais-rc--radio.rais-rc--x-large .rais-rc__dot { width: 9px;  height: 9px;  }

    /* ── Checkmark — only visible when selected (checkbox/circle-checkbox) ──
       Color is WHITE because it sits on top of the blue filled box
    ── */
    .rais-rc__check {
      display: none;
      color: var(--surface-primary);
    }
    .rais-rc--checkbox.rais-rc--selected .rais-rc__check,
    .rais-rc--circle-checkbox.rais-rc--selected .rais-rc__check { display: block; }

    /* ── Indeterminate dash — WHITE on blue ── */
    .rais-rc__dash {
      display: none;
      background: var(--surface-primary);
      height: 2px;
      border-radius: 1px;
    }
    .rais-rc--checkbox.rais-rc--indeterminate .rais-rc__dash { display: block; }
    .rais-rc--checkbox.rais-rc--small   .rais-rc__dash { width: 7px;  }
    .rais-rc--checkbox.rais-rc--medium  .rais-rc__dash { width: 8px;  }
    .rais-rc--checkbox.rais-rc--large   .rais-rc__dash { width: 8px;  }
    .rais-rc--checkbox.rais-rc--x-large .rais-rc__dash { width: 10px; }

    /* ── Label ── */
    .rais-rc__label {
      color: var(--text-primary);
      line-height: 1.4;
      user-select: none;
    }
    .rais-rc--small   .rais-rc__label { font-size: 12px; font-weight: 500; }
    .rais-rc--medium  .rais-rc__label { font-size: 13px; font-weight: 500; }
    .rais-rc--large   .rais-rc__label { font-size: 14px; font-weight: 400; }
    .rais-rc--x-large .rais-rc__label { font-size: 16px; font-weight: 400; }
  </style>
`;

// Inline check SVG — white stroke for visibility on blue background
function checkSvg(size: number) {
  return `<svg width="${size}" height="${size}" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 8L7 12L13 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;
}

const CHECK_SIZES: Record<string, number> = {
  small: 9, medium: 10, large: 11, 'x-large': 12
};

function renderRadioOrCheckbox({ label, type, state, size }: any) {
  const lbl = label ?? 'Label';
  const t   = type  ?? 'checkbox';
  const st  = state ?? 'unselected';
  const sz  = size  ?? 'large';

  const cls = [
    'rais-rc',
    `rais-rc--${t}`,
    `rais-rc--${st}`,
    `rais-rc--${sz}`,
  ].join(' ');

  const checkSize = CHECK_SIZES[sz] ?? 11;

  return `
    ${RAIS_STYLES}
    <div class="${cls}">
      <div class="rais-rc__box">
        <span class="rais-rc__dot"></span>
        <span class="rais-rc__check">${checkSvg(checkSize)}</span>
        <span class="rais-rc__dash"></span>
      </div>
      <span class="rais-rc__label">${lbl}</span>
    </div>
  `;
}

const meta: Meta = {
  title: 'RAIS/Selectors/Radio or Checkbox',
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Label text shown next to the input'
    },
    type: {
      control: 'select',
      options: ['radio', 'checkbox', 'circle-checkbox'],
      description: 'radio=fully round | checkbox=2px radius square | circle-checkbox=filled blue circle (x-large only)'
    },
    state: {
      control: 'select',
      options: ['unselected', 'selected', 'hover', 'indeterminate', 'disabled'],
      description: 'Selected/Indeterminate render as FILLED BLUE box with white indicator. Indeterminate + disabled apply to checkbox only.'
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large', 'x-large'],
      description: 'small=12px box, 12px Medium label | x-large=16-18px box, 16px Regular label'
    },
  },
  render: (args) => renderRadioOrCheckbox(args),
};

export default meta;
type Story = StoryObj;

// ── Checkbox ──
export const CheckboxUnselected: Story = {
  name: 'Checkbox — Unselected',
  args: { label: 'Label', type: 'checkbox', state: 'unselected', size: 'large' },
};
export const CheckboxSelected: Story = {
  name: 'Checkbox — Selected',
  args: { label: 'Label', type: 'checkbox', state: 'selected', size: 'large' },
};
export const CheckboxHover: Story = {
  name: 'Checkbox — Hover',
  args: { label: 'Label', type: 'checkbox', state: 'hover', size: 'large' },
};
export const CheckboxIndeterminate: Story = {
  name: 'Checkbox — Indeterminate',
  args: { label: 'Label', type: 'checkbox', state: 'indeterminate', size: 'large' },
};
export const CheckboxDisabled: Story = {
  name: 'Checkbox — Disabled',
  args: { label: 'Label', type: 'checkbox', state: 'disabled', size: 'large' },
};

// ── Radio ──
export const RadioUnselected: Story = {
  name: 'Radio — Unselected',
  args: { label: 'Label', type: 'radio', state: 'unselected', size: 'large' },
};
export const RadioSelected: Story = {
  name: 'Radio — Selected',
  args: { label: 'Label', type: 'radio', state: 'selected', size: 'large' },
};
export const RadioHover: Story = {
  name: 'Radio — Hover',
  args: { label: 'Label', type: 'radio', state: 'hover', size: 'large' },
};

// ── Circle Checkbox (X-Large only) ──
export const CircleCheckboxUnselected: Story = {
  name: 'Circle Checkbox — Unselected',
  args: { label: 'Label', type: 'circle-checkbox', state: 'unselected', size: 'x-large' },
};
export const CircleCheckboxSelected: Story = {
  name: 'Circle Checkbox — Selected',
  args: { label: 'Label', type: 'circle-checkbox', state: 'selected', size: 'x-large' },
};
export const CircleCheckboxHover: Story = {
  name: 'Circle Checkbox — Hover',
  args: { label: 'Label', type: 'circle-checkbox', state: 'hover', size: 'x-large' },
};

// ── All variants grid (matches Figma layout) ──
export const AllVariants: Story = {
  render: () => `
    ${RAIS_STYLES}
    <div style="display:flex;flex-direction:column;gap:32px;padding:24px;background:#F0F2F5;border-radius:8px;font-family:'Figtree',sans-serif;">

      <div style="display:flex;flex-direction:column;gap:12px;">
        <span style="font-size:11px;color:#8D9091;">CHECKBOX — All states × All sizes</span>
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:16px;align-items:center;">
          ${renderRadioOrCheckbox({ label: 'Label', type: 'checkbox', state: 'unselected', size: 'small'   })}
          ${renderRadioOrCheckbox({ label: 'Label', type: 'checkbox', state: 'unselected', size: 'medium'  })}
          ${renderRadioOrCheckbox({ label: 'Label', type: 'checkbox', state: 'unselected', size: 'large'   })}
          ${renderRadioOrCheckbox({ label: 'Label', type: 'checkbox', state: 'unselected', size: 'x-large' })}
          ${renderRadioOrCheckbox({ label: 'Label', type: 'checkbox', state: 'selected',   size: 'small'   })}
          ${renderRadioOrCheckbox({ label: 'Label', type: 'checkbox', state: 'selected',   size: 'medium'  })}
          ${renderRadioOrCheckbox({ label: 'Label', type: 'checkbox', state: 'selected',   size: 'large'   })}
          ${renderRadioOrCheckbox({ label: 'Label', type: 'checkbox', state: 'selected',   size: 'x-large' })}
          ${renderRadioOrCheckbox({ label: 'Label', type: 'checkbox', state: 'hover',      size: 'small'   })}
          ${renderRadioOrCheckbox({ label: 'Label', type: 'checkbox', state: 'hover',      size: 'medium'  })}
          ${renderRadioOrCheckbox({ label: 'Label', type: 'checkbox', state: 'hover',      size: 'large'   })}
          ${renderRadioOrCheckbox({ label: 'Label', type: 'checkbox', state: 'hover',      size: 'x-large' })}
          ${renderRadioOrCheckbox({ label: 'Label', type: 'checkbox', state: 'indeterminate', size: 'small'   })}
          ${renderRadioOrCheckbox({ label: 'Label', type: 'checkbox', state: 'indeterminate', size: 'medium'  })}
          ${renderRadioOrCheckbox({ label: 'Label', type: 'checkbox', state: 'indeterminate', size: 'large'   })}
          ${renderRadioOrCheckbox({ label: 'Label', type: 'checkbox', state: 'indeterminate', size: 'x-large' })}
          ${renderRadioOrCheckbox({ label: 'Label', type: 'checkbox', state: 'disabled',   size: 'small'   })}
          ${renderRadioOrCheckbox({ label: 'Label', type: 'checkbox', state: 'disabled',   size: 'medium'  })}
          ${renderRadioOrCheckbox({ label: 'Label', type: 'checkbox', state: 'disabled',   size: 'large'   })}
          ${renderRadioOrCheckbox({ label: 'Label', type: 'checkbox', state: 'disabled',   size: 'x-large' })}
        </div>
      </div>

      <div style="display:flex;flex-direction:column;gap:12px;">
        <span style="font-size:11px;color:#8D9091;">RADIO — All states × All sizes</span>
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:16px;align-items:center;">
          ${renderRadioOrCheckbox({ label: 'Label', type: 'radio', state: 'unselected', size: 'small'   })}
          ${renderRadioOrCheckbox({ label: 'Label', type: 'radio', state: 'unselected', size: 'medium'  })}
          ${renderRadioOrCheckbox({ label: 'Label', type: 'radio', state: 'unselected', size: 'large'   })}
          ${renderRadioOrCheckbox({ label: 'Label', type: 'radio', state: 'unselected', size: 'x-large' })}
          ${renderRadioOrCheckbox({ label: 'Label', type: 'radio', state: 'selected',   size: 'small'   })}
          ${renderRadioOrCheckbox({ label: 'Label', type: 'radio', state: 'selected',   size: 'medium'  })}
          ${renderRadioOrCheckbox({ label: 'Label', type: 'radio', state: 'selected',   size: 'large'   })}
          ${renderRadioOrCheckbox({ label: 'Label', type: 'radio', state: 'selected',   size: 'x-large' })}
          ${renderRadioOrCheckbox({ label: 'Label', type: 'radio', state: 'hover',      size: 'small'   })}
          ${renderRadioOrCheckbox({ label: 'Label', type: 'radio', state: 'hover',      size: 'medium'  })}
          ${renderRadioOrCheckbox({ label: 'Label', type: 'radio', state: 'hover',      size: 'large'   })}
          ${renderRadioOrCheckbox({ label: 'Label', type: 'radio', state: 'hover',      size: 'x-large' })}
        </div>
      </div>

      <div style="display:flex;flex-direction:column;gap:12px;">
        <span style="font-size:11px;color:#8D9091;">CIRCLE CHECKBOX — X-Large only</span>
        <div style="display:flex;gap:24px;align-items:center;flex-wrap:wrap;">
          ${renderRadioOrCheckbox({ label: 'Unselected', type: 'circle-checkbox', state: 'unselected', size: 'x-large' })}
          ${renderRadioOrCheckbox({ label: 'Selected',   type: 'circle-checkbox', state: 'selected',   size: 'x-large' })}
          ${renderRadioOrCheckbox({ label: 'Hover',      type: 'circle-checkbox', state: 'hover',      size: 'x-large' })}
        </div>
      </div>

    </div>
  `,
};
