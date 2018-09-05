const APP_DOMAIN = 'http://115.79.27.219/tracking/';
const CENTER_POS_MAP_VIEW = [20.81715284, 106.77411238];
const TIME_OUT_SHOW_MAP_ON_MODAL = 0;
const arrMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const arrYears = ['2018', '2019', '2020', '2021', '2022'];
const arrColors = [ '#8d6e63', '#616161', '#78909c', '#ffb74d', '#66bb6a', '#80d8ff', '#00acc1', '#5c6bc0', '#f48fb1', '#e1bee7', 'red', 'green', 'blue','orange','violet', 'yellow', 'pink', 'purple', 'cyan', 'teal', 'lime', 'ambe', '#0048BA', '#B0BF1A', '#7CB9E8', '#72A0C1', '#F2F0E6', '#9966CC', '#E32636', '#C46210', '#EFDECD', '#FFBF00', '#CFCFCF', '#551B8C', '#F2B400', '#CD9575', '#665D1E', '#915C83', '#841B2D', '#008000', '#8DB600', '#FBCEB1', '#00FFFF', '#D0FF14', '#4B5320', '#8F9779', '#E9D66B', '#B2BEB5', '#87A96B', '#FF9966' ];

// AIzaSyD_UUdoQUOXhG11A5bcbUjLcxfajWDjqDc
// AIzaSyA2JtN93nl-xarvyDCUu5QOVtFNMJk0S-A

$('.datepicker').datepicker();

$('.datetimepicker').datetimepicker({
  format: 'yyyy-mm-dd hh:ii'
})

$('.datetimepicker-bootstrap4').datetimepicker({
  // format: 'LT'
   format: 'HH:mm'
});

$('.btnScrollTop').click(moveTop);



function moveTop(){
  $('html, body').animate({'scrollTop': 0}, 300);
}

// Chart.pluginService.register({
//   beforeRender: function (chart) {
//     if (chart.config.options.showAllTooltips) {
//       // create an array of tooltips
//       // we can't use the chart tooltip because there is only one tooltip per chart
//       chart.pluginTooltips = [];
//       chart.config.data.datasets.forEach(function (dataset, i) {
//         chart.getDatasetMeta(i).data.forEach(function (sector, j) {
//           chart.pluginTooltips.push(new Chart.Tooltip({
//             _chart: chart.chart,
//             _chartInstance: chart,
//             _data: chart.data,
//             _options: chart.options.tooltips,
//             _active: [sector]
//           }, chart));
//         });
//       });
//       // turn off normal tooltips
//       chart.options.tooltips.enabled = false;
//     }
//   },
//   afterDraw: function (chart, easing) {
//     if (chart.config.options.showAllTooltips) {
//       // we don't want the permanent tooltips to animate, so don't do anything till the animation runs atleast once
//       if (!chart.allTooltipsOnce) {
//         if (easing !== 1)
//           return;
//         chart.allTooltipsOnce = true;
//       }
//       // turn on tooltips
//       chart.options.tooltips.enabled = true;
//       Chart.helpers.each(chart.pluginTooltips, function (tooltip) {
//         tooltip.initialize();
//         tooltip.update();
//         // we don't actually need this since we are not animating tooltips
//         tooltip.pivot();
//         tooltip.transition(easing).draw();
//       });
//       chart.options.tooltips.enabled = false;
//     }
//   }
// })
