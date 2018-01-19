

        queue()
            .defer(d3.json, "/data")
    
            .await(makeGraphs);
            
            
        
        function makeGraphs(error, TotalData) {
            var ndx = crossfilter(TotalData);
            
          
    // ................................................................................MANPOWER Ranked
            var GFPRank_dim = ndx.dimension(dc.pluck('Country'));

            var GFPRank_group = GFPRank_dim.group().reduceSum(function(d) {
                if (d.Type === "Power_Index_rating") {
                    return d.Count;
                } else {
                    return 0;
                }
            });


            console.log(GFPRank_group.all());
            
            var GFPBar = dc.rowChart("#GFPRank");
            
            GFPBar
                .width(580)
                .height(400)
                .dimension(GFPRank_dim)
                .group(GFPRank_group)
                .xAxis().ticks(9);
        
    // ................................................................................Manpower Fixed 
        
        
            var TotalPop_dim = ndx.dimension(dc.pluck("Country"));
            var TotalPop_group = TotalPop_dim.group().reduceSum(function(d) {
                if (d.Type === "Total_Population") {
                    return d.Count;
                } else {
                    return 0;
                }
            });
            

            var PopChart = dc.barChart ("#TotalPopBar");
                
                PopChart
                    .width(580)
                    .height(400)
                    .margins({top: 50, right: 50, bottom: 40, left: 80})
                    .dimension(TotalPop_dim)
                    .group(TotalPop_group)
                    .transitionDuration(700)
                    .x(d3.scale.ordinal().domain(["USA","Russia","China","India","France","UK","Japan","Turkey","Germany","Egypt"]))
                    .xUnits(dc.units.ordinal)
                    .xAxisLabel("Country")
                    .yAxisLabel("Population")
                    .renderlet(function (chart) {
        
                        var gLabels = chart.select(".labels");
                        if (gLabels.empty()){
                            gLabels = chart.select(".chart-body").append('g').classed('labels', true);
                        }
                        
                        var gLabelsData = gLabels.selectAll("text").data(chart.selectAll(".bar")[0]);
                        
                        gLabelsData.exit().remove(); //Remove unused elements
                        
                        gLabelsData.enter().append("text"); //Add new elements
                        
                        gLabelsData
                        .attr('text-anchor', 'middle')
                        .attr('fill', 'white')
                        .text(function(d){
                            return d3.select(d).data()[0].data.value
                        })
                        .attr('x', function(d){ 
                            return +d.getAttribute('x') + (d.getAttribute('width')/1.2); 
                        })
                        .attr('y', function(d){ return +d.getAttribute('y') + 18; })
                        .attr('style', function(d){
                            if (+d.getAttribute('height') < 20) return "display:none";
                        });
                        
                    });
           
                


            
            var Manpower_dim = ndx.dimension(dc.pluck('Country'));
            var Manpower_group = Manpower_dim.group().reduceSum(function(d) {
                if (d.Type === "Manpower_Available") {
                    return d.Count;
                } else {
                    return 0;
                }
            });
            var ReachingAgeByCountry = Manpower_dim.group().reduceSum(function(d) {
                if (d.Type === "Reaching_Military_Age") {
                    return d.Count;
                } else {
                    return 0;
                }
            });
            var MilChart = dc.barChart ("#ManpowerStack");
                
                MilChart
                    .width(580)
                    .height(400)
                    .margins({top: 50, right: 50, bottom: 40, left: 80})
                    .dimension(Manpower_dim)
                    .group(Manpower_group, "Manpower Available")
                    .stack(ReachingAgeByCountry, "Reaching Military Age")
                    .transitionDuration(700)
                    .x(d3.scale.ordinal().domain(["USA","Russia","China","India","France","UK","Japan","Turkey","Germany","Egypt"]))
                    .xUnits(dc.units.ordinal)
                    .xAxisLabel("Country")
                    .yAxisLabel("Military Personnel")
                    .legend(dc.legend().x(400).y(10).itemHeight(13).gap(5))
                    .renderlet(function (chart) {
        
                        var gLabels = chart.select(".labels");
                        if (gLabels.empty()){
                            gLabels = chart.select(".chart-body").append('g').classed('labels', true);
                        }
                        
                        var gLabelsData = gLabels.selectAll("text").data(chart.selectAll(".bar")[0]);
                        
                        gLabelsData.exit().remove(); //Remove unused elements
                        
                        gLabelsData.enter().append("text"); //Add new elements
                        
                        gLabelsData
                        .attr('text-anchor', 'middle')
                        .attr('fill', 'white')
                        .text(function(d){
                            return d3.select(d).data()[0].data.value
                        })
                        .attr('x', function(d){ 
                            return +d.getAttribute('x') + (d.getAttribute('width')/1.2); 
                        })
                        .attr('y', function(d){ return +d.getAttribute('y') + 15; })
                        .attr('style', function(d){
                            if (+d.getAttribute('height') < 18) return "display:none";
                        });
                        
                    });
            
            
            
            
            
            
            
            var TotalPersonnel_dim = ndx.dimension(dc.pluck('Country'));
            var ActivePersByCountry = TotalPersonnel_dim.group().reduceSum(function(d) {
                if (d.Type === "Active_Personnel") {
                    return d.Count;
                } else {
                    return 0;
                }
            });
            var ReservePersByCountry = TotalPersonnel_dim.group().reduceSum(function(d) {
                if (d.Type === "Reserve_Personnel") {
                    return d.Count;
                } else {
                    return 0;
                }
            });
            var MilChart = dc.barChart ("#TotPersStack");
                
                MilChart
                    .width(580)
                    .height(400)
                    .margins({top: 50, right: 50, bottom: 40, left: 70})
                    .dimension(TotalPersonnel_dim)
                    .group(ActivePersByCountry, "Active Military Personnel")
                    .stack(ReservePersByCountry, "Reserve Military Personnel")
                    .transitionDuration(700)
                    .x(d3.scale.ordinal().domain(["USA","Russia","China","India","France","UK","Japan","Turkey","Germany","Egypt"]))
                    .xUnits(dc.units.ordinal)
                    .xAxisLabel("Country")
                    .yAxisLabel("Military Personnel")
                    .legend(dc.legend().x(400).y(10).itemHeight(13).gap(5))
                    .renderlet(function (chart) {
        
                        var gLabels = chart.select(".labels");
                        if (gLabels.empty()){
                            gLabels = chart.select(".chart-body").append('g').classed('labels', true);
                        }
                        
                        var gLabelsData = gLabels.selectAll("text").data(chart.selectAll(".bar")[0]);
                        
                        gLabelsData.exit().remove(); //Remove unused elements
                        
                        gLabelsData.enter().append("text"); //Add new elements
                        
                        gLabelsData
                        .attr('text-anchor', 'middle')
                        .attr('fill', 'white')
                        .text(function(d){
                            return d3.select(d).data()[0].data.value
                        })
                        .attr('x', function(d){ 
                            return +d.getAttribute('x') + (d.getAttribute('width')/1.6); 
                        })
                        .attr('y', function(d){ return +d.getAttribute('y') + 15; })
                        .attr('style', function(d){
                            if (+d.getAttribute('height') < 18) return "display:none";
                        });
                        
                    });
                
            
            
            
            
            
                
           
           
// ................................................................................           
    // ................................................................................AIRPOWER
            
            
            
            var TotalAir_dim = ndx.dimension(dc.pluck("Country"));
            var TotalAirStrByCountry = TotalAir_dim.group().reduceSum(function(d) {
                if (d.Type === "Total_Aircraft_Strength") {
                    return d.Count;
                } else {
                    return 0;
                }
            });
            
            // console.log(FightersByCountry.all())
            
            var stackedChart = dc.barChart ("#TotalAir")
                
                stackedChart
                    .width(580)
                    .height(400)
                    .margins({top: 50, right: 50, bottom: 40, left: 50})
                    .dimension(TotalAir_dim)
                    .group(TotalAirStrByCountry)
                    .x(d3.scale.ordinal().domain(["USA","Russia","China","India","France","UK","Japan","Turkey","Germany","Egypt"]))
                    .xUnits(dc.units.ordinal)
                    .xAxisLabel("Country")
                    .yAxisLabel("Total Aircraft Strength")
                    .renderlet(function (chart) {
        
                        var gLabels = chart.select(".labels");
                        if (gLabels.empty()){
                            gLabels = chart.select(".chart-body").append('g').classed('labels', true);
                        }
                        
                        var gLabelsData = gLabels.selectAll("text").data(chart.selectAll(".bar")[0]);
                        
                        gLabelsData.exit().remove(); //Remove unused elements
                        
                        gLabelsData.enter().append("text"); //Add new elements
                        
                        gLabelsData
                        .attr('text-anchor', 'middle')
                        .attr('fill', 'white')
                        .text(function(d){
                            return d3.select(d).data()[0].data.value
                        })
                        .attr('x', function(d){ 
                            return +d.getAttribute('x') + (d.getAttribute('width')/2); 
                        })
                        .attr('y', function(d){ return +d.getAttribute('y') + 13; })
                        .attr('style', function(d){
                            if (+d.getAttribute('height') < 14) return "display:none";
                        });
                        
                    });
            
            
            
            
            
            
    
            var AirBreak_dim = ndx.dimension(dc.pluck("Country"));
            var FightersByCountry = AirBreak_dim.group().reduceSum(function(d) {
                if (d.Type === "Fighter_Aircraft") {
                    return d.Count;
                } else {
                    return 0;
                }
            });
            var AttakersByCountry = AirBreak_dim.group().reduceSum(function(d) {
                if (d.Type === "Attack_Aircraft") {
                    return d.Count;
                } else {
                    return 0;
                }
            });
            var TransportersByCountry = AirBreak_dim.group().reduceSum(function(d) {
                if (d.Type === "Transport_Aircraft") {
                    return d.Count;
                } else {
                    return 0;
                }
            });
            var TrainersByCountry = AirBreak_dim.group().reduceSum(function(d) {
                if (d.Type === "Trainer_Aircraft") {
                    return d.Count;
                } else {
                    return 0;
                }
            });
            
            var stackedChart = dc.barChart ("#AirStack")
                
                stackedChart
                    .width(580)
                    .height(400)
                    .margins({top: 50, right: 50, bottom: 40, left: 50}) 
                    .dimension(AirBreak_dim)
                    .group(FightersByCountry, "Fighter Aircraft")
                    .stack(AttakersByCountry, "Attack Aircraft")
                    .stack(TransportersByCountry, "Transport Aircraft")
                    .stack(TrainersByCountry, "Trainer Aircraft")
                    .x(d3.scale.ordinal().domain(["USA","Russia","China","India","France","UK","Japan","Turkey","Germany","Egypt"]))
                    .xUnits(dc.units.ordinal)
                    .xAxisLabel("Country")
                    .yAxisLabel("Number of Aircraft")
                    .legend(dc.legend().x(400).y(10).itemHeight(13).gap(5))

                    .renderlet(function (chart) {
        
                        var gLabels = chart.select(".labels");
                        if (gLabels.empty()){
                            gLabels = chart.select(".chart-body").append('g').classed('labels', true);
                        }
                        
                        var gLabelsData = gLabels.selectAll("text").data(chart.selectAll(".bar")[0]);
                        
                        gLabelsData.exit().remove(); //Remove unused elements
                        
                        gLabelsData.enter().append("text"); //Add new elements
                        
                        gLabelsData
                        .attr('text-anchor', 'middle')
                        .attr('fill', 'white')
                        .text(function(d){
                            return d3.select(d).data()[0].data.value
                        })
                        .attr('x', function(d){ 
                            return +d.getAttribute('x') + (d.getAttribute('width')/2); 
                        })
                        .attr('y', function(d){ return +d.getAttribute('y') + 15; })
                        .attr('style', function(d){
                            if (+d.getAttribute('height') < 16) return "display:none";
                        });
                        
                    });
                    
                    
                    
         
            
            var Heli_dim = ndx.dimension(dc.pluck("Country"));
            var TotalHeliByCountry = Heli_dim.group().reduceSum(function(d) {
                if (d.Type === "Other_Helicopter_Strength") {
                    return d.Count;
                } else {
                    return 0;
                }
            });
            var AttackHeliByCountry = Heli_dim.group().reduceSum(function(d) {
                if (d.Type === "Attack_Helicopters") {
                    return d.Count;
                } else {
                    return 0;
                }
            });
            
            
            var stackedChart = dc.barChart ("#HeliStack")
                
                stackedChart
                    .width(580)
                    .height(400)
                    .margins({top: 50, right: 50, bottom: 40, left: 50})
                    .dimension(Heli_dim)
                    .group(TotalHeliByCountry, "Other Helicopters")
                    .stack(AttackHeliByCountry, "Attack Helicopters")
                    .x(d3.scale.ordinal().domain(["USA","Russia","China","India","France","UK","Japan","Turkey","Germany","Egypt"]))
                    .xUnits(dc.units.ordinal)
                    .xAxisLabel("Country")
                    .yAxisLabel("Number of Helicopters")
                    .legend(dc.legend().x(400).y(10).itemHeight(13).gap(5))
                    .renderlet(function (chart) {
        
                        var gLabels = chart.select(".labels");
                        if (gLabels.empty()){
                            gLabels = chart.select(".chart-body").append('g').classed('labels', true);
                        }
                        
                        var gLabelsData = gLabels.selectAll("text").data(chart.selectAll(".bar")[0]);
                        
                        gLabelsData.exit().remove(); //Remove unused elements
                        
                        gLabelsData.enter().append("text"); //Add new elements
                        
                        gLabelsData
                        .attr('text-anchor', 'middle')
                        .attr('fill', 'white')
                        .text(function(d){
                            return d3.select(d).data()[0].data.value
                        })
                        .attr('x', function(d){ 
                            return +d.getAttribute('x') + (d.getAttribute('width')/2); 
                        })
                        .attr('y', function(d){ return +d.getAttribute('y') + 13; })
                        .attr('style', function(d){
                            if (+d.getAttribute('height') < 15) return "display:none";
                        });
                        
                    });
    
    
    
    
            
    
            
    // ................................................................................ARMY
           
           
           
            var ArmyDim = ndx.dimension(dc.pluck("Country"));
            var CombatTanksByCountry = ArmyDim.group().reduceSum(function(d) {
                if (d.Type === "Combat_Tanks") {
                    return d.Count;
                } else {
                    return 0;
                }
            });
            var ArmouredFVByCountry = ArmyDim.group().reduceSum(function(d) {
                if (d.Type === "Armoured_Fighting_Vehicles") {
                    return d.Count;
                } else {
                    return 0;
                }
            });
            var SelfPropArtilleryByCountry = ArmyDim.group().reduceSum(function(d) {
                if (d.Type === "Self_Propelled_Artillery") {
                    return d.Count;
                } else {
                    return 0;
                }
            });
            var TowedArtilleryByCountry = ArmyDim.group().reduceSum(function(d) {
                if (d.Type === "Towed_Artillery") {
                    return d.Count;
                } else {
                    return 0;
                }
            });
            var RocketProjByCountry = ArmyDim.group().reduceSum(function(d) {
                if (d.Type === "Rocket_Projectors") {
                    return d.Count;
                } else {
                    return 0;
                }
            });
            
            
            
            var stackedChart = dc.barChart ("#ArmyStack")
                
                stackedChart
                    .width(580)
                    .height(400)
                    .margins({top: 50, right: 50, bottom: 40, left: 50})
                    .dimension(ArmyDim)
                    .group(CombatTanksByCountry, "Combat Tanks")
                    .stack(ArmouredFVByCountry, "Armoured Fighting Vehicles")
                    .stack(SelfPropArtilleryByCountry, "Self-Propelled Artillery")
                    .stack(TowedArtilleryByCountry, "Towed Artillery")
                    .stack(RocketProjByCountry, "Rocket Projectors")
                    .x(d3.scale.ordinal().domain(["USA","Russia","China","India","France","UK","Japan","Turkey","Germany","Egypt"]))
                    .xUnits(dc.units.ordinal)
                    .xAxisLabel("Country")
                    .yAxisLabel("Number of Vehicles")
                    .legend(dc.legend().x(400).y(10).itemHeight(13).gap(5))
                    .renderlet(function (chart) {
        
                        var gLabels = chart.select(".labels");
                        if (gLabels.empty()){
                            gLabels = chart.select(".chart-body").append('g').classed('labels', true);
                        }
                        
                        var gLabelsData = gLabels.selectAll("text").data(chart.selectAll(".bar")[0]);
                        
                        gLabelsData.exit().remove(); //Remove unused elements
                        
                        gLabelsData.enter().append("text"); //Add new elements
                        
                        gLabelsData
                        .attr('text-anchor', 'middle')
                        .attr('fill', 'white')
                        .text(function(d){
                            return d3.select(d).data()[0].data.value
                        })
                        .attr('x', function(d){ 
                            return +d.getAttribute('x') + (d.getAttribute('width')/2); 
                        })
                        .attr('y', function(d){ return +d.getAttribute('y') + 15; })
                        .attr('style', function(d){
                            if (+d.getAttribute('height') < 18) return "display:none";
                        });
                        
                    });
            
            
            
            
            
                
    // ................................................................................NAVY        
            
            
            
            
            var NavalDim = ndx.dimension(dc.pluck("Country"));
            var TotalNavalAssByCountry = NavalDim.group().reduceSum(function(d) {
                if (d.Type === "Total_Naval_Assets") {
                    return d.Count;
                } else {
                    return 0;
                }
            });
            

            var NavalChart = dc.barChart ("#TotalNavalBar");
                
                NavalChart
                    .width(580)
                    .height(400)
                    .margins({top: 50, right: 50, bottom: 40, left: 40})
                    .dimension(NavalDim)
                    .group(TotalNavalAssByCountry)
                    .transitionDuration(700)
                    .x(d3.scale.ordinal().domain(["USA","Russia","China","India","France","UK","Japan","Turkey","Germany","Egypt"]))
                    .xUnits(dc.units.ordinal)
                    .xAxisLabel("Country")
                    .yAxisLabel("Total Naval Assets")
                    .renderlet(function (chart) {
        
                        var gLabels = chart.select(".labels");
                        if (gLabels.empty()){
                            gLabels = chart.select(".chart-body").append('g').classed('labels', true);
                        }
                        
                        var gLabelsData = gLabels.selectAll("text").data(chart.selectAll(".bar")[0]);
                        
                        gLabelsData.exit().remove(); //Remove unused elements
                        
                        gLabelsData.enter().append("text"); //Add new elements
                        
                        gLabelsData
                        .attr('text-anchor', 'middle')
                        .attr('fill', 'white')
                        .text(function(d){
                            return d3.select(d).data()[0].data.value
                        })
                        .attr('x', function(d){ 
                            return +d.getAttribute('x') + (d.getAttribute('width')/2); 
                        })
                        .attr('y', function(d){ return +d.getAttribute('y') + 15; })
                        .attr('style', function(d){
                            if (+d.getAttribute('height') < 18) return "display:none";
                        });
                        
                    });

            
            
            
            
            
            var NavalBreak_dim = ndx.dimension(dc.pluck("Country"));
            var MineVesselsByCountry = NavalBreak_dim.group().reduceSum(function(d) {
                if (d.Type === "Mine_Warefare_Vessels") {
                    return d.Count;
                } else {
                    return 0;
                }
            });
            var PatrolCraftByCountry = NavalBreak_dim.group().reduceSum(function(d) {
                if (d.Type === "Patrol_Craft") {
                    return d.Count;
                } else {
                    return 0;
                }
            });
            var SubmarinesByCountry = NavalBreak_dim.group().reduceSum(function(d) {
                if (d.Type === "Submarines") {
                    return d.Count;
                } else {
                    return 0;
                }
            });
            var CorvettesByCountry = NavalBreak_dim.group().reduceSum(function(d) {
                if (d.Type === "Corvettes") {
                    return d.Count;
                } else {
                    return 0;
                }
            });
            var DestroyersByCountry = NavalBreak_dim.group().reduceSum(function(d) {
                if (d.Type === "Destroyers") {
                    return d.Count;
                } else {
                    return 0;
                }
            });
            var FrigatesByCountry = NavalBreak_dim.group().reduceSum(function(d) {
                if (d.Type === "Frigates") {
                    return d.Count;
                } else {
                    return 0;
                }
            });
            var AircraftCarriersByCountry = NavalBreak_dim.group().reduceSum(function(d) {
                if (d.Type === "Aircraft_Carriers") {
                    return d.Count;
                } else {
                    return 0;
                }
            });
            
            
            
            
            var NavalChart2 = dc.barChart ("#NavalStack")
                
                NavalChart2
                    .width(580)
                    .height(400)
                    .margins({top: 50, right: 50, bottom: 40, left: 40})
                    .dimension(NavalBreak_dim)
                    .group(MineVesselsByCountry, "Mine Warfare Vessels")
                    .stack(PatrolCraftByCountry, "Patrol Craft")
                    .stack(SubmarinesByCountry, "Submarines")
                    .stack(CorvettesByCountry, "Corvettes")
                    .stack(DestroyersByCountry, "Destroyers")
                    .stack(FrigatesByCountry, "Frigates")
                    .stack(AircraftCarriersByCountry, "Aircraft Carriers")
                    .x(d3.scale.ordinal().domain(["USA","Russia","China","India","France","UK","Japan","Turkey","Germany","Egypt"]))
                    .xUnits(dc.units.ordinal)
                    .xAxisLabel("Country")
                    .yAxisLabel("Number of Sea Vessels")
                    .legend(dc.legend().x(400).y(10).itemHeight(13).gap(5))
                    .renderlet(function (chart) {
        
                        var gLabels = chart.select(".labels");
                        if (gLabels.empty()){
                            gLabels = chart.select(".chart-body").append('g').classed('labels', true);
                        }
                        
                        var gLabelsData = gLabels.selectAll("text").data(chart.selectAll(".bar")[0]);
                        
                        gLabelsData.exit().remove(); //Remove unused elements
                        
                        gLabelsData.enter().append("text"); //Add new elements
                        
                        gLabelsData
                        .attr('text-anchor', 'middle')
                        .attr('fill', 'white')
                        .text(function(d){
                            return d3.select(d).data()[0].data.value
                        })
                        .attr('x', function(d){ 
                            return +d.getAttribute('x') + (d.getAttribute('width')/2); 
                        })
                        .attr('y', function(d){ return +d.getAttribute('y') + 15; })
                        .attr('style', function(d){
                            if (+d.getAttribute('height') < 18) return "display:none";
                        });
                        
                    });
            
    
    // ................................................................................
    
    
            dc.renderAll();        
}         
        
    
            
