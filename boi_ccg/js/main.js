// Load the Visualization API and the corechart package.
//google.charts.load('current', {'packages':['corechart']});

// Set a callback to run when the Google Visualization API is loaded.
//google.charts.setOnLoadCallback(drawChart1);

// Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and
// draws it.
var dataforpdf = [];
Chart.pluginService.register({
    beforeDraw: beforeDraw
});

var colors = [
    "#63b598", "#ce7d78", "#ea9e70", "#a48a9e", "#c6e1e8", "#648177", "#0d5ac1",
    "#f205e6", "#1c0365", "#14a9ad", "#4ca2f9", "#a4e43f", "#d298e2", "#6119d0",
    "#d2737d", "#c0a43c", "#f2510e", "#651be6", "#79806e", "#61da5e", "#cd2f00",
    "#9348af", "#01ac53", "#c5a4fb", "#996635", "#b11573", "#4bb473", "#75d89e",
    "#2f3f94", "#2f7b99", "#da967d", "#34891f", "#b0d87b", "#ca4751", "#7e50a8",
    "#c4d647", "#e0eeb8", "#11dec1", "#289812", "#566ca0", "#ffdbe1", "#2f1179",
    "#935b6d", "#916988", "#513d98", "#aead3a", "#9e6d71", "#4b5bdc", "#0cd36d",
    "#250662", "#cb5bea", "#228916", "#ac3e1b", "#df514a", "#539397", "#880977",
    "#f697c1", "#ba96ce", "#679c9d", "#c6c42c", "#5d2c52", "#48b41b", "#e1cf3b",
    "#5be4f0", "#57c4d8", "#a4d17a", "#225b8", "#be608b", "#96b00c", "#088baf",
    "#f158bf", "#e145ba", "#ee91e3", "#05d371", "#5426e0", "#4834d0", "#802234",
    "#6749e8", "#0971f0", "#8fb413", "#b2b4f0", "#c3c89d", "#c9a941", "#41d158",
    "#fb21a3", "#51aed9", "#5bb32d", "#807fb", "#21538e", "#89d534", "#d36647",
    "#7fb411", "#0023b8", "#3b8c2a", "#986b53", "#f50422", "#983f7a", "#ea24a3",
    "#79352c", "#521250", "#c79ed2", "#d6dd92", "#e33e52", "#b2be57", "#fa06ec",
    "#1bb699", "#6b2e5f", "#64820f", "#1c271", "#21538e", "#89d534", "#d36647",
    "#7fb411", "#0023b8", "#3b8c2a", "#986b53", "#f50422", "#983f7a", "#ea24a3",
    "#79352c", "#521250", "#c79ed2", "#d6dd92", "#e33e52", "#b2be57", "#fa06ec",
    "#1bb699", "#6b2e5f", "#64820f", "#1c271", "#9cb64a", "#996c48", "#9ab9b7",
    "#06e052", "#e3a481", "#0eb621", "#fc458e", "#b2db15", "#aa226d", "#792ed8",
    "#73872a", "#520d3a", "#cefcb8", "#a5b3d9", "#7d1d85", "#c4fd57", "#f1ae16",
    "#8fe22a", "#ef6e3c", "#243eeb", "#1dc18", "#dd93fd", "#3f8473", "#e7dbce",
    "#421f79", "#7a3d93", "#635f6d", "#93f2d7", "#9b5c2a", "#15b9ee", "#0f5997",
    "#409188", "#911e20", "#1350ce", "#10e5b1", "#fff4d7", "#cb2582", "#ce00be",
    "#32d5d6", "#17232", "#608572", "#c79bc2", "#00f87c", "#77772a", "#6995ba",
    "#fc6b57", "#f07815", "#8fd883", "#060e27", "#96e591", "#21d52e", "#d00043",
    "#b47162", "#1ec227", "#4f0f6f", "#1d1d58", "#947002", "#bde052", "#e08c56",
    "#28fcfd", "#bb09b", "#36486a", "#d02e29", "#1ae6db", "#3e464c", "#a84a8f",
    "#911e7e", "#3f16d9", "#0f525f", "#ac7c0a", "#b4c086", "#c9d730", "#30cc49",
    "#3d6751", "#fb4c03", "#640fc1", "#62c03e", "#d3493a", "#88aa0b", "#406df9",
    "#615af0", "#4be47", "#2a3434", "#4a543f", "#79bca0", "#a8b8d4", "#00efd4",
    "#7ad236", "#7260d8", "#1deaa7", "#06f43a", "#823c59", "#e3d94c", "#dc1c06",
    "#f53b2a", "#b46238", "#2dfff6", "#a82b89", "#1a8011", "#436a9f", "#1a806a",
    "#4cf09d", "#c188a2", "#67eb4b", "#b308d3", "#fc7e41", "#af3101", "#ff065",
    "#71b1f4", "#a2f8a5", "#e23dd0", "#d3486d", "#00f7f9", "#474893", "#3cec35",
    "#1c65cb", "#5d1d0c", "#2d7d2a", "#ff3420", "#5cdd87", "#a259a4", "#e4ac44",
    "#1bede6", "#8798a4", "#d7790f", "#b2c24f", "#de73c2", "#d70a9c", "#25b67",
    "#88e9b8", "#c2b0e2", "#86e98f", "#ae90e2", "#1a806b", "#436a9e", "#0ec0ff",
    "#f812b3", "#b17fc9", "#8d6c2f", "#d3277a", "#2ca1ae", "#9685eb", "#8a96c6",
    "#dba2e6", "#76fc1b", "#608fa4", "#20f6ba", "#07d7f6", "#dce77a", "#77ecca"];



