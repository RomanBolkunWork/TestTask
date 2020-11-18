import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { ApiService } from './services/api.service';
import * as moment from 'moment';

declare var require: any;
const Boost = require('highcharts/modules/boost');
const noData = require('highcharts/modules/no-data-to-display');
const More = require('highcharts/highcharts-more');

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    file: File;
    fileFormat = '.csv';
    isLoaded = false;

    constructor(
        private apiService: ApiService
    ) { }

    ngOnInit(): void {
    }

    uploadFile(): void {
        this.apiService.processFile(this.file).subscribe(result => {
            this.isLoaded = true;

            const chartOptions: Highcharts.Options = {
                chart: {
                    type: 'spline'
                },
                title: {
                    text: 'Complex Percentage'
                },
                xAxis: {
                    type: 'datetime',
                    dateTimeLabelFormats: {
                        month: '%e. %b',
                        year: '%b'
                    },
                    title: {
                        text: 'Date'
                    }
                },
                yAxis: {
                    title: {
                        text: 'Percentage (%)'
                    },
                    labels: {
                        format: '{value:.,0f}'
                    },
                    min: 0
                },
                tooltip: {
                    pointFormat: '{point.y:.2f}%'
                },
                series: [
                    {
                        type: undefined,
                        name: 'Percentage',
                        data: result.map(x => {
                            const date = moment(x.date);
                            return [Date.UTC(date.year(), date.month() + 1, date.date()), x.value];
                        })
                    }
                ]
            };

            Highcharts.chart('container', chartOptions);
        });
    }
}
