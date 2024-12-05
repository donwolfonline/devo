'use client';

import { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';
import '@/lib/chartConfig';

interface BarChartProps {
  data: Array<{ source: string; count: number }>;
  xKey: string;
  yKey: string;
  color: string;
}

export default function BarChart({ data, xKey, yKey, color }: BarChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    // Destroy existing chart
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;

    chartInstance.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: data.map(item => item[xKey]),
        datasets: [
          {
            data: data.map(item => item[yKey]),
            backgroundColor: color + '80',
            borderColor: color,
            borderWidth: 1,
            borderRadius: 4,
            maxBarThickness: 40,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            mode: 'index',
            intersect: false,
            backgroundColor: '#1a1a24',
            titleColor: '#fff',
            bodyColor: '#a0aec0',
            borderColor: '#2d2d3d',
            borderWidth: 1,
            padding: 12,
            displayColors: false,
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
            border: {
              display: false,
            },
            ticks: {
              color: '#718096',
              maxRotation: 0,
              font: {
                size: 12,
              },
            },
          },
          y: {
            beginAtZero: true,
            grid: {
              color: '#2d2d3d',
            },
            border: {
              display: false,
            },
            ticks: {
              color: '#718096',
              padding: 10,
              font: {
                size: 12,
              },
              callback: (value) => {
                if (value >= 1000) {
                  return (value / 1000).toFixed(1) + 'k';
                }
                return value;
              },
            },
          },
        },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data, xKey, yKey, color]);

  return <canvas ref={chartRef} />;
}
