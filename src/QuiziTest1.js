import React, { useState, useEffect, useRef } from 'react';
import MarkdownIt from 'markdown-it';
import { parseQuiz } from './utilities/quizparser';
import { useData } from './App'; // Adjust import based on actual file structure

const QuizTest = () => {
	const { currentPage, markdownContent } = useData();
	const [userAnswers, setUserAnswers] = useState({});
	const currentQuiz = markdownContent.quizzes[currentPage];
	const [checkedAnswers, setCheckedAnswers] = useState(false);
	const prevPageRef = useRef(currentPage);


	useEffect(() => {
		// Reset userAnswers only when navigating to a new page
		if (prevPageRef.current !== currentPage && currentQuiz) {
			setUserAnswers(currentQuiz.reduce((acc, quiz) => {
				acc[quiz.id] = null; // Initialize selection for each quiz as null
				return acc;
			}, {}));
		}
		prevPageRef.current = currentPage;
		setCheckedAnswers(false);
	}, [currentPage, currentQuiz]);

	const handleOptionChange = (quizId, optionIndex) => {
		setUserAnswers((prevUserAnswers) => ({
			...prevUserAnswers,
			[quizId]: optionIndex
		}));
	};

	const checkAnswers = () => {
		setCheckedAnswers(true);
	};

	const getOptionStyle = (quizId, optionIndex) => {

		if (checkedAnswers && userAnswers[quizId] !== undefined) {
			const correctOption = currentQuiz.find(quiz => quiz.id === quizId).correctOption;
			return userAnswers[quizId] === correctOption ? 'green' : 'red';
		}
		return '';
	};

	// Only render if the current page contains quizzes
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
							<label style={{ color: getOptionStyle(quiz.id, index) }}>
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
					{checkedAnswers && (
						<div>Correct answer: {quiz.options[quiz.correctOption]}</div>
					)}
				</div>
			))}
			<button type="button" onClick={checkAnswers}>Check Answers</button>
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