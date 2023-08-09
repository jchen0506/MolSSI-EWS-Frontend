import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import BasicSelect from './BSESelector';
import FuncSelector from './FuncSelector';
import Button from '@mui/material/Button';

export default function FormPropsTextFields() {
	return (
		<Box
			component="form"
			sx={{
				'& .MuiTextField-root': { m: 1, width: '25ch' },
			}}
			noValidate
			autoComplete="off"
		>
			<div>
				<TextField
					disabled
					id="standard-multiline-static"
					label="Molecule"
					multiline
					rows={2}
					defaultValue="molecule {
						0 1
							H 0.0 0.0 0.0
							Cl 1.0 0.0 0.0
					}
					"
					variant="standard"
				/>
				<BasicSelect />
				<TextField
					id="reference"
					label="Set Reference"
					variant="standard"
				/>
				<TextField
					id="freeze_core"
					label="Set freeze_core"
					variant="standard"
				/>
				<FuncSelector />
				<br />
				<Button variant="contained">submit</Button>
			</div>
		</Box>
	);
}
