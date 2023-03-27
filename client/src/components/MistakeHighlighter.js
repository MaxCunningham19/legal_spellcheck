import React, { useState, useRef, useEffect } from 'react'
import { Mistake } from './Mistake'
import styles from './MistakeHighlighter.module.css'

export const MistakeHighlighter= ({ text, mistakes }) => {
  
  let treshold = 0

  const mapFragments = () => {
    return mistakes.map(({ word, start, end, suggestions }) => {
      const newFragment = (
        <>
          {text.substring(treshold, start)}
          <Mistake
            text={text.substring(start, end)}
            suggestion={parseSuggestions(suggestions, word)}
          />
        </>
      )
      treshold = end;
      return newFragment
    })
  }

  /** Makes sure that suggestion do not end with punctuation symbols */
  const parseSuggestions = (suggestions, word) => {
    if (suggestions[0] === undefined) return word
    let firstSuggestion = suggestions[0]
    let filterEndingWithSymbols = /[.,:!?]$/
    if (!!firstSuggestion.match(filterEndingWithSymbols)) {
      firstSuggestion = firstSuggestion.substring(0, firstSuggestion.length-1)
    }
    return firstSuggestion
  }

  return (
    <>
      { text.length > 0 &&
        <>
          {mapFragments()}
          <span>{text.substring(treshold, text.length)}</span>
        </>
      }
    </>
  )

}