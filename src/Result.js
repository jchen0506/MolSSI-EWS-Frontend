// src/ResultComponent.js
import React, { useState, useEffect } from 'react';

export default function Result() {
	const [result, setResult] = useState({});

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch('http://127.0.0.1:5000/get_data');
				if (response.ok) {
					const data = await response.json();
					setResult(data);
				}
			} catch (error) {
				throw new Error(error.message);
			}
		};
		fetchData();
	}, []);

	return (
		<div>
			{result ? (
				<div>
					<ul id="result-list">
						<li>Final Energy: {result.final_energy}</li>
						<li>Geometry:
							<br />
							{result.geometry}</li>
					</ul>
				</div>
			) : (
				<p>Loading...</p>
			)}
		</div>
	);
};
