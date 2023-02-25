import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {fetchCards} from "../cards/cards-reducer";
import s from './LearnPage.module.scss'
import {BackPackList} from "../back-pack-list/BackPackList";
import {Title} from "../../common/components/title/Title";
import {RadioGroup} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from '@mui/material/Radio';
import Button from "@mui/material/Button";
import {CardType} from "../../api/cards-api";

const fakeCard = {
    _id: '',
    cardsPack_id: '',
    answer: '',
    question: '',
    grade: 0,
    shots: 0,
    rating: 0,
    user_id: '',
    updated: '',
    questionImg: '',
    cardsCount: 0,
    private: false,
    name: '',
    user_name: '',
    created: '',
    comments: '',
    type: ''
}
const grades = ['Did not know', 'Forgot', 'A lot of thought', 'Confused', 'Knew the answer'];

const getCard = (cards: CardType[]) => {
    const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0);
    const rand = Math.random() * sum;
    const res = cards.reduce((acc: { sum: number, id: number }, card, i) => {
            const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);
            return {sum: newSum, id: newSum < rand ? i : acc.id}
        }
        , {sum: 0, id: -1});

    return cards[res.id + 1];
}

export const LearnPage = () => {
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const [first, setFirst] = useState<boolean>(true);
    const {cards, packName} = useAppSelector(state => state.cards)
    const {cardId} = useParams<{ cardId: string }>()

    const [card, setCard] = useState<CardType>(fakeCard);

    const dispatch = useAppDispatch();
    useEffect(() => {
        if (first) {
            dispatch(fetchCards(cardId));
            setFirst(false);
        }
        if (cards.length > 0) setCard(getCard(cards));
    }, [dispatch, cards, first]);

    const onNext = () => {
        setIsChecked(false);

        if (cards.length > 0) {
            setCard(getCard(cards));
        }
    }

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log((event.target as HTMLInputElement).value);
    };

    return (
        <div className={s.wrapper}>
            <BackPackList className={s.back_list}/>
            <Title title={`Learn "${packName}"`}/>

            <div className={s.question_wrapper}>
                <div className={s.title_wrapper}>
                    <p className={s.question_title}>Question: {card.question} </p>
                    <p>The number of responses to the question: {card.shots}</p>
                </div>
                <div>
                    <Button variant={'contained'} color={'secondary'}
                            onClick={() => setIsChecked(true)}>
                        Show answer</Button>
                </div>

                {isChecked && (
                    <div className={s.answer_wrapper}>
                        <p className={s.answer}>Answer: {card.answer}</p>
                        <p>Rate yourself:</p>
                        <RadioGroup defaultValue={2} onChange={handleRadioChange}>
                            {grades.map((g, i) => (
                                <FormControlLabel key={'grade-' + i} value={i}
                                                  control={<Radio color={'secondary'}/>}
                                                  label={g}/>
                            ))}
                        </RadioGroup>
                        <div>
                            <Button variant={'contained'} color={'secondary'}
                                    onClick={onNext}>next</Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

