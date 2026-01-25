import axios from "axios";
import { useNavigate } from "react-router-dom";
import InputForm from "../components/InputForm";

export default function InputPage() {
  const navigate = useNavigate();

  const handleSubmit = async (minterms, dontcares) => {
    try {
      const res = await axios.post("http://localhost:8000/simplify", {
        minterms,
        dontcares,
      });

      navigate("/result", { state: res.data });
    } catch (err) {
      console.error("API error:", err);
    }
  };

  return (
    <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",marginTop:"20vh"}}>
      <h1 style={{ }}> Quine-McCluskey (Tabular) Method Simplifier</h1>
      <InputForm onSubmit={handleSubmit} />
    </div>
  );
}
