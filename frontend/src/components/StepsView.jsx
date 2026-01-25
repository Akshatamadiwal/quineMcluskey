import React from "react";

export default function StepsView({ result }) {
  if (!result || !result.steps?.length) return <p>No steps to display yet.</p>;

  const thStyle = {
    border: "1px solid #ccc",
    padding: "8px",
    background: "#f0f0f0",
    textAlign: "center",
  };

  const tdStyle = {
    border: "1px solid #ccc",
    padding: "8px",
    textAlign: "center",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
      {result.steps.map((step, idx) => (
        <div key={idx}>
          <h3 style={{ marginBottom: "10px" }}>
            Step {idx + 1}: {step.stage.replace("_", " ").toUpperCase()}
          </h3>

          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                {step.stage === "initial_grouping" && <th style={thStyle}>Group</th>}
                <th style={thStyle}>Minterms / Binary</th>
                {step.stage === "merge_round" && <th style={thStyle}>Merged With</th>}
                {step.stage === "merge_round" && <th style={thStyle}>Used</th>}
                
              </tr>
            </thead>
            <tbody>
              {step.stage === "initial_grouping" &&
                Object.entries(step.groups).map(([group, binaries], gIdx) =>
                  binaries.map((bin, bIdx) => (
                    <tr key={`${gIdx}-${bIdx}`} style={{ background: bIdx % 2 === 0 ? "#fafafa" : "#fff" }}>
                      <td style={tdStyle}>{group}</td>
                      <td style={tdStyle}>{bin}</td>
                     
                    </tr>
                  ))
                )}

              {step.stage === "merge_round" &&
                step.merges.map((merge, mIdx) => (
                  <tr key={mIdx} style={{ background: mIdx % 2 === 0 ? "#fff7d6" : "#fafafa" }}>
                    <td style={tdStyle}>{merge.from.join(", ")}</td>
                    <td style={tdStyle}>{merge.result}</td>
                    <td style={tdStyle}>✔️</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      ))}

      {/* Prime Implicants */}
      {result.primeImplicants && (
        <div>
          <h3>Prime Implicants</h3>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={thStyle}>Binary</th>
                <th style={thStyle}>Used</th>
              </tr>
            </thead>
            <tbody>
              {result.primeImplicants.map((pi, idx) => (
                <tr key={idx}>
                  <td style={tdStyle}>{pi}</td>
                  <td style={tdStyle}>{result.essentialPrimeImplicants.includes(pi) ? "✔️" : ""}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Final Expression */}
      {result.expression && (
        <div>
          <h3>Simplified Expression</h3>
          <p>{result.expression}</p>
        </div>
      )}
    </div>
  );
}
