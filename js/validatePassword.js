// ===== Password Validation + Progress Bar =====

// ---- Elements ----
const input = document.getElementById("password-input");
const toggle = document.querySelector(".password-toggle");
const rules = document.querySelectorAll(".password-rule");
const btnSetPassword = document.getElementById("set-password");

// ---- Validation rules ----
const checks = {
  length: pw => pw.length >= 8,
  number: pw => /[0-9]/.test(pw),
  uppercase: pw => /[A-Z]/.test(pw),
  lowercase: pw => /[a-z]/.test(pw),
  special: pw => /[^A-Za-z0-9]/.test(pw)
};

// ---- Toggle show/hide password ----
toggle?.addEventListener("click", () => {
  input.type = input.type === "password" ? "text" : "password";
});

// ---- Validation update ----
const isAllValid = (pw) => Object.values(checks).every(fn => fn(pw));
const refreshButtonState = () => {
  const ok = isAllValid(input.value);
  btnSetPassword.toggleAttribute("disabled", !ok);
  btnSetPassword.setAttribute("aria-disabled", String(!ok));
};
refreshButtonState();

input.addEventListener("input", e => {
  const pw = e.target.value;
  rules.forEach(rule => {
    const ok = checks[rule.dataset.rule]?.(pw);
    rule.classList.toggle("valid", !!ok);
  });
  input.removeAttribute("aria-invalid");
  refreshButtonState();
});

// ---- Overlay elements ----
const overlay = document.getElementById("progress-overlay");
const bar = document.getElementById("progress-bar");
const valueEl = document.getElementById("progress-value");

// ---- Utility: lock/unlock scroll ----
const lockScroll = (locked) => {
  document.documentElement.style.overflow = locked ? "hidden" : "";
  document.body.style.overflow = locked ? "hidden" : "";
};

// ---- Show overlay with progress ----
function showProgressOverlay(durationMs = 5000) {
  bar.style.width = "0%";
  valueEl.textContent = "0";
  overlay.classList.add("is-open");
  overlay.setAttribute("aria-hidden", "false");
  lockScroll(true);

  const start = performance.now();
  function tick(now) {
    const elapsed = now - start;
    const pct = Math.min(100, Math.round((elapsed / durationMs) * 100));
    bar.style.width = pct + "%";
    valueEl.textContent = String(pct);

    if (elapsed < durationMs) {
      requestAnimationFrame(tick);
    } else {
      setTimeout(closeProgressOverlay, 300);
    }
  }
  requestAnimationFrame(tick);
}

// ---- Close overlay ----
function closeProgressOverlay() {
  overlay.classList.remove("is-open");
  overlay.setAttribute("aria-hidden", "true");
  lockScroll(false);
}

// ---- Click handler ----
btnSetPassword.addEventListener("click", (e) => {
  e.preventDefault();
  if (!isAllValid(input.value)) {
    input.setAttribute("aria-invalid", "true");
    input.focus();
    return;
  }
  showProgressOverlay(5000);
});

// ---- Optional: Esc key closes overlay ----
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && overlay.classList.contains("is-open")) {
    closeProgressOverlay();
  }
});
