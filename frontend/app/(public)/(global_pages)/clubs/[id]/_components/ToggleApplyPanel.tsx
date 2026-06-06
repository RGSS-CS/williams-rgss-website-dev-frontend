"use client";

export function toggleApplyPanel() {
  const panel = document.getElementById("apply-panel");
  const btn = document.getElementById("apply-btn");
  if (panel && btn) {
    const isOpen = panel.classList.toggle("open");
    btn.style.borderRadius = isOpen ? " 0 0 0 12px" : "12px 0 0 12px";
  }
}