const ControlePagina = (function(){
    const AJAX_SUCESSO = 'sucesso';
    const AJAX_FALHA   = 'erro';

    var oContainer;
    var oModal;
    var modalTitulo;
    var modalConteudo;

    $(window).on('popstate', function(e){
        oContainer.empty();
        e = e.originalEvent;
        if(e.state){
            oContainer.html(e.state.html);
        }
    }).on('load', function(){
        oContainer = $('#base_pagina');
        oModal = $('#modalStatus').modal({
            show: false
        });
        modalTitulo   = $('#modalStatusTitulo', oModal);
        modalConteudo = $('#modalStatusConteudo', oModal);
        $.get('//cdn.datatables.net/plug-ins/1.10.21/i18n/Portuguese-Brasil.json').then(function(oRes){
            ControlePagina.DATA_TABLES_L18N = oRes;
        })
        iniciaNavBar();
        var params = new URLSearchParams(document.location.search.substring(1));
        var page   = params.get("p");
        if(page){
            carregaPagina(page + '.html')
        }
        else {
            carregaPagina('bemVindo.html')
        }
    });

    function iniciaNavBar(){
        $('.navegacao > ul > li').each(function(){
            var oEl = $(this);
            oEl.on('click', function(sTarget){
                carregaPagina(sTarget + '.html');
            }.bind(null, oEl.attr('data-target')))
        });
    }

    function carregaPagina(sLink){
        oContainer.hide();
        $.get('/pages/' + sLink).then(function(sHtml){
            oContainer.html(sHtml);
            oContainer.show();
            window.history.pushState({ "html": sHtml }, "", '?p=' + sLink.replace(/.html$/, ''));
        }, function(){
            carregaPagina('bemVindo.html');
        });
    }

    function trataErroForm(oRetorno){
        modalTitulo.html('Erro!');
        modalConteudo.empty();
        if(oRetorno.message){
            $('<p>').html(oRetorno.message).appendTo(modalConteudo);
        }
        if(oRetorno.errors){
            var oUl = $('<ul>').appendTo(modalConteudo);
            oRetorno.errors.forEach(function(oErro){
                $('<li>').html(oErro.message).appendTo(oUl);
            });
        }
        oModal.modal('show');
    }

    function iniciaForm(oForm, sUrl, sMensagem){
        oForm.submit(function(e){
            var formData = JSON.stringify(oForm.serializeArray().reduce(function(oAccum, oEl){
                oAccum[oEl.name] = oEl.value;
                return oAccum
            }, {}));
            $.ajax({
                url: sUrl,
                type: 'post',
                data: formData,
                dataType: "json",
                contentType : "application/json"
            }).then(function(oRetorno){
                if(oRetorno.result == AJAX_FALHA){
                    trataErroForm(oRetorno.msg);
                }
                else {
                    modalTitulo.html('Sucesso!');
                    modalConteudo.html(sMensagem);
                    oModal.modal('show');
                    $('.form-control').val('');
                }
            },function(e){
                modalTitulo.html('Erro Fatal!');
                modalConteudo.html(e.responseText);
                oModal.modal('show');
            });
            e.preventDefault();
            return false;
        });
    }

    function carregaRegistrosHtml(sUrl, aColunas, oAlvo){
        return $.get(sUrl).then(function(oRegistros){
            if(oRegistros.result == AJAX_SUCESSO){
                console.log(oRegistros);
                oRegistros.registros.forEach(function(oRegistro){
                    var oLinha = $('<tr>').appendTo(oAlvo);
                    aColunas.forEach(function(sColuna){
                        $('<td>').html(oRegistro[sColuna]).appendTo(oLinha);
                    });
                });
            }
        });
    }

    return {
         carregaPagina: carregaPagina
        ,iniciaForm: iniciaForm
        ,carregaRegistrosHtml: carregaRegistrosHtml
    };
}());