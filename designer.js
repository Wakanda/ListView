(function(ListView) {

    ListView.setWidth('300');
    ListView.setHeight('300');
    
    // add events
    ListView.addEvents([{
        'name': 'rowHold',
        'description': 'Sent upon tap hold on a row',
        'category': 'List View Events'
    }, {
        'name': 'rowSwapLeft',
        'description': 'Sent upon left swipe on a row',
        'category': 'List View Events'
    }, {
         'name': 'rowSwapRight',
        'description': 'Sent upon right swipe on a row',
        'category': 'List View Events'
    }, {
         'name': 'onRowClick',
        'description': 'Sent upon clik on a row',
        'category': 'List View Events'
    }]);

});
