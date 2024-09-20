import React, { useState } from 'react'
import '../App.css'


export const useForm = (initialForm={}) => {

//estado
const[formState,setFormState]=useState(initialForm)

//onchange
const onInputChange=({target})=>{
//target props del input    
   const {name,value}=target
    setFormState({
        ...formState, 
    [name]:value
    })
}

//retorna

  return {
    onInputChange,
    ...formState,
    formState
  }
}
