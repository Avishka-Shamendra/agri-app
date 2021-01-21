
function img_add_keyword(image_b64){
    return `data:image/jpeg;base64,${image_b64['encode']}`
}

function img_add_keyword_bitstream(image){
    return `data:image/jpeg;base64,${image}`
}

module.exports = {img_add_keyword , img_add_keyword_bitstream}