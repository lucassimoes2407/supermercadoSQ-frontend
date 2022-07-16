import { ExpandMore } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Checkbox, Chip, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, Typography } from "@mui/material"
import { Box } from "@mui/system";
import { useEffect, useState } from "react";

/**
 * 
 * @param {string[]} props.items
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
const FilterInput = (props) => {
  const [itemsSelected, setItemsSelected] = useState([]);
  const [items, setItems] = useState(props.items);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setItemsSelected(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleElementDelete = (element) => {
    setItemsSelected((previousValue) => previousValue.filter(item => (item !== element)));
  }

  useEffect(() => {
    props.updateSelecteds(itemsSelected);
  }, [itemsSelected, props]);

  useEffect(() => {
    setItems(props.items);
  }, [props.items]);

  return (
    <Box
      maxWidth={280}
      flexDirection='column'
      alignItems={'center'}
      justifyContent={'center'}
    >
      <FormControl xs={12} sx={{ minWidth: 280, marginBottom: 1 }} size="small">
        <InputLabel id={`demo-multiple-checkbox-label`}>{props.title}</InputLabel>
        <Select
          labelId={`demo-multiple-checkbox-label`}
          id={`demo-multiple-checkbox`}
          multiple
          value={itemsSelected}
          onChange={handleChange}
          input={<OutlinedInput label={props.title} />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
          sx={{ width: '280px' }}
        >
          {items.length > 0 && items.map((item) => (
            <MenuItem key={item} value={item}>
              <Checkbox checked={itemsSelected.indexOf(item) > -1} />
              <ListItemText primary={item} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Accordion >
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>{props.acordeonTitle}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ flexWrap: true }}>

            {itemsSelected.map((element) => {
              return (
                <Chip
                  key={element}
                  onDelete={() => handleElementDelete(element)}
                  label={element}
                  color="primary"
                />
              )
            })}
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  )
}

export default FilterInput;