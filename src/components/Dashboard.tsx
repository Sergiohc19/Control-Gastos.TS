// src/components/Dashboard.tsx
import React from 'react';
import { Button } from 'react-bootstrap';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

const Dashboard: React.FC = () => {
  const handleLogout = async () => {
    await signOut(auth);
    window.location.href = '/login';
  };

  return (
    <div className="max-w-sm mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-center">¡Bienvenido al Dashboard!</h2>
      <p className="mb-4">Aquí puedes ver tus gastos y presupuestos.</p>
      <Button variant="danger" onClick={handleLogout}>
        Cerrar Sesión
      </Button>
    </div>
  );
};

export default Dashboard;