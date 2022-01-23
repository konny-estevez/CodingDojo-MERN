import React from 'react';
import { Paper, Card, CardContent, Button, TextField } from '@material-ui/core';

export const Examples = () => {
  return <div>
      <Paper elevation={3}>
          <p>Some text here</p>
      </Paper>
      <Card>
        <CardContent>
            <h1>This is content within my card</h1>
        </CardContent>
      </Card>
      <Button>
        Click Me
      </Button>
      <TextField variant="filled"/>
  </div>;
};
