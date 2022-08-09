const inventory = newInventory()
move(inventory).to(0, 0)

const character = newImage('assets/green-character/static.gif')

function handleDirectionChange(direction){
    if(direction === null){
        character.src = 'assets/green-character/static.gif'
    }
    if(direction === 'west' || direction === 'north-west' || direction === 'south-west'){
        character.src = 'assets/green-character/west.gif'
    }
    if(direction === 'north'){
        character.src = 'assets/green-character/north.gif'
    }
    if(direction === 'east' || direction === 'north-east' || direction === 'south-east'){
        character.src = 'assets/green-character/east.gif'
    }
    if(direction === 'south'){
        character.src = 'assets/green-character/south.gif'
    }
}

move(character).withArrowKeys(100, 250, handleDirectionChange)


move(newImage('assets/tree.png')).to(200, 450, 3)
move(newImage('assets/pillar.png')).to(350, 250, 6)
move(newImage('assets/pine-tree.png')).to(450, 350, 4)
move(newImage('assets/crate.png')).to(150, 350, 4)
move(newImage('assets/well.png')).to(500, 575, 1)
move(newItem('assets/sword.png')).to(500, 555, 2)
move(newItem('assets/shield.png')).to(165, 335, 5)
move(newItem('assets/staff.png')).to(600, 250, 6)