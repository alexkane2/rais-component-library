import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * File Upload States — RAIS File Management component
 *
 * Vertical 400×264px file-upload dropzone covering four states. Mirrors
 * the Figma `File Upload Vertical` set (file cCX0CnHdQeFNhZBkP12aWS, node
 * 225:9588).
 *
 *   default   — the whole dashed area is a real drop target; "Browse Files"
 *               is the only click-to-pick control (so the copy no longer says
 *               "Click to upload"). `helperText` lists the accepted formats:
 *               Profit Share takes XLSX and CSV (no legacy XLS); other
 *               consumers override it and `accept`.
 *   uploading — file-type-neutral upload icon + progress percentage and bar
 *   success   — solid green border (dashed = drop target, solid = file
 *               accepted), check icon, "File Selected" by default
 *               (`successTitle` is per page), "Clear Upload" link
 *   error     — dashed red border, error title + message, "Try Again" link
 *
 * Emits production events:
 *   (filesSelected) — files picked with the button or dropped on the area
 *   (clearClicked)  — user clicks "Clear Upload" (success state)
 *   (tryAgain)      — user clicks "Try Again" (error state)
 *
 * Styling uses the RAIS design tokens in `src/index.css` only.
 *
 * Usage:
 *   <rais-file-upload-states state="default" (filesSelected)="upload($event)"></rais-file-upload-states>
 *   <rais-file-upload-states state="uploading" [progress]="65" documentName="production-2026.xlsx"></rais-file-upload-states>
 *   <rais-file-upload-states state="success" successTitle="Report Uploaded" documentName="production-2026.xlsx"></rais-file-upload-states>
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
  /** Title of the drop area (default state). */
  @Input() title: string = 'Drag and drop your file here';
  /** Accepted-formats line under the title (default state). */
  @Input() helperText: string = 'Accepted formats: XLSX, CSV';
  /** Primary CTA label (default state). */
  @Input() browseCtaLabel: string = 'Browse Files';
  /** File types accepted in the native file picker. */
  @Input() accept: string = '.xlsx,.csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/csv';
  /** Allow picking or dropping more than one file. */
  @Input() multiple: boolean = false;

  // ─── Uploading / Success / Error copy ──────────────────────────
  /** Upload progress (0–100, uploading state). */
  @Input() progress: number = 65;
  /** Title text in the uploading state. */
  @Input() uploadingTitle: string = 'Uploading…';
  /** Success state title; pages override it (e.g. "Report Uploaded"). */
  @Input() successTitle: string = 'File Selected';
  /** Error state title. */
  @Input() errorTitle: string = 'Failed to Upload';
  /** File name shown under the uploading / success title. */
  @Input() documentName: string = '{File name}';
  /** Error message shown in error state. */
  @Input() errorMessage: string = '{Error message}';
  /** "Clear Upload" link label (success state). */
  @Input() clearLabel: string = 'Clear Upload';
  /** "Try Again" link label (error state). */
  @Input() tryAgainLabel: string = 'Try Again';

  /** Emitted when the user picks or drops file(s). */
  @Output() filesSelected = new EventEmitter<FileList | null>();
  /** Emitted when "Clear Upload" is clicked (success). */
  @Output() clearClicked = new EventEmitter<void>();
  /** Emitted when "Try Again" is clicked (error). */
  @Output() tryAgain = new EventEmitter<void>();

  /** A file is being dragged over the drop area. */
  dragging = false;

  @HostBinding('class.rais-fus-host') readonly hostClass = true;

  get canDrop(): boolean {
    return this.state === 'default' || this.state === 'error';
  }

  onFileInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.filesSelected.emit(input.files);
    input.value = '';
  }

  onDragOver(event: DragEvent): void {
    if (!this.canDrop) return;
    event.preventDefault();
    if (event.dataTransfer) event.dataTransfer.dropEffect = 'copy';
    this.dragging = true;
  }

  onDragLeave(): void {
    this.dragging = false;
  }

  onDrop(event: DragEvent): void {
    if (!this.canDrop) return;
    event.preventDefault();
    this.dragging = false;
    const files = event.dataTransfer?.files ?? null;
    if (files && files.length) this.filesSelected.emit(files);
  }
}
