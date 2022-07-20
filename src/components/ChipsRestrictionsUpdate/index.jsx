import { Checkbox, Chip, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select } from "@mui/material"
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import './index.css'

/**
 * 
 * @param {string[]} props.items
 * @param {string} props.title
 * @param {(selected: string[]) => void} props.updateSelecteds
 * @param {string[]} props.itemsSelected  
 * @returns filter component
 */

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 48 * 4.5 + 8,
    },
  },
};
const ChipsRestrictionsUpdate = (props) => {
  console.log(props)
  const [itemsSelected, setItemsSelected] = useState(props.itemsSelected || []);
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
      flexDirection='column'
      alignItems={'center'}
      justifyContent={'center'}
    >
      <FormControl  xs={12} sx={{ marginBottom: 1 }} size="small">
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
          sx={{ width: '400px' }}
        >
          {items.length > 0 && items.map((item) => (
            <MenuItem key={item} value={item}>
              <Checkbox checked={itemsSelected.indexOf(item) > -1} />
              <ListItemText primary={item} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
          <Box sx={{ flexWrap: true }}>

            <div className="restriction__chip">
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
            </div>
          </Box>
    </Box>
  )
}

export default ChipsRestrictionsUpdate;