function beforeDraw(chart, easing) {
    var ctx = chart.ctx;
    var chartArea = chart.chartArea;
    ctx.save();
    ctx.fillStyle = "white";
    //        ctx.fillRect(chartArea.left, chartArea.top, chartArea.right - chartArea.left, chartArea.bottom - chartArea.top);
    ctx.fillRect(0, 0, chart.canvas.width + 1000, chart.canvas.height + 1000);
    ctx.restore();
}

var container = document.getElementById('chart_div');
var $container = jQuery(container);

function degrees_to_radians(degrees) {
    var pi = Math.PI;
    return degrees * (pi / 180);
}


function drawChart1(ctx, data, type = 'line') {

    const vPlugin = {
        afterDatasetsDraw: function (chart, easing) {
            window.chart = chart;
            chart.ctx.fillStyle = "#0F0F0F";
            chart.ctx.font = "16px arial";
            chart.ctx.fillText("Country", chart.width / 2, chart.height - 10);
            chart.ctx.save();
            chart.ctx.translate(25, chart.height / 2);
            chart.ctx.rotate(degrees_to_radians(270));
            chart.ctx.fillText("Report index value", 1, 0);
            chart.ctx.restore();


        }
    };

    Chart.plugins.register(vPlugin);



    if (true) {
        switch (type) {
            case 'line':
            case 'bar':
            case 'pie':

                var myLineChart = new Chart(ctx, {
                    type: type,
                    data: data,
                    options: {
                        layout: {
                            padding: {
                                left: 50,
                                right: 0,
                                bottom: 50,
                                top: 100,
                            }
                        },
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                }
                            }]
                        },
                        legend: false,
                        tooltip: false,
                        showTooltips: false,
                        plugins: {
                            datalabels: {
                                align: function (context) {
                                    var index = context.dataIndex;
                                    var value = context.dataset.data[index];
                                    var invert = Math.abs(value) <= 1;
                                    return value < 1 ? 'end' : 'start'
                                },
                                anchor: 'end',
                                backgroundColor: null,
                                borderColor: null,
                                borderRadius: 4,
                                borderWidth: 1,
                                color: '#223388',
                                font: {
                                    size: 14,
                                    weight: 600
                                },
                                offset: 4,
                                padding: 0,
                                formatter: function (value) {
                                    if (Number.isNaN(value)) {
                                        return "";
                                    }
                                    return value;
                                }
                            }
                        }
                    },
                    showTooltips: true,
                    tooltip: true,

                });

                break;
            default:
                var myLineChart = new Chart(ctx, {
                    type: type,
                    data: data,
                    options: {
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                }
                            }]
                        }
                    },
                    showTooltips: true,
                    tooltip: true,
                });
                break;
        }


        return;

    } else {
        var myLineChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                datasets: [{
                        label: '# of Votes',
                        data: [12, 19, 3, 5, 2, 3],
                        backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                        borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                        borderWidth: 1
                },
                    {
                        label: '# Andnan',
                        data: [5, 7, 2, 15, 12, 23],
                        backgroundColor: [
                                   'rgba(75, 192, 192, 1)',
                                   'green',
                                   'rgba(153, 102, 255, 1)',
                                   'blue',
                                   'red',
                                   'rgba(255, 159, 64, 1)'
                               ],
                        borderColor: [
                                   'rgba(75, 192, 192, 1)',
                                   'green',
                                   'rgba(153, 102, 255, 1)',
                                   'blue',
                                   'red',
                                   'rgba(255, 159, 64, 1)'
                               ],
                        borderWidth: 1
                           }
                          ]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    }
    //
    //    return;
    //    var myChart = new Chart(ctx, {
    //        type: 'bar',
    //        data: {
    //            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    //            datasets: [{
    //                label: '# of Votes',
    //                data: [12, 19, 3, 5, 2, 3],
    //                backgroundColor: [
    //                    'rgba(255, 99, 132, 0.2)',
    //                    'rgba(54, 162, 235, 0.2)',
    //                    'rgba(255, 206, 86, 0.2)',
    //                    'rgba(75, 192, 192, 0.2)',
    //                    'rgba(153, 102, 255, 0.2)',
    //                    'rgba(255, 159, 64, 0.2)'
    //                ],
    //                borderColor: [
    //                    'rgba(255, 99, 132, 1)',
    //                    'rgba(54, 162, 235, 1)',
    //                    'rgba(255, 206, 86, 1)',
    //                    'rgba(75, 192, 192, 1)',
    //                    'rgba(153, 102, 255, 1)',
    //                    'rgba(255, 159, 64, 1)'
    //                ],
    //                borderWidth: 1
    //            },
    //                       {
    //                           label: '# Andnan',
    //                           data: [5, 7, 2, 15, 12, 23],
    //                           backgroundColor: [
    //                               'rgba(75, 192, 192, 1)',
    //                               'green',
    //                               'rgba(153, 102, 255, 1)',
    //                               'blue',
    //                               'red',
    //                               'rgba(255, 159, 64, 1)'
    //                           ],
    //                           borderColor: [
    //                               'rgba(75, 192, 192, 1)',
    //                               'green',
    //                               'rgba(153, 102, 255, 1)',
    //                               'blue',
    //                               'red',
    //                               'rgba(255, 159, 64, 1)'
    //                           ],
    //                           borderWidth: 1
    //                       }
    //                      ]
    //        },
    //        options: {
    //            scales: {
    //                yAxes: [{
    //                    ticks: {
    //                        beginAtZero: true
    //                    }
    //                }]
    //            }
    //        }
    //    });

}

