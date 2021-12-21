import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'

export default function Progress() {
    const colors = [
        "primary", "secondary"
    ]
    const randomColor = colors[Math.floor(Math.random() * colors.length)]

    return (
        <div>
            <CircularProgress color={randomColor} />
        </div>
    )
}