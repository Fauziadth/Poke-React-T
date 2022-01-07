import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export type detailRouteParams = {
    poke_id : string
}

const isNumber = (n : string) => { return /^-?[\d.]+(?:e-?\d+)?$/.test(n); } 

const PokeDetail = () => {
    let params = useParams<detailRouteParams>();

    useEffect(() => {
        if(!params.poke_id || !isNumber(params.poke_id)){
            // CHECK IF NOT VALID ID HERE
        }
        // Fetch for pokemon details here
    }, [])

    return (
        <div>
            Poke Detail 
            {params.poke_id}
        </div>
    );
}

export default PokeDetail;
