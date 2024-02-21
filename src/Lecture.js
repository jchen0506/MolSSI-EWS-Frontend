import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
// import MarkdownIt from 'markdown-it';
import { useData } from './App';

const Lecture = () => {
	const { currentPage, markdownContent, goToNextPage, goToPreviousPage } = useData();
	const isLastPage = currentPage === markdownContent.content.length - 1;

	// Extract and display content without the quiz part for the lecture
	// Assuming quiz content is removed or parsed out in your markdownData setup
	// If quiz data is separate, simply display the page content without the quiz
	const currentPageContent = markdownContent.content[currentPage] || '';
	const contentWithoutQuiz = currentPageContent.replace(/<!-- quiz -->[\s\S]*?<!-- endquiz -->/g, '');

	return (
		<div>
			<div dangerouslySetInnerHTML={{ __html: contentWithoutQuiz }} />
			<Stack spacing={2} direction="row">
				<Button onClick={goToPreviousPage} disabled={currentPage === 0} variant="contained">Go Back</Button>
				<Button onClick={goToNextPage} disabled={isLastPage} variant="contained">Continue</Button>
			</Stack>

		</div>
	);

};
// const Lecture = ({ markdownContent }) => {
// 	const md = new MarkdownIt();
// 	const quizRegex = /<!-- quiz -->([\s\S]*?)<!-- endquiz -->/g;

// 	const markdownWithoutQuizzes = markdownContent.replace(quizRegex, '');
// 	const sections = markdownWithoutQuizzes.split('*****');

// 	const [currentPage, setCurrentPage] = useState(0);

// 	const nextPage = () => {
// 		if (currentPage < sections.length - 1) {
// 			setCurrentPage(currentPage + 1);
// 		}
// 	};

// 	const prevPage = () => {
// 		if (currentPage > 0) {
// 			setCurrentPage(currentPage - 1);
// 		}
// 	};

// 	return (

// 		<div>
// 			{/* Render the content of the current page */}
// 			<div dangerouslySetInnerHTML={{ __html: md.render(sections[currentPage]) }} />

// 			{/* Pagination controls */}
// 			<Stack spacing={2} direction="row">
// 				<Button onClick={prevPage} disabled={currentPage === 0} variant="contained">Go Back</Button>
// 				<Button onClick={nextPage} disabled={currentPage === sections.length - 1} variant="contained">Continue</Button>
// 			</Stack>

// 		</div>
// 	);
// };

export default Lecture;
