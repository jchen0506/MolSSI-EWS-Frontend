import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import BSESelector from './BSESelector';
import MethodSelector from './MethodSelector';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useState } from 'react';

const VisuallyHiddenInput = styled('input')({
	clip: 'rect(0 0 0 0)',
	clipPath: 'inset(50%)',
	height: 1,
	overflow: 'hidden',
	position: 'absolute',
	bottom: 0,
	left: 0,
	whiteSpace: 'nowrap',
	width: 1,
});

export default function FormPropsTextFields({ onPostSuccess }) {
	const [calculation, setCalculation] = useState("optimize");
	const [molecule, setMolecule] = useState("");
	const [basis_set, setBasisSet] = useState("");
	const [freeze_core, setFreezeCore] = useState("");
	const [reference, setReference] = useState("");
	const [method, setMethod] = useState("");

	const handleMoleculeChange = (event) => {
		setMolecule(event.target.value);
	};

	const handleBasisSetChange = (value) => {
		setBasisSet(value);
	};

	const handleReferenceChange = (event) => {
		setReference(event.target.value);
	};

	const handleFreezeCoreChange = (event) => {
		setFreezeCore(event.target.value);
	}

	const handleMethodChange = (value) => {
		setMethod(value);
	}

	const handleMoleculeUpload = (e) => {
		const file = e.target.files[0];
		const reader = new FileReader();

		reader.onload = (event) => {
			const content = event.target.result;
			setMolecule(content);
		};

		reader.readAsText(file);
	};


	const postData = async () => {
		const apiUrl = 'http://127.0.0.1:5000/run_data';
		const inputData = {
			calculation: calculation,
			molecule: molecule,
			basis_set: basis_set,
			freeze_core: freeze_core,
			reference: reference,
			method: method,
		};
		console.log(inputData);
		try {
			const response = await fetch(apiUrl, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(inputData),
			});

			if (response.ok) {
				const responseData = await response.json();
				onPostSuccess();
			}
		} catch (error) {
			throw new Error(error.message);
		}
	}

	return (
		<Box
			component="form"
			sx={{
				'& .MuiTextField-root': { m: 1, width: '60ch' },
			}}
			noValidate
			autoComplete="off"
		>
			<div>
				<TextField
					fullWidth
					id="molecule"
					label="Molecule"
					multiline
					rows={10}
					variant="standard"
					onChange={handleMoleculeChange}
				/>
				<input type="file" onChange={handleMoleculeUpload} />
				<br />
				<br />
				<BSESelector onChange={handleBasisSetChange} />
				<TextField
					id="reference"
					label="Set Reference"
					variant="standard"
					onChange={handleReferenceChange}
				/>
				<FormControl>
					<FormLabel id="freeze-core">Freeze Core</FormLabel>
					<RadioGroup
						aria-labelledby="demo-radio-buttons-group-label"
						defaultValue="true"
						name="radio-buttons-group"
						onChange={handleFreezeCoreChange}
					>
						<FormControlLabel value="True" control={<Radio />} label="True" checked={freeze_core === 'True'} />
						<FormControlLabel value="False" control={<Radio />} label="False"
							checked={freeze_core === 'False'} />
					</RadioGroup>
				</FormControl>
				{/* <TextField
					id="freeze_core"
					label="Set freeze_core"
					variant="standard"
					onChange={handleFreezeCoreChange}
				/> */}
				<MethodSelector onChange={handleMethodChange} />
				<br />
				<Button
					onClick={postData}
					variant="contained">submit
				</Button>
			</div>
		</Box >
	);
}
