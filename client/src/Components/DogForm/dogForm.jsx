import React, { useState, useEffect } from 'react';
import NavBar from '../NavBar/NavBar';
import './dogForm.css';
import { useSelector, useDispatch } from 'react-redux';
import { getTemperaments } from '../../Redux/Actions/actions';
import axios from 'axios';

const DogForm = () => {
  const dispatch = useDispatch();
  const temperaments = useSelector((state) => state.temperaments);

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  const [formData, setFormData] = useState({
    name: '',
    weight: '',
    height: '',
    lifespan: '',
    temperaments: [],
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'temperaments') {
      const selectedTemperament = event.target.value;
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: [...prevFormData.temperaments, selectedTemperament],
      }));
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const URL = "http://localhost:3001/dogs";

  const onSubmit = async () => {
    try {
      const { name, weight, height, lifespan, temperaments } = formData;
      const data = await axios.post(URL, {
        name,
        weight,
        height,
        lifespan,
        temperaments,
      });
      console.log('Datos del formulario enviado:', data);
      // Reiniciar el formulario después de un envío exitoso
      setFormData({
        name: '',
        weight: '',
        height: '',
        lifespan: '',
        temperaments: [],
      });
    } catch (error) {
      console.error('Error al enviar el formulario:', error.message);
      // Mostrar un mensaje de error o manejarlo de manera amigable para el usuario
    }
  };

  return (
    <div className="form-container">
      <div className="footer">
        <NavBar />
        <h1 className="title">WikiDogs</h1>
      </div>
      <form onSubmit={onSubmit}>
        <label>
          Nombre:
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </label>

        <label>
          Peso:
          <input type="text" name="weight" value={formData.weight} onChange={handleChange} />
        </label>

        <label>
          Altura:
          <input type="text" name="height" value={formData.height} onChange={handleChange} />
        </label>

        <label>
          Años de vida:
          <input type="text" name="lifespan" value={formData.lifespan} onChange={handleChange} />
        </label>

        <label>
          Temperamentos:
          <select
            name="temperaments"
            value={formData.temperaments || []}
            onChange={handleChange}
            multiple
          >
            {temperaments.map((temp) => (
              <option key={temp.id} value={temp.name}>
                {temp.name}
              </option>
            ))}
          </select>
        </label>

        <button type="submit">Crear Raza</button>
      </form>
    </div>
  );
};

export default DogForm;
