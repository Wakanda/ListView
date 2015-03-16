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
        appendHtml: function(str, fetch) {
            this.$super('appendHtml')(str, fetch);
            var row = this.getRowItemByPosition(this.items().getPosition());
            if(row && ! $(row).hasClass('waf-state-selected')) {
                $(row).addClass('waf-state-selected');
            }
        },
        init: function() {
            var that = this;
            var items = this.items();
            var scrollerNode = this.getScrollerNode();
            var scrolledNode = this.getScrolledNode();

            this.addClass('waf-listview2');

            $(this.node).on('click', function(e) {
                var row = $(e.target).closest('li')[0];
                if(! row) {
                    return;
                }
                var position = that.getRowPosition(row);
                if(position !== items.getPosition()) {
                    that._synchronizeSubscriber.pause();
                    items.select(position, function() {
                        that._synchronizeSubscriber.resume();
                        $(scrolledNode.children).removeClass('waf-state-selected');
                        $(row).addClass('waf-state-selected');
                    });
                }
                that.fire('onRowClick', row);
            });

            // scroll automatically to the selected element in the datasource
            this._synchronizeSubscriber = this.items.subscribe('currentElementChange', function() {
                var position = items.getPosition();
                var size, scrollType, scroller = {}, rowPosition, scrollPosition;
                if(this.isHorizontalScroll()) {
                    scrollType = 'scrollLeft';
                    size = this.width();
                } else {
                    scrollType = 'scrollTop';
                    size = this.height();
                }
                scroller[scrollType] = rowPosition = position * this.getRowSize();
                scrollPosition = $(scrollerNode)[scrollType]();
                if(rowPosition < scrollPosition
                    || rowPosition + this.getRowSize() >= scrollPosition + size) {
                    $(scrollerNode).animate(scroller, 500, _selectRow);
                } else {
                    _selectRow();
                }
                function _selectRow() {
                    var row = that.getRowItemByPosition(position);
                    if(row) {
                        $(scrolledNode.children).removeClass('waf-state-selected');
                        $(row).addClass('waf-state-selected');
                    }
                }
            }, this);
        }
    });

    ListView.inherit('waf-behavior/layout/template-livescroll');
    ListView.linkDatasourcePropertyToLiveScroll('items');
    ListView.linkTemplatePropertyToLiveScrollTemplate('template');

    return ListView;
});
