import React from 'react'



export const cache = {};

export const setCache = (key, data, ttl) => {
    const expiryTime = Date.now() + ttl;
    cache[key] = {data, expiryTime};
}    

export const getCache = (key) => {
    const cached = cache[key];
    if (!cached){
        return null
    }
    if (Date.now() > cached.expiryTime){
        delete cache[key];
        return null;
    }
    return cached.data;
}

