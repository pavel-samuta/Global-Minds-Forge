import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface Node extends d3.SimulationNodeDatum {
  id: string;
  group: number;
}

interface Link extends d3.SimulationLinkDatum<Node> {
  source: string | Node;
  target: string | Node;
  value: number;
}

const NetworkGraph: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = svgRef.current.clientWidth;
    const height = 400;
    const color = d3.scaleOrdinal(d3.schemeTableau10);

    // Mock Data representing Engineers, Investors, Scientists connecting
    const nodes: Node[] = [
      { id: "GMF Core", group: 1 },
      { id: "Engineer A", group: 2 },
      { id: "Investor X", group: 3 },
      { id: "Scientist Y", group: 2 },
      { id: "Project Alpha", group: 4 },
      { id: "Artist B", group: 5 },
      { id: "Manuf. Rep", group: 3 },
      { id: "Researcher Z", group: 2 },
    ];

    const links: Link[] = [
      { source: "Engineer A", target: "GMF Core", value: 1 },
      { source: "Investor X", target: "GMF Core", value: 1 },
      { source: "Scientist Y", target: "GMF Core", value: 1 },
      { source: "Project Alpha", target: "Engineer A", value: 2 },
      { source: "Project Alpha", target: "Investor X", value: 5 },
      { source: "Artist B", target: "Project Alpha", value: 1 },
      { source: "Manuf. Rep", target: "Project Alpha", value: 2 },
      { source: "Researcher Z", target: "Scientist Y", value: 1 },
    ];

    // Clear previous
    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3.select(svgRef.current)
      .attr("viewBox", [0, 0, width, height]);

    const simulation = d3.forceSimulation(nodes)
      .force("link", d3.forceLink(links).id((d: any) => d.id).distance(100))
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(width / 2, height / 2));

    const link = svg.append("g")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke-width", d => Math.sqrt(d.value));

    const node = svg.append("g")
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5)
      .selectAll("circle")
      .data(nodes)
      .join("circle")
      .attr("r", 8)
      .attr("fill", (d: any) => color(d.group))
      .call((d3.drag() as any)
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended));

    node.append("title")
      .text(d => d.id);

    simulation.on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      node
        .attr("cx", (d: any) => d.x)
        .attr("cy", (d: any) => d.y);
    });

    function dragstarted(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event: any, d: any) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    return () => {
      simulation.stop();
    };
  }, []);

  return (
    <div className="w-full bg-slate-900/50 rounded-xl border border-slate-700 p-4 shadow-lg backdrop-blur-sm">
      <h3 className="text-xl font-semibold mb-4 text-center text-slate-200">Семантический Поиск Связей</h3>
      <svg ref={svgRef} className="w-full h-[400px]"></svg>
    </div>
  );
};

export default NetworkGraph;
