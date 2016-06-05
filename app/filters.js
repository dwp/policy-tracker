module.exports = function(env) {
  
  var nunjucksSafe = env.getFilter('safe');

  /**
   * Instantiate object used to store the methods registered as a
   * 'filter' (of the same name) within nunjucks. You can override
   * gov.uk core filters by creating filter methods of the same name.
   * @type {Object}
   */
  var filters = {};

  /* ------------------------------------------------------------------
    add your methods to the filters obj below this comment block:
    @example:

    filters.sayHi = function(name) {
        return 'Hi ' + name + '!';
    }

    Which in your templates would be used as:

    {{ 'Paul' | sayHi }} => 'Hi Paul'

    Notice the first argument of your filters method is whatever
    gets 'piped' via '|' to the filter.

    Filters can take additional arguments, for example:

    filters.sayHi = function(name,tone) {
      return (tone == 'formal' ? 'Greetings' : 'Hi') + ' ' + name + '!';
    }

    Which would be used like this:

    {{ 'Joel' | sayHi('formal') }} => 'Greetings Joel!'
    {{ 'Gemma' | sayHi }} => 'Hi Gemma!'

    For more on filters and how to write them see the Nunjucks
    documentation.

  ------------------------------------------------------------------ */

  /**
  * checks if string contains passed substring
  * @param {*} a variable - the string you want to test
  * @param {String} the string you want to test for
  * @return {Boolean} true if found else false
   */
  filters.contains = function contains(a, s) {
    return a && s ? !!~a.indexOf(s) : false;
  };
  
  /**
   * filter for javascript substring
   * @method substring
   * @param  {string}  s the string to be manipulated
   * @param  {integer}  p the position within the string
   * @return {string}    the transformed string
   */
  filters.substring = function substring(s,p) {
    return s.substring(p);
  }
  
  /**
   * logs an object in the template to the console on the client.
   * @param  {Any} a any type
   * @param  {bool} fancy will make the log message stand out a bit
   * @return {String}   a script tag with a console.log call.
   * @example {{ "hello world" | log }}
   */
  filters.log = function log(a, fancy) {
  	return nunjucksSafe('<script>console.log' + '(' + (fancy? '"%c%s","background: yellow; font-size: 14px;",' : '') + JSON.stringify(a, null, '\t') + ');</script>');
  };

  /* ------------------------------------------------------------------
    keep the following line to return your filters to the app
  ------------------------------------------------------------------ */
  return filters;

};
