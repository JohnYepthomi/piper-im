export default function clearObject(object) {
  for (let member in object) delete object[member];
}
