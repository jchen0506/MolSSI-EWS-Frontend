import React, { useState, useEffect } from 'react';
import MarkdownIt from 'markdown-it';

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

		for (const token of tokens) {
			if (token.type === 'html_block' && token.content.includes('<!-- quiz -->')) {
				inQuiz = true;
				currentQuiz = { questions: [] };
			} else if (token.type === 'html_block' && token.content.includes('<!-- endquiz -->')) {
				inQuiz = false;
				quizzes.push(currentQuiz);
				currentQuiz = null;
			} else if (inQuiz && token.type === 'heading_open' && token.tag === 'h2') {
				if (currentQuestion.text) {
					currentQuiz.questions.push(currentQuestion);
					currentQuestion = { text: '', options: [], answer: null };
				}
			} else if (inQuiz && token.type === 'inline' && token.content) {
				if (token.content.startsWith('(x)')) {
					currentQuestion.answer = currentQuestion.options.length;
				}
				currentQuestion.options.push(token.content.replace('(x)', '').trim());
			} else if (inQuiz && token.type === 'heading_close' && token.tag === 'h2') {
				if (currentQuestion.text || currentQuestion.options.length > 0) {
					currentQuiz.questions.push(currentQuestion);
					currentQuestion = { text: '', options: [], answer: null };
				}
			}
			console.log(currentQuiz, currentQuestion, quizzes)
		}

		// Add the last question if it exists
		if (currentQuiz && (currentQuestion.text || currentQuestion.options.length > 0)) {
			currentQuiz.questions.push(currentQuestion);
		}

		setQuizzes(quizzes);
	}, [markdownContent]);

	return (
		<div>
			{quizzes.map((quiz, quizIndex) => (
				<div key={quizIndex}>
					{quiz.questions.map((question, questionIndex) => (
						<div key={questionIndex}>
							<p>{question.text}</p>
							{question.options.map((option, optionIndex) => (
								<label key={optionIndex}>
									<input type="radio" name={`question_${quizIndex}_${questionIndex}`} value={optionIndex} />
									{option}
								</label>
							))}
						</div>
					))}
				</div>
			))}
		</div>
	);
};

export default QuizTest;