import React, { useState } from 'react'
import styles from './MistakeHighlighter.module.css'
import { Button } from './Button'
import { ReactComponent as PlusIcon } from '../icons/plus.svg'
import { PreviewIcon } from './PreviewIcon'

//so far added changes in header with connection to api we can add changes here

//left this explorer preview as we might want to show it same way

//TODO: creating my own constructor for now but should be passed from backend
class Mistake {
  constructor(word, start, end, suggestion) {
    this.word = word;
    this.start = start;
    this.end = end;
    this.suggestion = suggestion;
  }
}

//TODO: needs text to be added from api

export const MistakeHighlighter= ({ text, highlighted }) => {
  const mistakes = [];

  // create and push objects into the array
  mistakes.push(new Mistake('Hi', 0, 1, 'Massimiliano'));
  mistakes.push(new Mistake('Max', 7, 9, 'Massimiliano'));
  mistakes.push(new Mistake('pasta', 33, 38, 'pizza'));

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
    <div>
      <div>{fragments}</div>
    </div>
  );
}