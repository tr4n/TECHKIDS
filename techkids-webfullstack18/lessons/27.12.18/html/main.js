const countDown = function(count) {

    for (let i = count; i > 0; i--) {

        setTimeout(function() {
            console.log(Number(i));
        }, 1000 * (count - i));
    }
}

countDown(10);