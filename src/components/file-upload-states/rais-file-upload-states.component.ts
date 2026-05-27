import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * File Upload States — RAIS File Management component
 *
 * Vertical 400×264px file-upload dropzone covering four states. Mirrors
 * the Figma component at file cCX0CnHdQeFNhZBkP12aWS, node 225:9588.
 *
 *   default   — empty dropzone, "Click to upload or drag and drop"
 *   uploading — file-type icon + progress percentage + progress bar
 *   success   — green check, "Clear Upload" affordance
 *   error     — red triangle, "Try Again" affordance
 *
 * Emits production events:
 *   (filesSelected) — user picks files (default state)
 *   (clearClicked)  — user clicks "Clear Upload" (success state)
 *   (tryAgain)      — user clicks "Try Again" (error state)
 *
 * Usage:
 *   <rais-file-upload-states state="default"></rais-file-upload-states>
 *   <rais-file-upload-states state="uploading" [progress]="65" documentName="invoice.pdf"></rais-file-upload-states>
 *   <rais-file-upload-states state="success" documentName="invoice.pdf"></rais-file-upload-states>
 *   <rais-file-upload-states state="error" errorMessage="File too large"></rais-file-upload-states>
 */
export type FileUploadState = 'default' | 'uploading' | 'success' | 'error';

@Component({
  selector: 'rais-file-upload-states',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rais-file-upload-states.component.html',
  styleUrls: ['./rais-file-upload-states.component.scss'],
})
export class RaisFileUploadStatesComponent {
  /** Current state of the upload component. */
  @Input() state: FileUploadState = 'default';

  // ─── Default state copy ─────────────────────────────────────────
  /** Helper text under the title (default state). */
  @Input() helperText: string = 'SVG, PNG, JPG or GIF (max. 800x400px)';
  /** Primary CTA label (default state). */
  @Input() browseCtaLabel: string = 'Browse Files';
  /** File types accepted in the native file picker. */
  @Input() accept: string = 'image/svg+xml,image/png,image/jpeg,image/gif';

  // ─── Uploading / Success / Error copy ──────────────────────────
  /** Upload progress (0–100, uploading state). */
  @Input() progress: number = 65;
  /** Title text in uploading/success/error states. */
  @Input() uploadingTitle: string = 'Uploading Document...';
  /** Success state title (defaults to same uploadingTitle). */
  @Input() successTitle: string = 'Uploading Document...';
  /** Error state title. */
  @Input() errorTitle: string = 'Failed to Upload';
  /** Document name shown under the upload title. */
  @Input() documentName: string = '{Name of document}';
  /** Error message shown in error state. */
  @Input() errorMessage: string = '{Error Message}';
  /** "Clear Upload" link label (success state). */
  @Input() clearLabel: string = 'Clear Upload';
  /** "Try Again" link label (error state). */
  @Input() tryAgainLabel: string = 'Try Again';

  /** Emitted when the user selects file(s) from the picker. */
  @Output() filesSelected = new EventEmitter<FileList | null>();
  /** Emitted when "Clear Upload" is clicked (success). */
  @Output() clearClicked = new EventEmitter<void>();
  /** Emitted when "Try Again" is clicked (error). */
  @Output() tryAgain = new EventEmitter<void>();

  onFileInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.filesSelected.emit(input.files);
  }
}
