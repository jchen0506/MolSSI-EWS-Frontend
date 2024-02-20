// import MarkdownIt from 'markdown-it';

// const md = new MarkdownIt();

export function parseQuiz(markdown) {
	const quizRegex = /<!-- quiz -->([\s\S]*?)<!-- endquiz -->/g;
	const questionRegex = /##\s+(.*?)\n/g;
	const optionRegex = /-\s+\((.)\)\s+(.*)/g;

	let quizzes = [];
	let quizId = 1; // Initialize quiz ID
	let quizMatch;

	while ((quizMatch = quizRegex.exec(markdown)) !== null) {
		const quizContent = quizMatch[1];
		let questionMatch;

		while ((questionMatch = questionRegex.exec(quizContent)) !== null) {
			const questionText = questionMatch[1];
			let options = [];
			let answerIndex = null;
			let optionMatch;

			let questionContent = quizContent.slice(questionMatch.index);
			let nextQuestionIndex = questionContent.indexOf("##", 2);
			if (nextQuestionIndex !== -1) {
				questionContent = questionContent.slice(0, nextQuestionIndex);
			}

			let optionCounter = 0;
			while ((optionMatch = optionRegex.exec(questionContent)) !== null) {
				const isCorrect = optionMatch[1] === 'x';
				const optionText = optionMatch[2];
				options.push(optionText);
				if (isCorrect) {
					answerIndex = optionCounter;
				}
				optionCounter++;
			}

			quizzes.push({
				id: quizId++,
				question: questionText,
				options: options,
				answer: answerIndex
			});
		}
	}

	return quizzes;
}



// console.log(parseQuiz(markdownContent));