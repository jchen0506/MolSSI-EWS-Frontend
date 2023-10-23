import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import BSESelector from './BSESelector';
import MethodSelector from './MethodSelector';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
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
	const [error, setError] = useState(null);

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
				console.log("post request successfully sent")
				console.log(responseData);
			}
		} catch (error) {
			setError(error);
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
				<Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
					Upload file
					<VisuallyHiddenInput type="file" />
				</Button>
				<br />
				<br />
				<BSESelector onChange={handleBasisSetChange} />
				<TextField
					id="reference"
					label="Set Reference"
					variant="standard"
					onChange={handleReferenceChange}
				/>
				<TextField
					id="freeze_core"
					label="Set freeze_core"
					variant="standard"
					onChange={handleFreezeCoreChange}
				/>
				<MethodSelector onChange={handleMethodChange} />
				<br />
				<Button
					onClick={postData}
					variant="contained">submit
				</Button>
			</div>
		</Box>
	);
}
