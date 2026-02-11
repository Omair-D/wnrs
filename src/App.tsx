import clsx from "clsx";
import React from "react";

import { levelOne, levelThree, levelTwo } from "./assets/levels";
import Card from "./components/card/Card";
import { bigCardStyles } from "./components/card/Card.css";
import CardHistory from "./components/history/CardHistory";
import {
  appStyles,
  levelButtonStyles,
  levelsStyles,
  nextCardButtonStlyes,
  questionStyles,
  selectedLevelStyles,
  titleStyles,
} from "./styles/app.css";

function App() {
  // Use questions in the exact order they are defined in levels.ts
  const levels = {
    levelOne,
    levelTwo,
    levelThree,
  };

  const [gameState] = React.useState(levels);
  const [currLevel, setLevel] = React.useState(Object.keys(levels)[0] as keyof typeof levels);
  const [currCard, setCurrCard] = React.useState(levels[currLevel][0]);
  const [cardHistory, setCardHistory] = React.useState<string[]>([]);

  type levelKey = keyof typeof levels;

  function handleChangeLevel(newLevel: levelKey) {
    setLevel(newLevel);
    if (gameState[newLevel].length === 1) {
      const finalMessage = "You have finished this level!";
      setCurrCard(finalMessage);
    } else {
      setCurrCard(gameState[newLevel][0]);
    }
  }

  const buttons = (Object.keys(levels) as levelKey[]).map((level) => (
    <button
      className={clsx(levelButtonStyles, { [selectedLevelStyles]: level === currLevel })}
      onClick={() => handleChangeLevel(level)}
      key={level}
    >
      {level.split(/(?=[A-Z])/).join(" ")}
    </button>
  ));

  function handleNextCard() {
    const finalMessage = "You have finished this level!";
    if (gameState[currLevel].length === 1) {
      if (currCard === finalMessage) {
        return;
      } else {
        const tempHistory = [currCard, ...cardHistory];
        setCardHistory(tempHistory);
        setCurrCard(finalMessage);
      }
    } else {
      const tempHistory = [currCard, ...cardHistory];
      setCardHistory(tempHistory);
      gameState[currLevel].shift();
      setCurrCard(gameState[currLevel][0]);
    }
  }

  return (
    <div className={appStyles}>
      <div className={levelsStyles}>{buttons}</div>
      <div className={questionStyles}>
        <div className={titleStyles}>❤️wnrs❤️</div>
        <Card styleName={bigCardStyles} question={currCard} />
        <button className={nextCardButtonStlyes} onClick={() => handleNextCard()}>
          next card
        </button>
      </div>
      <CardHistory cardHistory={cardHistory} />
    </div>
  );
}

export default App;
