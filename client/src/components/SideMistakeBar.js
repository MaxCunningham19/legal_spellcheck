import React, { useEffect, useLayoutEffect, useState } from 'react';
import { VictoryPie, VictoryTheme } from "victory"
import { Button } from './Button'
import { ReactComponent as CloseIcon } from "../icons/close.svg"
import { ReactComponent as MenuIcon } from "../icons/menu.svg"
import { useDocument } from '../hooks/DocumentContext';
import styles from './SideMistakeBar.module.css';

export const SideMistakeBar = ({ isCompact, toggleMode }) => {

  const [mistakesNumber, setMistakesNumber] = useState(0)
  const [percAccuracy, setPercAccuracy] = useState(100)
  const [blockScores, setBlockScores] = useState([])
  const [commonMistakes, setCommonMistakes] = useState([])

  const document = useDocument()

  useLayoutEffect(() => {
    if (document.mistakes !== undefined) computeStatistics()
  }, [document])

  const computeStatistics = () => {
    setMistakesNumber(() => computeMistakeNumber())
    setPercAccuracy(() => computeAccuracy())
    setCommonMistakes(() => computeMostCommonMistakes())
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
    setBlockScores(() => blockScores)
    blockScores.map((score) => {
      sum += score
    })
    return Math.floor(sum / blockScores.length)
  }

  const computeMostCommonMistakes = () => {
    let words = []
    let mostCommon = []
    document.mistakes.map((block) => {
      block.mistakes.map((mistake) => {
        words.push(mistake.word)
      })
    })
    for (let i = 0; i < words.length; i++) {
      let occurrences = 0
      for (let j = 0; j < words.length; j++) {
        if (words[i] === words[j]) {
          occurrences++
        }
      }
      mostCommon.push({ word: words[i], occurrences: occurrences })
    }
    mostCommon = mostCommon.filter((item, index) => {
      let firstIndex = mostCommon.map(item => item.word).indexOf(item.word)
      return index === firstIndex
    })
    mostCommon = mostCommon.sort((a, b) => b.occurrences - a.occurrences)
    return mostCommon
  }

  const sortBlockScores = () => {

    /* return blockScores.sort(function(a, b) {
      return (a.score > b.score) ? 1 : ((b.score > a.score) ? -1 : 0)
    }) */
  }

  const attachParagraphContent = () => {
    if (blockScores.length < 1) return blockScores
    return blockScores.map((score, index) => {
      return {score: score, content: document.blocks[index]}
    })
  }

  /* const mapAccuraciesAndContent = () => {
    let blockScores = []
    document.blocks.map((block) => {
      let newScore = { content: block.block_content }
      switch (block.mistakes.length) {
        case 0:
          blockScores.push({...newScore, score: 100})
          break;
        case 1:
          blockScores.push({...newScore, score: 90})
          break;
        case 2:
          blockScores.push({...newScore, score: 80})
          break;
        case 3:
          blockScores.push({...newScore, score: 70})
          break;
        case 4:
          blockScores.push({...newScore, score: 60})
          break;
        case 5:
          blockScores.push({...newScore, score: 50})
          break;
        default:
          blockScores.push({...newScore, score: 40})
          break;
      }
    })
    let sum = 0
    setBlockScores(() => blockScores)
    blockScores.map((iter) => {
      sum += iter.score
    })
    return Math.floor(sum / blockScores.length)
  } */

  return (
    <>
      { isCompact &&
        <div className={styles["compact-container"]}>
          <div className={styles["compact-button"]}>
            <Button
              buttonStyle="icon-sidemistakebar-menu"
              onClick={toggleMode}
              icon={<MenuIcon className={styles["icon-sidemistakebar-icon"]} />}
            />
          </div>
          <div className={styles["compact-chart"]}>
            <VictoryPie
              padAngle={0}
              labelComponent={<span/>}
              innerRadius={80}
              width={200} height={200}
              data={[{'key': "", 'y': percAccuracy}, {'key': "", 'y': (100-percAccuracy)} ]}
              colorScale={["#F37A32", "#698fd0" ]}
            />
          </div>
          <div className={styles["compact-accuracy"]}>
            {percAccuracy}%
          </div>
          <div className={styles["compact-mistakes"]}>
            {mistakesNumber}
          </div>
        </div>
      }
      { !isCompact &&
        <div className={styles["container"]}>
          <div className={styles["title-container"]}>
            <span className={styles["title"]}>SPELLING REPORT</span>
            <Button
                buttonStyle="icon-sidemistakebar-close"
                onClick={toggleMode}
                icon={<CloseIcon className={styles["icon-sidemistakebar-icon"]} />}
            />
          </div>
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
            { (document.mistakes !== undefined) && 
              <div className={styles["lists-statistics"]}>
                <div className={styles["list-title"]}>MOST COMMON MISTAKES</div>
                <div className={styles["list-items-container"]}>
                  { (commonMistakes[0] !== undefined) && 
                    <div className={styles["list-item"]}>
                      <span className={styles["number"]}>#{commonMistakes[0].occurrences}</span>
                      <span className={styles["word"]}>{commonMistakes[0].word}</span>
                    </div>
                  }
                  { (commonMistakes[1] !== undefined) &&
                    <div className={styles["list-item"]}>
                      <span className={styles["number"]}>#{commonMistakes[1].occurrences}</span>
                      <span className={styles["word"]}>{commonMistakes[1].word}</span>
                    </div>
                  }
                  { (commonMistakes[2] !== undefined) &&
                    <div className={styles["list-item"]}>
                      <span className={styles["number"]}>#{commonMistakes[2].occurrences}</span>
                      <span className={styles["word"]}>{commonMistakes[2].word}</span>
                    </div>
                  }
                  {/* {(commonMistakes[0] !== undefined) && <div><span>#1</span><span>{commonMistakes[0].word}</span></div>}
                  {(commonMistakes[1] !== undefined) && <div><span>#2</span><span>{commonMistakes[1].word}</span></div>}
                  {(commonMistakes[2] !== undefined) && <div><span>#3</span><span>{commonMistakes[2].word}</span></div>} */}
                </div>
              </div>
            }
            {/* <div className={styles["lists-statistics"]}>
              <div className={styles["list-title"]}>MOST COMMON PARAGRAPHS</div>
              {(blockScores[0] !== undefined) && <div><span>#1</span><span>{blockScores[0]}</span></div>}
              {(blockScores[1] !== undefined) && <div><span>#2</span><span>{blockScores[1]}</span></div>}
              {(blockScores[2] !== undefined) && <div><span>#3</span><span>{blockScores[2]}</span></div>}
            </div> */}
          </div>
        </div>
      }
    </>
  );
};