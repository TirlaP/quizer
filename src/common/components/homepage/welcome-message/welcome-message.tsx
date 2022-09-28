import React from "react";

export const WelcomeMessage: React.FC = () => {
  return (
    <div className="no-quizzes__welcome">
      <h2>Welcome to Quizer!</h2>
      <p className="no-quizzes__small-text">
        Create a new quiz or check back on the ones that are already created.
      </p>
    </div>
  );
};
