WAF.define('ListView', ['waf-core/widget'], function(widget) {
    "use strict";

    var ListView = widget.create('ListView', {
        tagName: 'div',
        items: widget.property({
            type: 'datasource',
            pageSize: 10,
            attributes: [  ]
        }),
        template: widget.property({
            type: 'template',
            templates: [
                {
                    name: 'Text only',
                    template: '<li role="option" val={{value}}>\
                                            {{List}}\
                              </li>'
                },
                {
                    name: 'Image and text',
                    template: '<li role="option" val={{value}}>\
                                            <p style="text-align: right;">\
                                            <img  src="{{image}}" />\
                                            {{List}}\
                                            </p>\
                              </li>'
                }

            ],
            datasourceProperty: 'items'
        }),
        getScrolledNode: function() {
            if(!this.node.getElementsByTagName('ul')[0]) {
                $(this.node).append('<ul></ul>');
            }
            return this.node.getElementsByTagName('ul')[0];
        },
        getRowSize: function() {
            return 30;
        },
        init: function() {
            this.addClass('waf-listview2');
        },
        getMainNode: function() {
            return this.node.getElementsByTagName('ul')[0];
        }
    });

    ListView.inherit('waf-behavior/layout/template-livescroll');
    ListView.linkDatasourcePropertyToLiveScroll('items');
    ListView.linkTemplatePropertyToLiveScrollTemplate('template');

    return ListView;
});
