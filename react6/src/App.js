import React, { useReducer } from 'react';
import "./App.css";
import { useForm } from './hooks/useForm';

// InitalState
const initialState = [{
  id: new Date().getTime(),
  tarea: "explicar Reducer",
  finalizada: false
}];

// REDUCER
const tareaReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case "Agregar tarea": {
      return [...state, action.payload];
    }
    case "Finalizar tarea": {
      return state.map(tarea => {
        if (tarea.id === action.payload) {
          return {
            ...tarea,
            finalizada: !tarea.finalizada
          };
        }
        return tarea;
      });
    }
    case "Borrar tarea": {  
      return state.filter((tarea) => tarea.id !== action.payload);
    }
    default: return state;
  }
};

export const App = () => {
  // usereducer
  const [tareaState, dispatch] = useReducer(tareaReducer, initialState);

  // useform, custom hooks
  const {
    onInputChange,
    tarea,
  } = useForm({ tarea: "" });

  // onsubmit  
  const agregarTareaForm = (event) => {
    event.preventDefault();
    const nuevaTarea = {
      id: new Date().getTime(),
      tarea: tarea,
      finalizada: false
    };

    const action = {
      type: "Agregar tarea",
      payload: nuevaTarea
    };

    dispatch(action);
  }

  // finalizar tarea
  const finalizarTarea = ({ id }) => {
    const action = {
      type: "Finalizar tarea",
      payload: id
    };
    dispatch(action);
  }

  // borrar tarea
  const borrarTarea = (id) => {
    const action = {
      type: "Borrar tarea",
      payload: id
    };
    dispatch(action);
  };

  return (
    <>
      <h1>Lista Tareas</h1>
      <form onSubmit={agregarTareaForm}>
        <label>Tarea</label>
        <br />
        <input 
          type='text'
          placeholder='Agregar Tarea'
          name='tarea'
          value={tarea}
          onChange={onInputChange}
        />
        <br />
        <button type='submit'>Agregar</button>
      </form>
      <ul className='lista'>
        {tareaState.map(item => (
          <li key={item.id}>
            {item.tarea}
            <input 
              type='checkbox'
              checked={item.finalizada}
              onChange={() => finalizarTarea({ id: item.id })}
            />
            <button onClick={() => borrarTarea(item.id)}>Borrar</button>
          </li>
        ))}
      </ul>
    </>
  );
}
