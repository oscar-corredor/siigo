function readURL(input){
	if(input.files && input.files[0]){
		var reader = new FileReader();

		reader.onload = function(e){
			var img_tag = document.getElementById('uploaded-bill-image');
			img_tag.src = e.target.result
			// $('#uploaded-bill-image').attr('src', e.target.result);
		}

		reader.readAsDataURL(input.files[0]);
	}
}

var img_input = document.getElementById('image');
img_input.addEventListener('change', (event) => {
	console.log(event.target);
	readURL(event.target);
});