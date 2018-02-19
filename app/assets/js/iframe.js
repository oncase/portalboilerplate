define([
  "cdf/lib/jquery"
], function ($) {


  function _decodeExtras(extraParams) {
    return JSON.parse(atob(extraParams));
  }

  /* PUBLIC ------------------------------------------------------------------*/

  function _preExec() {
    this.postFetch = _postFetch.bind(this);
  }

  function _getBbaseURL(type, url) {
    switch (type) {
      case 'superset':
        return 'https://dominio.do.superset/superset/dashboard/' + url + '/'
      case 'pentaho':
        return '/pentaho/api/repos/' + url 
      default:
        return '';
    }
  }

  function _postFetch() {
    var selector = "#" + this.htmlObject;

    var extras = _decodeExtras(this.dashboard.getParam('extraParams'));
    var _url = _getBbaseURL(extras.type, extras.url);

    var params="";
    
    var anoDe = parseInt(this.dashboard.getParam('anoDe'), 10);
    var anoAte = parseInt(this.dashboard.getParam('anoAte'), 10);

    // se superset
    if (extras.type === 'superset') {
      var preselect_filters = {};
      preselect_filters[extras.ano_slice] =  {"ano": []};
      while (anoDe <= anoAte) {
        preselect_filters["90"].ano.push(anoDe + "");
        anoDe++;
      }
      params = '?preselect_filters=' + encodeURIComponent(JSON.stringify(preselect_filters));

      $(selector).height(1800);


    //se pentaho, //TODO implementar query string
    }else if(extras.type === 'pentaho'){
      params='?ts='+ (new Date()).getTime();
      while (anoDe <= anoAte) {
        params += "&ano=" + anoDe;
        anoDe++;
      }
      $(selector).height(650);
    }

    $(selector).attr("src", _url + params);



  }

  return {
    preExec: _preExec
  };

});
