import React, { useEffect, useState } from 'react';
import { Button, Tag } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../../component/Loading';
import pokeapi, { getPokeDetails } from '../../services/pokeapi';
import { BASENAME, getColorType } from '../../constant';
import { myPokemonInt, usePokemonContext } from '../../context/MyPokemonContext';
import CatchModal from './CatchModal';
import Modal from 'antd/lib/modal/Modal';

export type detailRouteParams = {
    poke_id : string
}

const initDetails : getPokeDetails = {
    id: 0,
    name: "",
    sprites: {
        front_default: "",
        back_default: "",
    },
    moves: [],
    types: [],
    stats: []
}

const PokeDetail = () => {
    const [isLoading, setLoading] = useState<boolean>(true);
    const [isOpenModal, setOpenModal] = useState<boolean>(false);
    const [pokeDetails, setPokeDetails] = useState<getPokeDetails>(initDetails);
    const navigate = useNavigate();
    const { pokemon, setPokemon } = usePokemonContext();

    let params = useParams<detailRouteParams>();

    useEffect(() => {
        if(!params.poke_id) return;
        pokeapi.getPokemonDetail(params.poke_id)
        .then(res => {
            const pokemon : getPokeDetails = res.data.pokemon;
            setPokeDetails(pokemon);
            setLoading(false);
        })
    }, [])

    const catchPoke = (nick : string) => {
        const newPoke : myPokemonInt = {
            img : pokeDetails.sprites.front_default,
            name : pokeDetails.name,
            nickname : nick
        }
        setPokemon([...pokemon, newPoke]);
    }

    if (isLoading) return (
        <div>
            Poke Detail 
            <Button onClick={() => {navigate(`${BASENAME}/`)}}>
                Back
            </Button>
            <Loading/>
        </div>
    );

    return (
        <div>
            Poke Detail 
            <Button onClick={() => {navigate(`${BASENAME}/`)}}>
                Back
            </Button>
            <div>
                <img src={pokeDetails.sprites.front_default} alt={pokeDetails.name}/>
                {pokeDetails.name}
                {pokeDetails.types.map((t, i) => {
                    return <Tag color={getColorType(t.type.name)}>{t.type.name}</Tag>
                })}
                {pokeDetails.stats.map((s, i) => {
                    return <div key={i}>{`${s.stat.name} ${s.base_stat}`}</div>
                })}
                <Button onClick={() => {setOpenModal(true)}}>
                    Catch
                </Button>
            </div>
            
            <Modal
                visible={isOpenModal}
                footer={null}
                closable={false}
                destroyOnClose>
                <CatchModal
                    onClose={() => {setOpenModal(false)}}
                    onCatch={catchPoke}
                    pokemon={pokeDetails}
                />
            </Modal>
        </div>
    );
}

export default PokeDetail;
