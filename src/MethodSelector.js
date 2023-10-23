import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function MethodSelect({ onChange }) {
	const [method, setMethod] = React.useState('');

	const handleMethodChange = (event) => {
		setMethod(event.target.value);
		onChange(event.target.value);
	};

	return (
		<Box sx={{ minWidth: 120 }}>
			<FormControl fullWidth>
				<InputLabel id="methodSelector">Method</InputLabel>
				<Select
					labelId="method-select-label"
					id="method-select"
					onChange={handleMethodChange}
					value={method}
					label="Method"
				>
					<MenuItem value={'HF'}>HF</MenuItem>
					<MenuItem value={'M06'}>M06</MenuItem>
					<MenuItem value={'PBE'}>PBE</MenuItem>
					<MenuItem value={'B3LYP'}>B3LYP</MenuItem>
				</Select>
			</FormControl>
		</Box>
	);
}
