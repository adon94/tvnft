import React from 'react'
import Button from '@mui/material/Button';
import styles from './fileInput.module.css'

const FileInput = ({ onChange, value }) => {
  return (
    <div>
      {Boolean(value.length) && (
        <div>Selected files: {value.map(f => f.name).join(", ")}</div>
      )}
      <Button
        variant="contained"
        component="label">
        Upload File
        <input
          type="file"
          hidden
          multiple={false}
          onChange={e => onChange([...e.target.files])} />
      </Button>
    </div>
  )
}

export default FileInput;
