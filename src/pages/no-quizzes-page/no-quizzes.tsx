import { Button } from "primereact/button";
import { Card } from "primereact/card";
import React from "react";

import "./no-quizzes.scss";

interface NoQuizzesProps {}

export const NoQuizzes: React.FC<NoQuizzesProps> = ({}) => {
  const Footer = (
    <span>
      <Button
        label="Create quiz"
        icon="pi pi-plus"
        className="no-quizzes__button-create"
      />
    </span>
  );

  return (
    <div className="no-quizzes">
      <div className="no-quizzes__content-wrapper">
        <div className="no-quizzes__welcome">
          <h2>Welcome to Quizer!</h2>
          <p className="no-quizzes__small-text">
            Create a new quiz or check back on the ones that are already
            created.
          </p>
        </div>
        <div className="card--center mt-6">
          <Card title="No quizzes" footer={Footer} className="no-quizzes__card">
            <p
              className="m-0 no-quizzes__small-text"
              style={{ lineHeight: "1.5" }}
            >
              Create your first quiz by using the button below.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};
