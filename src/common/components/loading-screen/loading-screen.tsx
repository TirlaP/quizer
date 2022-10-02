import React from "react";
import { loadingMessages } from "./loading-messages";
import CircleLoader from "react-spinners/CircleLoader";

interface LoadingScreenProps {
  loading: boolean;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ loading }) => {
  return (
    <div className="home-page__loading--center flex-column gap-5">
      {loadingMessages[Math.floor(Math.random() * loadingMessages.length)]}
      <CircleLoader
        size={100}
        color={"#9141F6"}
        loading={loading}
        className="card--center"
      />
    </div>
  );
};
