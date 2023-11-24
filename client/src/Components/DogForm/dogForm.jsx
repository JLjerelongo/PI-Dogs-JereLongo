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
    nombre: '',
    peso_minimo: '',
    peso_maximo: '',
    altura_minima: '',
    altura_maxima: '',
    longevidad: '',
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
  
  const onSubmit = async (event) => {
    try {
      event.preventDefault()
      console.log(formData);
      const { nombre, peso_minimo, peso_maximo, altura_minima, altura_maxima, longevidad, temperaments } = formData;
      const peso = `${peso_minimo} - ${peso_maximo}`;
      const altura = `${altura_minima} - ${altura_maxima}`;

      const data = (await axios.post(URL, {
        nombre,
        peso,
        altura,
        longevidad,
        temperaments,
      })).data
      console.log(data);
      if (data.status) {
        setFormData({
          nombre: '',
          peso_minimo: '',
          peso_maximo: '',
          altura_minima: '',
          altura_maxima: '',
          longevidad: '',
          temperaments: [],
        });
      }
      console.log('Datos del formulario enviado:', data);
      window.alert('Datos del formulario enviado:', data);
      // Reiniciar el formulario después de un envío exitoso
    } catch (error) {
      console.error('Error al enviar el formulario:', error.message);
      window.alert('Error al enviar el formulario:', error.message);
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
          <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} />
        </label>

        <label>
          Altura minima:
          <input type="text" name="altura_minima" value={formData.altura_minima} onChange={handleChange} />
        </label>

        <label>
          Altura maxima:
          <input type="text" name="altura_maxima" value={formData.altura_maxima} onChange={handleChange} />
        </label>

        <label>
          Peso minimo:
          <input type="text" name="peso_minimo" value={formData.peso_minimo} onChange={handleChange} />
        </label>

        <label>
          Peso maximo:
          <input type="text" name="peso_maximo" value={formData.peso_maximo} onChange={handleChange} />
        </label>

        <label>
          Años de vida:
          <input type="text" name="longevidad" value={formData.longevidad} onChange={handleChange} />
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

        <button type='submit' >Crear Raza</button>
      </form>
    </div>
  );
};

export default DogForm;
