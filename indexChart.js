
const width = 1200;
const height = 500;
const margin = { top: 100, right: 100, bottom: 100, left: 100 };

const dataset = [12, 31, 22, 17, 25, 18, 29, 14, 9];
    
const svg = d3.select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height);


d3.json("https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json")
    .then(({data}) => {

        let datas = data.map(d => d[0]);
        let values = data.map(d => d[1]);

        let xScale = d3.scaleTime()
            .domain([new Date(d3.min(datas)), new Date(d3.max(datas))])
            .range([margin.left, width - margin.right]);
        let yScale = d3.scaleLinear()
            .domain([0, d3.max(values)])
            .range([height - margin.bottom, margin.top]);


        // user story 4: they create tick lablels with the class tick
        let xAxis = d3.axisBottom(xScale);
        let yAxis = d3.axisLeft(yScale);

        // user story 2
        svg.append("g")
            .attr("id", "x-axis")
            .attr("transform", `translate(0, ${height - margin.bottom})`)
            .call(xAxis);

        // user story 3
        svg.append("g")
            .attr("id", "y-axis")
            .attr("transform", `translate(${margin.left}, 0)`)
            .call(yAxis);



        // user story 5: creates elements with the class bar
        svg.selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr('x', function(d, i) {
              return xScale(new Date(d[0]));
            }) // user story 10: the x position is set to the xScale, in terms of date value
            .attr("y", (d, i) => yScale(d[1])) // user story 11: the y position is set to the yScale, in terms of GDP value
            .attr("width", (width - data.length) / data.length )
            .attr("height", (d, i) => height - margin.bottom - yScale(d[1])) // user story 9: takes into account gdp value when calulating the height of the bar
            .attr("data-date", (d, i) => d[0]) // user story 6, 7: data is sorted by provided data order
            .attr("data-gdp", (d, i) => d[1]) // user story 6, 8: data is sorted by provided data order
            .attr("fill", "navy")
            .attr("class", "bar")
            .append("title")
            .text((d,i) => d[0] + ' ' + '$' + d[1] + ' Billion')
            .attr("id", "tooltip")
            .attr("data-date", (d, i) => d[0])

    })

