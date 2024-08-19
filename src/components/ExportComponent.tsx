import React from 'react';
import { useLocalStorage } from "usehooks-ts";
import { TextField, Divider, Button } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2'
import { GameHistory } from "../utils/types";

const ExportComponent = () => {
  const [games, setGames] = useLocalStorage<GameHistory>('games', { });
  const [alfaName, setAlfaName] = useLocalStorage('alfaName', "Alfa");
  const [betaName, setBetaName] = useLocalStorage('betaName', "Beta");

  const onChange = (e) => {
    try {
      setGames(JSON.parse(e.currentTarget.value));
    } catch (e) {
      setGames();
    }
  }

  return (
    <div>
      <Grid container spacing={ 2 } sx={{ mt: 3 }}>
        <Grid xs={ 6 }>
          <TextField
            label="Alfa name"
            type="text"
            value={ alfaName }
            onChange={ e => setAlfaName(e.target.value) }
            fullWidth
          />
        </Grid>
        <Grid xs={ 6 }>
          <TextField
            label="Beta name"
            type="text"
            value={ betaName }
            onChange={ e => setBetaName(e.target.value) }
            fullWidth
          />
        </Grid>
      </Grid>
      <Divider sx={ { my: 3 } }>Import / Export</Divider>
      <TextField
        label="Games Log"
        type="text"
        multiline
        rows={ 5 }
        sx={ { mb: 2 } }
        value={ JSON.stringify(games) }
        onChange={ onChange }
        fullWidth
      />
      <Button variant="contained" onClick={() => {
        navigator.clipboard.writeText(JSON.stringify(games)).then(
          () => {
            alert('Text copied to clipboard');
          },
          () => {
            alert('Cant copy text');
          }
        );
      }}>Copy</Button>
      <Button variant="contained" sx={{ mx: 3}} onClick={async () => {
        const text = await navigator.clipboard.readText();
        try {
          setGames(JSON.parse(text));
        } catch {
          alert('Incorrect data');
        }
      }}>Paste</Button>
      <Button variant="contained" onClick={async () => {
        try {
          await navigator.share({
            title: 'Squash games log',
            text: JSON.stringify(games),
          });
        } catch {
          alert('Cant share');
        }
      }}>Share</Button>
    </div>
  );
}

export default ExportComponent;