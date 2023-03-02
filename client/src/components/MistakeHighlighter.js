import React, { useState } from 'react'
import styles from './MistakeHighlighter.module.css'

//TODO: creating my own constructor for now but should be passed from backend
class Mistake {
  constructor(word, start, end, suggestion) {
    this.word = word;
    this.start = start;
    this.end = end;
    this.suggestion = suggestion;
  }
}

export const MistakeHighlighter= ({ text }) => {

  // TODO: this currently defaults every paragraph to track for the same ranges, this will change with API data and mistakes will passed as props
  const mistakes = [];
  mistakes.push(new Mistake('', 0, 1, ''));
  mistakes.push(new Mistake('', 7, 9, ''));
  mistakes.push(new Mistake('', 33, 38, ''));

  let treshold = 0

  const fragments = mistakes.map(({ start, end }) => {
    const newFragment = (
      <>
        {text.substring(treshold, start)}
        <span className={styles["highlight"]} >
          {text.substring(start, end+1)}
        </span>
      </>
    )
    treshold = end + 1;
    return newFragment
  });

  return (
    <>
      { text.length > 0 &&
        <>
          {fragments}
          <span>{text.substring(treshold, text.length)}</span>
        </>
      }
    </>
  )

}