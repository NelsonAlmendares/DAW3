import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Form, Row, Col, Card } from 'react-bootstrap';


function App() {
  // Definir los precios del combustible
  const fuelPrices = {
    regular: 4.05,
    especial: 4.25,
    diesel: 3.96
  };

  // Estado para almacenar el tipo de combustible seleccionado y la cantidad de galones
  const [fuelType, setFuelType] = useState('regular');
  const [gallons, setGallons] = useState(0.05);
  const [total, setTotal] = useState(0.05 * fuelPrices['regular']);

  // Función que se ejecuta cuando se cambia el tipo de combustible
  const handleFuelChange = (e) => {
    const selectedFuel = e.target.value;
    setFuelType(selectedFuel);
    setTotal(gallons * fuelPrices[selectedFuel]);
  };

  // Función que se ejecuta cuando se cambia la cantidad de galones
  const handleGallonsChange = (e) => {
    const selectedGallons = parseFloat(e.target.value);
    setGallons(selectedGallons);
    setTotal(selectedGallons * fuelPrices[fuelType]);
  };

  return (
    <Container className="mt-5">
      <Card className="p-4">
        <h1 className="text-center">Calculadora de Combustible</h1>

        <Form>
          <Row className="mb-3">
            <Col>
              <Form.Group controlId="fuelType">
                <Form.Label>Tipo de combustible</Form.Label>
                <Form.Select value={fuelType} onChange={handleFuelChange}>
                  <option value="regular">Gasolina Regular - $4.05</option>
                  <option value="especial">Gasolina Especial - $4.25</option>
                  <option value="diesel">Diesel - $3.96</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Form.Group controlId="gallons">
                <Form.Label>Cantidad de galones</Form.Label>
                <Form.Control
                  type="number"
                  min="0.05"
                  max="150"
                  step="0.05"
                  value={gallons}
                  onChange={handleGallonsChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Form.Group controlId="total">
                <Form.Label>Monto a pagar ($)</Form.Label>
                <Form.Control
                  type="text"
                  value={total.toFixed(2)}
                  readOnly
                  className="bg-light"
                />
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Card>
    </Container>
  );
}

export default App;