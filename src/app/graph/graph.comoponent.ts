import { Component, OnInit } from '@angular/core';

import{Chart,registerables}from 'node_modules/chart.js';
Chart.register(...registerables);


import { HttpClient } from "@angular/common/http";
import { RestDataSource } from '../model/rest.datasource';
import { ActivatedRoute } from '@angular/router';


@Component({
    selector: 'graph-data',
    templateUrl: 'graph.component.html'
})

export class GraphComponent implements OnInit{
    propertyReport!:any;
    pid?:number;
    
   
    constructor(
     private datasource:RestDataSource,private http:HttpClient,private activeRouter:ActivatedRoute) { 
      // repo.subscribeDailyReport()
      // console.log("=============")
    }

   
    ngOnInit() {
      this.pid=this.activeRouter.snapshot.params["id"];
      console.log(this.pid);
      
        this.datasource.getProperty(this.pid!).subscribe(data=>{
          this.propertyReport=data
          console.log(data);
          
          //this.remained=data.remainingUnits
         // this.total=this.propertyReport.totalUnits
         // console.log(this.remained+" "+this.total);
          
          this.RenderPropertyChart()
        })
        // this.datasource.getReportsMonthly().subscribe(data=>{
        //     this.monthlyReport=data
        //     this.RenderMonthlyChart()
        // })
        // this.datasource.getReportsYearly().subscribe(data=>{
        //   this.yearlyReport=data
        //   this.RenderYearlyChart()
        // })
      }
      RenderPropertyChart()
    {
          new Chart("propertychart", {
            type: 'pie',
            data: {
              labels:['totalUnits ','remainingUnits'],
              datasets: [{
                label: 'Units',
                data:[this.propertyReport.totalUnits,this.propertyReport.remainingUnits],
                borderWidth: 1
              }]
            },
            options: {
              scales: {
                y: {
                  beginAtZero: true
                }
              }
            }
          });
    }
    
}