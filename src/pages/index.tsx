import { useState } from "react";

export default function Home() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState("");

  function handleChange(e: any) {
    setCode(e.target.value);
  }

  async function handleSubmit(e: any) {
    e.preventDefault();

    const response = await fetch(`/api/chat-gpt/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    setResult(data.result);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea onChange={handleChange}></textarea>
        <button type="submit">Consultar</button>
      </form>
      <p>{result}</p>
    </div>
  );
}
