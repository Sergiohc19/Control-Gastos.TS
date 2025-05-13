// src/components/Login.tsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { Link } from 'react-router-dom';

const LoginForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<{ email: string; password: string }>();

  const handleLogin = async (data: { email: string; password: string }) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      alert('Inicio de sesión exitoso');
      window.location.href = '/dashboard';
    } catch (error) {
      if (error instanceof Error) {
        alert('Error al iniciar sesión: ' + error.message);
      } else {
        alert('Error al iniciar sesión');
      }
    }
  };

  return (
    <div className="max-w-sm mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-center">Iniciar Sesión</h2>
      <form onSubmit={handleSubmit(handleLogin)}>
        <input
          type="email"
          placeholder="Email"
          {...register("email", { required: true })}
          className="w-full p-2 border rounded mb-2"
        />
        {errors.email && <p className="text-red-500 text-sm">El email es requerido</p>}

        <input
          type="password"
          placeholder="Contraseña"
          {...register("password", { required: true, minLength: 6 })}
          className="w-full p-2 border rounded mb-4"
        />
        {errors.password && <p className="text-red-500 text-sm">Mínimo 6 caracteres</p>}

        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          Entrar
        </button>
      </form>
      <div className="mt-4 text-center">
        <Link to="/register" className="text-blue-500 hover:underline">
          ¿No tienes cuenta? Regístrate
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;