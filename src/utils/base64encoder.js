export default function base64encoder(image) {
  let base64String = "";
  var reader = new FileReader();

  reader.onloadend = function () {
    base64String = reader.result;
  };
  reader.readAsDataURL(image);
  return base64String;
}
