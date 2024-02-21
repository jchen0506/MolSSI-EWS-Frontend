import React, { createContext, useContext, useState, useEffect } from 'react';
import './App.css';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import NavBar from './NavBar';
import Lecture from './Lecture';
import Quiz from './Quiz'
import InputForm from './InputForm';
import Result from './Result'
import QuizTest from './QuiziTest1';

import { parseQuiz } from './utilities/quizparser';

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: 'left',
	color: theme.palette.text.secondary,
}));

// Create DataContext
const DataContext = createContext();

export const useData = () => useContext(DataContext);

const DataProvider = ({ children }) => {
	const [currentPage, setCurrentPage] = useState(0);
	const [markdownContent, setMarkdownContent] = useState({ content: [], quizzes: [] });
	const markdownFilePath = './dft_tutorial.md';

	useEffect(() => {
		// Simulate fetching the markdown file, in reality, you would fetch this from your server or public folder
		fetch(markdownFilePath)
			.then((response) => response.text())
			.then((text) => {
				const content = text.split('*****').map((page) => page.trim());
				const quizzes = content.map((page) => parseQuiz(page));

				setMarkdownContent({ content, quizzes });
			});
	}, []);

	const goToNextPage = () => {
		setCurrentPage((prevPage) => Math.min(prevPage + 1, markdownContent.content.length - 1));
	};

	const goToPreviousPage = () => {
		setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
	};

	return (
		<DataContext.Provider value={{ currentPage, goToNextPage, goToPreviousPage, markdownContent }}>
			{children}
		</DataContext.Provider>
	);
};

function App() {

	const [formSubmitted, setFormSubmitted] = useState(false);

	const handlePostSuccess = () => {
		console.log("handlePostSuccess");
		setFormSubmitted(true);
	};

	return (
		<DataProvider>
			<div className="App">
				<NavBar />
				<br />
				<br />
				<Box sx={{ flexGrow: 1 }}>
					<Grid container spacing={2}>
						<Grid item xs={6} md={8}>
							<Item>
								<Lecture />
							</Item>
						</Grid>
						<Grid item xs={6} md={4}>
							<Item><QuizTest /></Item>
						</Grid>
					</Grid>
				</Box>
				<br />
				<br />
				<Box sx={{ flexGrow: 1 }}>
					<Grid container spacing={2}>
						<Grid item xs={6} md={6}>
							<Item>
								<InputForm onPostSuccess={handlePostSuccess} />
							</Item>
						</Grid>
						<Grid item xs={6} md={6}>
							<Item>Result
							</Item>
							<Item>
								{formSubmitted && <Result />}
							</Item>
						</Grid>
					</Grid>
				</Box>
			</div>
		</DataProvider>

	);
}

export default App;
