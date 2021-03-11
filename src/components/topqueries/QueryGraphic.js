import React, { useEffect, useRef } from 'react'

export const QueryGraphic = ({ graphicData }) => {
  const style = {
    width: '720px',
    height: '480px',
    background: '#2D2D2D',
    borderRadius: '10px',
    marginLeft: '40px',
    marginBottom: '80px',
  }

  const lenearFunction = (x, x1, x2, y1, y2) => Math.round(((x - x1) / (x2 - x1)) * (y2 - y1) + y1)

  const canvasRef = useRef(null)
  const contextRef = useRef(null)
  let coordinates = [] // Coordinates

  let x = 102
  const convertValue = 350 / graphicData.maxValue
  graphicData.queriesValue.map(y => {
    y = Math.round(350 - convertValue * y + 50)
    coordinates.push({ x, y })
    x += 66
  })

  useEffect(() => {
    drawGrid() // Set Grid
    contextRef.current.lineWidth = 3 // Line Settings
    contextRef.current.strokeStyle = '#21A1CA'
    contextRef.current.fillStyle = '#21A1CA'
    contextRef.current.beginPath() // Set origin
    contextRef.current.moveTo(coordinates[0].x, coordinates[0].y)

    let i = 0
    x = coordinates[i].x

    let timerId = setInterval(() => {
      let y = lenearFunction(
        x,
        coordinates[i].x,
        coordinates[i + 1].x,
        coordinates[i].y,
        coordinates[i + 1].y
      )

      contextRef.current.lineTo(x, y)
      contextRef.current.stroke()

      contextRef.current.beginPath() // Чтобы не появлялись "лесенки" при отрисовки графика
      contextRef.current.arc(x, y, 1, 0, Math.PI * 2)
      contextRef.current.fill()

      contextRef.current.beginPath()
      contextRef.current.moveTo(x, y)

      x += 3 // Step for Animation

      if (x >= coordinates[i + 1].x) {
        ++i

        if (i > coordinates.length - 2) {
          clearInterval(timerId)
        }
        x = coordinates[i].x
      }
    }, 10)

    return () => {
      clearTimeout(timerId)
    }
  }, [])

  let isHold = false
  let holdX, holdY

  const listener = ({ nativeEvent }) => {
    //Listeners
    const { offsetX, offsetY } = nativeEvent

    coordinates.map((coordinate, index) => {
      const { x, y } = coordinate
      if (isHold) {
        return
      }
      if (Math.pow(offsetX - x, 2) + Math.pow(offsetY - y, 2) <= 81) {
        contextRef.current.fillStyle = '#21A1CA'
        contextRef.current.beginPath()
        contextRef.current.arc(coordinate.x, coordinate.y, 9, 0, Math.PI * 2)
        contextRef.current.fill()

        contextRef.current.font = '10px Roboto' // Text Setting
        contextRef.current.textAlign = 'center'
        contextRef.current.fillStyle = '#9F9F9F'
        contextRef.current.fillText(
          graphicData.queriesValue[index],
          coordinate.x,
          coordinate.y - 12
        )

        holdX = coordinate.x
        holdY = coordinate.y

        isHold = true
      }
    })

    if (isHold && Math.pow(offsetX - holdX, 2) + Math.pow(offsetY - holdY, 2) > 81) {
      drawGrid()
      drawGraphic()
      isHold = false
    }
  }

  const drawGraphic = () => {
    contextRef.current.lineWidth = 3 // Line Settings
    contextRef.current.strokeStyle = '#21A1CA'
    contextRef.current.fillStyle = '#21A1CA'
    contextRef.current.beginPath() // Set origin
    contextRef.current.moveTo(coordinates[0].x, coordinates[0].y)

    coordinates.map(coordinate => {
      const { x, y } = coordinate

      contextRef.current.lineTo(x, y)
      contextRef.current.stroke()
    })
  }

  const drawGrid = () => {
    const canvas = canvasRef.current
    canvas.width = 720
    canvas.height = 480
    canvas.style.width = '720px'
    canvas.style.height = '480px'

    const context = canvas.getContext('2d')

    context.lineWidth = 2
    context.strokeStyle = '#FAF3F3'
    context.beginPath()
    context.moveTo(102, 405)

    context.lineTo(630, 405) // X Line

    context.lineTo(623, 398) // Arrow
    context.lineTo(630, 405)
    context.lineTo(623, 412)
    context.stroke()

    context.font = '10px Roboto' // Text Setting
    context.textAlign = 'center'
    context.fillStyle = '#9F9F9F'

    for (let x = 102; x < 630; x += 66) {
      // Ticks
      context.beginPath()
      context.moveTo(x, 407)
      context.lineTo(x, 401)
      context.stroke()

      context.fillText('00:00', x, 425)
    }

    context.strokeStyle = 'rgba(242, 242, 242, 0.25)' // Grid Color
    context.textAlign = 'end'

    for (let y = 50; y < 351; y += 70) {
      // Grid
      context.beginPath()
      context.moveTo(102, y)
      context.lineTo(630, y)
      context.stroke()

      context.fillText('1 000', 87, y + 3)
    }

    contextRef.current = context
  }

  return (
    <div>
      <canvas ref={canvasRef} style={style} onMouseMove={listener}>
        Nope :D
      </canvas>
    </div>
  )
}
