import { Button } from "primereact/button";
import { Card } from "primereact/card";
import React from "react";
import { Layout } from "../layout-page/layout";

import "./congratulations.scss";

interface CongratulationsProps {}

export const Congratulations: React.FC<CongratulationsProps> = ({}) => {
  return (
    <div className="take-quiz congratulations button">
      <Layout>
        <div className="flex align-items-center justify-content-center mt-8">
          <Card className="congratulations__card">
            <div className="congratulations__content-wrapper flex flex-column">
              <div className="take-quiz__header flex flex-column align-items-start">
                <h2>Felicitari</h2>
                <span className="flex text-left">
                  Ai reusit sa termini testul
                </span>
              </div>
              <div className="flex flex-column align-items-center justify-content-center">
                <Button
                  label="View your score"
                  className="button__common-style button__congratulations"
                />
              </div>
            </div>
          </Card>
        </div>
      </Layout>
    </div>
  );
};
