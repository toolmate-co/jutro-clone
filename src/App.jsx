import { useState } from "react";
import "./App.css";
import { ImageCard } from "@/components";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <ImageCard count={count} setCount={setCount} />
    </>
  );
}

export default App;
