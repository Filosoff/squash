import moment from 'moment';
import { Alert, Button, Step, StepContent, StepLabel, Stepper, TextField } from '@mui/material';
import React, { useState } from 'react';
import { Players } from "../utils/statics";
import { Game } from '../utils/types';
import { useLocalStorage } from 'usehooks-ts';

const AddComponent = () => {
  const [games, setGames] = useLocalStorage<Game[]>('games', []);
  const [step, setStep] = useState(0);
  const [success, setSuccess] = useState<string>()
  const [error, setError] = useState<string>()
  const [date, setDate] = useState(moment());
  const [winner, setWinner] = useState<Players | undefined>(undefined);
  const [score, setScore] = useState<number>();

  const nextStep = () => {
    setStep(step + 1);
  }

  const onSaveClick = () => {
    setStep(99);
    if (winner === undefined || !score) {
      setError('Cant touch this!');
      return;
    }

    const record: Game = {
      date: date.format('DD-MM-YYYY'),
      winner,
      score: {
        lose: score,
        win: Math.max(11, score + 2),
      }
    }

    setGames([...games, record]);

    setSuccess('You are awesome!');
  }

  return (
    <div>
      <h1>Add game record</h1>
      { success && (
        <Alert severity="success" sx={{ mb: 2}}>
          { success }
        </Alert>
      ) }
      { error && (
        <Alert severity="error" sx={{ mb: 2}}>
          { error }
        </Alert>
      ) }
      <Stepper activeStep={ step } orientation="vertical">
        <Step key='step1' completed={ step > 0 }>
          <StepLabel>Step 1: Date</StepLabel>
          <StepContent>
            <TextField
              disabled
              label="Date"
              type="text"
              defaultValue={ date.format('DD MMM YYYY') }
              sx={ { mt: 3 } }
            /><br/>
            <Button variant="contained" sx={ { mt: 1 } } size="large" onClick={ nextStep }>Correct</Button>
          </StepContent>
        </Step>
        <Step key='step2' completed={ step > 1 }>
          <StepLabel>Step 2: Winner</StepLabel>
          <StepContent sx={ { mt: 2 } }>
            <Button variant="contained" onClick={ () => {
              setWinner(Players.alfa);
              nextStep();
            } } sx={ { mr: 5 } }>Alfa</Button>
            <Button variant="contained" onClick={ () => {
              setWinner(Players.delta);
              nextStep();
            } }>Delta</Button>
          </StepContent>
        </Step>
        <Step key='step3' completed={ step > 2 }>
          <StepLabel>Step 3: Score</StepLabel>
          <StepContent>
            <TextField
              label="Loser score"
              type="number"
              sx={ { mt: 3 } }
              onChange={ e => setScore(+e.target.value) }
            />
            <br/>
            <Button variant="contained" sx={ { mt: 1 } } size="large" onClick={ onSaveClick }>Save</Button>
          </StepContent>
        </Step>
      </Stepper>
    </div>
  );
}

export default AddComponent;