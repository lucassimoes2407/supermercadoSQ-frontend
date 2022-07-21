import { Checkbox, Chip, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select } from "@mui/material"
import { Box } from "@mui/system";
import { memo, useEffect, useState } from "react";
import './index.css'

/**
 * 
 * @param {string[]} props.items
 * @param {string} props.title
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
const FilterInputForEdit = (props) => {
  console.log(props)
  const [itemsSelected, setItemsSelected] = useState(props?.selectedItems || []);
  const [items, setItems] = useState(props?.items || []);

  const updateSelecteds = (selecteds) => {
    props.updateSelecteds(selecteds);
  }

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    const newValue = typeof value === 'string' ? value.split(',') : value;
    setItemsSelected(newValue);
    console.log("WWWWWW");
    updateSelecteds(newValue);
  };

  const handleElementDelete = (element) => {
    setItemsSelected((previousValue) => {
      let newValue = previousValue.filter(item => (item !== element));
      console.log("MMMMM")
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
      flexDirection='column'
      alignItems={'center'}
      justifyContent={'center'}
    >
      <FormControl fullWidth xs={12} sx={{ minWidth: 280, marginBottom: 1 }} size="small">
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
        >
          {items.length > 0 && items.map((item) => (
            <MenuItem key={item + `${props.title}`} value={item}>
              <Checkbox checked={!!itemsSelected && itemsSelected.indexOf(item) > -1} />
              <ListItemText primary={item}/>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
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
    </Box>
  )
}

export default memo(FilterInputForEdit);