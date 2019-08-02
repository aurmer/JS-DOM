// Make the section disappear and reappear whenever you click the section-header
// BONUS: Can you make the section slide up and down like this? :
// https://www.w3schools.com/bootstrap/bootstrap_collapse.asp


var secHead = document.getElementById('section-header')
var section = document.getElementById('section')
var naturalSectionHeight = section.offsetHeight + "px"

section.style.maxHeight = naturalSectionHeight

secHead.addEventListener('click',function() {

  var sectionVisible = (section.style.maxHeight === naturalSectionHeight) ? true : false;

  if(sectionVisible) {
    section.style.maxHeight = 0
  } else {
    section.style.maxHeight = naturalSectionHeight
  }
})
section
