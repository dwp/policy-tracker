var express = require('express'),
  router = express.Router(),
  fs = require('fs'),
  _ = require('lodash'),
  path = require('path'),
  glob = require('globby'),
  appConfig = require(__dirname + '/config'),
  prototypePaths = appConfig.prototypePaths,
  utils = require(__dirname + '/utils');

/**
 * format title based on folder name
 * @method function
 * @param  {string} s the folder name
 * @return {string}   formatted title
 */
var formatTitle = function(s) {
  return s[0].toUpperCase() + s.slice(1).replace("-", ' ');
}

/**
 * Redirect to index file
 */
router.get('/', function (req, res) {
  res.redirect('index');
});
/**
 * loop each version route file and bring it in passing router and some config
 */
glob.sync(prototypePaths.routesGlob).forEach(function(p){
  require(p)(router, { prototypePaths: prototypePaths, route: prototypePaths.step.replace(':version*', utils.getVersionName(p).title) });
});

/**
 * for all routes provide some standard context data.
 */
router.use(function(req, res, next){

  // protoypes config obj
  var prototype = { versions: [], stages: appConfig.stages }

  // using glob pattern for the predefined folder structure to grep url and title
  glob.sync(prototypePaths.appsGlob).forEach(function(p){
    var v = utils.getVersionName(p);
    prototype.versions.push({ url: v.computedPath, title: formatTitle(v.title) });
  });

  // update locals so this data is accessible
  _.merge(res.locals,{
    postData: (req.body ? req.body : false),
    prototype: prototype
  });

  next();

});

/**
 * handle 'phase' (alpha/beta,etc) and 'version' of prototypes by passing some
 * enhanced context data (useful to nunjucks templates).
 */
router.all([prototypePaths.version], function(req, res, next){
  _.merge(res.locals.prototype, {
    current: {
      phase: formatTitle(req.params.phase),
      version: formatTitle(req.params.version),
      path: '/' + req.params.phase + '/' + req.params.version + '/app/'  
    }
  });
  next();
});

/**
 * makes param for 'step' available to the view via locals
 */
router.all(prototypePaths.step, function(req,res,next){

  var version = req.params.version || false,
    step = req.params.step || false,
    p = {
      step: step,
      page: step
    }

  // update local proto obj with useful data
  res.locals.prototype ? _.merge(res.locals.prototype, p) : res.locals.prototype = p;

  next();

});

module.exports = router;
