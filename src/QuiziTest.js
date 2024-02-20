import React, { useState, useEffect } from 'react';
import MarkdownIt from 'markdown-it';
import { parseQuiz } from './utilities/quizparser';

const QuizTest = ({ markdownContent }) => {
	const [quizzes, setQuizzes] = useState([]);
	const md = new MarkdownIt({
		html: true, // Enable HTML tags in source
	});

	useEffect(() => {
		const tokens = md.parse(markdownContent, {});
		const quizzes = [];
		let currentQuiz = null;
		let inQuiz = false;
		let currentQuestion = { text: '', options: [], answer: null };
		let quizQuestions = [];

		for (let i = 0; i < tokens.length; i++) {
			const token = tokens[i];

			// Detect the start of a quiz
			if (token.type === 'html_block' && token.content.includes('<!-- quiz -->')) {
				inQuiz = true;
			}
			// Detect the end of a quiz
			else if (token.type === 'html_block' && token.content.includes('<!-- endquiz -->')) {
				// if (currentQuestion) quizQuestions.push(currentQuestion);
				// quizzes.push({ questions: quizQuestions });
				inQuiz = false;
				quizQuestions = [];
				currentQuestion = null;
			}
			// Process questions and options within a quiz
			else if (inQuiz) {
				if (token.type === 'heading_open' && token.tag === 'h2') {
					// If there's an existing question, push it to the quizQuestions array before starting a new one
					if (currentQuestion) quizQuestions.push(currentQuestion);
					currentQuestion = { text: '', options: [], answer: -1 }; // Reset currentQuestion
				}
				else if (token.type === 'inline' && currentQuestion && tokens[i - 1].type === 'paragraph_open') {
					// Capture the question text
					currentQuestion.text = token.content;
				}
				else if (token.type === 'bullet_list_open') {
					// Initialize options array for the current question
					currentQuestion.options = [];
				}
				else if (token.type === 'list_item_open') {
					// Prepare to capture an option
				}
				else if (token.type === 'inline' && currentQuestion && tokens[i - 1].type === 'list_item_open') {
					// Capture an option and determine if it's the correct answer
					const optionText = token.content.trim();
					const isCorrect = optionText.startsWith('(x)');
					const option = isCorrect ? optionText.slice(3).trim() : optionText;
					currentQuestion.options.push(option);
					if (isCorrect) {
						currentQuestion.answer = currentQuestion.options.length - 1; // Save the index of the correct answer
					}
				}
			}
		}

		// Add the last question if it exists
		if (inQuiz && currentQuestion && currentQuestion.text) {
			quizQuestions.push(currentQuestion);
		}
		if (inQuiz) {
			quizzes.push({ questions: quizQuestions });
		}

		setQuizzes(quizzes);
	}, [markdownContent]);

	return (
		<div>
			{quizzes.map((quiz, quizIndex) => (
				<div key={quizIndex}>
					{quiz.questions.map((question, questionIndex) => (
						<div key={questionIndex}>
							<h3>{question.text}</h3>
							<ul>
								{question.options.map((option, optionIndex) => (
									<li key={optionIndex}>
										<label>
											<input type="radio" name={`question_${quizIndex}_${questionIndex}`} value={optionIndex} />
											{option}
										</label>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>
			))}
		</div>
	);
};

export default QuizTest;