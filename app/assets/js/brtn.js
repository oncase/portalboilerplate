define([
  'cdf/dashboard/Utils'
], function (utils) {


  /* VARS --------------------------------------------------------------------*/

  var _tipoDespesaMap = {
    "Sociais" : "rgb(1, 184, 170)",
    "Encargos Especiais" : "rgb(55, 70, 73)",
    "Administração Pública"  : "rgb(242, 200, 15)",
    "Infraestrutura" : "rgb(253, 98, 94)"
  };


  /* Ajustes globais aos charts ----------------------------------------------*/

  function _chartsCommons(){
    var cd = this.chartDefinition;
    cd.plotFrameVisible = false;
    cd.orthoAxisGrid_strokeStyle = '#ccc';
    cd.orthoAxisTicks_strokeStyle = '#ccc';
    cd.orthoAxisRule_strokeStyle = "transparent";
    cd.orthoAxisMinorTicks_strokeStyle = "transparent";
    cd.baseAxisTicks_strokeStyle = '#A9A9A9';
    cd.baseAxisRule_strokeStyle = "transparent";
    cd.baseAxisFont = "11px Arial";


    cd.baseAxisGrid_lineWidth = 0;

    cd.contentMargins = 0;
    cd.margins = 0;
    cd.panelSizeRatio = 1;
    cd.paddings = 0
    cd.contentPaddings = 0
  }

  /* Agg table customization -------------------------------------------------*/

  function _formatAggTable() {

    // dataBar Addin

    var options = {
      height: 2,
      includeValue: true,
      valueFormat: function(v, format, st, opt) {
        return "" + utils.numberFormat(v, '0.00A', 'pt-br');
      }
    };
    
    this.setAddInOptions("colType", "dataBar", options);

    // formattedText Addin

    var optionsText = {
      textFormat: function(v, st, opt) {
        return v + ' <i class="fa fa-circle" style="color:'+ 
          _tipoDespesaMap[v] +'"></i>';
      }
    };
    
    this.setAddInOptions("colType", "formattedText", optionsText);

  }

  function _abbreviatedAxisFormat(){
    var cd = this.chartDefinition;
    cd.orthoAxisTickFormatter = function ( val ){
      return utils.numberFormat(val, '0.00A', 'pt-br');
    }
  }


  /* DespesaPorTipoPorAno ----------------------------------------------------*/

  function _formatDespTipo(){

    // Configuracoes comuns
    _chartsCommons.apply(this);
    _abbreviatedAxisFormat.apply(this);

    var cd = this.chartDefinition;
    cd.colorMap = _tipoDespesaMap;
    
    // Trata label das series para casar com mapa de cores
    this.postFetch = function(cda){
      var md = cda.metadata;
      for(var x = 1 ; x < md.length ; x++)
        md[x].colName = md[x].colName.substring(0, md[x].colName.lastIndexOf("/"));
    }

    // Coloca labels sobre stacked bar
    _labelOverStack.apply(this);
  }

  // Desenha novo plot com valores sobre empilhamentos
  function _labelOverStack(){
    var cd = this.chartDefinition;
    cd.plots = [
      {
        type: 'point',
        colorAxis: 2,
        dotsVisible: true,
        valuesVisible: true,
        valuesAnchor: 'top',
        visualRoles: {
          series: "empty",
          color: { from: 'series' }
        },
        label_text: function(scene){
          var valueDimName = this.pvMark.getContext().panel.visualRoles.value.lastDimensionName();
          var valueDim = scene.group.dimensions(valueDimName);
          var catSum = valueDim.sum();
          return utils.numberFormat(catSum, '0.00A', 'pt-br');
        },
        dot_shape: 'bar',
        dot_shapeAngle: -Math.PI / 2,
        dot_strokeStyle: null,
        dot_shapeSize: function () {
          var diam = this.chart.plotPanels.bar.barWidth || 
            this.chart.options.barSizeMax;
          return this.finished(diam);
        }
      }
    ];
  }

  /* DespesaPorUFPorAno ------------------------------------------------------*/

  function _formatLineSeries(){

    // Configuracoes comuns
    _chartsCommons.apply(this);
    _abbreviatedAxisFormat.apply(this);

    // Configuracoes especificas
    var cd = this.chartDefinition;
    cd.contentMargins = {top:0, left:0, right:30, bottom:0}
    cd.legendMargins = {top:0, left:30, right:0, bottom:0}
  }


  /* PUBLIC ------------------------------------------------------------------*/

  return {
    formatAggTable: _formatAggTable,
    formatDespTipo : _formatDespTipo,
    formatLineSeries : _formatLineSeries
  };

});
