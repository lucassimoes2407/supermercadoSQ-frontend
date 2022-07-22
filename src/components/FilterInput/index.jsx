import { ExpandMore } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Checkbox, Chip, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, Typography } from "@mui/material"
import { Box } from "@mui/system";
import { memo, useCallback, useEffect, useState } from "react";
import './index.css'

/**
 * 
 * @param {string[]} props.items
 * @param {string} props.title
 * @param {string} props.acordeonTitle
 * @param {boolean} props.isAcordeonOpen
 * @param {boolean} props.selectedItems
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
const FilterInput = (props) => {
  const [itemsSelected, setItemsSelected] = useState(props?.selectedItems || []);
  const [items, setItems] = useState(props?.items || []);
  const [acordeonBoolean, setAcordeonBoolean] = useState(props?.isAcordeonOpen || true);

  const updateSelecteds = (selecteds) => {
    props.updateSelecteds(selecteds);
  }

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    const newValue = typeof value === 'string' ? value.split(',') : value;
    setItemsSelected(newValue);
    updateSelecteds(newValue);
  };

  const handleElementDelete = (element) => {
    setItemsSelected((previousValue) => {
      let newValue = previousValue.filter(item => (item !== element));
      updateSelecteds(newValue);
      return newValue;
    });
  }

  useEffect(() => {
    setItems(props.items);
  }, [props.items]);

  useEffect(() => {
    setItemsSelected(props?.selectedItems)
  }, [props.selectedItems]);

  return (
    <Box
      maxWidth={250}
      flexDirection='column'
      alignItems={'center'}
      justifyContent={'center'}
    >
      <FormControl xs={12} sx={{ minWidth: 250, marginBottom: 1 }} size="small">
        <InputLabel id={`demo-multiple-checkbox-label`}>{props?.title}</InputLabel>
        <Select
          labelId={`demo-multiple-checkbox-label`}
          id={`demo-multiple-checkbox`}
          multiple
          value={itemsSelected || []}
          onChange={handleChange}
          input={<OutlinedInput label={props.title} />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
          sx={{ width: '250px' }}
        >
          {items.length > 0 && items.map((item) => (
            <MenuItem key={item + `${props.title}`} value={item}>
              <Checkbox checked={!!itemsSelected && itemsSelected.indexOf(item) > -1} />
              <ListItemText primary={item}/>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Accordion 
        expanded={acordeonBoolean} onChange={() => setAcordeonBoolean((previousValue) => !previousValue)}>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>{props?.acordeonTitle}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ flexWrap: true }}>

            <div className="restriction__chip">
              {itemsSelected && itemsSelected.map((element) => {
                return (
                  <Chip
                    key={element + `${props.title}`}
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

export default memo(FilterInput);