var $countries_checkboxes = jQuery('.country-checkbox');
var $criteria_checkboxes = jQuery('.criteria-checkbox');
var $type_select = jQuery('#char-type-select');
//hide chart type 
$type_select.css('display', 'none');


$countries_checkboxes.on('change', drawChart);
$type_select.on('change', drawChart);
$criteria_checkboxes.on('change', criteria_selected);

function criteria_selected() {
    //hide chart
    hideChart();

    //select Pakistan by default
    jQuery('[data-name="Pakistan"]').prop('checked', true);
    jQuery('[data-name="Pakistan"]').closest('label').addClass('active');
    jQuery('[data-name="Pakistan"]').closest('label').addClass('disabled');
    jQuery('[data-name="Pakistan"]').prop('disabled', true);


    var anyChecked = 0;

    $countries_checkboxes.each(function (i, el) {
        var $el = jQuery(el);
        $el.closest('label').css('display', 'none');
        if (el.checked) {
            anyChecked++;
        }
        //        el.checked = false;
    });
    var criteria_checked = [];
    var countries_to_show = [];
    $criteria_checkboxes.each(function (i, el) {
        var $this = jQuery(el);
        if (el.checked) {
            var value = $this.val();
            criteria_checked.push(value);
            //console.log(boi_graph_data.criterias[value].countries);
            for (country of boi_graph_data.criterias[value].countries) {
                $abc = $countries_checkboxes.filter(function (i, el) {
                    return el.value == country;
                });
                //console.log('abc is ', $abc);

                $abc.each(function (i, el) {
                    //console.log(jQuery(el).closest('label'));
                    jQuery(el).closest('label').css('display', 'block');
                });

                if (countries_to_show.indexOf(country) === -1) {
                    countries_to_show.push(country);
                }
            }
        }
    });

    if (criteria_checked.length == 0) {
        jQuery('.countries-input').addClass('disabled');
        jQuery('.countries-input input').prop('disabled', true);
    } else {
        jQuery('.countries-input').removeClass('disabled');
        jQuery('.countries-input input').prop('disabled', false);
    }



    if (anyChecked >= 2) {
        $type_select.css('display', 'block');
        drawChart();
    } else {
        hideChart();
    }


}


