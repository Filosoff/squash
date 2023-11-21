import { Card } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

const GridRow = ({ label, value }: { label: any, value: any }) => (
  <Card sx={ { p: 1, mb: 0.5 } }>
    <Grid container spacing={ 2 } alignItems="center">
      <Grid xs={ 6 } sx={{ fontWeight: 400}}>{ label }</Grid>
      <Grid xs={ 6 } sx={ { textAlign: 'right' } }>{ value }</Grid>
    </Grid>
  </Card>
)

export default GridRow;