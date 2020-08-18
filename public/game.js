let state = {}

const optionButtonsElement = document.getElementById('option-buttons')
const textElement = document.getElementById('text')



function showTextNode(textNodeIndex) {
  const textNode = textOptions.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(button)
    }
  })
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}

const textOptions = [
  {
    id: 1,
    text: 'Placeholder text',
    options: [
      {
        text: 'Placeholder text',
        nextText: 2
      },
      {
        text: 'Placeholder text',
        nextText: 2
      }
    ]
  },
  {
    id: 2,
    text: 'Placeholder text',
    options: [
      {
        text: 'Placeholder text',
        nextText: 3
      },
      {
        text: 'Placeholder text',
        nextText: 3
      },
      {
        text: 'Placeholder text',
        nextText: 3
      }
    ]
  },
  {
    id: 3,
    text: 'Placeholder text',
    options: [
      {
        text: 'Placeholder text',
        nextText: 4
      },
      {
        text: 'Placeholder text',
        nextText: 5
      },
      {
        text: 'Placeholder text',
        nextText: 6
      }
    ]
  },
  {
    id: 4,
    text: 'Placeholder text',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 5,
    text: 'Placeholder text',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 6,
    text: 'Placeholder text',
    options: [
      {
        text: 'Placeholder text',
        nextText: 7
      }
    ]
  },
  {
    id: 7,
    text: 'Placeholder text',
    options: [
      {
        text: 'Placeholder text',
        nextText: 8
      },
      {
        text: 'Placeholder text',
        nextText: 9
      },
      {
        text: 'Placeholder text',
        nextText: 10
      },
      {
        text: 'Placeholder text',
        nextText: 11
      }
    ]
  },
  {
    id: 8,
    text: 'Placeholder text',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 9,
    text: 'Placeholder text',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 10,
    text: 'Placeholder text',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 11,
    text: 'Placeholder text',
    options: [
      {
        text: 'Congratulations. Play Again?',
        nextText: -1
      }
    ]
  }
]

function startGame() {
  state = {}
  showTextNode(1)
}

startGame()