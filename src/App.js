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
import MarkdownIt from 'markdown-it';

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
	const md = new MarkdownIt();
	const markdownFilePath = './dft_tutorial.md';

	useEffect(() => {
		const fetchAndParseMarkdown = async () => {
			try {
				const response = await fetch(markdownFilePath);
				const text = await response.text();
				const content = text.split('*****').map(page => page.trim());
				const quizzes = content.map(page => parseQuiz(page));
				// Use markdown-it to parse each page's content (excluding quizzes if needed)
				const parsedContent = content.map(page => {
					const pageWithoutQuiz = page.replace(/<!-- quiz -->[\s\S]*?<!-- endquiz -->/g, '');
					return md.render(pageWithoutQuiz);
				});
				setMarkdownContent({ content: parsedContent, quizzes });
			} catch (error) {
				console.error("Failed to fetch and parse markdown:", error);
			}
		};
		fetchAndParseMarkdown();
	}, [md]);

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
