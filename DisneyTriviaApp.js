import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const TriviaGame = () => {
  const initialTimer = 15;
  const [triviaQuestions, setTriviaQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(initialTimer);
  const [gameOver, setGameOver] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);

  // Fetch trivia questions from the API on mount
  useEffect(() => {
    fetch("/api/trivia")
      .then((res) => res.json())
      .then((data) => {
        setTriviaQuestions(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching trivia questions: ", error);
        setLoading(false);
      });
  }, []);

  // Timer countdown logic
  useEffect(() => {
    if (!gameOver && timer > 0) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    } else if (timer === 0 && !loading) {
      handleNextQuestion();
    }
  }, [timer, gameOver, loading]);

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    const correct = answer === triviaQuestions[currentQuestionIndex].answer;
    setIsCorrect(correct);
    if (correct) {
      setScore(score + 1);
    }
    setTimeout(() => handleNextQuestion(), 1000);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex + 1 < triviaQuestions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setIsCorrect(null);
      setTimer(initialTimer);
    } else {
      setGameOver(true);
    }
  };

  const handleRestartGame = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setTimer(initialTimer);
    setGameOver(false);
    setIsCorrect(null);
  };

  // Fun animated fireworks background
  const backgroundStyle = {
    background:
      "radial-gradient(circle, rgba(255,215,0,0.6) 10%, rgba(255,69,0,0.6) 30%, rgba(75,0,130,0.6) 50%, rgba(0,0,255,0.6) 70%)",
    backgroundSize: "200% 200%",
    animation: "fireworksBG 5s infinite alternate"
  };

  if (loading) {
    return (
      <div
        className="flex flex-col items-center justify-center min-h-screen p-6 text-white relative overflow-hidden"
        style={backgroundStyle}
      >
        <div className="text-center">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen p-6 text-white relative overflow-hidden"
      style={backgroundStyle}
    >
      <Card className="w-full max-w-xl p-8 shadow-2xl rounded-3xl bg-white bg-opacity-90 text-gray-900 border-4 border-blue-400 relative z-10">
        <CardContent>
          {gameOver ? (
            <div className="text-center animate-fade-in">
              <h2 className="text-4xl font-extrabold mb-4 text-blue-600">
                Game Over!
              </h2>
              <p className="text-xl font-semibold">Your Score: {score}</p>
              <Button
                className="mt-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-blue-500 text-white py-3 px-6 rounded-xl text-lg shadow-md"
                onClick={handleRestartGame}
              >
                Play Again
              </Button>
            </div>
          ) : (
            <div className="text-center animate-fade-in">
              <h2 className="text-3xl font-bold mb-6 text-blue-700">
                {triviaQuestions[currentQuestionIndex].question}
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {triviaQuestions[currentQuestionIndex].options.map((option, index) => (
                  <motion.button
                    key={index}
                    className={`p-4 w-full text-lg font-semibold transition duration-300 rounded-xl shadow-md border-2 ${
                      selectedAnswer === option
                        ? isCorrect
                          ? "bg-green-500 text-white border-green-700"
                          : "bg-red-500 text-white border-red-700"
                        : "bg-gray-200 hover:bg-blue-500 hover:text-white border-gray-300"
                    }`}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleAnswer(option)}
                  >
                    {option}
                  </motion.button>
                ))}
              </div>
              {selectedAnswer !== null && (
                <p className={`mt-4 text-center text-lg font-medium ${isCorrect ? "text-green-500" : "text-red-500"}`}>
                  {isCorrect ? "✅ Correct!" : "❌ Incorrect!"}
                </p>
              )}
            </div>
          )}
        </CardContent>
      </Card>
      <style jsx>{`
        @keyframes fireworksBG {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
};

export default TriviaGame;
