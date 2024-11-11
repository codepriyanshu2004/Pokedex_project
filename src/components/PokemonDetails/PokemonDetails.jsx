import React from 'react'
import axios from 'axios'
import { useEffect,useState } from 'react'
import { useParams } from 'react-router'
import "./PokemonDetail.css"



function PokemonDetails() {
 

    const {id} = useParams();
    //    console.log(id);

    const [pokemon,setPokemon] =useState({});

       async function downloadPokemon() {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        console.log(response.data);

        setPokemon({
            name:response.data.name,
            image:response.data.sprites.other.dream_world.front_default,
            weight:response.data.weight,
            height:response.data.height,
            types:response.data.types.map((t) => t.type.name)


        })
        
        
    }
       useEffect(() =>{
        downloadPokemon()

       },[])
       

    return (
        <div className='pokemon-details-wrapper'>

            <div className='Pokemon-name'>name: <span>{pokemon.name}</span></div>
            <img className='pokemon-image' src ={pokemon.image}></img>
            <div className='Pokemon-height'>Heigth:{pokemon.height}</div>
            <div className='Pokemon-weight'>Weight:{pokemon.weight} s</div>
      

      <div className='pokemon-types'>
       { pokemon.types && pokemon.types.map((t)  => <div key={t}>  {t} </div>)}
      </div>


        </div>
    )
    



  
}

export default PokemonDetails