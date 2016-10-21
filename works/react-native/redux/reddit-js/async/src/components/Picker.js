import React, { PropTypes } from 'react'

const Picker = ({  onChange, options }) => (
  <span>
    <select onChange={e => onChange(e.target.value)}
            >
      {options.map(option =>
        <option value={option} key={option}>
          {option}
        </option>) 
      }
    </select>
  </span>
)
export default Picker
