import React, { useState } from 'react';
import { VictoryPie, VictoryTheme } from "victory"
import styles from './SideMistakeBar.module.css';

export const SideMistakeBar = () => {
  const numOfMistakes = 55;
  const numOfMistakesPerc = 14;
  const problemParNum = [14, 23, 9, 5];

  return (
    <>
      <div className={styles["container"]}>
        <div className={styles["title-container"]}>Spelling Report</div>
        <div className={styles["body-container"]}>
          <div className={styles["mistakes-statistics"]}>
            <div className={styles["chart-container"]}>
              <VictoryPie
                padAngle={0}
                labelComponent={<span/>}
                innerRadius={80}
                width={200} height={200}
                data={[{'key': "", 'y': numOfMistakesPerc}, {'key': "", 'y': (100-numOfMistakesPerc)} ]}
                colorScale={["#F37A32", "#172f58" ]}
              />
            </div>
            <div className={styles["description-container"]}>
              <div className={styles["description-item"]}>
                <span className={styles["label"]}>MISTAKES</span>
                <span className={styles["data"]}>{numOfMistakes}</span>
              </div>
              <div className={styles["description-item"]}>
                <span className={styles["label"]}>ACCURACY</span>
                <span className={styles["data"]}>{numOfMistakesPerc}</span>
                <span className={styles["percentage"]}>%</span>
              </div>
            </div>
          </div>
          {/* <div className={styles["lists-statistics"]}>

          </div> */}
        </div>
      </div>
    </>
  );
};