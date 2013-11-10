define(['handlebars'], function(Handlebars) {

return Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"spotConfirm\">\n<div class=\"confirm section\">\nAre you sure you wish to create a new Spot here?\n<button type=\"button\" class=\"btn btn-primary\">Yes</button>\n<button type=\"button\" class=\"btn btn-danger\">NO! GET ME OUT.</button>\n</div>\n<div class=\"form section\">\n<form role=\"form\">\n<div class=\"form-group\">\n<label for=\"name\">Name</label>\n<input type=\"text\" class=\"form-control\" id=\"name\" placeholder=\"MC Comfy\" name=\"name\">\n<br>\n<label for=\"description\">Description</label>\n<input type=\"text\" class=\"form-control\" id=\"description\" placeholder=\"Lot of comfy place!\" name=\"description\">\n<label for=\"image\">Add a photo</label>\n<div class=\"fileinput fileinput-new\" data-provides=\"fileinput\">\n<div class=\"fileinput-new thumbnail\" style=\"width: 275px; height: 150px;\">\n<img data-src=\"holder.js/100%x100%\" alt=\"...\">\n</div>\n<div class=\"fileinput-preview fileinput-exists thumbnail\" style=\"max-width: 275px; max-height: 150px;\"></div>\n<div>\n<span class=\"btn btn-default btn-file\"><span class=\"fileinput-new\">Select image</span><span class=\"fileinput-exists\">Change</span><input type=\"file\" name=\"image\"></span>\n</div>\n</div>\n</div>\n<button type=\"submit\" class=\"btn btn-default\">Submit</button>\n</form>\n</div>\n</div>\n";
  })

});