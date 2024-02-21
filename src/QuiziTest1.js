import React, { useState, useEffect } from 'react';
import MarkdownIt from 'markdown-it';
import { parseQuiz } from './utilities/quizparser';
import { useData } from './App'; // Adjust import based on actual file structure

const QuizTest = () => {
	const { currentPage, markdownContent } = useData();
	const [userAnswers, setUserAnswers] = useState({});

	useEffect(() => {
		const currentQuiz = markdownContent.quizzes[currentPage];
		if (currentQuiz && currentQuiz.length > 0) {
			setUserAnswers(currentQuiz.reduce((acc, quiz) => {
				acc[quiz.id] = null; // Initialize selection for each quiz as null
				return acc;
			}, {}));
		}
	}, [currentPage, markdownContent.quizzes]);

	const handleOptionChange = (quizId, optionIndex) => {
		setUserAnswers(prevAnswers => ({
			...prevAnswers,
			[quizId]: optionIndex,
		}));
	};

	// Only render if the current page contains quizzes
	const currentQuiz = markdownContent.quizzes[currentPage];
	// Only render if the current page has a quiz
	if (!currentQuiz || currentQuiz.length === 0) {
		return null;
	}

	return (
		<form>
			{currentQuiz.map((quiz) => (
				<div key={quiz.id}>
					<h2>{quiz.question}</h2>
					{quiz.options.map((option, index) => (
						<div key={index}>
							<label>
								<input
									type="radio"
									name={`question_${quiz.id}`}
									value={index}
									checked={userAnswers[quiz.id] === index}
									onChange={() => handleOptionChange(quiz.id, index)}
								/>
								{option}
							</label>
						</div>
					))}
				</div>
			))}
		</form>
	);
};

// const QuizTest = ({ markdownContent }) => {
// 	const [quizzes, setQuizzes] = useState([]);
// 	const md = new MarkdownIt({
// 		html: true, // Enable HTML tags in source
// 	});

// 	const [userAnswers, setUserAnswers] = useState(quizzes.reduce((acc, quiz) => {
// 		acc[quiz.id] = null; // Initialize selection for each quiz as null
// 		return acc;
// 	}, {}));

// 	useEffect(() => {
// 		const tokens = md.parse(markdownContent, {});
// 		const parsedQuizzes = parseQuiz(markdownContent);
// 		setQuizzes(parsedQuizzes);
// 	}, []);

// 	// Handle option selection
// 	const handleOptionChange = (quizId, optionIndex) => {
// 		setUserAnswers({
// 			...userAnswers,
// 			[quizId]: optionIndex,
// 		});
// 	};

// 	return (
// 		<form>
// 			{quizzes.map((quiz) => (
// 				<div key={quiz.id}>
// 					<h2>{quiz.question}</h2>
// 					{quiz.options.map((option, index) => (
// 						<div key={index}>
// 							<label>
// 								<input
// 									type="radio"
// 									name={`question_${quiz.id}`}
// 									value={index}
// 									checked={userAnswers[quiz.id] === index}
// 									onChange={() => handleOptionChange(quiz.id, index)}
// 								/>
// 								{option}
// 							</label>
// 						</div>
// 					))}
// 				</div>
// 			))}
// 		</form>
// 	);
// }

export default QuizTest;