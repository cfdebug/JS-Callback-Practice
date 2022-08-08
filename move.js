function move(element) {
    element.style.position = 'fixed'

    function moveToCoordinates(left, bottom) {
        element.style.left = left + 'px'
        element.style.bottom = bottom + 'px'
    }

    function moveWithArrowKeys(left, bottom, imgdirection){
        let direction = null;
        let x = left;
        let y = bottom;
        
        element.style.left = x + 'px';
        element.style.bottom = y + 'px';
        
        function moveCharacter(){
        if(direction === 'west'){
            x-=1;
        }
        if(direction === 'north-west'){
            x-=1;
            y+=1;
        }
        if(direction === 'north'){
            y+=1;
        }
        if(direction === 'north-east'){
            x+=1;
            y+=1;
        }
        if(direction === 'east'){
            x+=1;
        }
        if(direction === 'south-east'){
            x+=1;
            y-=1;
        }
        if(direction === 'south'){
            y-=1;
        }
        if(direction === 'south-west'){
            x-=1;
            y-=1;
        }
        element.style.left = x + 'px';
        element.style.bottom = y + 'px';
        }
        
        setInterval(moveCharacter, 1)

        let keys = {
            left: false,
            up: false,
            right: false,
            down: false
        };
        
        document.addEventListener('keydown', function(e){
            if(e.repeat) return;
        
            if(e.key === 'ArrowLeft'){
                keys.left = true;
            }
            if(e.key === 'ArrowUp'){
                keys.up = true;
            }
            if(e.key === 'ArrowRight'){
                keys.right = true;
            }
            if(e.key === 'ArrowDown'){
                keys.down = true;
            }
            if(keys.left && keys.up){
                direction = 'north-west';
            }
            if(keys.right && keys.up){
                direction = 'north-east';
            }
            if(keys.left && keys.down){
                direction = 'south-west';
            }
            if(keys.right && keys.down){
                direction = 'south-east';
            }
            if(keys.left &! (keys.up || keys.right || keys.down )){
                direction = 'west';
            }
            if(keys.up &! (keys.right || keys.down || keys.left)){
                direction = 'north';
            }
            if(keys.right &! (keys.up || keys.down || keys.left)){
                direction = 'east';
            }
            if(keys.down &! (keys.right || keys.up || keys.left)){
                direction = 'south';
            } 
            if(imgdirection != null){
                imgdirection(direction);
            }
        })
        
        document.addEventListener('keyup', function(e){
            direction = null;
            if(e.key === 'ArrowLeft'){
                keys.left = false;
            }
            if(e.key === 'ArrowUp'){
                keys.up = false;
            }
            if(e.key === 'ArrowRight'){
                keys.right = false;
            }
            if(e.key === 'ArrowDown'){
                keys.down = false;
            }
            if(imgdirection != null){
                imgdirection(direction);
            }
        })
    }

    return {
        to: moveToCoordinates,
        withArrowKeys: moveWithArrowKeys
    }
}