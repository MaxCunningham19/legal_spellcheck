import React, { useLayoutEffect, useState } from 'react';
import { VictoryPie, VictoryTheme } from "victory"
import { useDocument } from '../hooks/DocumentContext';
import styles from './SideMistakeBar.module.css';

export const SideMistakeBar = () => {
  const [mistakesNumber, setMistakesNumber] = useState(0)
  const [percAccuracy, setPercAccuracy] = useState(100)

  const problemParNum = [14, 23, 9, 5];

  const document = useDocument()

  useLayoutEffect(() => {
    if (document.mistakes !== undefined) computeStatistics()
  }, [document])

  const computeStatistics = () => {
    setMistakesNumber(() => computeMistakeNumber())
    setPercAccuracy(() => computeAccuracy())
  }

  const computeMistakeNumber = () => {
    let sum = 0
    document.mistakes.map((block) => {
      sum += block.mistakes.length
    })
    console.log(sum);
    return sum
  }

  const computeAccuracy = () => {
    let blockScores = []
    document.mistakes.map((block) => {
      switch (block.mistakes.length) {
        case 0:
          blockScores.push(100)
          break;
        case 1:
          blockScores.push(90)
          break;
        case 2:
          blockScores.push(80)
          break;
        case 3:
          blockScores.push(70)
          break;
        case 4:
          blockScores.push(60)
          break;
        case 5:
          blockScores.push(50)
          break;
        default:
          blockScores.push(40)
          break;
      }
    })
    let sum = 0
    blockScores.map((score) => {
      sum += score
    })
    return Math.floor(sum / blockScores.length)
  }

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
                data={[{'key': "", 'y': percAccuracy}, {'key': "", 'y': (100-percAccuracy)} ]}
                colorScale={["#F37A32", "#172f58" ]}
              />
            </div>
            <div className={styles["description-container"]}>
              <div className={styles["description-item"]}>
                <span className={styles["label"]}>MISTAKES</span>
                <span className={styles["data"]}>{mistakesNumber}</span>
              </div>
              <div className={styles["description-item"]}>
                <span className={styles["label"]}>ACCURACY</span>
                <span className={styles["data"]}>{percAccuracy}</span>
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