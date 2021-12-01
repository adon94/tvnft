import React from 'react'

const ResponsiveText = ({ children }) => {
  return (
    <>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 500 75"
        style="background-color:green"
      >
          <text
            x="0"
            y="75"
            fontSize="75"
            fill="black"
          >{children}</text>
        </svg>
      </>
  )
}

export default ResponsiveText
