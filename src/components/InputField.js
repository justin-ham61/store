import React, {useRef, useEffect} from 'react'
import { motion } from 'framer-motion'

const inputTransition = {
  type: 'tween',
  ease: 'linear',
  duration: .2,
}

const InputField = ({ label, type, name, value, length, onChange, max, button }) => {
  let inputVariant 

  if (button === 0){
    inputVariant = {
      initial: {
        translateX: -50,
        opacity: 0
      },
      in: {
        translateX: 0,
        opacity: 1
      }, 
      out: {
        translateX: 50,
        opacity: 0
      }
    }
  } else if (button === 1){
    inputVariant = {
      initial: {
        translateX: 50,
        opacity: 0
      },
      in: {
        translateX: 0,
        opacity: 1
      }, 
      out: {
        translateX: -50,
        opacity: 0
      }
    }
  }

  const myRef = useRef();
  useEffect(() => {
    myRef.current.focus();
  }, [])

    return (
        <motion.div className='input-field'
          initial="initial"
          animate="in"
          exit="out"
          variants={inputVariant}
          transition={inputTransition}
          >
          <label htmlFor={name}>Your {label}</label>
          <input placeholder={label} type={type} id={name} name={name} value={value} maxLength={length} onChange={onChange} max={max}required ref={myRef}/>
        </motion.div>
    );
  };

export default InputField
