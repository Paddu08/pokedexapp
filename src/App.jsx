import { useEffect, useState } from 'react'

import './App.css'

function App() {
  const [dexData,setDexData]=useState([])
  const getData=async ()=>{
    const data=await fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
    const json=await data.json()
    setDexData(json.results)

  }
  const [currPokemon,setCurrPokemon]=useState(0)

  const [currPokemonData,setCurrPokemonData]=useState([])
  useEffect(()=>{
    getData() // data for 151 pokemon
  },[])
const getCurrPokemon= async ()=>{
  if(!currPokemon)return 
  const data=await fetch(currPokemon.url)
  const json=await data.json()
  setCurrPokemonData(json)

}
 useEffect(()=>{
   getCurrPokemon()// data for selected pokemon
  },[currPokemon])
    console.log(currPokemonData)
  return (
    <div className='Container'>
      <div className='PokemonName'>
      {dexData?.map((pokemon,idx)=>(
        <div className='dexText' key={idx} onClick={()=>setCurrPokemon(dexData[idx])}>{pokemon.name}</div>


      ))}
</div>
<div className='PokedexEntry'>
{!currPokemonData ? (<>Select a pokemon </>):(
  <div>
   <h1>{currPokemonData?.name}</h1>
   <img src={currPokemonData?.sprites?.front_shiny}/>
  
   </div>
)
}

   </div>

    </div>
  )
}

export default App
