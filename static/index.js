// Will add an extra icon if the display is too small and will activate a vertical navigation bar
    function resize() {
        var nav = document.getElementById("navbar");
        if (nav.className === "navbar") {
            nav.className += " responsive";
        } 
        else {
            nav.className = "navbar";
        }
    }

/* ============ INDEX PAGE ============ */
/* ==================================== */
if ($("body").data("title") === "Index"){
    var slideIndex = 0;
    showSlides();

    function showSlides() {
        var n;
        var slides = document.getElementsByClassName("slidesCornwall");
        var dots = document.getElementsByClassName("dot");
        for (n = 0; n < slides.length; n++) {
           slides[n].style.display = "none";
        }
		for (n = 0; n < dots.length; n++) {
			dots[n].className = dots[n].className.replace(" active", "");
        }
        slideIndex++;
        if (slideIndex > slides.length) {slideIndex = 1} //Goes back to the beginning after the index number exceeds the the number of slides
        
		slides[slideIndex-1].style.display = "block";
        dots[slideIndex-1].className += " active";
        setTimeout(showSlides, 5000); // Change image every 5 seconds
    }
}


/* ============ INFORMATION PAGE ============ */
/* ========================================== */
if ($("body").data("title") === "Information"){
    //Photo gallery modal
    var modal = document.getElementById('modalBox');

    var img1 = document.getElementById('bedroom');
    var img2 = document.getElementById('bedroom2');
    var img3 = document.getElementById('dining');
    var img4 = document.getElementById('kitchen');
    var img5 = document.getElementById('bathroom');
    var img6 = document.getElementById('living');
    var img7 = document.getElementById('sea');
    var modalImg = document.getElementById("img01");
    var description = document.getElementById("desc");

	/* When the thumbnails are clicked, the modal box will show, insert the source of 
	the image in it and displays the alt below it as the caption */
    img1.onclick = function(){
        modal.style.display = "block";
        modalImg.src = this.src;
        description.innerHTML = this.alt;
    }
    img2.onclick = function(){
        modal.style.display = "block";
        modalImg.src = this.src;
        description.innerHTML = this.alt;
    }
    img3.onclick = function(){
        modal.style.display = "block";
        modalImg.src = this.src;
        description.innerHTML = this.alt;
    }
    img4.onclick = function(){
        modal.style.display = "block";
        modalImg.src = this.src;
        description.innerHTML = this.alt;
    }
    img5.onclick = function(){
        modal.style.display = "block";
        modalImg.src = this.src;
        description.innerHTML = this.alt;
    }
    img6.onclick = function(){
        modal.style.display = "block";
        modalImg.src = this.src;
        description.innerHTML = this.alt;
    }
    img7.onclick = function(){
        modal.style.display = "block";
        modalImg.src = this.src;
        description.innerHTML = this.alt;
    }
	
	// Hide modal box when the 'X' is clicked
    function closeModal() {
        document.getElementById('modalBox').style.display = "none";
    }
}


/* ============ THINGS TO DO PAGE ============ */
/* =========================================== */
if ($("body").data("title") === "ThingsToDo") {
    /* When the button is clicked, it will show the panel information and the 
	colour will change to highlight which panel is opened */
    var acc = document.getElementsByClassName("accordion");
    var a;

    for (a = 0; a < acc.length; a++) {
        acc[a].onclick = function(){
            this.classList.toggle("active");
            this.nextElementSibling.classList.toggle("show");
        }
    }
}

/* ============ REVIEWS PAGE ============ */
/* ====================================== */
if ($("body").data("title") === "Reviews") {
    function submitReview(){
        var reviewComment = $('#inputComment').val();

        // Alerts customer if they do not write anything in the reviews box
        if (reviewComment === '') {
                alert('You have not written a comment!')
                return;
        }
    }
}

/* ============ BOOKING PAGE ============ */
/* ====================================== */
if ($("body").data("title") === "Book") {
    $('#checkin').datepicker({
        minDate: '1', // Check in date cannot be today
		maxDate: '1y',
        dateFormat: 'dd/mm/yy',
        
        // Sets the minimum date for checkout
        onSelect: function(date){            
            var checkin = $('#checkin').datepicker('getDate');          
            checkin.setDate(checkin.getDate() + 1);
            $('#checkout').datepicker('setDate', checkin); // Sets checkout date to be 1 day after checkin
            $('#checkout').datepicker("option", "minDate", checkin); // Creates restriction on the minimum date that you can pick
            
            // Sets the maximum date for checkout
            var checkoutMax = $('#checkin').datepicker('getDate');
            checkoutMax.setDate(checkoutMax.getDate() + 21);
            $('#checkout').datepicker("option", "maxDate", checkoutMax); // Sets maximum checkout date to be 21 days after checkin
        }
    });

    $('#checkout').datepicker({
        dateFormat: 'dd/mm/yy',
		minDate: '1',
        
        // Calculates how many days are between the checkin and checkout date
        onSelect: function(date){
        var start = $("#checkin").datepicker("getDate");
        var end = $("#checkout").datepicker("getDate");
        var days = (end - start) / 86400000; // Divide by this number to get the number of days
        $("#bookDays").val(days);

        // Changes the price so it is more expensive in summer than winter
		var pricePerDay=20*Math.sin(2*3.1415*(start.getMonth()+1)/12-1.5708)+90;
        var price = days * pricePerDay;
        price=parseFloat(Math.round(price*100)/100).toFixed(2);
        $("#bookPrice").val(price);
		}
    });

        // Alerts customer if the fields have not all been filled
        function submitBook(){
        var bookingName = $('#bookName').val();
        var bookingEmail = $('#bookEmail').val();
        var bookingCheckin = $('#checkin').val();
        var bookingCheckout = $('#checkout').val();

        if ((bookingName === '') || (bookingEmail === '') || (bookingCheckin === '') || (bookingCheckout === '')){
                alert('You have not filled in all the required fields!')
                return;
            }
        }

}
