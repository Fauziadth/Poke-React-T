import React, { Fragment, useEffect, useState } from 'react';
import { Button, Input, Modal } from 'antd';
import { getPokeDetails } from '../../services/pokeapi';
import { usePokemonContext } from '../../context/MyPokemonContext';

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

const CatchModal = ({ onClose, onCatch, pokemon }: CatchModalProps) => {
    const [isCatching, setCatching] = useState<boolean>(false);
    const [isCatched, setCatched] = useState<boolean>(false);
    const [nickname, setNickname] = useState<string>("");
    const [nicknameError, setNicknameError] = useState<string>("")

    const { pokemon: myPokemon } = usePokemonContext();

    useEffect(() => {
        setCatching(true);
        setTimeout(() => {
            setCatching(false)
            if (doGacha(0.5)) {
                setCatched(true);
            }
        }, 2000);
    }, []);

    if (isCatching) return (
        <React.Fragment>
            IsCatching
        </React.Fragment>
    )

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

    return (
        <Fragment>
            {isCatched ?
                <Fragment>
                    <div> Catch ! </div>
                    <Input value={nickname} onChange={(e) => {
                        setNickname(e.target.value);
                    }} />
                    {(nicknameError !== "") && (<div>
                        {nicknameError}
                    </div>)}
                </Fragment>
                :
                <div> Failed to catch !</div>
            }
            <Button onClick={isCatched ? thisOnCatch : onClose}>{isCatched ? "Put in my collection" : "Close"}</Button>
        </Fragment>
    )
}

export default CatchModal;
