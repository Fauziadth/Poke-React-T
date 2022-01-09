import React, { Fragment, useEffect, useState } from 'react';
import { Button, Card, Col, Row, Tag } from 'antd';
import { useParams } from 'react-router-dom';
import Loading from '../../component/Loading';
import pokeapi, { getPokeDetails } from '../../services/pokeapi';
import { getColorType } from '../../constant';
import { myPokemonInt, usePokemonContext } from '../../context/MyPokemonContext';
import CatchModal from './CatchModal';
import Modal from 'antd/lib/modal/Modal';
import StatusBar from '../../component/StatusBar';
import { capitalizeName } from '../../utils/utlis';

export type detailRouteParams = {
    poke_id: string
}

const initDetails: getPokeDetails = {
    id: 0,
    name: "",
    sprites: {
        front_default: "",
        back_default: "",
    },
    height: 0,
    weight: 0,
    abilities: [],
    moves: [],
    types: [],
    stats: []
}

const PokeDetail = () => {
    const [isLoading, setLoading] = useState<boolean>(true);
    const [isOpenModal, setOpenModal] = useState<boolean>(false);
    const [pokeDetails, setPokeDetails] = useState<getPokeDetails>(initDetails);
    const { pokemon, setPokemon } = usePokemonContext();

    let params = useParams<detailRouteParams>();

    useEffect(() => {
        if (!params.poke_id) return;
        pokeapi.getPokemonDetail(params.poke_id)
            .then(res => {
                const pokemon: getPokeDetails = res.data.pokemon;
                setPokeDetails(pokemon);
                setLoading(false);
            })
    }, [])

    const catchPoke = (nick: string) => {
        const newPoke: myPokemonInt = {
            img: pokeDetails.sprites.front_default,
            name: pokeDetails.name,
            nickname: nick
        }
        setPokemon([...pokemon, newPoke]);
    }

    if (isLoading) return <Loading />;

    return (
        <Fragment>
            <Row justify='center'>
                <Col>
                    <Row justify='center'>
                        <Col span={24}>
                            <h2 style={{ textAlign: 'center' }}>
                                {capitalizeName(pokeDetails.name)}
                            </h2>
                        </Col>
                        <img style={{ width: "200px" }} src={pokeDetails.sprites.front_default} alt={pokeDetails.name} />
                        <Col span={24} className='flex center'>
                            {pokeDetails.types.map((t, i) => {
                                return <Tag key={i} style={{ margin: "8px" }} color={getColorType(t.type.name)}>{t.type.name}</Tag>
                            })}
                        </Col>
                        <Col span={24} className='flex center'>
                            <h2 style={{ textAlign: 'center' }}>
                                Owned : {pokemon.filter(p => p.name === pokeDetails.name).length}
                            </h2>
                        </Col>
                        <Button style={{ zIndex: 2 }} onClick={() => { setOpenModal(true) }}>
                            Catch
                        </Button>
                    </Row>

                    <Card style={{ marginTop: "-12px", paddingTop: "5px" }}>
                        <Row>
                            <DetailRow label={"weight"} value={`${(pokeDetails.weight / 10).toFixed(1)} kg`}/>
                            <DetailRow label={"height"} value={`${(pokeDetails.height / 10).toFixed(1)} m`}/>
                            <DetailRow label={"ability"} value={`${pokeDetails.abilities.map(ab => ab.ability.name).join(", ")}`}/>
                            <Col span={24}>
                            </Col>
                            <Col span={24}>
                                {pokeDetails.stats.map((s, i) => {
                                    return <StatusBar key={i} stats={s} />
                                })}
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>

            <Modal
                visible={isOpenModal}
                footer={null}
                closable={false}
                destroyOnClose>
                <CatchModal
                    onClose={() => { setOpenModal(false) }}
                    onCatch={catchPoke}
                    pokemon={pokeDetails}
                />
            </Modal>
        </Fragment>
    );
}

interface DetailRowProps{
    label : string,
    value : string | number
}

const DetailRow = ({ label, value }: DetailRowProps) => {

    return (
        <Col span={24}>
            <Row>
                <Col span={6}>
                    {label}
                </Col>
                <Col span={18}>
                    {value}
                </Col>
            </Row>
        </Col>
    )
}

export default PokeDetail;
