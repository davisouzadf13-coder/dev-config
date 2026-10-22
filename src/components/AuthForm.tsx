import React, { useState } from 'react';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

export function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [apelido, setApelido] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (isLogin) {
        // Lógica de Login
        await signInWithEmailAndPassword(auth, email, senha);
        alert('Login efetuado com sucesso!');
        window.location.href = '/home.html';
      } else {
        // Lógica de Cadastro
        const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
        const user = userCredential.user;

        // Guarda o apelido e dados adicionais no Firestore
        await setDoc(doc(db, 'usuarios', user.uid), {
          apelido: apelido,
          email: email,
          criadoEm: new Date().toISOString()
        });

        alert('Cadastro realizado com sucesso!');
        window.location.href = '/home.html';
      }
    } catch (error: any) {
      console.error('Erro na autenticação:', error);
      alert('Erro: ' + error.message);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '2rem auto', padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>{isLogin ? 'Entrar' : 'Cadastrar'}</h2>
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <div style={{ marginBottom: '1rem' }}>
            <label>Apelido:</label>
            <input
              type="text"
              value={apelido}
              onChange={(e) => setApelido(e.target.value)}
              required
              style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
            />
          </div>
        )}

        <div style={{ marginBottom: '1rem' }}>
          <label>E-mail:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>Senha:</label>
          <input
            type="text"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
          />
        </div>

        <button type="submit" style={{ width: '100%', padding: '0.75rem', backgroundColor: '#0070f3', color: '#fff', border: 'none', borderRadius: '4px' }}>
          {isLogin ? 'Entrar' : 'Criar Conta'}
        </button>
      </form>

      <button
        type="button"
        onClick={() => setIsLogin(!isLogin)}
        style={{ marginTop: '1rem', background: 'none', border: 'none', color: '#0070f3', cursor: 'pointer' }}
      >
        {isLogin ? 'Não tem uma conta? Cadastre-se' : 'Já tem uma conta? Faça login'}
      </button>
    </div>
  );
}

