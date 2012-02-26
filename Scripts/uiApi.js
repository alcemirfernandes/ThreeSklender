(function()
{
   var windowHeader = document.getElementById("windowHeader");

   windowHeader.addEventListener("mousedown", function(mouseDown)
   {
      if(mouseDown.button === 0)
      {
         draggable(this.parentNode);
      }
   }, false);
}());