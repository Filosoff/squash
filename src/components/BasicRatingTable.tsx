import { Card, Divider, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { BasicRating } from "../util/types";

type Props = {
  rating: BasicRating[];
  title: string;
}

const BasicRatingTable = ({ rating, title }: Props) => (
  <Card sx={{ p: 2}}>
    <Typography variant="h6">{title}</Typography>
    <Divider sx={{ my: 0.5 }}/>
    { rating.map(item => (
      <Grid container spacing={ 1.5 } key={ item.name }>
        <Grid xs={ 9 }>{item.name }</Grid>
        <Grid xs={ 3 } sx={{ textAlign: 'right' }}>{ Math.round(item.value as number) }</Grid>
      </Grid>
    )) }
  </Card>
)

export default BasicRatingTable;