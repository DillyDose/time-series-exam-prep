// ACF lab: <div class="acflab" data-kind="ma|ar"></div>
// ma: X_t = w_t + θ1 w_{t-1} + θ2 w_{t-2};  ar: X_t = φ1 X_{t-1} + φ2 X_{t-2} + w_t
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".acflab").forEach((box) => {
    const kind = box.dataset.kind || "ma";
    const sym = kind === "ma" ? "θ" : "φ";
    const init = kind === "ma" ? [0.9, 0] : [0.7, 0];
    box.innerHTML =
      `<div class="lab-title">ลองเลื่อนเอง: ACF ทางทฤษฎีของ ${kind === "ma" ? "MA(2)" : "AR(2)"} (ตั้ง ${sym}₂ = 0 จะได้อันดับ 1)</div>` +
      [1, 2].map((i) => `<label><span class="nm">${sym}${i === 1 ? "₁" : "₂"}</span><input type="range" min="-0.95" max="0.95" step="0.05" value="${init[i - 1]}"><output></output></label>`).join("") +
      `<svg viewBox="0 0 400 170" role="img" aria-label="ACF bars"></svg><div class="lab-note"></div>`;
    const inputs = box.querySelectorAll("input");
    const outs = box.querySelectorAll("output");
    const svg = box.querySelector("svg");
    const note = box.querySelector(".lab-note");
    const L = 10;

    function acf(a, b) {
      const r = [1];
      if (kind === "ma") {
        const d = 1 + a * a + b * b;
        r.push((a + a * b) / d, b / d);
        while (r.length <= L) r.push(0);
      } else {
        r.push(a / (1 - b));
        for (let h = 2; h <= L; h++) r.push(a * r[h - 1] + b * r[h - 2]);
      }
      return r;
    }
    function draw() {
      const a = +inputs[0].value, b = +inputs[1].value;
      outs[0].textContent = a.toFixed(2);
      outs[1].textContent = b.toFixed(2);
      const ok = kind === "ma" || (Math.abs(b) < 1 && b + a < 1 && b - a < 1);
      const r = ok ? acf(a, b) : null;
      const y0 = 85, s = 70, x0 = 40, dx = 34;
      let g = `<line x1="${x0 - 10}" y1="${y0}" x2="390" y2="${y0}" stroke="#999"/>`;
      g += `<text x="4" y="${y0 - s + 4}" font-size="10" fill="#666">1</text><text x="4" y="${y0 + 4}" font-size="10" fill="#666">0</text><text x="0" y="${y0 + s + 4}" font-size="10" fill="#666">−1</text>`;
      [0.2, -0.2].forEach((v) => (g += `<line x1="${x0 - 10}" x2="390" y1="${y0 - v * s}" y2="${y0 - v * s}" stroke="#1d6fb8" stroke-dasharray="4 3" stroke-width="0.8"/>`));
      if (r) {
        for (let h = 1; h <= L; h++) {
          const x = x0 + (h - 1) * dx, v = r[h];
          const top = Math.min(y0, y0 - v * s), hgt = Math.max(Math.abs(v * s), 0.8);
          g += `<rect x="${x}" y="${top}" width="14" height="${hgt}" fill="${Math.abs(v) > 0.2 ? "#c25e00" : "#bbb"}"/>`;
          g += `<text x="${x + 7}" y="166" font-size="10" text-anchor="middle" fill="#666">${h}</text>`;
        }
      }
      svg.innerHTML = g;
      if (!r) { note.textContent = "ค่า φ คู่นี้ทำให้ AR(2) ไม่นิ่ง จึงไม่มี ACF ทางทฤษฎี"; return; }
      const f = (v) => (v >= 0 ? "" : "−") + Math.abs(v).toFixed(3);
      if (kind === "ma") {
        const last = b !== 0 ? 2 : a !== 0 ? 1 : 0;
        note.textContent = `ρ₁ = ${f(r[1])}, ρ₂ = ${f(r[2])}, lag ≥ 3 = 0 → ACF ตัดหลัง lag ${last}` +
          (b === 0 ? ` · MA(1): |ρ₁| ไม่มีทางเกิน 0.5 ลองดัน ${sym}₁ ไปสุดดู` : "");
      } else {
        note.textContent = `ρ₁ = ${f(r[1])}, ρ₂ = ${f(r[2])}, ρ₃ = ${f(r[3])} … ค่อย ๆ ลดแต่ไม่ตัดเป็นศูนย์ (tail off)`;
      }
    }
    inputs.forEach((i) => i.addEventListener("input", draw));
    draw();
  });
});
