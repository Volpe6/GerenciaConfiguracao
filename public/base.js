const ControlePagina = (function(){
    var oContainer;
    function iniciaNavBar(){
        $('.navegacao > ul > li').each(function(){
            var oEl = $(this);
            oEl.on('click', function(sTarget){
                carregaHtml(sTarget + '.html');
            }.bind(null, oEl.attr('data-target')))
        });
    }

    function carregaHtml(sLink){
        oContainer.empty();
        $.get('/pages/' + sLink).then(function(sHtml){
            oContainer.html(sHtml);
        });
    }

    $(window).on('load', function(){
        oContainer = $('#base_pagina');
        $.get('//cdn.datatables.net/plug-ins/1.10.21/i18n/Portuguese-Brasil.json').then(function(oRes){
            ControlePagina.DATA_TABLES_L18N = oRes;
        })
        iniciaNavBar();
        carregaHtml('bemVindo.html')
    });
    return {
         carregaPagina: carregaHtml
    };
}());