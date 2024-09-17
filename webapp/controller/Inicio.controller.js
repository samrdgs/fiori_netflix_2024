sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
function (Controller,JSONModel) {
    "use strict";

    return Controller.extend("projetonetflix.controller.Inicio", {
        onInit: function () {
            //definicao de lista vazia de resultados
            let resultados = {
                titles:[]
            }

            //definicao de moldelo - variavel especial para mostrar dados na tela
            let resultadosModel = new JSONModel();
            //atribuicao de dados
            resultadosModel.setData(resultados);
            //anexar modelo na tela
            let tela = this.getView();
            tela.setModel(resultadosModel, "APINetflix");

        },
        onINICIOLinkPress: function(){
            alert("navegar para tela inicial");
        },

        onBuscarDados: function(){
            //Busca de dados na api da netflix
            let searchField = this.byId("idSearchField");
            let filtro = searchField.getValue();

            alert(filtro);

            const settings = {
                async: true,
                crossDomain: true,
                url: 'https://netflix54.p.rapidapi.com/search/?query=' 
                + filtro + '&offset=0&limit_titles=50&limit_suggestions=20&lang=en',
                method: 'GET',
                headers: {
                    'x-rapidapi-key': 'b5b844ecc6mshacbf1457bfa18cdp163a63jsn3ef7044a467e',
                    'x-rapidapi-host': 'netflix54.p.rapidapi.com'
                }
            };
            
            $.ajax(settings).done(function (response) {
                console.log(response);
                // resgatar o modelo e atualizar dados

                let tela = this.getView();
                let  modelo = tela.getModel("APINetflix");
                let dados = modelo.getData();

                //limpar a lista
                dados.title = [];
                dados.titles = response.titles;
                modelo.refresh();
            }.bind(this));
        }
    });
});