function hideChart() {
    //hide chart
    $container.html('');
    $type_select.css('display', 'none');

}


function drawChart() {

    dataforpdf = [];
    //select Pakistan by default
    jQuery('[data-name="Pakistan"]').prop('checked', true);
    jQuery('[data-name="Pakistan"]').closest('label').addClass('active');

    var anyChecked = 0;

    $countries_checkboxes.each(function (i, el) {
        var $el = jQuery(el);

        if (el.checked) {
            anyChecked++;
        }
        //        el.checked = false;
    });

    if (anyChecked < 2) {
        hideChart();
        return;
    }


    $type_select.css('display', 'block');
    var countries_checked = [];
    var criteria_checked = [];
    var chart_type = $type_select.val();





    var data = {
        labels: [],
        datasets: []
    };

    //add empty label at start
    data.labels.push('');

    $countries_checkboxes.each(function (i, el) {
        var $this = jQuery(el);
        if (el.checked) {
            countries_checked.push($this.val());
            data.labels.push($this.attr('data-name'));
        }
    });

    $criteria_checkboxes.each(function (i, el) {
        var $this = jQuery(el);
        if (el.checked) {
            criteria_checked.push($this.val());
        }
    });



    //console.log('%cCheckboxes country and criteria', 'background:black;color:white;');
    //console.log(countries_checked);
    //console.log(criteria_checked);

    //console.log('%cStarting loop countries is', 'background:black;color:white;');
    var countries = {};
    //console.log(countries);



    var bgcolors = [
        "#63b598", "#ce7d78", "#ea9e70", "#a48a9e", "#c6e1e8", "#648177", "#0d5ac1",
        "#f205e6", "#1c0365", "#14a9ad", "#4ca2f9", "#a4e43f", "#d298e2", "#6119d0",
        "#d2737d", "#c0a43c", "#f2510e", "#651be6", "#79806e", "#61da5e", "#cd2f00",
        "#9348af", "#01ac53", "#c5a4fb", "#996635", "#b11573", "#4bb473", "#75d89e",
        "#2f3f94", "#2f7b99", "#da967d", "#34891f", "#b0d87b", "#ca4751", "#7e50a8",
        "#c4d647", "#e0eeb8", "#11dec1", "#289812", "#566ca0", "#ffdbe1", "#2f1179",
        "#935b6d", "#916988", "#513d98", "#aead3a", "#9e6d71", "#4b5bdc", "#0cd36d",
        "#250662", "#cb5bea", "#228916", "#ac3e1b", "#df514a", "#539397", "#880977",
        "#f697c1", "#ba96ce", "#679c9d", "#c6c42c", "#5d2c52", "#48b41b", "#e1cf3b",
        "#5be4f0", "#57c4d8", "#a4d17a", "#225b8", "#be608b", "#96b00c", "#088baf",
        "#f158bf", "#e145ba", "#ee91e3", "#05d371", "#5426e0", "#4834d0", "#802234",
        "#6749e8", "#0971f0", "#8fb413", "#b2b4f0", "#c3c89d", "#c9a941", "#41d158",
        "#fb21a3", "#51aed9", "#5bb32d", "#807fb", "#21538e", "#89d534", "#d36647",
        "#7fb411", "#0023b8", "#3b8c2a", "#986b53", "#f50422", "#983f7a", "#ea24a3",
        "#79352c", "#521250", "#c79ed2", "#d6dd92", "#e33e52", "#b2be57", "#fa06ec",
        "#1bb699", "#6b2e5f", "#64820f", "#1c271", "#21538e", "#89d534", "#d36647",
        "#7fb411", "#0023b8", "#3b8c2a", "#986b53", "#f50422", "#983f7a", "#ea24a3",
        "#79352c", "#521250", "#c79ed2", "#d6dd92", "#e33e52", "#b2be57", "#fa06ec",
        "#1bb699", "#6b2e5f", "#64820f", "#1c271", "#9cb64a", "#996c48", "#9ab9b7",
        "#06e052", "#e3a481", "#0eb621", "#fc458e", "#b2db15", "#aa226d", "#792ed8",
        "#73872a", "#520d3a", "#cefcb8", "#a5b3d9", "#7d1d85", "#c4fd57", "#f1ae16",
        "#8fe22a", "#ef6e3c", "#243eeb", "#1dc18", "#dd93fd", "#3f8473", "#e7dbce",
        "#421f79", "#7a3d93", "#635f6d", "#93f2d7", "#9b5c2a", "#15b9ee", "#0f5997",
        "#409188", "#911e20", "#1350ce", "#10e5b1", "#fff4d7", "#cb2582", "#ce00be",
        "#32d5d6", "#17232", "#608572", "#c79bc2", "#00f87c", "#77772a", "#6995ba",
        "#fc6b57", "#f07815", "#8fd883", "#060e27", "#96e591", "#21d52e", "#d00043",
        "#b47162", "#1ec227", "#4f0f6f", "#1d1d58", "#947002", "#bde052", "#e08c56",
        "#28fcfd", "#bb09b", "#36486a", "#d02e29", "#1ae6db", "#3e464c", "#a84a8f",
        "#911e7e", "#3f16d9", "#0f525f", "#ac7c0a", "#b4c086", "#c9d730", "#30cc49",
        "#3d6751", "#fb4c03", "#640fc1", "#62c03e", "#d3493a", "#88aa0b", "#406df9",
        "#615af0", "#4be47", "#2a3434", "#4a543f", "#79bca0", "#a8b8d4", "#00efd4",
        "#7ad236", "#7260d8", "#1deaa7", "#06f43a", "#823c59", "#e3d94c", "#dc1c06",
        "#f53b2a", "#b46238", "#2dfff6", "#a82b89", "#1a8011", "#436a9f", "#1a806a",
        "#4cf09d", "#c188a2", "#67eb4b", "#b308d3", "#fc7e41", "#af3101", "#ff065",
        "#71b1f4", "#a2f8a5", "#e23dd0", "#d3486d", "#00f7f9", "#474893", "#3cec35",
        "#1c65cb", "#5d1d0c", "#2d7d2a", "#ff3420", "#5cdd87", "#a259a4", "#e4ac44",
        "#1bede6", "#8798a4", "#d7790f", "#b2c24f", "#de73c2", "#d70a9c", "#25b67",
        "#88e9b8", "#c2b0e2", "#86e98f", "#ae90e2", "#1a806b", "#436a9e", "#0ec0ff",
        "#f812b3", "#b17fc9", "#8d6c2f", "#d3277a", "#2ca1ae", "#9685eb", "#8a96c6",
        "#dba2e6", "#76fc1b", "#608fa4", "#20f6ba", "#07d7f6", "#dce77a", "#77ecca"];
    var i = -1;
    for (criteria of criteria_checked) {
        i++;
        var dataset = {
            spanGaps: false,
            label: boi_graph_data.criterias[criteria].name,
            data: [],
            backgroundColor: ['rgba(0,0,0,0)'],
            borderColor: [],
            borderWidth: 1,
            lineTension: 0,
        };

        //add NaN for start empty label
        dataset.data.push(NaN);

        if (chart_type == 'line') {
            dataset.borderColor.push(colors[i]);
        }
        /*else if(chart_type == 'bar')
                {
                    dataset.borderColor = colors;
                    dataset.backgroundColor = colors;
                }*/

        if (chart_type == 'pie') {
            dataset.backgroundColor = [...colors.slice(0, countries_checked.length + 1)];
            console.log("COLORS ARE", dataset.backgroundColor);
            //            dataset.backgroundColor = colors;
        }

        for (country_id of countries_checked) {
            if (chart_type == 'bar') {
                dataset.borderColor.push(colors[i]);
                dataset.backgroundColor.push(bgcolors[i]);
            }

            var country = boi_graph_data.countries[country_id];
            if (country.criterias_values[criteria]) {
                dataforpdf.push({
                    graphValue: country.criterias_values[criteria].value,
                    criteria_id: criteria,
                    country_id: country_id
                });
                dataset.data.push(country.criterias_values[criteria].value);
            } else {
                dataset.data.push(NaN);
            }

        }

        //add NaN for end empty label
        dataset.data.push(NaN);

        data.datasets.push(dataset);
    }

    //add empty label at end
    data.labels.push('');

    //console.log('%cAt end of the loop', 'background:black;color:white;');

    //console.log(countries);
    //console.log('%cData', 'background:red;color:white;');
    //console.log(data);


    container.innerHTML = "";
    var canvas = document.createElement('canvas');
    var pdfButton = document.createElement('button');
    pdfButton.innerHTML = "<i class='fa fa-file-pdf-o' aria-hidden='true'></i>Download as PDF";
    pdfButton.addEventListener("click", () => {
        downloadPDF2(canvas);
    });
    var excelbutton = document.createElement('button');
    excelbutton.innerHTML = "<i class='fa fa-file-excel-o' aria-hidden='true'></i>Download as Excel";
    excelbutton.addEventListener("click", () => {
        downloadExcel(data);
    });

    var fullScreenButton = document.createElement('button');
    fullScreenButton.innerHTML = "<i class='fa fa-expand' aria-hidden='true'></i><i class='fa fa-compress' aria-hidden='true'></i>";
    fullScreenButton.addEventListener("click", () => {
        fullScreen();
    });

    canvas.height = 300;
    container.appendChild(pdfButton);
    container.appendChild(excelbutton);
    container.appendChild(fullScreenButton);
    container.appendChild(canvas);
    var ctx = canvas.getContext('2d');
    //    ctx.fillStyle = "white";
    //    ctx.fillRect(0,0, canvas.width, canvas.height);
    console.log(data);
    drawChart1(ctx, data, chart_type);

    var str = "<ul>";
    var i = 0;
    jQuery(".criterias-wrapper-sub input").each(function () {
        if (jQuery(this).is(":checked")) {
            var checkedCriterai = jQuery(this).attr("data-name");
            str += "<li><span class='colorsWrap' style='background:" + colors[i] + "'></span>" + checkedCriterai + "</li>";
            i++;
        }
    });
    str += "</ul>";
    jQuery("#chart_div").append("<div class='custom-lengeds'>" + str + "</div>");
    var creterialength = jQuery(".custom-lengeds ul li").length;

    if (creterialength > 9) {
        jQuery(".custom-lengeds").after("<a href='javascript:void(0)' class='see-all'>See More</a>")
        jQuery(".custom-lengeds").addClass("show-less");
        jQuery("a.see-all").on("click", function () {
            jQuery(".custom-lengeds").toggleClass("show-less");
            if (jQuery(".custom-lengeds").hasClass("show-less")) {
                jQuery("a.see-all").text("See More");
            } else {
                jQuery("a.see-all").text("See Less")
            }
        });
    }
}

