You are helping me answer a Time Series Analysis quiz on invertibility and causality of AR, MA and ARMA models. I will paste one quiz question at a time. Write the full solution in my lecturer's style so that I can copy it by hand.

## Lecturer's notation (use exactly this)

- Data: X_t. White noise: w_t. Backshift operator: B, where B X_t = X_{t-1}.
- AR polynomial: Φ(B) = 1 − φ1 B − φ2 B^2 − ... − φp B^p  (minus signs).
- MA polynomial: θ(B) = 1 + θ1 B + θ2 B^2 + ... + θq B^q  (plus signs).
- ARMA model: Φ(B) X_t = θ(B) w_t.
- If the question uses other letters (Y_t, ε_t, Z_t, a_t), use the question's letters.

## Lecturer's definitions and theorems (quote these wordings)

- Invertibility: "X_t is invertible if it can be written as AR(∞), a meaningful process." MA(q) → AR(∞). w_t = π(B) X_t, π(B) = Φ(B)/θ(B). Check θ(B).
- Causality: X_t is causal if it can be written as MA(∞). AR(p) → MA(∞). X_t = ψ(B) w_t, ψ(B) = θ(B)/Φ(B). Check Φ(B).
- Theorem: "For an MA(q) to be invertible, we need the roots of θ(B) to all exceed 1 in absolute value (or modulus)."
- Theorem: "For an AR(p) to be causal, we need the roots of Φ(B) to all exceed 1 in absolute value (or modulus)."

## Lecturer's methods (follow these patterns)

1. Proof that MA(1) is invertible, by repeated substitution. The lecturer writes MA(1) as X_t = w_t − θ w_{t-1}:
   w_t = X_t + θ w_{t-1}
   w_t = X_t + θ[X_{t-1} + θ w_{t-2}]
   w_t = X_t + θ X_{t-1} + θ^2 X_{t-2} + θ^3 X_{t-3} + ...   AR(∞)
   Σ_{j=1}^{∞} θ^j < ∞ (converge) if and only if −1 < θ < 1.
   If the question writes X_t = w_t + θ w_{t-1}, keep the question's sign; the result is w_t = Σ_{j=0}^{∞} (−θ)^j X_{t-j}, same condition |θ| < 1.

2. AR(1) causal. The lecturer only showed a numeric example with the theorem (X_t = 0.3 X_{t-1} + w_t: (1 − 0.3B) X_t = w_t, Φ(x) = 1 − 0.3x = 0, |x| = |1/0.3| > 1, Causal). For the general AR(1), give BOTH of these unless the question asks for only one:
   (a) Theorem: (1 − φB) X_t = w_t, Φ(x) = 1 − φx = 0, x = 1/φ, |x| > 1 if and only if |φ| < 1.
   (b) Repeated substitution, mirroring the MA(1) proof:
       X_t = φ X_{t-1} + w_t
       X_t = φ[φ X_{t-2} + w_{t-1}] + w_t = φ^2 X_{t-2} + φ w_{t-1} + w_t
       X_t = w_t + φ w_{t-1} + φ^2 w_{t-2} + φ^3 w_{t-3} + ...   MA(∞)
       Σ_{j=1}^{∞} φ^j < ∞ (converge) if and only if −1 < φ < 1.
   AR(1) is always invertible (θ(B) = 1). MA(1) is always causal (Φ(B) = 1).

3. Numeric questions: rewrite as Φ(B) X_t = θ(B) w_t (X terms move to the left and change sign; w terms keep their sign). Replace B by x, set the polynomial to 0, find the roots.
   - Degree 1: solve directly, report |x|.
   - Degree 2: label a (coefficient of x^2), b (coefficient of x), c = 1. Compute b^2 − 4ac. Use x = (−b ± √(b^2 − 4ac)) / (2a).
   - If b^2 − 4ac < 0: x = −b/(2a) ± i√|D|/(2a), then modulus = √(real^2 + imaginary^2).
   - All roots exceed 1 in absolute value → causal / invertible. Otherwise not.
   Lecturer's examples: θ(x) = 1 − 1.3x + 0.4x^2 has roots 2 and 1.25 (invertible). θ(x) = 1 − 0.3x + 1.2x^2 has D = −4.71, roots 0.125 ± 0.904i, modulus 0.913 < 1 (not invertible).

4. Parameter redundancy: factor both Φ(B) and θ(B); cancel any common factor before checking; state the reduced model order. Lecturer's example: (1 − 0.4B − 0.45B^2) X_t = (1 + B + 0.25B^2) w_t becomes (1 + 0.5B)(1 − 0.9B) X_t = (1 + 0.5B)(1 + 0.5B) w_t, so (1 − 0.9B) X_t = (1 + 0.5B) w_t, an ARMA(1,1), causal and invertible.

5. ψ-weights and π-weights by power series, using (1 + θz)^{-1} = 1 + (−θ)z + (−θ)^2 z^2 + ...
   Example (1 − 0.9B) X_t = (1 + 0.5B) w_t:
   ψ(z) = (1 + 0.5z)(1 − 0.9z)^{-1} = 1 + 1.4z + 1.4(0.9)z^2 + 1.4(0.9)^2 z^3 + ..., so X_t = w_t + Σ_{j=1}^{∞} 1.4(0.9)^{j-1} w_{t-j}.
   π(z) = (1 − 0.9z)(1 + 0.5z)^{-1} = 1 − 1.4z + 1.4(0.5)z^2 − ..., so w_t = X_t − 1.4 Σ_{j=1}^{∞} (−0.5)^{j-1} X_{t-j}.
   General ARMA(1,1): ψ_j = (φ + θ) φ^{j-1}, π_j = −(φ + θ)(−θ)^{j-1}, for j ≥ 1.

6. Why invertibility is needed: MA(1) with θ and 1/θ have the same ACF, ρ(1) = θ/(1 + θ^2). Example θ = 1/5 and θ = 5 both give 0.1923. Choose the invertible one (|θ| < 1).

## How to answer

For each question I paste:

1. First line: state in Thai which case this is, in one short sentence.
2. Then a block titled "ANSWER (copy this)": the complete solution in English, in the lecturer's terse style, one equation per line, in the same order as the patterns above. Use plain text math that is easy to copy by hand (X_t, w_{t-1}, θ^2, Σ, √, |x|). Do not use LaTeX code. Show every substitution and every arithmetic step with the question's own numbers. End with a one-line conclusion (for example "Therefore the process is causal but not invertible.").
3. Then a block titled "CHECK": re-verify every number independently (plug each root back into the polynomial, or recompute the discriminant). If anything does not match, fix the answer and say what changed.
4. Last, in Thai, at most three short lines: what in the answer depends on the question's numbers or signs, so I know what to double-check.

Rules:
- Keep the question's signs and letters. Never switch a "+" model to a "−" model.
- Use only the methods above. No spectral arguments, no unit-circle complex analysis beyond the modulus rule, no extra theory.
- Do not add commentary, alternatives, or praise. If the question is ambiguous or a symbol is unreadable, ask me one short question before answering.
- If the question asks only to "show" or "prove" something with symbols (no numbers), give the symbolic proof in full. If it gives numbers, use the numbers.
- Round to 3 decimal places unless the question says otherwise, and keep fractions when they are exact and simple.

Reply only "พร้อม" now, then wait for my first question.
