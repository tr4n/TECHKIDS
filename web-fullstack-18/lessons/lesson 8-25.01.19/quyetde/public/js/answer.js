$(document).ready(function () {
    const questionId = window.location.pathname.split('/')[2];

    $.ajax({
        url: `/api/questions/getQuestionById/${questionId}`,
        type: 'GET',

        success(data, _textStatus, _jqXHR) {

            const yesPercent = Number((Number(data.yes) * 100) / (Number(data.yes) + Number(data.no))).toFixed(2),
                noPercent = Number(100 - yesPercent).toFixed(2);
            $('.question-content').text(data.content);
            $('.total-vote').text(`${Number(data.yes) + Number(data.no)} votes`);
            $('.yes-percent').css("width", `${yesPercent}%`);
            $('.no-percent').css(`width`, `${noPercent}%`);
            $('.yes-percent').text(`Yes: ${yesPercent}%`);
            $('.no-percent').attr(`No: ${noPercent}%`);


            $('.other-question').on('click', () => {
                window.location.href = "/";
            });

        },
        error(_jqXHR, _textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });

});