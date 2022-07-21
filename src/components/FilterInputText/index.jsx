import { Add, ExpandMore } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Button, Checkbox, Chip, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, TextField, Typography } from "@mui/material"
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import './index.css'

/**
 * 
 * @param {string} props.title
 * @param {string} props.acordeonTitle
 * @param {(selected: string[]) => void} props.updateSelecteds
 * @returns filter component
 */

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 48 * 4.5 + 8,
    },
  },
};
const FilterInputText = (props) => {
  const [items, setItems] = useState([]);
  const [textInput, setTextInput] = useState('');
  const [acordeonBoolean, setAcordeonBoolean] = useState(true);

  const handleElementDelete = (element) => {
    console.log(element);
    setItems((previousValue) => previousValue.filter(item => (item !== element)));
  }

  const handleTextInputChange = (event) => {
    setTextInput(event.target.value)
  }

  const handleAddButton = () => {
    if(!textInput) return;
    if(items.includes(textInput)) return;
    setItems(previousValue => [...previousValue, textInput])
    setTextInput('');
  }
  
  
  useEffect(() => {
    props.updateSelecteds(items);
  }, [items, props]);

  return (
    <Box
      maxWidth={280}
      flexDirection='column'
      alignItems={'center'}
      justifyContent={'center'}
    >
      <FormControl xs={12} sx={{ minWidth: 280, marginBottom: 1, flexDirection: 'row' }} size="small">
        <TextField 
            id="outlined-basic"
            label={props.title}
            variant="outlined"
            size="small"
            value={textInput}
            onChange={handleTextInputChange}
            />
        <Button
          variant="contained"
          onClick={handleAddButton}
          color="primary"
        >
            <Add />
        </Button>
        
      </FormControl>
      <Accordion 
      expanded={acordeonBoolean} onChange={() => setAcordeonBoolean((previousValue) => !previousValue)}
      >
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>{props.acordeonTitle}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ flexWrap: true }}>

            <div className="restriction__chip">
              {items.map((element) => {
                return (
                  <Chip
                    key={element + `filterInputTextChip`}
                    onDelete={() => handleElementDelete(element)}
                    label={element}
                    color="primary"
                  />
                )
              })}
            </div>
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  )
}

export default FilterInputText;