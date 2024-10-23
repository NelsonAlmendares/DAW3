// src/App.js
import React, { useState } from 'react';
import { Container, Form, Button, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [empleados, setEmpleados] = useState([]);
  const [nombre, setNombre] = useState('');
  const [sueldoBase, setSueldoBase] = useState('');

  const handleAgregarEmpleado = (e) => {
    e.preventDefault();

    // Validaciones básicas
    if (!nombre || !sueldoBase || isNaN(sueldoBase) || sueldoBase <= 0) {
      alert('Por favor, ingresa un nombre y un sueldo válido.');
      return;
    }

    const ISSS = (7.3 / 100) * sueldoBase;
    const Renta = (11 / 100) * sueldoBase;
    const AFP = (5.1 / 100) * sueldoBase;
    const descuentos = ISSS + Renta + AFP;
    const sueldoNeto = sueldoBase - descuentos;

    const nuevoEmpleado = {
      nombre,
      sueldoBase: parseFloat(sueldoBase).toFixed(2),
      ISSS: ISSS.toFixed(2),
      Renta: Renta.toFixed(2),
      AFP: AFP.toFixed(2),
      sueldoNeto: sueldoNeto.toFixed(2),
    };

    setEmpleados([...empleados, nuevoEmpleado]);
    setNombre('');
    setSueldoBase('');
  };

  return (
    <Container>
      <h1 className="my-4">Cálculo del sueldo neto de empleados</h1>
      <Form onSubmit={handleAgregarEmpleado}>
        <Form.Group className="mb-3">
          <Form.Label>Nombre del empleado</Form.Label>
          <Form.Control
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ingresa el nombre del empleado"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Sueldo base</Form.Label>
          <Form.Control
            type="number"
            value={sueldoBase}
            onChange={(e) => setSueldoBase(e.target.value)}
            placeholder="Ingresa el sueldo base"
            required
            min="0"
            step="0.01"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Calcular sueldo neto
        </Button>
      </Form>

      <h2 className="mt-5">Lista de empleados</h2>
      {empleados.length > 0 && (
        <Table striped bordered hover className="mt-3">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Sueldo Base</th>
              <th>ISSS (7.3%)</th>
              <th>Renta (11%)</th>
              <th>AFP (5.1%)</th>
              <th>Sueldo Neto</th>
            </tr>
          </thead>
          <tbody>
            {empleados.map((empleado, index) => (
              <tr key={index}>
                <td>{empleado.nombre}</td>
                <td>${empleado.sueldoBase}</td>
                <td>${empleado.ISSS}</td>
                <td>${empleado.Renta}</td>
                <td>${empleado.AFP}</td>
                <td>${empleado.sueldoNeto}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default App;
