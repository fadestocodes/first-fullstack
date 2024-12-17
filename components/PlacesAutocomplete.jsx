'use client'

import React, { useState, useRef, useEffect } from 'react';
import { useLoadScript, Autocomplete } from '@react-google-maps/api';
import {  FormHelperText } from '@mui/material';
import {Input} from '@/components/ui/input'
import {Button} from '@/components/ui/button'
import {X} from 'lucide-react'

const libraries = ['places'];

function getCountryFlag(countryCode) {
    if (!countryCode || countryCode === 'ZZ') return '🌍';
    return countryCode
        .toUpperCase()
        .split('')
        .map(char => String.fromCodePoint(127397 + char.charCodeAt(0)))
        .join('');
}

export const PlacesAutocomplete = () => {
    const [selectedData, setSelectedData] = useState({
        country: '',
        countryCode : '',
        name : '',
        emoji : ''
    });
    const [error, setError] = useState('');
    const [query, setQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);


    useEffect(()=>{
        if (selectedData) {
            console.log('selectedData updated:', selectedData);
        }
      
    },[selectedData])

    const handleQueryChange = async (event) => {
        const query = event.target.value;
        setQuery(query);
        if (!query){
            setSearchResults([]);
            return
        }
        try {
            const response = await fetch(`http://localhost:3000/api/google-places?query=${query}`);
            const data = await response.json();
            console.log('data is ', data);
            if (data.error){
                setError(data.error)
            } else {

                setSearchResults(data.predictions || []);
                setError('');
            }
        } catch (err){
            setError('No results')
        }
    }

    const handlePlaceSelect = (place) => {
        setSelectedData(place); // Store selected place details
        setQuery(place.name);   // Update input field with the selected place name
        setSelectedData({
            emoji : getCountryFlag(place.countryCode)
        });
        setSearchResults([]);
        setError('')
        console.log('selected data is ', selectedData);
    console.log('the place is ',place);
    console.log('the country is ',place.country);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!selectedData) {
            setError('You need to pick a valid location!');
        } else if (query===''){
            setError('You need to pick a valid location!')
        } else {
            console.log('Selected place details:', selectedData);
        }
    };

    const clearSearch = (event) => {
        event.preventDefault();
        setSelectedData({
            country: '',
        countryCode : '',
        name : '',
        emoji : ''
        });
        setError('');
        setQuery('');
        setSearchResults([]);


    }

    return (
        <div>
        <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
            <Input
                type="text"
                value={query}
                onChange={handleQueryChange}
                className="w-auto"
                placeholder="Say hi from: "
            />
            <Button variant='outline' className='w-14' onClick={clearSearch}  ><X className='text-gray-400 '/></Button>
            {error && <div className="text-red-500">{error}</div>}
            
            <Button variant="outline" type="submit" className='w-20'>Submit</Button>
        </form>

        {searchResults.length > 0 && (
                <ul className="mt-2 border border-gray-300 rounded shadow-md bg-white">
                    {searchResults.map((result, index) => (
                        <li
                            key={index}
                            onClick={() => handlePlaceSelect(result)} // Make it clickable
                            className="p-2 cursor-pointer hover:bg-gray-200"
                        >
                            {result.name}
                        </li>
                    ))}
                </ul>
        )}
    </div>
);
};

