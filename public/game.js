let state = {};

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
    text: 'A knock at the door wakes you up from your nap in the computer science room. You think it was a knock but you were in a pretty deep sleep. It`s dark out and you don`t remember what you were doing when you crashed on the couch. ',
    options: [
      {
        text: 'Walk over to your computer and wiggle the mouse.',
        nextText: 2
      },
      {
        text: 'Answer the door.',
        nextText: 3
      },
      {
        text: 'Cast Candlelight for 1d4 meters of light.',
        setState: {candleLight: true},
        nextText: 4
      },
      {
        text: ' ',
        requiredState: (currentState) => (currentState.candleLight && currentState.initiative),
        nextText: 3
      }
    ]
  },
  {
    id: 2,
    text: 'The mouse sits in all its RGB glory, just waiting to be moved and spring to life. You move it, but nothing happens. You go to hit the power button and an increasingly worried knock comes from the door.',
    options: [
      {
        text: 'Answer the door.',
        nextText: 3
      },
      {
        text: 'Push the power button',
        nextText: 5
      }
    ]
  },
  {
    id: 3,
    text: 'The door is opened by turning the knob. A face stares back at you from the dim hallway but that`s all you register before the smell hits you. This is death in physical form, or the guy from residence that`s infamous for not showering or washing his clothes. Is it both of those things? Your attention snaps back to the face again; hanging, almost oozing off the bone in places. ',
    options: [
      {
        text: 'Scream',
        nextText: 6
      },
      {
        text: 'Roll for initiative.',
        setState: {initiative: true},
        nextText: 8
      }
    ]
  },
  {
    id: 4,
    text: 'That`s not even a real DnD spell. And you woke up from your nap; this is the real world. You give yourself a shake and reassess your choices.',
    options: [
      {
        text: 'Walk over to your computer and wiggle the mouse.',
        nextText: 2
      },
      {
        text: 'Answer the door.',
        nextText: 3
      }
    ]
  },
  {
    id: 5,
    text: 'The computer does not flicker to life as expected. The door bursts open as a scream from further down the hallway can be heard. Rob is in the doorway. "Are you really trying to play Rocket League during the beginning of the zombie apocalypse?"',
    options: [
      {
        text: '"Yes"',
        nextText: 7
      },
      {
        text: '"Maybe"',
        nextText: 8
      },
      {
        text: '"Zombie Apocalypse?"',
        nextText: 9
      }
    ]
  },
  {
    id: 6,
    text: 'The stinky guy`s eyes register you for the first time and he opens what`s left of his mouth to devour you.',
    options: [
      {
        text: 'You hear a noise',
        nextText: 1
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
  const textNode = textOptions.find(textNode => textNode.id === textIndex);
  textElement.innerText = textNode.text;
  
  //removing empty options
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild);
  }

  //loop to add text to each option within the optionElement
  textNode.options.forEach(option => {
    if (showOption(option)) {
      const optBtn = document.createElement('optBtn');
      //set text
      optBtn.innerText = option.text;
      //look for clicks on button
      optBtn.addEventListener('click', () => selectOption(option));
      optBtn.classList.add('btn');
      optionButtonsElement.appendChild(optBtn);
    }
  });
}

//sets the state of new/existing items and moves to the selected id
function selectOption(option) {
  const nextTextId = option.nextText;

  //typically use -1 to show game over, but ID could be 0 or less
  if (nextTextId <= 0) {
    return startGame();
  }

  //set the state to all current states plus the new state
  state = Object.assign(state, option.setState);
  showIf(nextTextId);
}

function startGame() {
  //initialize state
  state = {};
  //Start at text id 1 
  showIf(1);
}

//Only line that executes initially
startGame();

module.exports = game;