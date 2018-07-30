function stopBubble(e) {
    if (e && e.stopPropagation) { //非IE 
        e.stopPropagation();
    } else { //IE 
        window.event.cancelBubble = true;
    }
}