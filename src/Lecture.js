import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

function Lecture() {
	return (
		<div>
			<h1>Density Functional Theory</h1>
			<h2>What is The Point of Density Functional Theory?</h2>
			<p>In previous lessons, we have covered the fundamental limitations of Hartree-Fock theory, as well as some of the ways that various post-HF theories systematically improve upon it.  As we have seen, post-HF theories tend to be extremely computationally demanding, and it takes serious effort to apply them to systems with more than a few dozen atoms.
			</p>
			<p>Density Functional Theory (DFT) takes a very different approach to the simulation of quantum properties, with its own set of advantages and disadvantages.  We will talk more about the theory later, but the basic concept is this: instead of trying to systematically improve on mean-field HF theory by calculating specific components of the electron correlation, DFT attempts to approximate the electron correlation with so-called “density functionals”.  These are relatively simple mathematical expressions that are relatively easy to evaluate on a computer.  In most cases, density functionals are not derived directly from approximations to the laws of quantum mechanics - unlike post-HF methods, they are not generally ab initio.  In simplified terms, you can think of “density functionals” as being mathematical equations that perform highly sophisticated guesstimations at a low computational cost.
			</p>
			<Stack spacing={2} direction="row">
				<Button variant="contained">Go Back</Button>
				<Button variant="contained">Continue</Button>
			</Stack>
		</div>
	);
}

export default Lecture;