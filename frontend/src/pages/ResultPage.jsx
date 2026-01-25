import { useLocation, Navigate } from "react-router-dom";
import StepsView from "../components/StepsView";

export default function ResultPage() {
  const location = useLocation();
  const result = location.state;

  if (!result) {
    return <Navigate to="/" />;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Simplification Result</h1>
      <StepsView result={result} />
    </div>
  );
}
