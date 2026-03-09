import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { Globe } from 'lucide-react';

export function GeoMap() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 600;
    const height = 300;
    const svg = d3.select(svgRef.current)
      .attr('viewBox', `0 0 ${width} ${height}`);

    svg.selectAll('*').remove();

    const projection = d3.geoMercator()
      .scale(90)
      .translate([width / 2, height / 1.5]);

    const path = d3.geoPath().projection(projection);

    // Simplified world map data (just for visualization)
    d3.json('https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson').then((data: any) => {
      svg.append('g')
        .selectAll('path')
        .data(data.features)
        .enter()
        .append('path')
        .attr('d', path)
        .attr('fill', '#1e293b')
        .attr('stroke', '#334155')
        .attr('stroke-width', 0.5);

      // Add some animated attack points
      const points = [
        { long: 105.8, lat: 21.0, label: 'Hanoi' },
        { long: -118.2, lat: 34.0, label: 'LA' },
        { long: 2.3, lat: 48.8, label: 'Paris' },
        { long: 103.8, lat: 1.3, label: 'Singapore' },
      ];

      svg.selectAll('circle')
        .data(points)
        .enter()
        .append('circle')
        .attr('cx', d => projection([d.long, d.lat])![0])
        .attr('cy', d => projection([d.long, d.lat])![1])
        .attr('r', 3)
        .attr('fill', '#6366f1')
        .append('animate')
        .attr('attributeName', 'r')
        .attr('values', '2;6;2')
        .attr('dur', '2s')
        .attr('repeatCount', 'indefinite');
    });
  }, []);

  return (
    <div className="bg-slate-900/40 border border-slate-800/50 rounded-xl p-6 overflow-hidden">
      <div className="flex items-center gap-2 mb-4 text-xs font-bold text-indigo-400 uppercase tracking-widest">
        <Globe className="w-4 h-4" />
        Global Threat Intelligence Map
      </div>
      <div className="relative w-full aspect-[2/1] bg-slate-950/50 rounded-lg border border-slate-800/50 flex items-center justify-center">
        <svg ref={svgRef} className="w-full h-full" />
        <div className="absolute bottom-4 left-4 flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
            <span className="text-[10px] text-slate-400 font-bold uppercase">Active Nodes</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            <span className="text-[10px] text-slate-400 font-bold uppercase">Attack Origins</span>
          </div>
        </div>
      </div>
    </div>
  );
}
