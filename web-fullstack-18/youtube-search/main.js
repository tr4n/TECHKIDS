let pageToken = '';
let isLoaded = false;
let count = 0;
let getVideoTimeout;
$(document).ready(function () {


    $('#keyword').on('input', function (event) {
        console.log($('#keyword').val());
        event.preventDefault();
        keyword = $('#keyword').val();
        $('#result-list').empty();
        $('.lds-ring').css('display', 'inline-block');
        if (getVideoTimeout) clearTimeout(getVideoTimeout);

        getVideoTimeout = setTimeout(function () {
            getVideoItem(keyword);
        }, 1000);

        $(window).on('scroll', function () {
            if ($(document).height() - $(window).height() - $(window).scrollTop() < 800 && !isLoaded) {

                if (!isLoaded) {
                    if (pageToken.length > 0) {
                        console.log("End of page " + (count++));
                        getVideoItem(keyword);
                    } else {
                        $('#result-list').append('<h3> Nomore result </h3>');
                    }

                    isLoaded = true;
                }
            }
        });


    });
});





function getVideoItem(keyword) {
    

    $.ajax({
        url: `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${keyword}&type=video&key=AIzaSyA9gQZ-oYomFypZN7PsupZJtOfQqA6Q3qw&nex&pageToken=${pageToken}`,
        type: "GET",
        success(data) {
            //  console.log(data);
            if (data.items) {
                if (data.items.length > 0) {
                    $('#result-list').append(
                        data.items.map(item =>
                            `
                    <a class="result col-md-12" href="https://www.youtube.com/watch?v=${item.id.videoId}?autoplay=true" target="_blank">
                    <img src="${item.snippet.thumbnails.high.url}" alt="">
                    <div class="video_info my-auto">
                        <h2 class="title"> ${item.snippet.title}</h2>
                        <p class="description"> ${item.snippet.description}</p>
                        <span>View >> </span>
            
                    </div>
                     </a>
                    `
                        )
                    )

                } else {
                    $('#result-list').text('No results');
                }

            }

            pageToken = data.nextPageToken || '';
            isLoaded = false;
            $('.lds-ring').css('display', 'none');

        },
        error(_jhX, _statusCode, error) {
            console.log(error);
            isLoaded = false;
            $('.lds-ring').css('display', 'none');
        }
    });

}