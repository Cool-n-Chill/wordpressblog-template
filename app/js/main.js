$(document).ready(function(){

    //Slider

    $('.slider').slick({
        vertical: true,
        dots: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
    });

    $('.slick-slider').append('<p class="slider__text">featured article</p>');

    //Sidebar slider

    $('.sidebar__slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
    });

    //Recomended slider

    $('.recomended__slider').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
    });

    //Sound custom

    var audio = $("#sound");
	var duration = $('.audio__duration');
    $(".post__player").on('click', function() {
        $('.post__player').toggleClass('active');
        if($('.post__player').hasClass('active')){
            audio[0].play();
        } else{
            audio[0].pause();
        }
        $(".post__player > .bi-play-fill").toggleClass('hidden');
        $(".post__player > .bi-pause-fill").toggleClass('hidden');
    });
    audio.on('ended', function() {
        $('.post__player').toggleClass('active');
        $(".post__player > .bi-play-fill").toggleClass('hidden');
        $(".post__player > .bi-pause-fill").toggleClass('hidden');
	});
    audio.on('timeupdate', function() {
		var date = new Date(audio[0].currentTime * 1000);
		duration.html(date.getMinutes()+':'+date.getSeconds());
	});

    // Social cards in post page

    $('.posts__social-card button').on('mouseenter', function() {
        $(this).children().css('color', '#fff');
    }).on('mouseleave', function() {
        $(this).children().css('color', '#212121');
    })
});