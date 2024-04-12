import React, { useEffect, useState } from 'react';
import './App.css';
import image from './assets/bg-cafe.jpg';
import starFill from './assets/Star_fill.svg';
import starEmpty from './assets/Star.svg';

function App() {
  const [colorBotones, setColorBotones] = useState({ boton2: '#6e7c80', boton3: '#1B1D1F' });
  const [activeButton, setActiveButton] = useState('boton2'); // Estado para el botón activo por defecto

  const alternarColoresBotones = (button) => {
    setActiveButton(button); // Cambiar el estado del botón activo al hacer clic
    setColorBotones({ boton2: button === 'boton2' ? '#6e7c80' : '#1B1D1F', boton3: button === 'boton3' ? '#6e7c80' : '#1B1D1F' });
    
    if (button == 'boton2') {
      setShowAvailableOnly(false)
    }
    if (button == 'boton3'){
      setShowAvailableOnly(true)
    }
  };

  const [productos, setProductos] = useState([]);
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://raw.githubusercontent.com/devchallenges-io/web-project-ideas/main/front-end-projects/data/simple-coffee-listing-data.json');
        if (!response.ok) {
          throw new Error('Error al obtener los datos');
        }
        const data = await response.json();
        setProductos(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);


  const filteredProductos = showAvailableOnly ? productos.filter(producto => producto.available) : productos;

  return (
    <div className='primera_caja'>
      <img src={image} className="caffe_imagen" alt="Coffe img" />
      <div className='segunda_caja'>
        <div className='contenedor_de_texto imagen_titulo'>
          <h1 className='titulo1'>
            Our collection
          </h1>
          <p className='texto1'>Introducing our Coffee Collection, a selection of unique coffees <br />
            from different roast types and origins, expertly roasted in small <br />
            batches and shipped fresh weekly.
          </p>
        </div>
        <div className='tercera_caja'>
          <div className='cuarta_caja'>
            <div className="boton1">
              <button
                className="boton2"
                style={{ backgroundColor: colorBotones.boton2 }}
                onClick={() => alternarColoresBotones('boton2')} // Llama a la función con el nombre del botón
              >
                All Products
              </button>
              <button
                className="boton3"
                style={{ backgroundColor: colorBotones.boton3 }}
                onClick={() => alternarColoresBotones('boton3')} // Llama a la función con el nombre del botón
              >
                Available Now
              </button>
            </div>
          </div>
          <div className='quinta_caja'>
            {filteredProductos.map(producto => (
              <div key={producto.id} className='productos'>
                <img src={producto.image} className='imagen_producto' />
                {producto.popular && <p className='popular_producto'>{producto.popular} Popular</p>}
                <div className='flexs1'>
                  <span className='nombre_producto'>{producto.name}</span>
                  <button className='precio_producto'>{producto.price}</button>
                </div>
                <div className='flexs2'>
                  {producto.rating > 1 ? (
                    <img src={starFill} className='estrella1'/>
                  ) : (
                    <img src={starEmpty} className='estrella2'/>
                  )}
                  <p className='puntaje'>{producto.rating}</p>
                  {producto.votes ? <p className='votos'>({producto.votes} votes)</p> : <p className='votos'>No ratings</p>}
                  <p className='available'>{!producto.available ? 'Sould out' : ' '}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