//download pdf form hidden canvas
//download pdf form hidden canvas
function downloadPDF2(newCanvas) {
    //create image from dummy canvas
    var newCanvasImg = newCanvas.toDataURL("image/jpeg", 1.0);
    var ctx = newCanvas.getContext("2d");

    imgdata = ctx.getImageData(0, 0, newCanvas.width, newCanvas.height);


    ctx.putImageData(imgdata, 0, 0);
    let www = newCanvas.width;
    let hhh = newCanvas.height;
    let nww = 290;
    let nhh = nww / www * hhh;

    let tmpCanvas = document.createElement("canvas");
    let tmpCtx = tmpCanvas.getContext("2d");
    let tmpW = tmpCanvas.width = 3;
    let tmpH = tmpCanvas.height = 3;




    let boxesImages = [];
    //creates PDF from img
    let y = 60;
    let x = 30;
    let boxMargin = 1;
    var doc = new jsPDF('portrait', 'mm', [400, 700]);
    doc.setFontSize(12);
    var colorIndex = 0;
    var criteria = ["Country"];

    jQuery(".criterias-wrapper-sub input").each(function () {
        if (jQuery(this).is(":checked")) {
            var checkedCriterai = jQuery(this).attr("data-name");
            doc.setFontSize(12);
            doc.text(x, y, `${checkedCriterai}`);

            tmpCtx.clearRect(0, 0, tmpH, tmpW);
            tmpCtx.fillStyle = colors[colorIndex];
            tmpCtx.fillRect(0, 0, tmpH, tmpW);
            var boxImage = tmpCanvas.toDataURL("image/jpeg", 1.0);
            boxesImages.push(boxImage);
            doc.addImage(boxImage, 'JPEG', x - tmpW - boxMargin, y - tmpH, tmpW, tmpH);

            y += 6;
            colorIndex++;
            criteria.push(checkedCriterai);

        }
    });

    var checkedcountry = [];




    jQuery(".countries-wrapper input").each(function () {
        if (jQuery(this).is(":checked")) {
            var contryValue = jQuery(this).val();
            var conuntryName = jQuery(this).attr("data-name");
            var countryId = this.value;
            var subCountry = [conuntryName];
            jQuery(".criterias-wrapper-sub input").each(function () {
                    if (jQuery(this).is(":checked")) {
                      var creteriaDataName =  jQuery(this).attr("data-name");
                        var criteriaId = this.value;
                        if(boi_graph_data.countries[countryId] && boi_graph_data.countries[countryId].criterias_values[criteriaId]){
                            subCountry.push(boi_graph_data.countries[countryId].criterias_values[criteriaId].value);
                            }
                        else{
                            subCountry.push("-")
                          }
                    }
                });
     
            checkedcountry.push(subCountry);
      }
    });

    doc.autoTable({
        startY: 350,
        head: [criteria],
        body: checkedcountry
    });

    doc.addImage(newCanvasImg, 'JPEG', 100, 5, nww, nhh);
    doc.save('Compare Pakistan.pdf');
}
function downloadExcel(data) {

    var countries_checked = [];
    var criteria_checked = [];

    $countries_checkboxes.each(function (i, el) {
        var $this = jQuery(el);
        if (el.checked) {
            countries_checked.push($this.val());
            //            data.labels.push($this.attr('data-name'));
        }
    });

    $criteria_checkboxes.each(function (i, el) {
        var $this = jQuery(el);
        if (el.checked) {
            criteria_checked.push($this.val());
        }
    });

    //console.log(countries_checked);

    output = [];
    outstring = "";
    header = [];
    header.push({
        text: "Country/Criterias"
    });
    outstring += "Country/Criterias\t";
    for (const crit of criteria_checked) {
        header.push({
            text: boi_graph_data.criterias[crit].name
        });
        outstring += boi_graph_data.criterias[crit].name + "\t";
    }

    output.push(header);
    outstring += "\n\r";

    for (const cont of countries_checked) {
        var out = [{
            text: boi_graph_data.countries[cont].name
        }];
        outstring += boi_graph_data.countries[cont].name + "\t";
        for (const crit of criteria_checked) {
            console.log(boi_graph_data.countries[cont].criterias_values, crit);
            if (boi_graph_data.countries[cont].criterias_values[crit]) {
                text = boi_graph_data.countries[cont].criterias_values[crit].value;
            } else {
                text = "";
            }
            out.push({
                text: text
            });
            outstring += text + "\t";
        }
        output.push(out);
        outstring += "\n\r";
    }



    var tableData = [{
        "sheetName": "Sheet1",
        "data": output
    }];


    var options = {
        fileName: "Export xlsx Sipmle Sheet"
    };
    Jhxlsx.export(tableData, options);
}

