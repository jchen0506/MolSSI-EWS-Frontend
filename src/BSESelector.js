import React, { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BSESelector({ onChange }) {
	const [basis_set, setBasisSet] = React.useState('');

	const handleBasisSetChange = (event) => {
		setBasisSet(event.target.value);
		onChange(event.target.value);
	};

	return (
		<Box sx={{ minWidth: 120 }}>
			<FormControl fullWidth>
				<InputLabel id="BSESelector">Basis Set</InputLabel>
				<Select
					labelId="BSE-select-label"
					id="BSE-select"
					label="Basis Set"
					onChange={handleBasisSetChange}
					value={basis_set}
				>
					<MenuItem value={'aug-pcseg-4'}>aug-pcseg-4</MenuItem>
					<MenuItem value={'aug-cc-pVDZ'}>aug-cc-pVDZ</MenuItem>
				</Select>
			</FormControl>
		</Box>
	);
}
