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
        oContainer.hide();
        $.get('/pages/' + sLink).then(function(sHtml){
            oContainer.html(sHtml);
            oContainer.show();
            window.history.pushState({ "html": sHtml }, "", '?p=' + sLink.replace(/.html$/, ''));
        }, function(){
            carregaHtml('bemVindo.html');
        });
    }

    $(window).on('popstate', function(e){
        oContainer.empty();
        e = e.originalEvent;
        if(e.state){
            oContainer.html(e.state.html);
        }
    }).on('load', function(){
        oContainer = $('#base_pagina');
        $.get('//cdn.datatables.net/plug-ins/1.10.21/i18n/Portuguese-Brasil.json').then(function(oRes){
            ControlePagina.DATA_TABLES_L18N = oRes;
        })
        iniciaNavBar();
        var params = new URLSearchParams(document.location.search.substring(1));
        var page   = params.get("p");
        if(page){
            carregaHtml(page + '.html')
        }
        else {
            carregaHtml('bemVindo.html')
        }
    });
    return {
         carregaPagina: carregaHtml
    };
}());