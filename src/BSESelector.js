import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect() {
	const [bse, setBSE] = React.useState('');

	const handleChange = (event) => {
		setBSE(event.target.value);
	};

	return (
		<Box sx={{ minWidth: 120 }}>
			<FormControl fullWidth>
				<InputLabel id="BSESelector">Basis Set</InputLabel>
				<Select
					labelId="BSE-select-label"
					id="BSE-select"
					value={bse}
					label="Basis Set"
					onChange={handleChange}
				>
					<MenuItem value={'aug-cc-pVDZ'}> aug-cc-pVDZ</MenuItem>
					<MenuItem value={'aug-cc-pVDZ'}>aug-cc-pVDZ</MenuItem>
				</Select>
			</FormControl>
		</Box>
	);
}
