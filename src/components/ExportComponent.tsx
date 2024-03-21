import { Button } from '@mui/material';
import React, { ChangeEvent } from 'react';
import { useLocalStorage } from "usehooks-ts";

const ExportComponent = () => {
  const [value, setValue] = useLocalStorage('games', []);

  const onChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
    try {
      setValue(JSON.parse(e.currentTarget.value));
    } catch (e) {
      setValue([]);
    }
  }

  return (
    <div>
      <h1>Games history</h1>
      <textarea style={{ width: '100%', height: '150px'}} onChange={onChange} defaultValue={JSON.stringify(value)}></textarea>
    </div>
  );
}

export default ExportComponent;