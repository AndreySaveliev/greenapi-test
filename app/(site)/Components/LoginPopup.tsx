'use client';
import { signIn, useSession } from 'next-auth/react';
import React, { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const LoginPopup = () => {
  const [id, setId] = useState('');
  const [api, setApi] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(false);

  const [login, setLogin] = useState(false);

  const session = useSession();
  const router = useRouter();
  const toggleForm = useCallback(() => {
    setLogin((current) => !current);
  }, []);

  const handleSumbit = async (e: any) => {
    e.preventDefault();
    if (login) {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: {
          contentType: 'application/json'
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
          apiId: id,
          apiTokken: api
        })
      }).then((res) => {
        if (res.ok) {
          return res.json();
        }
      });
    } else {
      await signIn('credentials', {
        email,
        password
      });
    }
  };

  useEffect(() => {
    if (session?.status === 'authenticated') {
      router.push('/messanger');
    }
  }, [session, router]);

  return (
    <div
      className={`absolute w-auto bg-slate-600 z-40 top-[50%] right-[50%] translate-x-2/4 -translate-y-2/4 ${
        isLogin && 'hidden'
      }`}
    >
      <form className="flex flex-col items-center" onSubmit={(e) => handleSumbit(e)}>
        <label>email</label>
        <input
          id="email"
          className="m-4 text-black"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <label>password</label>
        <input
          id="password"
          className="m-4 text-black"
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        {login && (
          <>
            <label>name</label>
            <input
              className="m-4 text-black"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></input>
            <label>idInstance</label>
            <input
              className="m-4 text-black"
              value={id}
              onChange={(e) => setId(e.target.value)}
            ></input>
            <label>apiTokenInstance</label>
            <input
              className="m-4 text-black"
              value={api}
              onChange={(e) => setApi(e.target.value)}
            ></input>
          </>
        )}

        <button
          className="m-3 border-2 border-slate-300 p-2 rounded-md hover:bg-slate-400"
          type="submit"
        >
          {login ? 'Зарегистрироваться' : 'Войти'}
        </button>
        <p className="text-sm">или</p>
        <span className="mb-2 cursor-pointer" onClick={toggleForm}>
          {login ? 'Войти' : 'Зарегистрироваться'}
        </span>
      </form>
    </div>
  );
};

export default LoginPopup;