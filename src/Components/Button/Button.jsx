import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export default function ButtonSizes({ handleButtonClick ,title}) {
  return (
    <Box sx={{ '& button': { m: 1 } }}>
   
    <div>
        <Button style={{backgroundColor:"var(--search-button-color)",color:"var(--background-color)"}} variant="contained" size="large"  onClick={handleButtonClick}>
          {title}
        </Button>
      </div>
    </Box>
  );
}