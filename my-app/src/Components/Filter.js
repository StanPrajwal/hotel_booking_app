import { VscSearch } from 'react-icons/vsc';
import { Country, State, City }  from 'country-state-city';
import { useState } from 'react';
import Axios from "axios" 
function Filter({setHotels}) {
    const [country,setCountry] = useState()
    const [states,setStates] = useState()
    const [stateCode,setStateCode]=useState()
    const [cities,setCities] = useState()
    const Countries =  Country.getAllCountries()
    const [anysearch,getAnySearch] = useState()
    const getHotels = (query)=>{
        console.log(query)
        if(query){
            Axios.get(`http://localhost:4000/hotels/query?q=${query}`)
            .then((res)=>{console.log(res)
                if(res.data?.message){
                    console.log(res.data.message)
                    setHotels('')
                }
                if(res.data?.hotels){
                    setHotels(res.data?.hotels)
                }
            })
            .catch((err)=>console.log(err))
        }
       
    }
    const sortBy = (query)=>{
        console.log(query)
        if(query){
            Axios.get(`http://localhost:4000/hotels/sort?q=${query}`)
            .then((res)=>{console.log(res)
                if(res.data?.message){
                    console.log(res.data.message)
                    setHotels('')
                }
                if(res.data?.hotels){
                    setHotels(res.data?.hotels)
                }
            })
            .catch((err)=>console.log(err))
        }
       
    }
    return <div className="filters">
        <label className='search-by'><VscSearch />
            <input
                placeholder='Pincode or city or any..' 
                onChange={(e)=>getAnySearch(e.target.value)}
            />
            <input className='search' type="button" value="Search" onClick={(e)=>{
                console.log(e.target.value)
                getHotels(anysearch)
            }}/>
        </label>
        <select 
            className='country'
            onChange={(e) => {
                let value = e.target.value.split(" ")
                setCountry(value[0])
                setStates(State.getStatesOfCountry(value[0]))
                getHotels(value[1])
            }}
        >
            {Countries && Countries.map((country)=>{
               return   <option 
                            value={`${country.isoCode || country.countryCode} ${country.name}`}
                            key={country.isoCode || country.countryCode}
                        >{country.name}</option>
            })}
            
        </select>
        <select 
            className='state'
            onChange={(e) => {
                let value = e.target.value.split(" ")
                setCities(City.getCitiesOfCountry(country))
                setStateCode(value[0])
                getHotels(value[1])
               
            }}
        >
            <option>State</option>
           {states && states.map(state=>{
            return <option key={`${state.isoCode}`} value={`${state.isoCode} ${state.name}`}>{state.name}</option>
           })} 
        </select>
        <select className='city'
            onChange={(e)=>{
                const {value} = e.target
                getHotels(value)
            }}
        >
            <option>City</option>
            {cities && cities.filter(element => {
                return element.stateCode === stateCode
            }).map((city) => {
                return <option key={city.name}>{city.name}</option>
            })}
        </select>
        <div >
           <label style={{color:"blue"}}>Sort By</label>
            <select className='multiple-filters'
                onChange={(e)=>{
                    const {value} = e.target
                    sortBy(value)
                }}
            >
                <option value="low">Low to High price</option>
                <option value="high">High to Low Price</option>
            </select>
        </div>

    </div>
}
export default Filter