$(document).ready(() => {
    console.log('Document is ready');
    $('.submit-button').hover(() => {
        $('.submit-button').addClass('hover');
    });
    $('#question').val("hello world");

    $('.questions-button').on('click', () => {
        console.log("testd");
        const request = new XMLHttpRequest();
        // request.open('GET', '/getTotalQuestions');
        // request.onreadystatechange = () => {
        //     if (request.readyState === 4 && request.status == 200) {
        //         console.log(request.response);
        //         const response = JSON.parse(request.response);
        //         $('.total-questions').text(`Total questions: ${response.totalQuestions} `);
        //     }else{
        //         console.log(request.status);
        //     }
        // };
        // request.send();

        $.ajax({
            url: '/getTotalQuestions',
            type: 'GET',
            success(data, textStatus, jqXHR) {
                console.log(data);
                $('.total-questions').text(`Total questions: ${data.totalQuestions} `);
            },
            error(jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        })
    });


});