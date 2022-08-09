function move(element) {
    element.style.position = 'fixed';

    function moveToCoordinates(left, bottom, zindex) {
        element.style.left = left + 'px';
        element.style.bottom = bottom + 'px';
        element.style.zindex = zindex;
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

        if(y < 250){
            element.style.zIndex = 6;
        }else if(y > 250){
            element.style.zIndex = 5;
        }
        }
        
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

        setInterval(moveCharacter, 1);

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
            if(imgdirection != null){
                imgdirection(direction);
            };
        });
        
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
            if(imgdirection != null){
                imgdirection(direction);
            };
        });
    };

    return {
        to: moveToCoordinates,
        withArrowKeys: moveWithArrowKeys
    };
}