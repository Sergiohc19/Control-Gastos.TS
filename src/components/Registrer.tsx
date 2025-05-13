// src/components/Register.tsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { Link } from 'react-router-dom';

const RegisterForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleRegister = async (data: any) => {
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      alert('Registro exitoso');
      window.location.href = '/login';
    } catch (error) {
      if (error instanceof Error) {
        alert('Error al registrarte: ' + error.message);
      } else {
        alert('Error al registrarte');
      }
    }
  };

  return (
    <div className="max-w-sm mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-center">Regístrate</h2>
      <form onSubmit={handleSubmit(handleRegister)}>
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

        <button type="submit" className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">
          Crear cuenta
        </button>
      </form>
      <div className="mt-4 text-center">
        <Link to="/login" className="text-blue-500 hover:underline">
          ¿Ya tienes cuenta? Inicia sesión
        </Link>
      </div>
    </div>
  );
};

export default RegisterForm;