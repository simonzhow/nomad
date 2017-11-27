// Maps an EXIF 'Orientation' tag to the appropriate CSS transform key
// required to display the image correctly
export const orientationKeyToCSSTransform = {
  1: '', // properly oriented
  2: 'scaleY(-1)', // Mirror horizontally
  3: 'rotate(180deg)', // Rotate 180º clockwise
  4: 'scaleX(-1)', // Mirror vertically
  5: 'scaleY(-1) rotate(270deg)', // Mirror horizontally and rotate 270º clockwise
  6: 'rotate(90deg)', // Rotate 90º clockwise
  7: 'scaleY(-1) rotate(90deg)', // Mirror horizontally and rotate 90º clockwise
  8: 'rotate(270deg)', // Rotate 270º clockwise
}
