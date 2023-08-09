import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';

export default function ErrorRadios() {
	const [value, setValue] = React.useState('');
	const [error, setError] = React.useState(false);
	const [helperText, setHelperText] = React.useState('Choose wisely');

	const handleRadioChange = (event) => {
		setValue(event.target.value);
		setHelperText(' ');
		setError(false);
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		if (value === 'right') {
			setHelperText('You got it!');
			setError(false);
		} else if (value.includes('wrong')) {
			setHelperText('Sorry, wrong answer!');
			setError(true);
		} else {
			setHelperText('Please select an option.');
			setError(true);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<FormControl sx={{ m: 3 }} error={error} variant="standard">
				<FormLabel id="demo-error-radios">Pop quiz: What is DFT...</FormLabel>
				<RadioGroup
					aria-labelledby="demo-error-radios"
					name="quiz"
					value={value}
					onChange={handleRadioChange}
				>
					<FormControlLabel value="right" control={<Radio />} label="Choice 1" />
					<FormControlLabel value="wrong1" control={<Radio />} label="Choice 2" />
					<FormControlLabel value="wrong2" control={<Radio />} label="Choice 3" />
					<FormControlLabel value="wrong3" control={<Radio />} label="Choice 4" />
				</RadioGroup>
				<FormHelperText>{helperText}</FormHelperText>
				<Button sx={{ mt: 1, mr: 1 }} type="submit" variant="outlined">
					Check Answer
				</Button>
			</FormControl>
		</form>
	);
}
