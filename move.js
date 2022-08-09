function move(element) {
    element.style.position = 'fixed';

    function moveToCoordinates(left, bottom, index) {
        element.style.left = left + 'px';
        element.style.bottom = bottom + 'px';
        element.style.zIndex = index;
    }

    function moveWithArrowKeys(left, bottom, imgdirection){
        let direction = null;
        let x = left;
        let y = bottom;
        
        element.style.left = x + 'px';
        element.style.bottom = y + 'px';
        
        function moveCharacter(){
            let onlynumwidth = element.style.left.replace(/\D/g,"");
            let onlynumheight = element.style.bottom.replace(/\D/g,"");
            hProceed = limitmovement(onlynumwidth, onlynumheight).hOk;
            wProceed = limitmovement(onlynumwidth, onlynumheight).wOk;

        // Modify Position Based On Direction
        if(direction === 'west'){
            if(wProceed){
            x-=1;
            };
        };
        if(direction === 'north-west'){
            if(wProceed){
            x-=1;
            };
            if(hProceed){
            y+=1;
            };
        };
        if(direction === 'north'){
            if(hProceed){
            y+=1;
            };
        };
        if(direction === 'north-east'){
            if(wProceed){
            x+=1;
            };
            if(hProceed){
            y+=1;
            };
        };
        if(direction === 'east'){
            if(wProceed){
            x+=1;
            };
        };
        if(direction === 'south-east'){
            if(wProceed){
            x+=1;
            };
            if(hProceed){
            y-=1;
            };
        };
        if(direction === 'south'){
            if(hProceed){
            y-=1;
            };
        };
        if(direction === 'south-west'){
            if(wProceed){
            x-=1;
            };
            if(hProceed){
            y-=1;
            };
        };
        element.style.left = x + 'px';
        element.style.bottom = y + 'px';

        // Foreground/Background Position Around Other Objects
        if(y < 250){
            element.style.zIndex = 7;
        }else if(y < 335){
            element.style.zIndex = 6;
        }else if(y < 350){
            element.style.zIndex = 5;
        }else if(y < 450){
            element.style.zIndex = 4;
        }else if(y < 555){
            element.style.zIndex = 3;
        }else if(y < 605){
            element.style.zIndex = 2;
        }else{
            element.style.zIndex = 1;
        }
        }

        // Limit Character Movement To Visible Area 
        function limitmovement(currW, currH){
        let widthOk;
        let heightOk;

        if((currW < window.innerWidth-50)&&(currW > 0)){
            widthOk = true;
        }else if(currW == window.innerWidth-50 && keys.left){
            widthOk = true;
        }else if(currW == 0 && keys.right){
            widthOk = true;
        }else{
            widthOk = false;
        };

        if((currH < window.innerHeight-70) && (currH > 100)){
            heightOk = true;
        }else if(currH == window.innerHeight-70 && keys.down){
            heightOk = true;
        }else if(currH == 100 && keys.up){
            heightOk = true;
        }else{
            heightOk = false;
        };
        return{
            wOk:widthOk,
            hOk:heightOk
        };
        };

        // Continuous Call Of moveCharacter()
        setInterval(moveCharacter, 1);

        // Key Object To Track Multiple Key Presses
        let keys = {
            left: false,
            up: false,
            right: false,
            down: false
        };
        
        // Set Direction Based On Keys Pressed/Multiple Keys Added
        document.addEventListener('keydown', function(e){
            if(e.repeat) return;
        
            if(e.key === 'ArrowLeft'){
                keys.left = true;
            };
            if(e.key === 'ArrowUp'){
                keys.up = true;
            };
            if(e.key === 'ArrowRight'){
                keys.right = true;
            };
            if(e.key === 'ArrowDown'){
                keys.down = true;
            };
            if(keys.left && keys.up){
                direction = 'north-west';
            };
            if(keys.right && keys.up){
                direction = 'north-east';
            };
            if(keys.left && keys.down){
                direction = 'south-west';
            };
            if(keys.right && keys.down){
                direction = 'south-east';
            };
            if(keys.left &! (keys.up || keys.right || keys.down )){
                direction = 'west';
            };
            if(keys.up &! (keys.right || keys.down || keys.left)){
                direction = 'north';
            };
            if(keys.right &! (keys.up || keys.down || keys.left)){
                direction = 'east';
            };
            if(keys.down &! (keys.right || keys.up || keys.left)){
                direction = 'south';
            };
            // Change Character Image
            if(imgdirection != null){
                imgdirection(direction);
            };
        });
        
        // Reset Pressed Keys
        document.addEventListener('keyup', function(e){
            direction = null;
            if(e.key === 'ArrowLeft'){
                keys.left = false;
            };
            if(e.key === 'ArrowUp'){
                keys.up = false;
            };
            if(e.key === 'ArrowRight'){
                keys.right = false;
            };
            if(e.key === 'ArrowDown'){
                keys.down = false;
            };
            // Change Character Image
            if(imgdirection != null){
                imgdirection(direction);
            };
        });
    };
    
    // Expose Internal Functions Of move() 
    return {
        to: moveToCoordinates,
        withArrowKeys: moveWithArrowKeys
    };
}