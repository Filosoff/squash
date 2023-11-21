import { Box, Button, List, ListItemButton, ListItemText, SwipeableDrawer } from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import { DrawerOptions } from "../util/types";

type Props = {
  value: any;
  label: string;
  options?: DrawerOptions[];
  onChange: Dispatch<SetStateAction<any>>
}

const DrawerToggle = ({ label, options, onChange, value }: Props) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const handleClick = (value: any) => {
    onChange(value);
    setIsDrawerOpen(false);
  }

  return (
    <Box sx={ { borderBottom: 1, borderColor: 'divider', mb: 2 } }>
      <Button onClick={() => setIsDrawerOpen(true)}>{ label }</Button>
      <SwipeableDrawer
        anchor="left"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onOpen={() => setIsDrawerOpen(true)}
      >
        <List component="nav">
          { options?.map(option => (
            <ListItemButton

              key={option.value}
              selected={option.value === value}
              onClick={() => handleClick(option.value)}
            >
              <ListItemText primary={ option.label } />
            </ListItemButton>
          ))}

        </List>
      </SwipeableDrawer>
    </Box>
  )
}

export default DrawerToggle;