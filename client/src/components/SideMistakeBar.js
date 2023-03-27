import React, { useState } from 'react';
import styles from './SideMistakeBar.module.css';

const SideMistakeBar = () => {
  const numOfMistakes = 55;
  const numOfMistakesPerc = 14;
  const problemParNum = [14, 23, 9, 5];

  const [showMistakeBar, setShowMistakeBar] = useState(false);

  const toggleMistakeBar = () => {
    setShowMistakeBar(!showMistakeBar);
  };

  return (
    <>
      <button className={`${styles.button} ${showMistakeBar ? styles.buttonShifted : ''}`} onClick={toggleMistakeBar}>
        {showMistakeBar ? 'Hide Mistake Bar' : 'Show Mistake bar'}
      </button>
      <div className={`${styles.container} ${showMistakeBar ? styles.show : ''}`}>
        <div className={styles.wrapper}>
          <div className={styles.title}>Mistake Report</div>
        </div>
        <div className={styles.label}>Total number of mistakes:</div>
        <div className={styles.labelNoBold}>{numOfMistakes}</div>
        <div className={styles.label}>Percentage of mistakes:</div>
        <div className={styles.labelNoBold}>{numOfMistakesPerc}%</div>
        <div className={styles.label}>Problem paragraphs:</div>
        <div>
          <div className={styles.labelNoBold}>{problemParNum.join(', ')}</div>
        </div>
        <div className={styles.label}>Most common mistakes:</div>
        <div className={styles.mistakeList}>
          <div className={styles.mistake}>Mistake 1</div>
          <div className={styles.mistake}>Mistake 2</div>
          <div className={styles.mistake}>Mistake 3</div>
        </div>
      </div>
    </>
  );
};

export {SideMistakeBar};