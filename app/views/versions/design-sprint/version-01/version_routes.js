module.exports = function(router, config) {
  
  // redirect / to the start page
  router.all(config.routes.root, function(req,res,next){
    res.redirect(config.prototypePaths.startPage);
    next();
  });
  
  // routing for all pages directly below version/app/
  router.all(config.routes.step, function(req,res,next){

    var requestedPage = req.params.step,
        postData = req.body || {};
        
    // place version routing below this line:
    
    next();
  
  });

  return router;
}
