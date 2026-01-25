import { useState } from "react";

export default function InputForm({ onSubmit }) {
  const [minterms, setMinterms] = useState("");
  const [dontcares, setDontcares] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();


    const mintermsArray = minterms
      .split(",")
      .map((x) => parseInt(x.trim()))
      .filter((x) => !isNaN(x));

    const dontcaresArray = dontcares
      .split(",")
      .map((x) => parseInt(x.trim()))
      .filter((x) => !isNaN(x));

    onSubmit(mintermsArray, dontcaresArray);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display:"flex",justifyContent:"center",height:"100%", flexDirection:"column",rowGap:"30px",alignItems:"center",width:"100%"}}>
      <div>
        <label>Min-Terms  (comma-separated): </label>
        <input
          type="text"
          value={minterms}
          onChange={(e) => setMinterms(e.target.value)}
          placeholder="e.g. 0,1,2,5" style={{}}
        />
      </div>

      <div>
        <label>Don't Cares (comma-separated): </label>
        <input
          type="text"
          value={dontcares}
          onChange={(e) => setDontcares(e.target.value)}
          placeholder="e.g. 3,6"
        />
      </div>

      <button type="submit" style={{ marginTop: "10px" }}>
        Simplify
      </button>
    </form>
  );
}
