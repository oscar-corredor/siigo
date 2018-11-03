
function readURL(input){
	if(input.files && input.files[0]){
		var reader = new FileReader();
		
		reader.onload = function(e){
			var img_tag = document.getElementById('uploaded-bill-image');
			img_tag.src = e.target.result
		}

		reader.readAsDataURL(input.files[0]);
	}
}

var img_input = document.getElementById('image');
img_input.addEventListener('change', (event) => {
	readURL(event.target);
});

var send_btn = document.getElementById('send_btn');
	send_btn.addEventListener('click', (event) => {
		var loading_modal = document.getElementById('loading_modal');
		loading_modal.classList.add("active");
		
		var formData = new FormData();
		formData.append('file', img_input.files[0]);

		if(formData){
			$.ajax({
				url: "http://localhost:5001/receipts",
				type: "POST",
				data: formData,
				processData: false,
				success: function (msg) {
	  				console.log(msn);
				},
			});
		}
	});