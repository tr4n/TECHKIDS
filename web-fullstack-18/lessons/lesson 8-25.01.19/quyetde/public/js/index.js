$(document).ready(function () {
    //display question
    $.ajax({
        url: '/api/questions/getRandomQuestion',
        type: 'GET',
        success(data, _textStatus, _jqXHR) {
            console.log(data);
            $('.question-content').text(data.content);

            //handle vote
            $('.vote-yes').on('click', () => {
                $.ajax({
                    url: '/api/questions',
                    type: 'PUT',
                    data: {
                        questionId: data._id,
                        vote: 'yes'
                    },
                    success(voteYesData, _textStatus, _jqXHR) {
                        console.log(voteYesData);
                        window.location.href= `/answer/${data._id}`;
                    },
                    error(_jqXHR, _textStatus, errorThrown) {
                        console.log(errorThrown);
                    }
                });
            });
            $('.vote-no').on('click', () => {
                $.ajax({
                    url: '/api/questions',
                    type: 'PUT',
                    data: {
                        questionId: data._id,
                        vote: 'no'
                    },
                    success(voteNoData, _textStatus, _jqXHR) {
                        console.log(voteNoData);
                        window.location.href= `/answer/${data._id}`;
                    },
                    error(_jqXHR, _textStatus, errorThrown) {
                        console.log(errorThrown);
                    }
                });
            });

            $


        },
        error(_jqXHR, _textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });


});