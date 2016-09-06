/**
 * Created by Светлана on 06.08.16.
 */

function getMessage(a, b) {
    var message = '';
    // minimum length of two arrays a, b
    var minArrayLength;
    var i;
    var amountOfRedPoints = 0;
    var artifactsSquare = 0;

    if(typeof a === "boolean"){
        if(a){
            message = 'Переданное GIF-изображение анимировано и содержит '+ b +' кадров';
        }else{
            message = 'Переданное GIF-изображение не анимировано';
        }
    }

    if(typeof a === "number"){
        message = 'Переданное SVG-изображение содержит ' + a + ' объектов и ' + b * 4 + ' атрибутов';
    }

    if( Array.isArray(a)) {
        if( Array.isArray(b)){
            minArrayLength = Math.min(a.length, b.length);
            for(i = 0; i < minArrayLength; i++){
                artifactsSquare += a[i]*b[i];
            }
            message = 'Общая площадь артефактов сжатия: ' + artifactsSquare + ' пикселей';
        } else {
            for(i = 0; i < a.length; i++){
                amountOfRedPoints += a[i];
            }
            message = 'Количество красных точек во всех строчках изображения: ' + amountOfRedPoints;
        }
    }

    return message;
}