function fullScreen() {
    jQuery(".chart-type-select-wrapper").toggleClass("fullscreen");
}
// jQuery(".criterias-wrapper input[type='checkbox']").on("click",function(){
// 	var z = jQuery(this).val();
// 	alert("asd");
// 	console.log(z);
// });

jQuery(".criteria-input").on("click", function () {
    if (jQuery(this).find("input").is(":checked")) {
        jQuery(".criterias-wrapper input").prop('checked', true);
        jQuery(".criterias-wrapper label").addClass('active');

    } else {
        jQuery(".criterias-wrapper input").prop('checked', false);
        jQuery(".criterias-wrapper label").removeClass('active');
        jQuery(".countries-wrapper input").prop('checked', false);
        jQuery(".countries-wrapper label").removeClass('active');
        jQuery(".countries-input").removeClass('active');
        jQuery(".countries-input input").prop('checked', false);



    }
    criteria_selected();
});

jQuery(".countries-input").on("click", function () {
    jQuery('[data-name="Pakistan"]').prop('checked', true);
    if (jQuery(this).find("input").is(":checked")) {
        jQuery(".countries-wrapper input").prop('checked', true);
        jQuery(".countries-wrapper label").addClass('active');
    } else {
        jQuery(".countries-wrapper input").prop('checked', false);
        jQuery(".countries-wrapper label").removeClass('active');
    }
    drawChart();
});

jQuery('.countries-input').addClass('disabled');
jQuery('.countries-input input').prop('disabled', true);
