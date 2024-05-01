setTimeout(function(){
    $(".skeleton_loader").fadeOut()
}, 1000);

// infinte sliderd demo //
const slides = $(".carousel_item");
const slideWidth = slides[0].getBoundingClientRect().width;

// add functions for scroll on buttons //
$(".next").on("click", ()=>{
    slide(-1);
});

$(".prev").on("click", ()=>{
    slide(1);
});

function slide(direction){
    if ($(".carousel_track").hasClass("transition")) { 
        return
     } else {
        $(".carousel_track").addClass("transition");
        $(".carousel_track").css("transform", "translateX(" +  (direction * slideWidth) + "px)");

        setTimeout( ()=> {
            if (direction === 1) {
                var copySlide = $(".carousel_item").last().detach();
                $(".carousel_track").prepend(copySlide);
            } else if (direction === -1) {
                var copySlide = $(".carousel_item").first().detach();
                $(".carousel_track").append(copySlide);
            }

            $(".carousel_track").removeClass("transition");
            $(".carousel_track").css("transform", "translateX(0px)");
        }, 400)
     }};