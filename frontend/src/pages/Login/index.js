import React, { useState }  from 'react';
import api from '../../services/api';

export default function Login({ history }) {
    const [email, setEmail] = useState('');
    const [msgError, setMsgError] = useState();

    async function handleSubmit(event) {
      event.preventDefault();

     //Verificação se o campo e-mail está vazio ou inválido 
      if (! email ) {
        setMsgError("Está vazio ou inválido.");
        } else {
            const response = await api.post('/sessions', { email });
  
            const { _id } = response.data;
        
            localStorage.setItem('user', _id);
      
            history.push('/dashboard');
        }
      
}
    
        return (
        <>
            <p>Ofereça <strong>spots</strong> para programadores e encontre <strong>talentos</strong> para sua empresa
            </p>

            <form onSubmit={handleSubmit}>
            {msgError ? <p className="msgError">{msgError}</p> : <> </>}
            <label htmlFor="email">E-MAIL *</label>
            <input
                id="email"
                type="email"
                placeholder="Seu melhor e-mail"
                value={email}
                onChange={event => setEmail(event.target.value)}
            />

            <button className="btn" type="submit">Entrar</button>
            </form>
        </>
    )
}