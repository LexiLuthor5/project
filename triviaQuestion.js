import React from 'react';

const TriviaQuestion = ({ question, onAnswer, answered, onNext }) => {
  const { question: triviaQuestion, correct_answer, incorrect_answers } = question;

  const allAnswers = [...incorrect_answers, correct_answer].sort(() => Math.random() - 0.5);

  return (
    <div>
      <h2>{triviaQuestion}</h2>
      <div>
        {allAnswers.map((answer, index) => (
          <button
            key={index}
            onClick={() => onAnswer(answer === correct_answer)}
            disabled={answered}
          >
            {answer}
          </button>
        ))}
      </div>
      {answered && <button onClick={onNext}>Next Question</button>}
    </div>
  );
};

export default TriviaQuestion;
