function drawBarChart(
    container,
    margin,
    width,
    height,
    title,
    dailyListeningTime
){         
    dailyListeningTimeFiltered = dailyListeningTime.filter(d => {
        return d["month"] == "2020-12"
      })
    d3.select(container).selectAll("*").remove();

    const svg = d3
    .select(container)
    .append("svg")
    .attr("viewBox", [
        0,
        0,
        width + margin.left + margin.right,
        height + margin.top + margin.bottom,
      ]);
    
    
    const g = svg.append("g").attr("transform", "translate(80 0)")
    
    const x = d3.scaleBand().domain(Array.from(dailyListeningTimeFiltered).map(d => d["day"])).range([0, width]).padding(.2)
    
    const y = d3.scaleLinear().domain([0, d3.max(dailyListeningTimeFiltered, d => d["totalPlayedTimeMin"])]).range([height, 0])
    
    const yAxis = g => g
        .call(d3.axisLeft(y))
    
    const rect = g.selectAll("rect")
        .data(dailyListeningTimeFiltered)
        .enter()
        .append("rect")
        .attr("x", d => x(d["day"]))
        .attr("y", d => height - y(d["totalPlayedTimeMin"]))
        .attr("width", d => x.bandwidth())
        .attr("height",  d => y(d["totalPlayedTimeMin"]))
        .style("fill", "steelblue")
    
    const text = g.selectAll("text")
        .data(dailyListeningTimeFiltered)
        .enter()
        .append("text")
        .attr("x", d => x(d["day"]))
        .attr("y", d => width)
        .attr("transform", d => "translate(" + x.bandwidth()/4 + " " + 10 + ") rotate(45 " + x(d["day"]) + ", " + height + ")")
        .text(d => d["day"])
    
    const titre = g
        .append("text")
        .attr("x", width/4 + 10)
        .attr("y", height + 80)
        .text(title)
    
    g.append("g")
        .call(yAxis);
    
    
    function filterMonth(selectedMonth){
        let dailyListeningTimefiltered = dailyListeningTime.filter(d => {
            return d["month"] == selectedMonth
        })
        return dailyListeningTimefiltered
    }
  
    return Object.assign(svg.node(), {
        filterMonth: filterMonth,
      });


}