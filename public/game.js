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
        text: 'Your Wisdom attribute gives you a +5 modifier and you can feel something big is going on. You grab your staff and wizard robes.',
        requiredState: (currentState) => (currentState.candleLight && currentState.initiative && currentState.fireball),
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
      },
      {
        text: 'Try Candlelight again',
        nextText: 11
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
    text: '"Right. I`ve got reasonable people to save." He closes the door and you can hear him run away. A short time passes while you contemplate what he meant by "Zombie Apocalypse" and you hear another knock at the door.',
    options: [
      {
        text: 'Answer the door.',
        nextText: 3
      }
    ]
  },
  {
    id: 8,
    text: '"You`re the asshole that`s going to get us all killed." Rob says while staring down the hallway. From the other direction, a hand enters the door frame he`s standing in and it pulls him back. Rob`s screams echo off the dead monitors in the room. Until you hear tearing and his screams stop.',
    options: [
      {
        text: 'Look out into the hallway.',
        nextText: 12
      },
      {
        text: 'Hide under the desk.',
        nextText: 13
      }
    ]
  },
  {
    id: 9,
    text: '"Holy shit, yes! Let`s get out of here." Rob turns away from the room and you follow him out. As you two run down the hall, more screams can be heard from all sides. Both of you stop running. Several dead bodies lay in pools of blood and skin, like someone had opened a purse and dumped out the contents while looking for something. You and Rob both see one of the bodies move and he pushes you down. "Sorry!" He says, as he runs off.',
    options: [
      {
        text: 'You are the next body turned into an emptied purse. The bodies were dead, but now they aren`t. There are more screams and several thuds off in the distance.',
        nextText: 1
      }
    ]
  },
  {
    id: 10,
    text: 'While you`re trying to calculate your racial bonuses in your head, bloody fingernails dig into your eyes.',
    options: [
      {
        text: 'Scream, fall to the floor and die at the hands of the creature. Before you do, you can hear tapping coming from somewhere.',
        nextText: 1
      }
    ]
  },
  {
    id: 11,
    text: 'Really?',
    options: [
      {
        text: 'Yes',
        nextText: 16
      },
      {
        text: 'No',
        nextText: 17
      }
    ]
  },
  {
    id: 12,
    text: 'Two figures are out in the hallway. One is Rob, a now faceless mass on the floor, and the other is slightly hunched and grabbing at the remaining chunks on Rob`s face.',
    options: [
      {
        text: 'Prepare Fireball for 2d6 worth of damage.',
        setState: {fireball: true},
        nextText: 14
      },
      {
        text: 'Turn around and go back into the room.',
        nextText: 15
      }
    ]
  },
  {
    id: 13,
    text: 'Quickly shuffling over to the desk, you think you`ve made as little noise as possible. You take the chance to look around for anything useful, but this is the computer science lab, only useful for LAN parties and occasional learning. The smell consumes you before you can grab anything to help you. A cold, wet hand grabs from behind and turns you around. The figure is clearly already dead and hungers for your soft internal organs.',
    options: [
      {
        text: 'Your fingers are removed piece by piece like someone would take a popsicle off a stick. As you pass out from shock, there`s a noise like fingers hitting wood.',
        nextText: 1
      }
    ]
  },
  {
    id: 14,
    text: 'This is not Dungeons and Dragons. You rub your hands together like a moron but all you`ve done is slightly heat them up for the figure in front of you to have a nice warm snack.',
    options: [
      {
        text: 'Your hands are eaten while you watch. You`re not sure, but you think you hear something as you pass out.',
        nextText: 1
      }
    ]
  },
  {
    id: 15,
    text: 'As you turn to go back into the room, you`re grabbed by the figure and the soft flesh at the base of your neck is removed by its teeth. ',
    options: [
      {
        text: 'Fall to the ground but hear a noise...',
        nextText: 1
      },
    ]
  },
  {
    id: 16,
    text: 'A light appears above you. You look around and see Rob at the door, hand on the light switch. "Oops, my bad. Go back to sleep."',
    options: [
      {
        text: 'You throw your head back onto the couch with a thud.',
        nextText: 1
      }
    ]
  },
  {
    id: 17,
    text: 'Smart choice.',
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
    id: 18,
    text: 'Just as you get everything on and in your possession, the door bursts open and several undead appear.',
    options: [
      {
        text: 'Blast them with Fireball',
        nextText: 19
      }
    ]
  },
  {
    id: 19,
    text: 'They explode in a satisfyingly meaty way. You are hailed as the hero of the school and given a parade in your honour. After a long couple days of celebration, you lay down for a nap...',
    options: [
      {
        text: '       ',
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