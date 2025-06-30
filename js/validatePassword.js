const input = document.getElementById("passwordInput");
  const toggle = document.querySelector(".password-toggle");
  const rules = document.querySelectorAll(".password-rule");

  const checks = {
    length: pw => pw.length >= 8,
    number: pw => /[0-9]/.test(pw),
    uppercase: pw => /[A-Z]/.test(pw),
    lowercase: pw => /[a-z]/.test(pw),
    special: pw => /[^A-Za-z0-9]/.test(pw)
  };

  toggle.addEventListener("click", () => {
    input.type = input.type === "password" ? "text" : "password";
  });

  input.addEventListener("input", e => {
    const pw = e.target.value;
    rules.forEach(rule => {
      const ok = checks[rule.dataset.rule](pw);
      rule.classList.toggle("valid", ok);
    });
  });