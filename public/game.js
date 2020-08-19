let state = {}

/************Branches for text-based story***************
    for outer blocks:
      - id: value to jump to
      - text: outer block text value
      - options: data for the internal options

    for internal options:
      - text: internal question text value
      - requiredState: use "(currentState) => currentState.whatever" to set the current option as conditional on another state
      - setState: use "{ whatever1: false, whatever2: true }" to set the state of any item or check
      - nextText: id value of where this option will lead
      NOTE: nextText: -1 will restart the 
*********************************************************/
const textOptions = [
  {
    id: 1,
    text: 'You wake up on the computer science lab couch with no recollection of how you got there.  You hear a scream in the hall.',
    options: [
      {
        text: 'Hide under a desk',
        nextText: 2
      },
      {
        text: 'Run into the hall',
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

//get buttons from index.html
const optionButtonsElement = document.getElementById('option-buttons')
//get main block text from index.html
const textElement = document.getElementById('text')


//function to return truth value for it a required state has been met 
function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

//
function showIf(textIndex) {
  //setting the value of the next id we jump to
  const textNode = textOptions.find(textNode => textNode.id === textIndex)
  textElement.innerText = textNode.text
  
  //removing empty options
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  //loop to add text to each option within the optionElement
  textNode.options.forEach(option => {
    if (showOption(option)) {
      const optBtn = document.createElement('optBtn')
      //set text
      optBtn.innerText = option.text
      //look for clicks on button
      optBtn.addEventListener('click', () => selectOption(option))
      optBtn.classList.add('btn')
      optionButtonsElement.appendChild(optBtn)
    }
  })
}

//sets the state of new/existing items and moves to the selected id
function selectOption(option) {
  const nextTextId = option.nextText

  //typically use -1 to show game over, but ID could be 0 or less
  if (nextTextId <= 0) {
    return startGame()
  }

  //set the state to all current states plus the new state
  state = Object.assign(state, option.setState)
  showIf(nextTextId)
}

function startGame() {
  //initialize state
  state = {}
  //Start at text id 1 
  showIf(1)
}

//Only line that executes initially
startGame()  

module.exports = game