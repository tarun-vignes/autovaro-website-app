"use client";

export function PdfExportButton() {
  return (
    <button type="button" onClick={() => window.print()} className="btn-secondary">
      PDF Export
    </button>
  );
}
