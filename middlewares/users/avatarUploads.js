
function avatarUploads(req,res,next){
  const upload=uploader(
    "avatars",
    ["image/jpeg","image/jpg","image/png"],
    1000000,
    "only .jpg , .jpeg or .png format allowed!"
  )
  //call the middleware function
  
}

module.exports=avatarUploads; 