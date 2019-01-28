$(document).ready(() => {
    $('.submit-button').hover(() => {
        $('.submit-button').addClass('hover');
    });

    $('.result').on('click', () => {
        window.location.href = `/answer/${data.data._id}`;
    })

    $('.ask').on('submit', (event) => {
        event.preventDefault();
        $.ajax({
            url: "/api/questions",
            type: "POST",
            data: {
                questionContent: $('#question').val()
            },
            success(data) {
                console.log(data);
                console.log("success");
                window.location.href = `/answer/${data.data._id}`;
            },
            error(_xhr, _statusCode, error) {
                console.log(error);

            }
        })
    });


});