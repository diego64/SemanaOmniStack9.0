import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

import "./styles.css";
import camera from "../../assets/camera.svg";

import iconLimpar from "../../assets/icons/iconLimpar.png";
import iconSair from "../../assets/icons/iconSair.png";

export default function New({ history }) {
  const [thumbnail, setThumbnail] = useState(null);
  const [company, setCompany] = useState("");
  const [techs, setTechs] = useState("");
  const [price, setPrice] = useState("");

  const [msgError, setMsgError] = useState();

  const preview = useMemo(() => {
    return thumbnail ? URL.createObjectURL(thumbnail) : null;
  }, [thumbnail]);

  async function handleSubmit(event) {
    event.preventDefault();

    //verifica se há informações no form
    if (!thumbnail || !company || !techs) {
      setMsgError("Está vazio ou inválido.");
    } else {
      const data = new FormData();
      const user_id = localStorage.getItem("user");

      data.append("thumbnail", thumbnail);
      data.append("company", company);
      data.append("techs", techs);
      data.append("price", price);

      await api.post("/spots", data, {
        headers: {
          user_id
        }
      });

      history.push("/dashboard");
    }
  }

  function limparCampos() {
    setThumbnail(null);
    setCompany("");
    setTechs("");
    setPrice("");
  }

  return (
    <>
      <div className="divCabecalho">
        <Link to="/dashboard">
          <button className="btnSairNew">
            <img
              className="iconBtnSair"
              src={iconSair}
              alt="icone_sair => (função para sair da tela)"
            />
          </button>
        </Link>

        <button className="btnLimparCamposNew" onClick={limparCampos}>
          <img
            className="iconBtnLimparCampos"
            src={iconLimpar}
            alt="icone_vassoura => (função para limpar a tela)"
          />
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        {msgError ? <p className="msgError">{msgError}</p> : <> </>}
        <label
          id="thumbnail"
          style={{ backgroundImage: `url(${preview})` }}
          className={thumbnail ? "has-thumbnail" : ""}
        >
          <input
            type="file"
            onChange={event => {
              setThumbnail(event.target.files[0]);
            }}
          />
          <img src={camera} alt="Enviar imagem" />
        </label>

        <label htmlFor="company">EMPRESA *</label>

        {msgError ? <p className="msgError">{msgError}</p> : <> </>}

        <input
          id="company"
          placeholder="Sua empresa incrível"
          value={company}
          onChange={event => setCompany(event.target.value)}
        />

        <label htmlFor="techs">
          TECNOLOGIAS * <span>(separadas por vírgula)</span>
        </label>
        {msgError ? <p className="msgError">{msgError}</p> : <> </>}
        <input
          id="techs"
          placeholder="Quais tecnologias usam?"
          value={techs}
          onChange={event => setTechs(event.target.value)}
        />

        <label htmlFor="price">VALOR DA DIÁRIA (em branco para GRATUITO)</label>
        <input
          id="price"
          placeholder="Valor cobrado por dia"
          value={price}
          onChange={event => setPrice(event.target.value)}
        />

        <button type="submit" className="btn">
          Cadastrar
        </button>
      </form>
    </>
  );
}
