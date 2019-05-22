import { Component, OnInit } from '@angular/core';


/**

// origina sem modificaçoes
import { } from 'jquery';
import { } from 'morris.js';
import { } from 'jquery-knob';
import { } from 'bootstrap-datepicker';
import { } from 'jqueryui';
import { } from 'daterangepicker';
import { } from 'jquery.slimscroll';
import * as moment from 'moment';

// primeira modificacao  por mim para tentar consertar
import { } from 'jquery';
import { Morris } from 'morris.js/morris.min.js';
import { } from 'jquery-knob/dist/jquery.knob.min.js';
import { } from 'bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js';
import { } from 'jqueryui/jquery-ui.min.js';
import { } from 'daterangepicker';
import { } from 'jquery-slimscroll/jquery.slimscroll.min.js';

// modificado por mim para tentar consertar
import { } from 'jquery';
import { } from '../../../../node_modules/admin-lte/plugins/morris/morris.min.js';
import { } from '../../../../node_modules/admin-lte/plugins/knob/jquery.knob.js';
import { } from '../../../../node_modules/admin-lte/plugins/datepicker/bootstrap-datepicker.js';
import { } from '../../../../node_modules/admin-lte/plugins/jqueryui/jquery-ui.min.js';
import { } from '../../../../node_modules/admin-lte/plugins/daterangepicker/daterangepicker';
import { } from '../../../../node_modules/admin-lte/plugins/slimScroll/jquery.slimscroll.min.js';

 */
import { } from 'jquery';
 import { morris  } from 'morris.js/morris.min.js';
// import { } from 'jquery-knob';
// import { } from 'bootstrap-datepicker';
// import { } from 'jqueryui';
import { } from 'daterangepicker';
// import { } from 'jquery.slimscroll';

import * as moment from 'moment';


// Variable in assets/js/scripts.js file
declare var AdminLTE: any;

@Component({
  selector: 'app-admin-dashboard1',
  templateUrl: './admin-dashboard1.component.html',
  styleUrls: ['./admin-dashboard1.component.css']
})
export class AdminDashboard1Component implements OnInit {
  linechart: morris.GridChart;
  areaChart: morris.GridChart;
  donutChart: morris.DonutChart;
  knob: JQuery;

  calendar: JQuery;
  constructor() { }
  ngOnInit() {
     // Update the AdminLTE layouts
    AdminLTE.init();
    // Make the dashboard widgets sortable Using jquery UI

    /**
     * problema com o moment e importações diretas retirei

    jQuery('.connectedSortable').sortable({
      placeholder: 'sort-highlight',
      connectWith: '.connectedSortable',
      handle: '.box-header, .nav-tabs',
      forcePlaceholderSize: true,
      zIndex: 999999
    });
    jQuery('.connectedSortable .box-header, .connectedSortable .nav-tabs-custom').css('cursor', 'move');

    // jQuery UI sortable for the todo list
    jQuery('.todo-list').sortable({
      placeholder: 'sort-highlight',
      handle: '.handle',
      forcePlaceholderSize: true,
      zIndex: 999999
    });

    // bootstrap WYSIHTML5 - text editor
    // jQuery('.textarea').wysihtml5();

    jQuery('.daterange').daterangepicker({
      ranges: {
        'Today': [moment(), moment()],
        'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
        'Last 7 Days': [moment().subtract(6, 'days'), moment()],
        'Last 30 Days': [moment().subtract(29, 'days'), moment()],
        'This Month': [moment().startOf('month'), moment().endOf('month')],
        'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
      },
      startDate: moment().subtract(29, 'days'),
      endDate: moment()
    }, function (start, end) {
      // window.alert('You chose:  ' + this.start.format('MMMM D, YYYY') + ' - ' + this.end.format('MMMM D, YYYY'));
    });


    this.knob = jQuery('.knob').knob();
    this.calendar = jQuery('#calendar').datepicker();

    // SLIMSCROLL FOR CHAT WIDGET
    jQuery('#chat-box').slimScroll({
      height: '250px'
    });

    this.areaChart = Morris.Area({
      element: 'revenue-chart',
      resize: true,
      data: [
        { y: '2011 Q1', item1: 2666, item2: 2666 },
        { y: '2011 Q2', item1: 2778, item2: 2294 },
        { y: '2011 Q3', item1: 4912, item2: 1969 },
        { y: '2011 Q4', item1: 3767, item2: 3597 },
        { y: '2012 Q1', item1: 6810, item2: 1914 },
        { y: '2012 Q2', item1: 5670, item2: 4293 },
        { y: '2012 Q3', item1: 4820, item2: 3795 },
        { y: '2012 Q4', item1: 15073, item2: 5967 },
        { y: '2013 Q1', item1: 10687, item2: 4460 },
        { y: '2013 Q2', item1: 8432, item2: 5713 }
      ],
      xkey: 'y',
      ykeys: ['item1', 'item2'],
      labels: ['Item 1', 'Item 2'],
      lineColors: ['#a0d0e0', '#3c8dbc'],
      hideHover: 'auto'
    });

    this.donutChart = Morris.Donut({
      element: 'sales-chart',
      resize: true,
      colors: ['#3c8dbc', '#f56954', '#00a65a'],
      data: [
        { label: 'Download Sales', value: 12 },
        { label: 'In-Store Sales', value: 30 },
        { label: 'Mail-Order Sales', value: 20 }
      ],
    });

    this.linechart = Morris.Line({
      element: 'line-chart',
      resize: true,
      data: [
        { y: '2011 Q1', item1: 2666 },
        { y: '2011 Q2', item1: 2778 },
        { y: '2011 Q3', item1: 4912 },
        { y: '2011 Q4', item1: 3767 },
        { y: '2012 Q1', item1: 6810 },
        { y: '2012 Q2', item1: 5670 },
        { y: '2012 Q3', item1: 4820 },
        { y: '2012 Q4', item1: 15073 },
        { y: '2013 Q1', item1: 10687 },
        { y: '2013 Q2', item1: 8432 }
      ],
      xkey: 'y',
      ykeys: ['item1'],
      labels: ['Item 1'],
      lineColors: ['#efefef'],
      lineWidth: 2,
      hideHover: 'auto',
      gridTextColor: '#fff',
      gridStrokeWidth: 0.4,
      pointSize: 4,
      pointStrokeColors: ['#efefef'],
      gridLineColor: '#efefef',
      gridTextFamily: 'Open Sans',
      gridTextSize: 10
    });
    * fim de onde comentei por causa do erro
    */

    /* The todo list plugin */
    /*
    jQuery('.todo-list').todolist({
      onCheck: function (ele) {
        window.console.log('The element has been checked');
        return ele;
      },
      onUncheck: function (ele) {
        window.console.log('The element has been unchecked');
        return ele;
      }
    });*/


  }

}
