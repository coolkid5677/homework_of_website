let mapArray, ctx, currentImgMain;
let imgMountain, imgMain, imgEnemy;
const gridLength = 200;
const length16=37.5

function loadImages(sources, callback) {
    var images = {};
    var loadedImages = 0;
    var numImages = 0;
    // get num of sources
    for (var src in sources) {
        numImages++;
    }
    for (var src in sources) {
        images[src] = new Image();
        images[src].onload = function () {
            if (++loadedImages >= numImages) {
                callback(images);
            }
        };
        images[src].src = sources[src];
    }
}

//initial
$(function(){
    // 0 : available, 1 : Mountain, 2 : Final Stop, 3 : Enemy
    // mapArray = [
    //     [0, 1, 1],
    //     [0, 0, 0],
    //     [3, 1, 2]
    // ];
    mapArray=[
        [0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0],
        [0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,1,0,3,0,0,0,0,3,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,3,0,0,1,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0],
        [0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0],
        [3,0,0,0,0,0,0,0,0,0,0,0,1,1,1,2]
    ]
    ctx = $("#myCanvas")[0].getContext("2d");

    imgMain = new Image();
    imgMain.src = "images/spriteSheet.png";
    currentImgMain = {
        x:0,
        y:0
    };

    imgMain.onload = function(){
        //ctx.drawImage(imgMain,0,0,80,130,currentImgMain.x, currentImgMain.y, gridLength,gridLength);
        ctx.drawImage(imgMain,0,0,80,130,currentImgMain.x, currentImgMain.y, length16,length16);
        // ctx.drawImage(imgMain, 360, 0, 80, 130, 200,0, gridLength, gridLength*3);
    };


    let sources = {
        mountain: "images/material.png",
        enemy: "images/Enemy.png"
    };

    // imgMountain = new Image();
    // imgMountain.src = "images/material.png";
    // imgEnemy = new Image();
    // imgEnemy.src = "images/Enemy.png";

    // loadImages(sources, function(images){
    //     for (let x in mapArray) {
    //         for (let y in mapArray[x]) {
    //             if (mapArray[x][y] == 1) {
    //                 ctx.drawImage(images.mountain, 32, 65, 32, 32, y * gridLength, x * gridLength, gridLength, gridLength);
    //             } else if (mapArray[x][y] == 3) {
    //                 ctx.drawImage(images.enemy, 7, 40, 104, 135, y * gridLength, x * gridLength, gridLength, gridLength);
    //             }
    //         }
    //     }
    // });
    loadImages(sources, function(images){
        for (let x in mapArray) {
            for (let y in mapArray[x]) {
                if (mapArray[x][y] == 1) {
                    ctx.drawImage(images.mountain, 32, 65, 32, 32, y * length16, x * length16, length16, length16);
                } else if (mapArray[x][y] == 3) {
                    ctx.drawImage(images.enemy, 7, 40, 104, 135, y * length16, x * length16, length16, length16);
                }
            }
        }
    });

    // imgMountain.onload = function(){
    //     imgEnemy.onload = function(){
    //         for(let x in mapArray){
    //             for(let y in mapArray[x]){
    //                 if(mapArray[x][y] == 1){
    //                     ctx.drawImage(imgMountain, 32, 65, 32, 32, y*gridLength, x*gridLength, gridLength, gridLength);
    //                 }else if(mapArray[x][y] == 3){
    //                     ctx.drawImage(imgEnemy, 7, 40, 104, 135, y * gridLength, x * gridLength, gridLength, gridLength);
    //                 }
    //             }
    //         }
    //     };
    // };

});

//Click Event
$(document).on("keydown", function(event){
    console.log(event.code);
    let targetImg, targetBlock, cutImagePositionX;
    targetImg = {//主角的目標座標
        x:-1,
        y:-1
    };
    targetBlock = {//主角的目標(對應2維陣列)
        x:-1,
        y:-1
    };

    //避免鍵盤預設行為發生
    event.preventDefault();

    switch(event.code){
        case "ArrowLeft":
            targetImg.x = currentImgMain.x - length16;
            targetImg.y = currentImgMain.y;
            cutImagePositionX = 175;
            break;
        case "ArrowUp":
            targetImg.x = currentImgMain.x;
            targetImg.y = currentImgMain.y - length16;
            cutImagePositionX = 355;
            break;
        case "ArrowRight":
            targetImg.x = currentImgMain.x + length16;
            targetImg.y = currentImgMain.y;
            cutImagePositionX = 540;
            break;
        case "ArrowDown":
            targetImg.x = currentImgMain.x;
            targetImg.y = currentImgMain.y + length16;
            cutImagePositionX = 0;
            break;
        default:
            return;
    }
    //確認目標位置不會超過地圖
    if(targetImg.x <= 563 && targetImg.x >=0 && targetImg.y <= 563 && targetImg.y >=0){
        targetBlock.x = targetImg.y / length16;
        targetBlock.y = targetImg.x / length16;
    }else{
        targetBlock.x = -1;
        targetBlock.y = -1;
    }

    //清空主角原本所在的位置
    ctx.clearRect(currentImgMain.x, currentImgMain.y, length16, length16);

    if(targetBlock.x != -1 && targetBlock.y != -1){
        switch(mapArray[targetBlock.x][targetBlock.y]){
            case 0:
                $("#talkBox").text("");
                currentImgMain.x = targetImg.x;
                currentImgMain.y = targetImg.y;
                break;
            case 1:
                $("#talkBox").text("有山");
                break;
            case 2: // Final Stop
                $("#talkBox").text("抵達終點");
                currentImgMain.x = targetImg.x;
                currentImgMain.y = targetImg.y;
                break;
            case 3: //Enemy
                $("#talkBox").text("哈摟");
                break;
        }
    }else{
        $("#talkBox").text("邊界");
    }

    ctx.drawImage(imgMain, cutImagePositionX, 0, 80, 130, currentImgMain.x, currentImgMain.y, length16, length16);

});