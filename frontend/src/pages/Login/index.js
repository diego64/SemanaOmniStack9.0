import React, { useState } from "react";
import api from "../../services/api";

export default function Login({ history }) {
  const [email, setEmail] = useState("alexsouzasilvax@gmail.com");
  const [msgError, setMsgError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    if (email) {
      const response = await api.post("/sessions", { email });

      const { _id } = response.data;

      localStorage.setItem("user", _id);

      history.push("/dashboard");
    } else {
      setMsgError("E-mail vazio ou inválido.");
    }
  }

  return (
    <>
      <p>
        Ofereça <strong>spots</strong> para programadores e encontre{" "}
        <strong>talentos</strong> para sua empresa
      </p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="email">E-MAIL *</label>

        {msgError ? (
          <p htmlFor="email" className="msgError">
            {msgError}
          </p>
        ) : (
          <> </>
        )}

        <input
          id="email"
          type="email"
          placeholder="Seu melhor e-mail"
          value={email}
          onChange={event => setEmail(event.target.value)}
        />

        <button className="btn" type="submit">
          Entrar
        </button>
      </form>
    </>
  );
}
