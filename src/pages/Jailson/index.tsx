import { useState } from "react";
import Styles from "./styles.module.css";

export default function Home() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState("");

  function handleChange(e: any) {
    setCode(e.target.value);
  }

  async function handleSubmit(e: any) {
    e.preventDefault();

    const response = await fetch(`../api/chat-gpt-conversation/`, {
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
    <div className={Styles.content}>
      <form className={Styles.formulario} onSubmit={handleSubmit}>
        <textarea
          className={Styles.textarea}
          onChange={handleChange}
        ></textarea>
        <button className={Styles.btn} type="submit">
          Consultar
        </button>
      </form>
      <div className={Styles.resultado}>
        <p>{result}</p>
      </div>
    </div>
  );
}
