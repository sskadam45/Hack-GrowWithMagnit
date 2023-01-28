import { Question } from './../models';
import { Component } from '@angular/core';
import { UtilsService } from '../utils.service';

@Component({
  selector: 'app-emp-metrics',
  templateUrl: './emp-metrics.component.html',
  styleUrls: ['./emp-metrics.component.css']
})
export class EmpMetricsComponent {
	traningMatrics: any;
	foodMatrics: any;
	dps: any;
	chart: any;
	happinesMetrics: any;
	officeMetrics: any;
	totalEmpHappynessMatirx: any;
	constructor(private utilService: UtilsService) { }
	ngOnInit(): void {
		this.buildMagnitTrainingMatrics(1);
		this.buildFoodMetrics(6);
		this.initChart();
		this.buildOfficeLocationMetrics(8);
		this.buildEmployeeHappinessMetrics();
	}

	buildMagnitTrainingMatrics(id: number){
		this.utilService.getQuestionById(id).subscribe((data: any) => {
			const chartOptions = {
				animationEnabled: true,
				theme: "dark2",
				exportEnabled: true,
				title: {
				text: "Magnit Employee Training Metrics"
				},
				subtitles: [{
				text: data[0].title
				}],
				data: [{
				type: "pie", //change type to column, line, area, doughnut, etc
				indexLabel: "{name}: {y}%",
				dataPoints: [
				]
				}]
			}
			const total = data.length;
			const filterNo = data.filter((e:any) => e.selected == 'No');
			const pieDataPoints: any = [
				{ name: 'Yes,We Love Magnit Traning',y: total-filterNo.length},
				{ name: 'No, We Dont Love Magnit Traning',y: filterNo.length}
			];
			chartOptions.data[0].dataPoints = pieDataPoints
			this.traningMatrics = chartOptions;
		});
	}

	buildFoodMetrics(id:number) {
		this.utilService.getQuestionById(id).subscribe((data: any) => {

			const bhlCnt = data.filter((e:any) => e.selected == 'Bhel').length;
			const pizCnt = data.filter((e:any) => e.selected == 'Pizza').length;
			const tacCnt = data.filter((e:any) => e.selected == 'Tacos').length;
			const othCnt = data.filter((e:any) => e.selected == 'None').length;

				const chartOptions = {
				title: {
					text: "Magnit restaurent Food Metrics"
				},
				subtitles: [{
					text: data[0].title
					}],
				theme: "light2",
				animationEnabled: true,
				exportEnabled: true,
				axisY: {
				includeZero: true,
				valueFormatString: ",##0"
				},
				data: [{
					type: "column", //change type to bar, line, area, pie, etc
					yValueFormatString: ",##0 Employees",
					color: "#01b8aa",
					dataPoints: [
							{ label: "Bhel", y: bhlCnt },
							{ label: "Pizza", y: pizCnt },
							{ label: "Tacos", y: tacCnt },
							{ label: "Other", y: othCnt }
						]
					}]
			}
			this.foodMatrics = chartOptions;
			
		});
	}
	initChart(){
		this.dps = [{x: 1, y: 10}, {x: 2, y: 3}, {x: 3, y: 8}, {x: 4, y: 2}, {x: 5, y: 7},{x: 6, y: 10}, {x: 7, y: 1}, {x: 8, y: 8}, {x: 9, y: 2}, {x: 10, y: 7}];
		this.happinesMetrics = {
		exportEnabled: true,
		title: {
			text: "Daily Happiness Metrics Dynamic Chart"
		},
		subtitles: [{
			text: ''
			}],
			axisY: {
				includeZero: true,
				valueFormatString: ",##0 Yes"
			},
		data: [{
			type: "line",
			yValueFormatString: ",##0 Employees Voted Yes",
			dataPoints: this.dps
		}]
		}
	}

	buildDailyHappinessMetrics = () => {
		this.utilService.getQuestionById(3).subscribe((data: any) => {
			this.happinesMetrics.subtitles[0].text = data[0].title;
			const yesCnt = data.filter((e:any) => e.selected == 'Yes').length;
			this.dps.push({x: this.dps[this.dps.length - 1].x + 1, y: yesCnt});
 
			if (this.dps.length >  10 ) {
				this.dps.shift();
			}
			this.chart.render();
			setTimeout(this.buildDailyHappinessMetrics, 3000); //Chart updated every 3 second
		});
	}	
	getChartInstance(chart: object) {
		this.chart = chart;
		setTimeout(this.buildDailyHappinessMetrics, 3000); //Chart updated every 3 second
	}
	
	buildOfficeLocationMetrics(id:number) {
		this.utilService.getQuestionById(id).subscribe((data: any) => {

			const pCnt = data.filter((e:any) => e.selected == 'Pune Office').length;
			const bCnt = data.filter((e:any) => e.selected == 'Benglore Office').length;
			const rCnt = data.filter((e:any) => e.selected == 'Remote Only').length;
			const hCnt = data.filter((e:any) => e.selected == 'Hybrid Model').length;

				const chartOptions = {
				title: {
					text: "Magnit Prefered Office Location Metrics"
				},
				subtitles: [{
					text: data[7].title
					}],
				theme: "dark2",
				animationEnabled: true,
				exportEnabled: true,
				axisY: {
				includeZero: true,
				valueFormatString: ",##0"
				},
				data: [{
					type: "column", //change type to bar, line, area, pie, etc
					yValueFormatString: ",##0 Employees",
					//color: "#01b8aa",
					dataPoints: [
							{ label: "Pune Office", y: pCnt },
							{ label: "Benglore Office", y: bCnt },
							{ label: "Remote Only", y: rCnt },
							{ label: "Hybrid Model", y: hCnt }
						]
					}]
			}
			this.officeMetrics = chartOptions;
			
		});
	}


	buildEmployeeHappinessMetrics(){
		  this.utilService.getAllQuestions().subscribe((data:any)=>{
			const queIds = [2,3,4,5]
			const filterData = data.filter( (e : any) => queIds.includes(e.queId));
			const total = filterData.length;
			const posCount = filterData.filter((e:any) => e.weight == 100).length;
			const negCount = total - posCount;
			console.log(posCount,negCount);
			const chartOptions = {
				animationEnabled: true,
				title:{
				  text: "OverAll Employee Satisfaction Metrics"
				},
				data: [{
				  type: "doughnut",
				  yValueFormatString: "#,###.##",
				  indexLabel: "{name}",
				  dataPoints: [
					{ y: posCount, name: "Epmloyees Are Positive About Company" },
					{ y: negCount, name: "Epmloyees Are Not-Positive About Company" }
				  ]
				}]
			  }

			  this.totalEmpHappynessMatirx = chartOptions;
		  })
		  
	}
}