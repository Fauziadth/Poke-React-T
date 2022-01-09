import React, { Fragment, useEffect, useState } from 'react';
import { Alert, Button, Input } from 'antd';
import { getPokeDetails } from '../../services/pokeapi';
import { usePokemonContext } from '../../context/MyPokemonContext';
import pokeball from '../../img/pokeball-icon.png'
import { capitalizeName } from '../../utils/utlis';

export type CatchModalProps = {
    onClose: () => void;
    onCatch: (nick: string) => void;
    pokemon: getPokeDetails
}

const doGacha = (rate: number) => {
    var d = Math.random();
    if (d <= rate) return true;
    else return false;
}

const wiggleTime = 1250;
const getWiggleCount = () => {
    return Math.floor(Math.random() * 2.5) + 1;
}

const CatchModal = ({ onClose, onCatch, pokemon }: CatchModalProps) => {
    const [isCatching, setCatching] = useState<boolean>(false);
    const [isCatched, setCatched] = useState<boolean>(false);
    const [nickname, setNickname] = useState<string>("");
    const [nicknameError, setNicknameError] = useState<string>("")

    const { pokemon: myPokemon } = usePokemonContext();

    useEffect(() => {
        setCatching(true);
        const successCatch = doGacha(0.5);
        const wiggleCount = successCatch ? 3 : getWiggleCount();
        setTimeout(() => {
            setCatching(false)
            setCatched(successCatch);
        }, wiggleCount * wiggleTime);
    }, []);


    const thisOnCatch = () => {
        if (nickname === "") {
            setNicknameError("Nickname cannot be empty");
        } else if (myPokemon.findIndex(poke => (poke.nickname === nickname)) !== -1) {
            setNicknameError("Pokemon with this nickname already exist");
        } else {
            setNicknameError("");
            onCatch(nickname);
            onClose();
        }
    }

    if (isCatching) return (
        <div className='flex center'>
            <img className={"pokeball"} src={pokeball} alt={'Pokeball'} />
        </div>
    )

    return (
        <Fragment>
            {isCatched ?
                <Fragment>
                    <div className='flex center'><h2>Gotcha !</h2></div>
                    <Input 
                        placeholder='Give it a nickname'
                        value={nickname} 
                        onChange={(e) => {
                        setNickname(e.target.value);
                    }} />
                    {(nicknameError !== "") &&
                        <Alert message={nicknameError} type="error" />
                    }
                </Fragment>
                :
                <div className='flex center'><h2>{`${capitalizeName(pokemon.name)} has fled !`}</h2></div>
            }
            <div className='flex center' style={{marginTop : "15px"}}>
                <Button onClick={isCatched ? thisOnCatch : onClose}>{isCatched ? "Put in my collection" : "Search for more"}</Button>
            </div>
        </Fragment>
    )
}

export default CatchModal;
