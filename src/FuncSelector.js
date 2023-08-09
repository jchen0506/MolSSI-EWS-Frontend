import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect() {
	const [func, setFunc] = React.useState('');

	const handleChange = (event) => {
		setFunc(event.target.value);
	};

	return (
		<Box sx={{ minWidth: 120 }}>
			<FormControl fullWidth>
				<InputLabel id="funcSelector">Functional</InputLabel>
				<Select
					labelId="func-select-label"
					id="func-select"
					value={func}
					label="Functional"
					onChange={handleChange}
				>
					<MenuItem value={'M06'}>M06</MenuItem>
					<MenuItem value={'PBE'}>PBE</MenuItem>
					<MenuItem value={'B3LYP'}>B3LYP</MenuItem>
				</Select>
			</FormControl>
		</Box>
	);
}
