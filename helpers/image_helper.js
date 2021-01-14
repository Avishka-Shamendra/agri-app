function img_add_keyword(image_b64){
    return `data:image/jpeg;base64,${image_b64['encode']}`
}

module.exports = {img_add_keyword}