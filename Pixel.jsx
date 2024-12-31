import React, { useRef, useState } from 'react';

const Pixel = () => {
  const tiger_1 = useRef();
  const width_range = useRef();
  const width_value = useRef();
  const tiger_2 = useRef();
  const height_range = useRef();
  const height_value = useRef();
  const botones = useRef();
  const color_input = useRef();
  const wrapper = useRef();
  
  const [isPainting, setIsPainting] = useState(false); // Estado para el modo de pintura

  const updateGridSize = () => {
    const width = width_range.current.value;
    const height = height_range.current.value;
    width_value.current.textContent = width;
    height_value.current.textContent = height;
  };

  const createGrid = () => {
    const width = parseInt(width_range.current.value, 10);
    const height = parseInt(height_range.current.value, 10);
    const selectedColor = color_input.current.value;

    // Limpiar la cuadrícula anterior
    wrapper.current.innerHTML = '';

    // Crear una nueva cuadrícula
    for (let row = 0; row < height; row++) {
      const rowDiv = document.createElement('div');
      rowDiv.style.display = 'flex';

      for (let col = 0; col < width; col++) {
        const cell = document.createElement('div');
        cell.style.width = '20px';
        cell.style.height = '20px';
        cell.style.border = '1px solid #ccc';
        cell.style.backgroundColor = '#fff';
        cell.style.cursor = 'pointer';

        // Evento de clic para pintar las celdas
        cell.addEventListener('click', () => {
          cell.style.backgroundColor = selectedColor;
        });

        // Evento de mouseDown y mouseMove para pintar manteniendo presionado el botón del ratón
        cell.addEventListener('mousedown', () => {
          setIsPainting(true);
          cell.style.backgroundColor = selectedColor;
        });

        cell.addEventListener('mousemove', () => {
          if (isPainting) {
            cell.style.backgroundColor = selectedColor;
          }
        });

        // Evento de mouseUp para detener la pintura
        cell.addEventListener('mouseup', () => {
          setIsPainting(false);
        });

        rowDiv.appendChild(cell);
      }

      wrapper.current.appendChild(rowDiv);
    }
  };

  const clearGrid = () => {
    wrapper.current.innerHTML = '';
  };

  const togglePaintingMode = () => {
    setIsPainting((prevState) => !prevState);
  };

  return (
    <>
      <h1>Hola Pixel</h1>

      <div className="tiger_1" ref={tiger_1}>
        <label htmlFor="width_range">Grid Width</label>
        <input
          type="range"
          id="width_range"
          ref={width_range}
          min="1"
          max="35"
          onChange={updateGridSize}
        />
        <span id="width_value" ref={width_value}>00</span>

        <div className="tiger_2" ref={tiger_2}>
          <label htmlFor="height_range">Grid Height</label>
          <input
            type="range"
            id="height_range"
            ref={height_range}
            min="1"
            max="35"
            onChange={updateGridSize}
          />
          <span id="height_value" ref={height_value}>00</span>
        </div>

        <div className="botones" ref={botones}>
          <button className="celda" onClick={createGrid}>Create grid</button>
          <button onClick={clearGrid}>Clear grid</button>
          <input type="color" id="color_input" ref={color_input} />
          <button>Erase</button>
          <button 
            className='paint' 
            onClick={togglePaintingMode} // Alterna el modo de pintura
          >
            Paint
          </button>
        </div>

        <div className="wrapper" ref={wrapper} style={{ marginTop: '20px' }}></div>
      </div>
    </>
  );
};

export default Pixel;
