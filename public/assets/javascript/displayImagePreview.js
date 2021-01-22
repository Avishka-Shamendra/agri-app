//`<img src="" alt="post img" width='300px' height="200px" id="post-img">`
const image_container = document.getElementById('image_container');

function readURL(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();

        reader.onload = function(e) {
            //console.log(e.target.result);
            let html =  `<img src="${e.target.result}" class="rounded mx-auto d-block border border-success" alt="post img" width='300px' height="200px" id="post-img">`;
            image_container.innerHTML = html;

        }
        reader.readAsDataURL(input.files[0]);
    }
}
$("#imgFile").change(function() {
    readURL(this);
});