import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface IList {
  id: number;
  name: string;
}

interface IProps {
  placeholder: string;
  value: string;
  list: IList[];
  // eslint-disable-next-line no-unused-vars
  handleChange: (event: SelectChangeEvent) => void;
}

export default function DropdownList(props: IProps) {
  const { placeholder, value, list, handleChange } = props;

  return (
    <Box sx={{ minWidth: 120, backgroundColor: "#fff" }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{placeholder}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label={placeholder}
          onChange={handleChange}
        >
          {list.map((data) => (
            <MenuItem key={data.id} value={data.name}>
              {data.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
