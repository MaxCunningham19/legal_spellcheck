import React, { useState, useRef, useEffect } from 'react'
import { Mistake } from './Mistake'
import styles from './MistakeHighlighter.module.css'

export const MistakeHighlighter= ({ text, mistakes }) => {

  const highlightedSpans = useRef(null)
  
  let treshold = 0

  const mapFragments = () => {
    return mistakes.map(({ start, end }) => {
      const newFragment = (
        <>
          {text.substring(treshold, start)}
          <Mistake
            text={text.substring(start, end)}
          />
        </>
      )
      treshold = end;
      return newFragment
    })
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